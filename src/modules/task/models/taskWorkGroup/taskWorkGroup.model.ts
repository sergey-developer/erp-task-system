import { UserModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'

export type TaskWorkGroupModel = {
  id: IdType
  name: string
  groupLead: Pick<
    UserModel,
    'id' | 'firstName' | 'lastName' | 'middleName' | 'role' | 'phone' | 'email'
  >
  seniorEngineer: Pick<
    UserModel,
    'id' | 'firstName' | 'lastName' | 'middleName' | 'role' | 'phone' | 'email'
  >
  members: Pick<UserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>[]
}
