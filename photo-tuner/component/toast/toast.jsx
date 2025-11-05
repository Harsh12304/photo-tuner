'use client';
import React from 'react'

const Toast = ({ message, show }) => {
  if (!show) return null
  
  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-slate-900 text-white px-6 py-3 rounded-lg shadow-2xl border-2 border-slate-700">
        <p className="font-medium">{message}</p>
      </div>
    </div>
  )
}

export default Toast;