import { UserDetailDTO } from 'features/users/api/dto'

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
  createdBy: MaybeNull<Pick<UserDetailDTO, 'id' | 'firstName' | 'lastName' | 'middleName'>>
}

export type TechnicalExaminationsModel = TechnicalExaminationListItemModel[]
