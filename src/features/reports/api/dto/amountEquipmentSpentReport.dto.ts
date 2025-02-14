import { EquipmentDetailDTO, RelocationTaskModel } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'

export type AmountEquipmentSpentReportItemDTO = {
  id: IdType
  equipment: Pick<EquipmentDetailDTO, 'id' | 'title'>
  relocationTask: Pick<
    RelocationTaskModel,
    'id' | 'createdAt' | 'relocateFrom' | 'relocateTo' | 'status'
  >
  quantity: number
}

export type AmountEquipmentSpentReportDTO = AmountEquipmentSpentReportItemDTO[]
