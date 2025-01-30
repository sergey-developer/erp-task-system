import isBoolean from 'lodash/isBoolean'
import pick from 'lodash/pick'
import times from 'lodash/times'

import {
  HistoryNomenclatureOperationsReportListItemModel,
  HistoryNomenclatureOperationsReportModel,
} from 'features/reports/models'
import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'

import { fakeDateString, fakeId, fakeIdStr, fakeWord } from '_tests_/utils'

import catalogsFixtures from '../catalogs'
import warehouseFixtures from '../warehouse'

export const historyNomenclatureOperationsReportListItem = (
  props?: Partial<
    Pick<HistoryNomenclatureOperationsReportListItemModel, 'isNew' | 'isWarranty' | 'isRepaired'>
  >,
): HistoryNomenclatureOperationsReportListItemModel => ({
  isNew: isBoolean(props?.isNew) ? props!.isNew : false,
  isRepaired: isBoolean(props?.isRepaired) ? props!.isRepaired : false,
  isWarranty: isBoolean(props?.isWarranty) ? props!.isWarranty : false,

  id: fakeId(),
  title: fakeWord(),
  condition: EquipmentConditionEnum.Working,
  lastRelocationTask: pick(warehouseFixtures.relocationTask(), 'id', 'createdAt', 'status'),
  creditedAt: fakeDateString(),
  serialNumber: fakeIdStr(),
  inventoryNumber: fakeIdStr(),
  location: pick(catalogsFixtures.locationCatalogListItem(), 'id', 'title'),
})

export const historyNomenclatureOperationsReport = (
  length: number = 1,
): HistoryNomenclatureOperationsReportModel =>
  times(length, () => historyNomenclatureOperationsReportListItem())
