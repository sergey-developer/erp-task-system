import { BaseUserModel } from 'modules/user/models'

export type TaskAssigneeModel = Pick<
  BaseUserModel,
  'id' | 'firstName' | 'lastName' | 'middleName' | 'avatar'
>
