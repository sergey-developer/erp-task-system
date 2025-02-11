import { UserDetailDTO, UserPositionDTO } from 'features/users/api/dto'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { InfrastructureStatusHistoryItemDTO } from './infrastructureStatusHistory.dto'

export type InfrastructureDTO = {
  id: IdType

  manager: MaybeNull<
    Pick<
      UserDetailDTO,
      'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email' | 'avatar'
    > & {
      position: MaybeNull<UserPositionDTO['title']>
    }
  >
  status: MaybeNull<InfrastructureStatusHistoryItemDTO>
}
