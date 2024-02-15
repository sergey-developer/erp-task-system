import { EquipmentModel, RelocationTaskModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type AmountEquipmentSpentReportListItemModel = {
  id: IdType
  equipment: Pick<EquipmentModel, 'id' | 'title'>
  relocationTask: Pick<
    RelocationTaskModel,
    'id' | 'createdAt' | 'relocateFrom' | 'relocateTo' | 'status'
  >
  quantity: number
}

export type AmountEquipmentSpentReportModel = AmountEquipmentSpentReportListItemModel[]
