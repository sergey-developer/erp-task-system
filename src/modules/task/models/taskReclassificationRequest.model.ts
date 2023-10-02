import { BaseUserModel } from 'modules/user/models'

export type TaskReclassificationRequestModel = {
  id: number
  createdAt: string
  comment: string
  user: Omit<BaseUserModel, 'avatar'>
}
