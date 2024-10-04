import { UserModel, UserPositionModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { InfrastructureStatusHistoryItemModel } from './infrastructureStatusHistory.model'

export type InfrastructureModel = {
  id: IdType

  manager: MaybeNull<
    Pick<
      UserModel,
      'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email' | 'avatar'
    > & {
      position: MaybeNull<UserPositionModel['title']>
    }
  >
  status: MaybeNull<InfrastructureStatusHistoryItemModel>
}
