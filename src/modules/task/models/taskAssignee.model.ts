import { UserModel } from 'modules/user/models'

export type TaskAssigneeModel = Omit<UserModel, 'avatar'>
