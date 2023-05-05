import { UserModel } from './user.model'

export type UpdateUserMutationArgs = {
  userId: number
} & Partial<Pick<UserModel, 'timezone'>>

export type UpdateUserSuccessResponse = UserModel
