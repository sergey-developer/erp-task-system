import { TableProps } from 'antd'

import { HistoryNomenclatureOperationsReportListItemModel } from 'features/reports/models'

import { IdType } from 'shared/types/common'

export type HistoryNomenclatureOperationsReportTableItem = Pick<
  HistoryNomenclatureOperationsReportListItemModel,
  | 'id'
  | 'title'
  | 'serialNumber'
  | 'inventoryNumber'
  | 'condition'
  | 'isNew'
  | 'isWarranty'
  | 'isRepaired'
  | 'creditedAt'
  | 'lastRelocationTask'
  | 'location'
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
