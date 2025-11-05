'use client'
import React from 'react'

const ConfirmModal = ({ show, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', confirmColor = 'blue' }) => {
  if (!show) return null
  
  const colorClasses = {
    blue: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-blue-400',
    red: 'from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-red-400',
    green: 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-green-400'
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 w-full max-w-md shadow-2xl border-2 border-slate-700 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {title}
          </h2>
        </div>
        
        {/* Message */}
        <div className="mb-8">
          <p className="text-white text-base leading-relaxed">
            {message}
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className={`flex-1 px-6 py-3 bg-gradient-to-r ${colorClasses[confirmColor]} text-white rounded-lg font-bold transition-all shadow-lg transform hover:scale-105 active:scale-95 border-2`}
          >
            {confirmText}
          </button>
          
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold transition-all shadow-lg transform hover:scale-105 active:scale-95 border-2 border-slate-500"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal;