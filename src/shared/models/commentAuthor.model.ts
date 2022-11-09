import { UserModel } from 'modules/user/models'

export type CommentAuthorModel = Omit<UserModel, 'avatar'>
