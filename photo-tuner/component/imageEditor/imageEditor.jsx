'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { 
  HiOutlineCursorArrowRays,
  HiOutlineArrowPath,
  HiOutlineSquare2Stack,
  HiOutlinePencil
} from 'react-icons/hi2'
import { BiText } from 'react-icons/bi'
import Header from '../../component/header/header'
import Canvas from '../../component/canvas/canvas'
import RightPanel from '../../component/rightPanel/rightPanel'
import Toast from '../../component/toast/toast'
import useImageHistory from '../../hooks/useImageHistory'

const ImageEditor = () => {
  const [image, setImage] = useState(null)
  const [activeTool, setActiveTool] = useState('select')
  const [rotation, setRotation] = useState(0)
  const [isCropMode, setIsCropMode] = useState(false)
  const [cropArea, setCropArea] = useState(null)
  const [brushSize, setBrushSize] = useState(16)
  const [brushColor, setBrushColor] = useState('#EF4444')
  const [texts, setTexts] = useState([])
  const [selectedTextId, setSelectedTextId] = useState(null)
  const [showTextModal, setShowTextModal] = useState(false)
  const [notification, setNotification] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  
  const { saveState, undo, redo, canUndo, canRedo } = useImageHistory()
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  
  // Load from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem('imageEditor_image')
    const savedRotation = localStorage.getItem('imageEditor_rotation')
    const savedTexts = localStorage.getItem('imageEditor_texts')
    const savedTheme = localStorage.getItem('imageEditor_theme')
    
    if (savedImage) {
      const img = new Image()
      img.onload = () => {
        setImage(img)
        if (savedRotation) setRotation(Number(savedRotation))
        if (savedTexts) setTexts(JSON.parse(savedTexts))
        showNotification('Previous session restored!')
      }
      img.src = savedImage
    }
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])
  
  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('imageEditor_theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])
  
  // Save to localStorage whenever image/rotation/texts change
  useEffect(() => {
    if (image && canvasRef.current) {
      const imageData = canvasRef.current.toDataURL()
      localStorage.setItem('imageEditor_image', imageData)
      localStorage.setItem('imageEditor_rotation', rotation.toString())
      localStorage.setItem('imageEditor_texts', JSON.stringify(texts))
    }
  }, [image, rotation, texts])
  
  const showNotification = (msg) => {
    setNotification(msg)
    setTimeout(() => setNotification(''), 3000)
  }
  
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      showNotification('Please upload a JPG or PNG image')
      return
    }
    
    setIsUploading(true)
    
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        setTimeout(() => {
          setImage(img)
          setRotation(0)
          setTexts([])
          setActiveTool('select')
          setCropArea(null)
          setIsCropMode(false)
          setIsUploading(false)
          showNotification('Image uploaded successfully!')
        }, 500)
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }
  
  const handleRotate90 = (direction) => {
    if (direction === 'left') {
      setRotation(prev => (prev - 90) % 360)
    } else {
      setRotation(prev => (prev + 90) % 360)
    }
    setTimeout(() => saveCanvasState(), 100)
    showNotification('Image rotated')
  }
  
  const startCropMode = () => {
    setActiveTool('crop')
    setIsCropMode(true)
    showNotification('Draw a rectangle to crop')
  }
  
  const applyCrop = useCallback(() => {
    if (!cropArea || !canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const croppedData = ctx.getImageData(cropArea.x, cropArea.y, cropArea.width, cropArea.height)
    
    canvas.width = cropArea.width
    canvas.height = cropArea.height
    ctx.putImageData(croppedData, 0, 0)
    
    const croppedImageUrl = canvas.toDataURL()
    const newImg = new Image()
    newImg.onload = () => {
      setImage(newImg)
      saveCanvasState()
    }
    newImg.src = croppedImageUrl
    
    setCropArea(null)
    setIsCropMode(false)
    setActiveTool('select')
    showNotification('Image cropped successfully')
  }, [cropArea])
  
  const cancelCrop = () => {
    setCropArea(null)
    setIsCropMode(false)
    setActiveTool('select')
    showNotification('Crop cancelled')
  }
  
  const saveCanvasState = useCallback(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const imageData = canvas.toDataURL()
    saveState({ imageData, rotation, texts: JSON.parse(JSON.stringify(texts)) })
  }, [rotation, texts, saveState])
  
  const handleUndo = useCallback(() => {
    const previousState = undo()
    if (previousState) {
      restoreState(previousState)
      showNotification('Undone')
    }
  }, [undo])
  
  const handleRedo = useCallback(() => {
    const nextState = redo()
    if (nextState) {
      restoreState(nextState)
      showNotification('Redone')
    }
  }, [redo])
  
  const restoreState = (state) => {
    const img = new Image()
    img.onload = () => {
      setImage(img)
      setRotation(state.rotation)
      setTexts(state.texts)
    }
    img.src = state.imageData
  }
  
  const handleAddText = () => {
    setSelectedTextId(null)
    setShowTextModal(true)
  }
  
  const handleTextSave = (textData) => {
    if (selectedTextId) {
      setTexts(prevTexts => 
        prevTexts.map(t => t.id === selectedTextId ? { ...textData, id: selectedTextId } : t)
      )
      showNotification('Text updated')
    } else {
      const newText = { ...textData, id: Date.now(), x: 100, y: 100 }
      setTexts(prev => [...prev, newText])
      showNotification('Text added')
    }
    setShowTextModal(false)
    setSelectedTextId(null)
    setTimeout(saveCanvasState, 100)
  }
  
  const handleTextEdit = (textId) => {
    setSelectedTextId(textId)
    setShowTextModal(true)
  }
  
  const handleTextDelete = () => {
    if (selectedTextId) {
      setTexts(prev => prev.filter(t => t.id !== selectedTextId))
      setShowTextModal(false)
      setSelectedTextId(null)
      setTimeout(saveCanvasState, 100)
      showNotification('Text deleted')
    }
  }
  
  const handleDownload = () => {
    if (!canvasRef.current) return
    
    setIsDownloading(true)
    
    setTimeout(() => {
      const canvas = canvasRef.current
      const link = document.createElement('a')
      link.download = `edited-image-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      
      // Clear localStorage after download
      localStorage.removeItem('imageEditor_image')
      localStorage.removeItem('imageEditor_rotation')
      localStorage.removeItem('imageEditor_texts')
      
      setIsDownloading(false)
      showNotification('Image downloaded! Session cleared.')
    }, 800)
  }
  
  const handleClearSession = () => {
    if (window.confirm('Are you sure you want to clear the current session?')) {
      setImage(null)
      setTexts([])
      setRotation(0)
      setActiveTool('select')
      setCropArea(null)
      setIsCropMode(false)
      
      // Clear localStorage
      localStorage.removeItem('imageEditor_image')
      localStorage.removeItem('imageEditor_rotation')
      localStorage.removeItem('imageEditor_texts')
      
      showNotification('Session cleared!')
    }
  }
  
  const tools = [
    { id: 'select', icon: HiOutlineCursorArrowRays, label: 'Select' },
    { id: 'rotate', icon: HiOutlineArrowPath, label: 'Rotate' },
    { id: 'crop', icon: HiOutlineSquare2Stack, label: 'Crop', onClick: startCropMode },
    { id: 'draw', icon: HiOutlinePencil, label: 'Draw' },
    { id: 'text', icon: BiText, label: 'Text', onClick: handleAddText },
  ]
  // AI Command Handler
const handleAiCommand = useCallback((result) => {
  const { action, value } = result
  
  switch (action) {
    case 'rotate':
      if (typeof value === 'number') {
        setRotation(prev => (prev + value) % 360)
        setTimeout(() => saveCanvasState(), 100)
        showNotification(`Rotated ${value}°`)
      }
      break
      
    case 'crop':
      startCropMode()
      showNotification('Crop mode activated - draw a rectangle')
      break
      
    case 'text':
      setSelectedTextId(null)
      setShowTextModal(true)
      showNotification('Opening text editor')
      break
      
    case 'draw':
      setActiveTool('draw')
      if (value?.color) {
        const colorMap = {
          'red': '#EF4444',
          'green': '#10B981',
          'blue': '#3B82F6',
          'yellow': '#F59E0B',
          'black': '#000000',
          'white': '#FFFFFF'
        }
        setBrushColor(colorMap[value.color.toLowerCase()] || brushColor)
      }
      showNotification('Draw mode activated')
      break
      
    case 'brightness':
      showNotification('Brightness adjustment coming soon!')
      break
      
    case 'resize':
      showNotification('Resize feature coming soon!')
      break
      
    default:
      showNotification('Command not recognized')
  }
}, [brushColor, saveCanvasState, showNotification])
  
  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark">
      {/* Hidden file input */}
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/jpeg,image/png" 
        onChange={handleFileSelect} 
        className="hidden" 
      />
      
      {/* Toast Notification */}
      <Toast message={notification} show={!!notification} />
      
      {/* Header Component */}
      <Header
        hasImage={!!image}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        onDownload={handleDownload}
        onUpload={() => fileInputRef.current?.click()}
        onClearSession={handleClearSession}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        isUploading={isUploading}
        isDownloading={isDownloading}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className="hidden sm:flex flex-col border-r border-gray-200 dark:border-white/10 bg-background-light dark:bg-background-dark p-2 sm:p-4 animate-slide-right">
          <div className="flex flex-col gap-2">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    if (tool.onClick) {
                      tool.onClick()
                    } else {
                      setActiveTool(tool.id)
                    }
                  }}
                  disabled={!image && tool.id !== 'select'}
                  className={`tool-btn ${
                    activeTool === tool.id ? 'tool-active' : !image && tool.id !== 'select' ? 'tool-disabled' : 'tool-hover'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  aria-label={tool.label}
                >
                  <Icon className="w-6 h-6" />
                </button>
              )
            })}
          </div>
        </aside>
        
        {/* Canvas */}
        <main className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-black/20">
          {/* Mobile Toolbar */}
          <div className="sm:hidden flex items-center justify-around border-b border-gray-200 dark:border-white/10 bg-background-light dark:bg-background-dark p-2 animate-slide-down">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    if (tool.onClick) {
                      tool.onClick()
                    } else {
                      setActiveTool(tool.id)
                    }
                  }}
                  disabled={!image && tool.id !== 'select'}
                  className={`tool-btn-mobile ${
                    activeTool === tool.id ? 'tool-active' : !image && tool.id !== 'select' ? 'tool-disabled' : 'tool-hover'
                  }`}
                  aria-label={tool.label}
                >
                  <Icon className="w-5 h-5" />
                </button>
              )
            })}
          </div>
          
          <div className="flex-1 overflow-auto p-2 sm:p-4">
            <Canvas
              ref={canvasRef}
              image={image}
              rotation={rotation}
              activeTool={activeTool}
              brushSize={brushSize}
              brushColor={brushColor}
              texts={texts}
              onTextsChange={setTexts}
              onTextEdit={handleTextEdit}
              cropArea={cropArea}
              onCropAreaChange={setCropArea}
              isCropMode={isCropMode}
              onSaveState={saveCanvasState}
              onUploadClick={() => fileInputRef.current?.click()}
            />
          </div>
        </main>
        
        {/* Right Panel - Desktop */}
        <RightPanel
          className="hidden lg:block animate-slide-left"
          activeTool={activeTool}
          rotation={rotation}
          onRotationChange={setRotation}
          onRotate90={handleRotate90}
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
          brushColor={brushColor}
          onBrushColorChange={setBrushColor}
          isCropMode={isCropMode}
          onCropApply={applyCrop}
          onCropCancel={cancelCrop}
          hasImage={!!image}
        />
      </div>
      
      {/* Bottom Panel - Mobile */}
      {image && (
        <RightPanel
          className="block lg:hidden animate-slide-up"
          isMobile={true}
          activeTool={activeTool}
          rotation={rotation}
          onRotationChange={setRotation}
          onRotate90={handleRotate90}
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
          brushColor={brushColor}
          onBrushColorChange={setBrushColor}
          isCropMode={isCropMode}
          onCropApply={applyCrop}
          onCropCancel={cancelCrop}
          hasImage={!!image}
        />
      )}
      
      {/* Text Modal */}
      {showTextModal && (
        <TextModal
          text={texts.find(t => t.id === selectedTextId)}
          onSave={handleTextSave}
          onClose={() => {
            setShowTextModal(false)
            setSelectedTextId(null)
          }}
          onDelete={selectedTextId ? handleTextDelete : null}
        />
      )}
       {/* AI Panel
      <AiPanel 
        onCommand={handleAiCommand}
        hasImage={!!image}
      /> */}
    </div>
  )
}

export default ImageEditor;