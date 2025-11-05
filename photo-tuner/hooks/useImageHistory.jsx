'use client'
import { useState, useCallback } from 'react'

const useImageHistory = () => {
  const [history, setHistory] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  
  const saveState = useCallback((state) => {
    setHistory(prev => {
      // Remove any history after current index
      const newHistory = prev.slice(0, currentIndex + 1)
      
      // Add new state
      newHistory.push(state)
      
      // Keep only last 5 states
      if (newHistory.length > 5) {
        newHistory.shift()
        return newHistory
      }
      
      setCurrentIndex(newHistory.length - 1)
      return newHistory
    })
    
    setCurrentIndex(prev => {
      const newIndex = Math.min(prev + 1, 4)
      return newIndex
    })
  }, [currentIndex])
  
  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      return history[currentIndex - 1]
    }
    return null
  }, [currentIndex, history])
  
  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1)
      return history[currentIndex + 1]
    }
    return null
  }, [currentIndex, history])
  
  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1
  
  return {
    saveState,
    undo,
    redo,
    canUndo,
    canRedo
  }
}

export default useImageHistory ;