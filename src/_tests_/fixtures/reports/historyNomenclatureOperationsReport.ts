import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import {
  HistoryNomenclatureOperationsReportDTO,
  HistoryNomenclatureOperationsReportItemDTO,
} from 'features/reports/api/dto'
import isBoolean from 'lodash/isBoolean'
import pick from 'lodash/pick'
import times from 'lodash/times'

import { fakeDateString, fakeId, fakeIdStr, fakeWord } from '_tests_/helpers'

import catalogsFixtures from '../catalogs'
import relocationTasksFixtures from '../relocationTasks'

export const historyNomenclatureOperationsReportItem = (
  props?: Partial<
    Pick<HistoryNomenclatureOperationsReportItemDTO, 'isNew' | 'isWarranty' | 'isRepaired'>
  >,
): HistoryNomenclatureOperationsReportItemDTO => ({
  isNew: isBoolean(props?.isNew) ? props!.isNew : false,
  isRepaired: isBoolean(props?.isRepaired) ? props!.isRepaired : false,
  isWarranty: isBoolean(props?.isWarranty) ? props!.isWarranty : false,

  id: fakeId(),
  title: fakeWord(),
  condition: EquipmentConditionEnum.Working,
  lastRelocationTask: pick(
    relocationTasksFixtures.relocationTaskDetail(),
    'id',
    'createdAt',
    'status',
  ),
  creditedAt: fakeDateString(),
  serialNumber: fakeIdStr(),
  inventoryNumber: fakeIdStr(),
  location: pick(catalogsFixtures.locationCatalogItem(), 'id', 'title'),
})

export const historyNomenclatureOperationsReport = (
  length: number = 1,
): HistoryNomenclatureOperationsReportDTO =>
  times(length, () => historyNomenclatureOperationsReportItem())
