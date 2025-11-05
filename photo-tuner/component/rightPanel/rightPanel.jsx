'use client'
import React from 'react'
import { TbRotate2, TbRotateClockwise2 } from 'react-icons/tb'

const RightPanel = ({
  className = '',
  isMobile = false,
  activeTool,
  rotation,
  onRotationChange,
  onRotate90,
  brushSize,
  onBrushSizeChange,
  brushColor,
  onBrushColorChange,
  isCropMode,
  onCropApply,
  onCropCancel,
  hasImage
}) => {
  const colorPresets = [
    { color: '#EF4444', name: 'Red' },
    { color: '#10B981', name: 'Green' },
    { color: '#3B82F6', name: 'Blue' },
    { color: '#F59E0B', name: 'Yellow' },
    { color: '#FFFFFF', name: 'White' },
    { color: '#000000', name: 'Black' },
  ]
  
  if (!hasImage) return null
  
  const containerClass = isMobile 
    ? 'border-t border-gray-200 dark:border-white/10 bg-background-light dark:bg-background-dark p-4 max-h-64 overflow-y-auto'
    : 'w-72 border-l border-gray-200 dark:border-white/10 bg-background-light dark:bg-background-dark p-4 overflow-y-auto'
  
  return (
    <aside className={`${containerClass} ${className}`}>
      <div className="flex flex-col gap-4">
        
        {/* Rotation */}
        {activeTool === 'rotate' && (
          <>
            <div className="flex flex-col gap-1">
              <p className="text-black dark:text-white text-lg sm:text-2xl font-bold">Rotation</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Adjust the angle of your image.</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-black dark:text-white text-sm font-medium">Angle</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{rotation}°</p>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotation}
                  onChange={(e) => onRotationChange(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#137fec] [&::-webkit-slider-thumb]:ring-4 [&::-webkit-slider-thumb]:ring-[#137fec]/20"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => onRotate90('left')} className="flex items-center justify-center gap-2 rounded-lg h-10 px-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-black dark:text-white text-sm font-medium">
                <TbRotate2 className="w-5 h-5" />
                <span>-90°</span>
              </button>
              <button onClick={() => onRotate90('right')} className="flex items-center justify-center gap-2 rounded-lg h-10 px-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-black dark:text-white text-sm font-medium">
                <TbRotateClockwise2 className="w-5 h-5" />
                <span>+90°</span>
              </button>
            </div>
            
            {!isMobile && <hr className="border-gray-200 dark:border-white/10" />}
          </>
        )}
        
        {/* Brush Settings */}
        {activeTool === 'draw' && (
          <>
            <div className="flex flex-col gap-1">
              <p className="text-black dark:text-white text-lg sm:text-2xl font-bold">Brush Settings</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Configure your drawing tool.</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-black dark:text-white text-sm font-medium">Size</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{brushSize}px</p>
              </div>
              
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => onBrushSizeChange(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#137fec] [&::-webkit-slider-thumb]:ring-4 [&::-webkit-slider-thumb]:ring-[#137fec]/20"
              />
            </div>
            
            <div>
              <p className="text-black dark:text-white text-sm font-medium mb-2">Color</p>
              <div className="flex items-center gap-2 flex-wrap">
                {colorPresets.map(({ color, name }) => (
                  <button
                    key={color}
                    onClick={() => onBrushColorChange(color)}
                    className={`w-8 h-8 rounded-lg cursor-pointer transition-all ${
                      brushColor === color
                        ? 'ring-2 ring-offset-2 ring-[#137fec] ring-offset-background-light dark:ring-offset-background-dark scale-110'
                        : 'hover:scale-105'
                    } ${color === '#FFFFFF' ? 'border border-gray-200 dark:border-white/20' : ''}`}
                    style={{ backgroundColor: color }}
                    title={name}
                  />
                ))}
              </div>
            </div>
          </>
        )}
        
        {/* Crop Actions */}
        {isCropMode && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-black dark:text-white text-lg sm:text-2xl font-bold">Crop Image</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Draw a rectangle on the canvas.</p>
            </div>
            
            <div className={`flex gap-2 ${isMobile ? 'flex-row' : 'flex-col sm:flex-row'}`}>
              <button onClick={onCropApply} className="flex-1 rounded-lg h-10 px-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors">
                Apply
              </button>
              <button onClick={onCropCancel} className="flex-1 rounded-lg h-10 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default RightPanel