import { UserModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TechnicalExaminationListItemModel = {
  id: IdType
  createdAt: string
  malfunction: string
  hasMechanicalDamage: boolean
  restorationAction: string
  restorationCost: number
  conclusion: MaybeNull<string>
  createdBy: MaybeNull<Pick<UserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>>
}

export type TechnicalExaminationsModel = TechnicalExaminationListItemModel[]
