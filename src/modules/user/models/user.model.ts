import { BaseUserModel } from './baseUser.model'

export type UserModel = BaseUserModel & {
  avatar?: string
}
