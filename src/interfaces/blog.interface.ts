export interface IBlog {
  id: string // added identifier
  tags: string[]
  content: string
  published_date: string
  status: 'published' | 'draft'
  title: string
  filepath: string // added filepath
}
