import { UserDetailDTO, UserPositionDTO } from 'features/users/api/dto'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TaskWorkGroupDTO = {
  id: IdType
  name: string
  groupLead: Pick<
    UserDetailDTO,
    'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email'
  > & {
    position: MaybeNull<UserPositionDTO['title']>
  }
  seniorEngineer: Pick<
    UserDetailDTO,
    'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email'
  > & {
    position: MaybeNull<UserPositionDTO['title']>
  }
  members: Pick<UserDetailDTO, 'id' | 'firstName' | 'lastName' | 'middleName'>[]
}
