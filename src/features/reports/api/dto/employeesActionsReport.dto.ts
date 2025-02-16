import { EquipmentDetailDTO } from 'features/equipments/api/dto'
import { RelocationTaskDetailDTO } from 'features/relocationTasks/api/dto'

import { IdType } from 'shared/types/common'

export type EmployeesActionsReportItemDTO = {
  id: IdType
  equipment: Pick<EquipmentDetailDTO, 'id' | 'title' | 'serialNumber' | 'inventoryNumber'>
  relocationTask: Pick<
    RelocationTaskDetailDTO,
    'id' | 'createdAt' | 'relocateFrom' | 'relocateTo' | 'status'
  >
  quantity: number
  roles: string[]
}

export type EmployeesActionsReportDTO = EmployeesActionsReportItemDTO[]
