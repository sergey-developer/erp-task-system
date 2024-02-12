import { TableProps } from 'antd'

import { HistoryNomenclatureOperationsReportListItemModel } from 'modules/reports/models'

import { IdType } from 'shared/types/common'

export type HistoryNomenclatureOperationsReportTableItem = Pick<
  HistoryNomenclatureOperationsReportListItemModel,
  'id' | 'equipment' | 'relocationTask' | 'quantity'
>

export type HistoryNomenclatureOperationsReportTableProps = Required<
  Pick<
    TableProps<HistoryNomenclatureOperationsReportTableItem>,
    'dataSource' | 'loading' | 'onChange' | 'pagination'
  >
> & {
  onClickEquipment: (id: IdType) => void
  onClickRelocationTask: (id: IdType) => void
}
