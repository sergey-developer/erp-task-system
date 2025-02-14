import { IdType } from 'shared/types/common'

import { EquipmentDetailDTO } from '../dto'
import { RequestWithEquipment } from '../types'

export type GetEquipmentRequest = RequestWithEquipment &
  Partial<{
    ignoreRelocationTask: IdType
  }>

export type GetEquipmentResponse = EquipmentDetailDTO
