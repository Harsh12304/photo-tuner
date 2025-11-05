'use client'
import React from 'react'
import { 
  TbArrowBackUp, 
  TbArrowForwardUp, 
  TbUpload, 
  TbDownload,
  TbSun,
  TbMoon,
  TbTrash
} from 'react-icons/tb'

const Header = ({ 
  hasImage,
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo, 
  onDownload,
  onUpload,
  onClearSession,
  isDarkMode,
  onToggleTheme,
  isUploading,
  isDownloading
}) => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 px-4 sm:px-6 h-16 flex-shrink-0 animate-slide-down bg-background-light dark:bg-background-dark">
      {/* Left - Logo & Title */}
      <div className="flex items-center gap-2 sm:gap-4 text-black dark:text-white">
        <div className="w-6 h-6 text-[#137fec] flex-shrink-0 animate-float">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
          </svg>
        </div>
        <h2 className="text-base sm:text-md font-bold truncate">Image Tuner</h2>
      </div>
      
      {/* Center - Undo/Redo */}
      <div className="flex-1 flex justify-center items-center gap-2 max-w-xs">
        <button 
          onClick={onUndo} 
          disabled={!canUndo} 
          className={`btn-icon ${canUndo ? 'btn-hover' : 'btn-disabled'}`}
          title="Undo"
        >
          <TbArrowBackUp className="w-5 h-5" />
        </button>
        <button 
          onClick={onRedo} 
          disabled={!canRedo} 
          className={`btn-icon ${canRedo ? 'btn-hover' : 'btn-disabled'}`}
          title="Redo"
        >
          <TbArrowForwardUp className="w-5 h-5" />
        </button>
      </div>
      
      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button 
          onClick={onToggleTheme}
          className="btn-icon btn-hover animate-fade-in"
          title="Toggle theme"
        >
          {isDarkMode ? <TbSun className="w-5 h-5 animate-spin-slow" /> : <TbMoon className="w-5 h-5" />}
        </button>
        
        {/* Clear Session */}
        {hasImage && (
          <button 
            onClick={onClearSession}
            className="hidden md:btn-icon btn-hover bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40 animate-fade-in"
            title="Clear session"
          >
            <TbTrash className="w-5 h-5" />
          </button>
        )}
        
        {/* Upload Button */}
        <button 
          onClick={onUpload} 
          disabled={isUploading}
          className={`btn-primary ${isUploading ? 'animate-pulse' : 'btn-hover'}`}
        >
          <TbUpload className={`w-4 h-4 ${isUploading ? 'animate-bounce' : ''}`} />
          <span className="hidden sm:inline">{isUploading ? 'Uploading...' : 'Upload'}</span>
        </button>
        
        {/* Export Button */}
        <button 
          onClick={onDownload} 
          disabled={!hasImage || isDownloading}
          className={` btn-export ${!hasImage || isDownloading ? 'btn-disabled' : 'btn-hover'}`}
        >
          {isDownloading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span className="hidden sm:inline">Downloading...</span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">Export as PNG</span>
              <TbDownload className="w-4 h-4 sm:hidden" />
            </>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header