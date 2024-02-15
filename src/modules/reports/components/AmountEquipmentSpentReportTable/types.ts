import { TableProps } from 'antd'

import { AmountEquipmentSpentReportListItemModel } from 'modules/reports/models'

import { IdType } from 'shared/types/common'

export type AmountEquipmentSpentReportTableItem = Pick<
  AmountEquipmentSpentReportListItemModel,
  'id' | 'equipment' | 'relocationTask' | 'quantity'
>

export type AmountEquipmentSpentReportTableProps = Required<
  Pick<
    TableProps<AmountEquipmentSpentReportTableItem>,
    'dataSource' | 'loading' | 'onChange' | 'pagination'
  >
> & {
  onClickEquipment: (id: IdType) => void
  onClickRelocationTask: (id: IdType) => void
}
