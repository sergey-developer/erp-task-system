import pick from 'lodash/pick'
import times from 'lodash/times'

import {
  EmployeesActionsReportListItemModel,
  EmployeesActionsReportModel,
} from 'features/reports/models'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

import warehouseFixtures from '../warehouse'

export const employeesActionsReportListItem = (): EmployeesActionsReportListItemModel => ({
  id: fakeId(),
  quantity: fakeInteger(),
  roles: [fakeWord()],
  equipment: pick(warehouseFixtures.equipment(), 'id', 'inventoryNumber', 'title', 'serialNumber'),
  relocationTask: pick(
    warehouseFixtures.relocationTask(),
    'id',
    'createdAt',
    'relocateFrom',
    'relocateTo',
    'status',
  ),
})

export const employeesActionsReport = (length: number = 1): EmployeesActionsReportModel =>
  times(length, () => employeesActionsReportListItem())
