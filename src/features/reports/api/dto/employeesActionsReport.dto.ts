import { EquipmentDetailDTO, RelocationTaskModel } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'

export type EmployeesActionsReportItemDTO = {
  id: IdType
  equipment: Pick<EquipmentDetailDTO, 'id' | 'title' | 'serialNumber' | 'inventoryNumber'>
  relocationTask: Pick<
    RelocationTaskModel,
    'id' | 'createdAt' | 'relocateFrom' | 'relocateTo' | 'status'
  >
  quantity: number
  roles: string[]
}

export type EmployeesActionsReportDTO = EmployeesActionsReportItemDTO[]
