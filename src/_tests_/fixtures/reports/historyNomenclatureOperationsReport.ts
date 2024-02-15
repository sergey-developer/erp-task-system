import pick from 'lodash/pick'
import times from 'lodash/times'

import {
  HistoryNomenclatureOperationsReportListItemModel,
  HistoryNomenclatureOperationsReportModel,
} from 'modules/reports/models'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'

import { fakeDateString, fakeId, fakeIdStr, fakeWord } from '_tests_/utils'

import catalogsFixtures from '../catalogs'
import warehouseFixtures from '../warehouse'

export const historyNomenclatureOperationsReportListItem =
  (): HistoryNomenclatureOperationsReportListItemModel => ({
    id: fakeId(),
    title: fakeWord(),
    condition: EquipmentConditionEnum.Working,
    isNew: false,
    isRepaired: false,
    isWarranty: false,
    lastRelocationTask: pick(warehouseFixtures.relocationTask(), 'id', 'createdAt', 'status'),
    creditedAt: fakeDateString(),
    serialNumber: fakeIdStr(),
    inventoryNumber: fakeIdStr(),
    location: pick(catalogsFixtures.location(), 'id', 'title'),
  })

export const historyNomenclatureOperationsReport = (
  length: number = 1,
): HistoryNomenclatureOperationsReportModel =>
  times(length, () => historyNomenclatureOperationsReportListItem())
