import { EmployeesActionsReportDTO, EmployeesActionsReportItemDTO } from 'features/reports/api/dto'
import pick from 'lodash/pick'
import times from 'lodash/times'

import { fakeId, fakeInteger, fakeWord } from '_tests_/helpers'

import equipmentsFixtures from '../equipments'
import warehousesFixtures from '../warehouse'

export const employeesActionsReportItem = (): EmployeesActionsReportItemDTO => ({
  id: fakeId(),
  quantity: fakeInteger(),
  roles: [fakeWord()],
  equipment: pick(
    equipmentsFixtures.equipmentDetail(),
    'id',
    'inventoryNumber',
    'title',
    'serialNumber',
  ),
  relocationTask: pick(
    warehousesFixtures.relocationTask(),
    'id',
    'createdAt',
    'relocateFrom',
    'relocateTo',
    'status',
  ),
})

export const employeesActionsReport = (length: number = 1): EmployeesActionsReportDTO =>
  times(length, () => employeesActionsReportItem())
