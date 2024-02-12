import pick from 'lodash/pick'
import times from 'lodash/times'

import {
  HistoryNomenclatureOperationsReportListItemModel,
  HistoryNomenclatureOperationsReportModel,
} from 'modules/reports/models'

import { fakeId, fakeInteger } from '_tests_/utils'

import warehouseFixtures from '../warehouse'

export const historyNomenclatureOperationsReportListItem =
  (): HistoryNomenclatureOperationsReportListItemModel => ({
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

export const historyNomenclatureOperationsReport = (
  length: number = 1,
): HistoryNomenclatureOperationsReportModel =>
  times(length, () => historyNomenclatureOperationsReportListItem())
