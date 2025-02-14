import { IdType } from 'shared/types/common'

import { EquipmentDetailDTO } from '../dto'
import { EquipmentRequestArgs } from '../types'

export type GetEquipmentRequest = EquipmentRequestArgs &
  Partial<{
    ignoreRelocationTask: IdType
  }>

export type GetEquipmentResponse = EquipmentDetailDTO
