const getStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      return window.localStorage
    } catch {
      // If localStorage is disabled, ignore the exception caused by reading it
    }
  }
  return {
    getItem: () => {},
    setItem: () => {},
    removeItem: () => {},
  }
}

const storage = getStorage()

export const getStoredValue = (key: string): string | void | null => {
  try {
    return storage.getItem(key)
  } catch (e) {
    // Ignore invalid JSON from localStorage
  }
}
