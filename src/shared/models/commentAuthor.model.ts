import { BaseUserModel } from 'features/user/models'

export type CommentAuthorModel = Omit<BaseUserModel, 'avatar'>
