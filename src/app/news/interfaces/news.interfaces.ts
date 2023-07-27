export interface Article {
  id: number
  category: string
  title: string
  body: string
  date: string
  userId: number
}

export interface Comment {
  postId: number
  id: number
  body: string
  date: string
  userId: number
}
