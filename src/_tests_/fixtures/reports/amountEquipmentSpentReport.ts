import {
  AmountEquipmentSpentReportDTO,
  AmountEquipmentSpentReportItemDTO,
} from 'features/reports/api/dto'
import pick from 'lodash/pick'
import times from 'lodash/times'

import { fakeId, fakeInteger } from '_tests_/utils'

import warehouseFixtures from '../warehouse'

export const amountEquipmentSpentReportListItem = (): AmountEquipmentSpentReportItemDTO => ({
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

export const amountEquipmentSpentReport = (length: number = 1): AmountEquipmentSpentReportDTO =>
  times(length, () => amountEquipmentSpentReportListItem())
