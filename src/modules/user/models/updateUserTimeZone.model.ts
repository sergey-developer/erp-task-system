import { UserModel } from './user.model'

export type UpdateUserTimeZoneMutationArgs = {
  userId: number
} & Pick<UserModel, 'timezone'>

export type UpdateUserTimeZoneSuccessResponse = UserModel
