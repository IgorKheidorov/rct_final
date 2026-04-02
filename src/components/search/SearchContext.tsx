'use client'

import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface SearchContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const SearchContext = createContext<SearchContextType | null>(null)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SearchContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchContext(): SearchContextType {
  const ctx = useContext(SearchContext)
  if (!ctx) {
    throw new Error('useSearchContext must be used within SearchProvider')
  }
  return ctx
}
