import { UserDetailDTO, UserPositionDTO } from 'features/users/api/dto'

import { MaybeNull } from 'shared/types/utils'

export type TaskAssigneeDTO = Pick<
  UserDetailDTO,
  'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email' | 'avatar'
> & {
  position: MaybeNull<UserPositionDTO['title']>
}
