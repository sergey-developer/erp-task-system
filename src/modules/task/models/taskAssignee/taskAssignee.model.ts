import { UserModel, UserPositionModel } from 'modules/user/models'

import { MaybeNull } from 'shared/types/utils'

export type TaskAssigneeModel = Pick<
  UserModel,
  'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email' | 'avatar'
> & {
  position: MaybeNull<UserPositionModel['title']>
}
