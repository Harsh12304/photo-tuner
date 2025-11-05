'use client'

import React, { useEffect, useState, forwardRef } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

const Canvas = forwardRef(({
  image,
  rotation,
  activeTool,
  brushSize,
  brushColor,
  texts,
  onTextsChange,
  onTextEdit,
  cropArea,
  onCropAreaChange,
  isCropMode,
  onSaveState,
  onUploadClick
}, ref) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [cropStart, setCropStart] = useState(null)
  const [isCropping, setIsCropping] = useState(false)
  const [draggedText, setDraggedText] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [hoveredText, setHoveredText] = useState(null)
  const [cursorLight, setCursorLight] = useState({ x: 0, y: 0, show: false })
  
  // Check if dark mode
  const isDarkMode = typeof window !== 'undefined' && document.documentElement.classList.contains('dark')
  
  // Draw everything on canvas
  useEffect(() => {
    if (!image || !ref.current) return
    
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    
    canvas.width = image.width
    canvas.height = image.height
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    
    if (rotation !== 0) {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      ctx.translate(centerX, centerY)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.translate(-centerX, -centerY)
    }
    
    ctx.drawImage(image, 0, 0)
    ctx.restore()
    
    texts.forEach(text => {
      ctx.font = `${text.size}px ${text.font}`
      ctx.fillStyle = text.color
      
      if (text.id === hoveredText?.id) {
        const metrics = ctx.measureText(text.content)
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)'
        ctx.fillRect(
          text.x - 5,
          text.y - text.size - 5,
          metrics.width + 10,
          text.size + 10
        )
        ctx.fillStyle = text.color
      }
      
      ctx.fillText(text.content, text.x, text.y)
    })
    
    if (cropArea && isCropMode) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, canvas.width, cropArea.y)
      ctx.fillRect(0, cropArea.y, cropArea.x, cropArea.height)
      ctx.fillRect(cropArea.x + cropArea.width, cropArea.y, canvas.width - cropArea.x - cropArea.width, cropArea.height)
      ctx.fillRect(0, cropArea.y + cropArea.height, canvas.width, canvas.height - cropArea.y - cropArea.height)
      
      ctx.strokeStyle = '#10b981'
      ctx.lineWidth = 3
      ctx.setLineDash([10, 5])
      ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height)
      ctx.setLineDash([])
      
      const handleSize = 10
      ctx.fillStyle = '#10b981'
      ctx.fillRect(cropArea.x - handleSize/2, cropArea.y - handleSize/2, handleSize, handleSize)
      ctx.fillRect(cropArea.x + cropArea.width - handleSize/2, cropArea.y - handleSize/2, handleSize, handleSize)
      ctx.fillRect(cropArea.x - handleSize/2, cropArea.y + cropArea.height - handleSize/2, handleSize, handleSize)
      ctx.fillRect(cropArea.x + cropArea.width - handleSize/2, cropArea.y + cropArea.height - handleSize/2, handleSize, handleSize)
    }
  }, [image, rotation, texts, cropArea, isCropMode, hoveredText, ref])
  
  const getCursor = () => {
    if (activeTool === 'draw') return 'crosshair'
    if (activeTool === 'crop' || isCropMode) return 'crosshair'
    if (activeTool === 'select' && hoveredText) return 'move'
    return 'default'
  }
  
  const findTextAt = (x, y) => {
    if (!ref.current) return null
    
    const ctx = ref.current.getContext('2d')
    
    for (let i = texts.length - 1; i >= 0; i--) {
      const text = texts[i]
      ctx.font = `${text.size}px ${text.font}`
      const metrics = ctx.measureText(text.content)
      
      if (
        x >= text.x &&
        x <= text.x + metrics.width &&
        y >= text.y - text.size &&
        y <= text.y
      ) {
        return text
      }
    }
    
    return null
  }
  
  const getCoordinates = (e) => {
    if (!ref.current) return null
    
    const canvas = ref.current
    const rect = canvas.getBoundingClientRect()
    
    let clientX, clientY
    
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX
      clientY = e.changedTouches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }
    
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    const x = (clientX - rect.left) * scaleX
    const y = (clientY - rect.top) * scaleY
    
    return { x, y }
  }
  
  const handleStart = (e) => {
    e.preventDefault()
    const coords = getCoordinates(e)
    if (!coords) return
    
    const { x, y } = coords
    
    if (activeTool === 'select') {
      const clickedText = findTextAt(x, y)
      if (clickedText) {
        setDraggedText(clickedText)
        setDragOffset({
          x: x - clickedText.x,
          y: y - clickedText.y
        })
        return
      }
    }
    
    if (activeTool === 'draw') {
      setIsDrawing(true)
      const canvas = ref.current
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
    
    if (isCropMode) {
      // FIXED: Check if user is clicking near existing crop area to extend it
      if (cropArea) {
        const threshold = 20 // 20 pixel threshold for edge detection
        const nearLeft = Math.abs(x - cropArea.x) < threshold
        const nearRight = Math.abs(x - (cropArea.x + cropArea.width)) < threshold
        const nearTop = Math.abs(y - cropArea.y) < threshold
        const nearBottom = Math.abs(y - (cropArea.y + cropArea.height)) < threshold
        
        // If near an edge, start extending from that edge
        if (nearLeft || nearRight || nearTop || nearBottom) {
          setIsCropping(true)
          
          // Set crop start based on which edge is being extended
          if (nearLeft) {
            setCropStart({ x: cropArea.x + cropArea.width, y: cropArea.y + (nearTop ? cropArea.height : (nearBottom ? 0 : cropArea.height / 2)) })
          } else if (nearRight) {
            setCropStart({ x: cropArea.x, y: cropArea.y + (nearTop ? cropArea.height : (nearBottom ? 0 : cropArea.height / 2)) })
          } else if (nearTop) {
            setCropStart({ x: cropArea.x + (nearLeft ? cropArea.width : (nearRight ? 0 : cropArea.width / 2)), y: cropArea.y + cropArea.height })
          } else if (nearBottom) {
            setCropStart({ x: cropArea.x + (nearLeft ? cropArea.width : (nearRight ? 0 : cropArea.width / 2)), y: cropArea.y })
          }
          return
        }
      }
      
      // Otherwise, start a new crop area
      setIsCropping(true)
      setCropStart({ x, y })
    }
  }
  
  const handleMove = (e) => {
    e.preventDefault()
    const coords = getCoordinates(e)
    if (!coords) return
    
    const { x, y } = coords
    
    setMousePos({ x: Math.round(x), y: Math.round(y) })
    
    // Update cursor light position
    setCursorLight({ x, y, show: true })
    
    const textAtPos = findTextAt(x, y)
    setHoveredText(textAtPos)
    
    if (draggedText) {
      const newX = x - dragOffset.x
      const newY = y - dragOffset.y
      
      onTextsChange(
        texts.map(t => 
          t.id === draggedText.id 
            ? { ...t, x: newX, y: newY }
            : t
        )
      )
      return
    }
    
    if (isDrawing && activeTool === 'draw') {
      const canvas = ref.current
      const ctx = canvas.getContext('2d')
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = brushColor
      ctx.lineWidth = brushSize
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
    
    // FIXED: Update crop area when actively cropping
    if (isCropping && cropStart && isCropMode) {
      const width = x - cropStart.x
      const height = y - cropStart.y
      
      onCropAreaChange({
        x: width < 0 ? x : cropStart.x,
        y: height < 0 ? y : cropStart.y,
        width: Math.abs(width),
        height: Math.abs(height)
      })
    }
  }
  
  const handleEnd = (e) => {
    e.preventDefault()
    
    if (isDrawing) {
      setIsDrawing(false)
      onSaveState()
    }
    
    if (draggedText) {
      setDraggedText(null)
      onSaveState()
    }
    
    // FIXED: Only clear crop start and cropping state
    if (isCropping) {
      setIsCropping(false)
      setCropStart(null)
    }
  }
  
  const handleLeave = () => {
    setCursorLight({ x: 0, y: 0, show: false })
    handleEnd({ preventDefault: () => {} })
  }
  
  const handleDoubleTap = (e) => {
    if (activeTool !== 'select') return
    
    const coords = getCoordinates(e)
    if (!coords) return
    
    const { x, y } = coords
    const clickedText = findTextAt(x, y)
    if (clickedText) {
      onTextEdit(clickedText.id)
    }
  }
  
  if (!image) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-white/20 px-6 py-14 w-full max-w-2xl">
          <div className="flex flex-col items-center gap-2">
            <p className="text-black dark:text-white text-lg font-bold text-center">Your Canvas Awaits</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center">Upload an image (JPG or PNG) to get started.</p>
          </div>
          <button 
            onClick={onUploadClick} 
            className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-black dark:text-white text-sm font-bold transition-colors"
          >
            <TbPhotoPlus className="w-5 h-5" />
            <span>Upload Image</span>
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 relative">
      <div className="relative max-w-full max-h-full">
        <canvas
          ref={ref}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleLeave}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          onDoubleClick={handleDoubleTap}
          style={{ 
            cursor: getCursor(),
            touchAction: 'none'
          }}
          className="max-w-full max-h-full border border-gray-300 dark:border-white/20 rounded-lg shadow-lg bg-white"
        />
        
        {/* Dark Mode: Torch/Spotlight Effect */}
        {isDarkMode && cursorLight.show && (
          <div 
            className="absolute pointer-events-none will-change-transform"
            style={{
              left: `${cursorLight.x}px`,
              top: `${cursorLight.y}px`,
              width: '120px',
              height: '120px',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.05) 60%, transparent 80%)',
              boxShadow: '0 0 60px rgba(255,255,255,0.3), inset 0 0 40px rgba(255,255,255,0.1)',
              zIndex: 10,
              mixBlendMode: 'screen',
              rounded: '100%'

            }}
          >
            <div 
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
              }}
            />
          </div>
        )}

        {/* Light Mode: Ripple Effect */}
        {!isDarkMode && cursorLight.show && (
          <>
            <div 
              className="absolute pointer-events-none will-change-transform"
              style={{
                left: `${cursorLight.x}px`,
                top: `${cursorLight.y}px`,
                width: '120px',
                height: '120px',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(19,127,236,0.15) 0%, rgba(19,127,236,0.08) 50%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 10
              }}
            />
            <div 
              className="absolute pointer-events-none will-change-transform animate-ping-slow"
              style={{
                left: `${cursorLight.x}px`,
                top: `${cursorLight.y}px`,
                width: '80px',
                height: '80px',
                transform: 'translate(-50%, -50%)',
                border: '3px solid rgba(19,127,236,0.4)',
                borderRadius: '50%',
                zIndex: 11
              }}
            />
          </>
        )}
        
        {/* Coordinates display */}
        <div className="absolute bottom-2 right-2 bg-black/70 dark:bg-white/10 text-white dark:text-white px-3 py-1.5 rounded text-xs font-mono backdrop-blur-sm">
          X: {mousePos.x} | Y: {mousePos.y}
        </div>
      </div>
    </div>
  )
})

Canvas.displayName = 'Canvas'

export default Canvas