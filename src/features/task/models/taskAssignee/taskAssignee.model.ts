import { UserModel, UserPositionModel } from 'features/user/models'

import { MaybeNull } from 'shared/types/utils'

export type TaskAssigneeModel = Pick<
  UserModel,
  'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email' | 'avatar'
> & {
  position: MaybeNull<UserPositionModel['title']>
}
