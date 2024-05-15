import { EquipmentModel } from 'modules/warehouse/models'
import { EquipmentRequestArgs } from 'modules/warehouse/types'

import { IdType } from 'shared/types/common'

export type GetEquipmentQueryArgs = EquipmentRequestArgs &
  Partial<{
    ignoreRelocationTask: IdType
  }>

export type GetEquipmentSuccessResponse = EquipmentModel
