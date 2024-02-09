import { EquipmentModel, RelocationTaskModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type EmployeesActionsReportListItemModel = {
  id: IdType
  equipment: Pick<EquipmentModel, 'id' | 'title' | 'serialNumber' | 'inventoryNumber'>
  relocationTask: Pick<
    RelocationTaskModel,
    'id' | 'createdAt' | 'relocateFrom' | 'relocateTo' | 'status'
  >
  quantity: number
  roles: string[]
}

export type EmployeesActionsReportModel = EmployeesActionsReportListItemModel[]
