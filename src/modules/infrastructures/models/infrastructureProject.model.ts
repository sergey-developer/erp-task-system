import { UserModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type InfrastructureProjectModel = {
  id: IdType

  manager: MaybeNull<
    Pick<
      UserModel,
      'id' | 'firstName' | 'lastName' | 'middleName' | 'phone' | 'email' | 'position' | 'avatar'
    >
  >
}
