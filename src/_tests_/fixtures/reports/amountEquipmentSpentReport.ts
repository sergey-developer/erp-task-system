import {
  AmountEquipmentSpentReportDTO,
  AmountEquipmentSpentReportItemDTO,
} from 'features/reports/api/dto'
import pick from 'lodash/pick'
import times from 'lodash/times'

import { fakeId, fakeInteger } from '_tests_/helpers'

import equipmentsFixtures from '../equipments'
import warehousesFixtures from '../warehouse'

export const amountEquipmentSpentReportItem = (): AmountEquipmentSpentReportItemDTO => ({
  id: fakeId(),
  quantity: fakeInteger(),
  equipment: pick(equipmentsFixtures.equipmentDetail(), 'id', 'title'),
  relocationTask: pick(
    warehousesFixtures.relocationTask(),
    'id',
    'createdAt',
    'relocateFrom',
    'relocateTo',
    'status',
  ),
})

export const amountEquipmentSpentReport = (length: number = 1): AmountEquipmentSpentReportDTO =>
  times(length, () => amountEquipmentSpentReportItem())
