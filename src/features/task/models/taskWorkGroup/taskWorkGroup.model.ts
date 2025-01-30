import { UserModel, UserPositionModel } from 'features/user/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TaskWorkGroupModel = {
  id: IdType
  name: string
  groupLead: Pick<UserModel, 'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email'> & {
    position: MaybeNull<UserPositionModel['title']>
  }
  seniorEngineer: Pick<
    UserModel,
    'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email'
  > & {
    position: MaybeNull<UserPositionModel['title']>
  }
  members: Pick<UserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>[]
}
