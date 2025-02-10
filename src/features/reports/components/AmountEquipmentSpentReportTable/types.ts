import { TableProps } from 'antd'
import { AmountEquipmentSpentReportItemDTO } from 'features/reports/api/dto'

import { IdType } from 'shared/types/common'

export type AmountEquipmentSpentReportTableItem = Pick<
  AmountEquipmentSpentReportItemDTO,
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
