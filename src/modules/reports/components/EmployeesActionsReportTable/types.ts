import { TableProps } from 'antd'

import { EmployeesActionsReportListItemModel } from 'modules/reports/models'

export type EmployeesActionsReportTableItem = Pick<
  EmployeesActionsReportListItemModel,
  'id' | 'equipment' | 'relocationTask' | 'roles' | 'quantity'
>

export type EmployeesActionsReportTableProps = Required<
  Pick<
    TableProps<EmployeesActionsReportTableItem>,
    'dataSource' | 'loading' | 'onChange' | 'pagination'
  >
>
