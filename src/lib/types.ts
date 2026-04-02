export interface NewsItem {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  image?: string
  author?: string
}

export interface DepartmentData {
  slug: string
  name: string
  head: string
  headTitle: string
  curator?: string
  sourceUrl: string
}

export interface ProgramItem {
  code: string
  title: string
  qualification?: string
  budget: number
  paid: number
  tracks?: number
  image: string
  href: string
  accent?: boolean
  english?: boolean
}

export interface TrackItem {
  slug: string
  title: string
  href: string
  image: string
  head: string
  headTitle: string
  curator?: string
}

export interface PartnerItem {
  name: string
  file: string
  url: string
}

export interface NavItem {
  label: string
  href: string
  external?: boolean
}

export interface StatItem {
  value: string
  label: string
}
