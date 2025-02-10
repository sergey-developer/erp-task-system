import { UserModel, UserPositionModel } from 'features/user/api/dto'

import { MaybeNull } from 'shared/types/utils'

export type TaskAssigneeModel = Pick<
  UserModel,
  'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email' | 'avatar'
> & {
  position: MaybeNull<UserPositionModel['title']>
}
