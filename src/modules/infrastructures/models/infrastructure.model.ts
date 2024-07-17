import { UserModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { InfrastructureStatusHistoryModel } from './infrastructureStatusHistory.model'

export type InfrastructureModel = {
  id: IdType

  manager: MaybeNull<
    Pick<
      UserModel,
      'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email' | 'position' | 'avatar'
    >
  >
  status: MaybeNull<InfrastructureStatusHistoryModel>
}
