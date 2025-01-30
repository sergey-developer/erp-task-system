import { TableProps } from 'antd'

import { EmployeesActionsReportListItemModel } from 'features/reports/models'

import { IdType } from 'shared/types/common'

export type EmployeesActionsReportTableItem = Pick<
  EmployeesActionsReportListItemModel,
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
