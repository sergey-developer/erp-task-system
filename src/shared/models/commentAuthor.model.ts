import { BaseUserModel } from 'modules/user/models'

export type CommentAuthorModel = Omit<BaseUserModel, 'avatar'>
