import { UserModel, UserPositionModel } from 'features/user/api/dto'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { InfrastructureStatusHistoryItemDTO } from './infrastructureStatusHistory.dto'

export type InfrastructureDTO = {
  id: IdType

  manager: MaybeNull<
    Pick<
      UserModel,
      'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email' | 'avatar'
    > & {
      position: MaybeNull<UserPositionModel['title']>
    }
  >
  status: MaybeNull<InfrastructureStatusHistoryItemDTO>
}
