import { useState, useCallback } from 'react'

const STORAGE_KEY = 'cyberaware-progress'

function getStoredProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(getStoredProgress)

  const updateModuleProgress = useCallback((moduleId, score, total) => {
    setProgress(prev => {
      const next = {
        ...prev,
        [moduleId]: {
          score,
          total,
          percentage: Math.round((score / total) * 100),
          completedAt: new Date().toISOString()
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const getModuleProgress = useCallback((moduleId) => {
    return progress[moduleId] || null
  }, [progress])

  const getOverallProgress = useCallback(() => {
    const moduleIds = Object.keys(progress)
    if (moduleIds.length === 0) return 0
    const total = moduleIds.reduce((sum, id) => sum + progress[id].percentage, 0)
    return Math.round(total / 8)
  }, [progress])

  const getCompletedCount = useCallback(() => {
    return Object.keys(progress).length
  }, [progress])

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setProgress({})
  }, [])

  return {
    progress,
    updateModuleProgress,
    getModuleProgress,
    getOverallProgress,
    getCompletedCount,
    resetProgress
  }
}
