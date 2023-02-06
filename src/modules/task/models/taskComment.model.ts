import { CommentAuthorModel } from 'shared/models'

export type TaskCommentModel = {
  id: number
  text: string
  author: CommentAuthorModel
  createdAt: string
}
