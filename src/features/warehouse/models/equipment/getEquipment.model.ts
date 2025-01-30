import { EquipmentModel } from 'features/warehouse/models'
import { EquipmentRequestArgs } from 'features/warehouse/types'

import { IdType } from 'shared/types/common'

export type GetEquipmentQueryArgs = EquipmentRequestArgs &
  Partial<{
    ignoreRelocationTask: IdType
  }>

export type GetEquipmentSuccessResponse = EquipmentModel
