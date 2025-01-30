import pick from 'lodash/pick'
import times from 'lodash/times'

import {
  AmountEquipmentSpentReportListItemModel,
  AmountEquipmentSpentReportModel,
} from 'features/reports/models'

import { fakeId, fakeInteger } from '_tests_/utils'

import warehouseFixtures from '../warehouse'

export const amountEquipmentSpentReportListItem = (): AmountEquipmentSpentReportListItemModel => ({
  id: fakeId(),
  quantity: fakeInteger(),
  equipment: pick(warehouseFixtures.equipment(), 'id', 'title'),
  relocationTask: pick(
    warehouseFixtures.relocationTask(),
    'id',
    'createdAt',
    'relocateFrom',
    'relocateTo',
    'status',
  ),
})

export const amountEquipmentSpentReport = (length: number = 1): AmountEquipmentSpentReportModel =>
  times(length, () => amountEquipmentSpentReportListItem())
