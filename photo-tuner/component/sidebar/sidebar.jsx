'use client'
import React from 'react'

const Sidebar = ({ 
  activeTool, 
  setActiveTool, 
  hasImage, 
  onUploadClick,
  onAddText,
  startCropMode
}) => {
  const tools = [
    { id: 'select', icon: '↖', label: 'Select', disabled: false },
    { id: 'rotate', icon: '🔄', label: 'Rotate', disabled: !hasImage },
    { id: 'crop', icon: '⊡', label: 'Crop', disabled: !hasImage, onClick: startCropMode },
    { id: 'draw', icon: '✏', label: 'Draw', disabled: !hasImage },
    { id: 'text', icon: 'T', label: 'Text', disabled: !hasImage, onClick: onAddText },
  ]
  
  return (
    <div className="w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-6 gap-2">
      {/* Logo */}
      <div className="mb-6 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">IE</span>
      </div>
      
      {/* Upload Button */}
      <button
        onClick={onUploadClick}
        className="w-12 h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all mb-4"
        title="Upload Image"
      >
        <span className="text-xl">📁</span>
      </button>
      
      {/* Tool Buttons */}
      {tools.map(tool => (
        <button
          key={tool.id}
          onClick={() => {
            if (tool.onClick) {
              tool.onClick()
            } else {
              setActiveTool(tool.id)
            }
          }}
          disabled={tool.disabled}
          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
            activeTool === tool.id
              ? 'bg-slate-700 text-white'
              : tool.disabled
              ? 'text-slate-600 cursor-not-allowed'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
          title={tool.label}
        >
          <span className="text-xl">{tool.icon}</span>
        </button>
      ))}
    </div>
  )
}

export default Sidebar;