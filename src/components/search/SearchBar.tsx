'use client'

import { Search } from 'lucide-react'

import { useSearchContext } from './SearchContext'

interface SearchBarProps {
  onOpen?: () => void
  placeholder?: string
  className?: string
}

export default function SearchBar({ onOpen, placeholder = 'Поиск...', className = '' }: SearchBarProps) {
  const { setIsOpen } = useSearchContext()

  const handleOpen = () => {
    setIsOpen(true)
    onOpen?.()
  }

  return (
    <button
      type="button"
      onClick={handleOpen}
      onFocus={handleOpen}
      aria-label="Открыть поиск"
      className={`relative flex items-center h-10 w-full border border-border-col bg-bg-section text-text-secondary hover:border-text-secondary transition-colors rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      <Search
        size={16}
        className="absolute left-3 text-text-secondary pointer-events-none"
        aria-hidden="true"
      />
      <span className="pl-10 pr-4 text-sm font-body text-text-muted">{placeholder}</span>
    </button>
  )
}
