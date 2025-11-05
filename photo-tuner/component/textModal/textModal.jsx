'use client'
import React, { useState, useEffect } from 'react'

const TextModal = ({ text, onSave, onClose, onDelete }) => {
  const [content, setContent] = useState('')
  const [size, setSize] = useState(24)
  const [color, setColor] = useState('#000000')
  const [font, setFont] = useState('Arial')
  
  useEffect(() => {
    if (text) {
      setContent(text.content)
      setSize(text.size)
      setColor(text.color)
      setFont(text.font)
    }
  }, [text])
  
  const handleSave = () => {
    if (!content.trim()) {
      alert('Please enter some text')
      return
    }
    
    onSave({
      content,
      size,
      color,
      font
    })
  }
  
  const availableFonts = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Georgia',
    'Verdana',
    'Impact',
    'Comic Sans MS'
  ]
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in backdrop-blur-sm  ">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 w-full max-w-2xl shadow-2xl border-2 border-slate-700 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {text ? '✏️ Edit Text' : '📝 Add New Text'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Text input */}
          <div>
            <label className="block text-white font-medium mb-2 flex items-center gap-2">
              <span>💬</span> Text Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-slate-600 transition-all resize-none"
              rows="3"
              autoFocus
            />
          </div>
          
          {/* Font size */}
          <div>
            <label className="block text-white font-medium mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span>📏</span> Font Size
              </span>
              <span className="text-blue-400 text-xl font-bold bg-slate-700 px-4 py-1 rounded-lg">
                {size}px
              </span>
            </label>
            <input
              type="range"
              min="12"
              max="120"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full h-3 accent-blue-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Small (12px)</span>
              <span>Medium (66px)</span>
              <span>Large (120px)</span>
            </div>
          </div>
          
          {/* Font family */}
          <div>
            <label className="block text-white font-medium mb-2 flex items-center gap-2">
              <span>🔤</span> Font Family
            </label>
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-slate-600 cursor-pointer transition-all"
            >
              {availableFonts.map(f => (
                <option key={f} value={f} style={{ fontFamily: f }}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          
          {/* Color picker */}
          <div>
            <label className="block text-white font-medium mb-2 flex items-center gap-2">
              <span>🎨</span> Text Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-20 h-12 rounded-lg cursor-pointer border-4 border-white shadow-lg"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-slate-600 font-mono"
                placeholder="#000000"
              />
            </div>
          </div>
          
          {/* Preview */}
          <div className="bg-white p-6 rounded-xl shadow-inner border-4 border-slate-700">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">👁️ Preview</p>
              <p
                style={{
                  fontSize: `${size}px`,
                  color: color,
                  fontFamily: font,
                  wordBreak: 'break-word'
                }}
              >
                {content || 'Your text will appear here...'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-bold transition-all shadow-lg transform hover:scale-105 active:scale-95 border-2 border-blue-400"
          >
            ✓ Save Text
          </button>
          
          {text && onDelete && (
            <button
              onClick={onDelete}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-bold transition-all shadow-lg transform hover:scale-105 active:scale-95 border-2 border-red-400"
            >
              🗑️ Delete
            </button>
          )}
          
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold transition-all shadow-lg transform hover:scale-105 active:scale-95 border-2 border-slate-500"
          >
            ✕ Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default TextModal;