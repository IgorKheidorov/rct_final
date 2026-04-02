'use client'

import { useState, useMemo } from 'react'

const DEPARTMENTS = [
  'Все кафедры',
  'Радиофизики и цифровых медиа технологий',
  'Квантовой радиофизики и оптоэлектроники',
  'Физической электроники и нанотехнологий',
  'Информатики и компьютерных систем',
  'Интеллектуальных систем',
  'Телекоммуникаций и информационных технологий',
  'Системного анализа и компьютерного моделирования',
  'Физики и аэрокосмических технологий',
]

interface StaffFilterProps {
  children: React.ReactNode
}

export default function StaffFilter({ children }: StaffFilterProps) {
  const [query, setQuery] = useState('')
  const [dept, setDept] = useState('Все кафедры')

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <input
          type="search"
          placeholder="Поиск по имени..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 h-10 bg-bg-section border border-border-col text-text-primary font-body text-sm px-4 placeholder:text-text-muted focus:outline-none focus:border-accent"
        />
        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="h-10 bg-bg-section border border-border-col text-text-secondary font-body text-sm px-4 focus:outline-none focus:border-accent"
        >
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      {children}
    </div>
  )
}
