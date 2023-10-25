import { UserModel } from 'modules/user/models'

export type TaskAssigneeModel = Pick<
  UserModel,
  'id' | 'firstName' | 'lastName' | 'middleName' | 'role' | 'phone' | 'email' | 'avatar'
>
