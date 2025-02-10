import { TableProps } from 'antd'
import { EmployeesActionsReportItemDTO } from 'features/reports/api/dto'

import { IdType } from 'shared/types/common'

export type EmployeesActionsReportTableItem = Pick<
  EmployeesActionsReportItemDTO,
  'id' | 'equipment' | 'relocationTask' | 'roles' | 'quantity'
>

export type EmployeesActionsReportTableProps = Required<
  Pick<
    TableProps<EmployeesActionsReportTableItem>,
    'dataSource' | 'loading' | 'onChange' | 'pagination'
  >
> & {
  onClickEquipment: (id: IdType) => void
  onClickRelocationTask: (id: IdType) => void
}
