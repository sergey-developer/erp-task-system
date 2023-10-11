import { EquipmentModel } from 'modules/warehouse/models'
import { BaseEquipmentRequestArgs } from 'modules/warehouse/types'

import { IdType } from 'shared/types/common'

export type GetEquipmentQueryArgs = BaseEquipmentRequestArgs &
  Partial<{
    ignoreRelocationTask: IdType
  }>

export type GetEquipmentSuccessResponse = EquipmentModel
