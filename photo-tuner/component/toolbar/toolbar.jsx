'use client'
import React from 'react'

const Toolbar = ({
  hasImage,
  activeTool,
  setActiveTool,
  onUploadClick,
  onRotate90,
  rotation,
  onRotationChange,
  brushSize,
  onBrushSizeChange,
  brushColor,
  onBrushColorChange,
  onCropStart,
  onCropApply,
  onCropCancel,
  isCropMode,
  onAddText,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onDownload,
  onClear
}) => {
  return (
    <div className="p-6 space-y-4 bg-gradient-to-r from-slate-800 to-slate-900">
      {/* Main toolbar */}
      <div className="flex flex-wrap gap-3 justify-center">
        {/* Upload button */}
        <button
          onClick={onUploadClick}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95 border-2 border-blue-500"
        >
          <span className="flex items-center gap-2">
            <span className="text-lg">📁</span>
            <span className="hidden sm:inline">Upload</span>
          </span>
        </button>
        
        {hasImage && (
          <>
            <div className="hidden sm:block w-px bg-slate-600"></div>
            
            {/* Tool buttons */}
            <button
              onClick={() => setActiveTool('select')}
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 border-2 shadow-lg transform hover:scale-105 active:scale-95 ${
                activeTool === 'select'
                  ? 'bg-purple-600 text-white ring-2 ring-offset-2 ring-offset-slate-900 ring-purple-400 border-purple-500'
                  : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">👆</span>
                <span className="hidden sm:inline">Select</span>
              </span>
            </button>
            
            <button
              onClick={() => setActiveTool('rotate')}
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 border-2 shadow-lg transform hover:scale-105 active:scale-95 ${
                activeTool === 'rotate'
                  ? 'bg-purple-600 text-white ring-2 ring-offset-2 ring-offset-slate-900 ring-purple-400 border-purple-500'
                  : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">🔄</span>
                <span className="hidden sm:inline">Rotate</span>
              </span>
            </button>
            
            <button
              onClick={onCropStart}
              disabled={isCropMode}
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 border-2 shadow-lg ${
                isCropMode
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed border-slate-600'
                  : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600 transform hover:scale-105 active:scale-95'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">✂️</span>
                <span className="hidden sm:inline">Crop</span>
              </span>
            </button>
            
            <button
              onClick={() => setActiveTool('draw')}
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 border-2 shadow-lg transform hover:scale-105 active:scale-95 ${
                activeTool === 'draw'
                  ? 'bg-purple-600 text-white ring-2 ring-offset-2 ring-offset-slate-900 ring-purple-400 border-purple-500'
                  : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">✏️</span>
                <span className="hidden sm:inline">Draw</span>
              </span>
            </button>
            
            <button
              onClick={onAddText}
              className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95 border-2 border-slate-600"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">📝</span>
                <span className="hidden sm:inline">Add Text</span>
              </span>
            </button>
            
            <div className="hidden sm:block w-px bg-slate-600"></div>
            
            {/* History buttons */}
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 border-2 shadow-lg ${
                canUndo
                  ? 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600 transform hover:scale-105 active:scale-95'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed border-slate-600'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">↶</span>
                <span className="hidden sm:inline">Undo</span>
              </span>
            </button>
            
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 border-2 shadow-lg ${
                canRedo
                  ? 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600 transform hover:scale-105 active:scale-95'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed border-slate-600'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">↷</span>
                <span className="hidden sm:inline">Redo</span>
              </span>
            </button>
            
            <div className="hidden sm:block w-px bg-slate-600"></div>
            
            {/* Action buttons */}
            <button
              onClick={onDownload}
              className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95 border-2 border-green-500"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">💾</span>
                <span className="hidden sm:inline">Download</span>
              </span>
            </button>
            
            <button
              onClick={onClear}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95 border-2 border-red-500"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">🗑️</span>
                <span className="hidden sm:inline">Clear</span>
              </span>
            </button>
          </>
        )}
      </div>
      
      {/* Tool-specific controls */}
      {hasImage && activeTool === 'rotate' && (
        <div className="bg-slate-700 rounded-xl p-4 border-2 border-blue-500 shadow-lg animate-slide-down">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">🔁 Rotation Angle:</span>
              <span className="text-white bg-blue-600 px-4 py-2 rounded-lg font-bold text-lg">
                {rotation}°
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => onRotationChange(Number(e.target.value))}
              className="w-full h-3 accent-blue-500"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>0°</span>
              <span>90°</span>
              <span>180°</span>
              <span>270°</span>
              <span>360°</span>
            </div>
            <button
              onClick={onRotate90}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg"
            >
              Rotate 90°
            </button>
          </div>
        </div>
      )}
      
      {hasImage && activeTool === 'draw' && (
        <div className="bg-slate-700 rounded-xl p-4 border-2 border-purple-500 shadow-lg animate-slide-down">
          <div className="flex flex-wrap items-center gap-6 justify-center">
            <div className="flex items-center gap-3">
              <span className="text-white font-medium">✏️ Brush Size:</span>
              <input
                type="range"
                min="1"
                max="30"
                value={brushSize}
                onChange={(e) => onBrushSizeChange(Number(e.target.value))}
                className="w-32 accent-purple-500"
              />
              <span className="text-white bg-purple-600 px-3 py-1 rounded-lg font-bold min-w-[50px] text-center">
                {brushSize}px
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-white font-medium">🎨 Color:</span>
              <input
                type="color"
                value={brushColor}
                onChange={(e) => onBrushColorChange(e.target.value)}
                className="w-16 h-10 rounded-lg cursor-pointer border-2 border-white"
              />
              <span className="text-white bg-slate-800 px-3 py-1 rounded-lg font-mono text-sm">
                {brushColor}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {isCropMode && (
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-4 border-2 border-yellow-400 shadow-lg animate-pulse-slow">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex items-center gap-2 text-white font-medium">
              <span className="text-2xl">✂️</span>
              <span>Click and drag on the image to select crop area</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onCropApply}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95 border-2 border-green-400"
              >
                ✓ Apply
              </button>
              <button
                onClick={onCropCancel}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95 border-2 border-red-400"
              >
                ✕ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Toolbar;