import { BaseUserModel } from 'modules/user/models'

export type CommentAuthorModel = Omit<BaseUserModel, 'id' | 'avatar'> & {
  id: number
}
