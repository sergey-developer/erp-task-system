import { FC } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { EmployeesActionsReportTableItem, EmployeesActionsReportTableProps } from './types'

const EmployeesActionsReportTable: FC<EmployeesActionsReportTableProps> = (props) => {
  return (
    <div data-testid='employees-actions-report-table'>
      <ParentSizedTable<EmployeesActionsReportTableItem> {...props} rowKey='id' columns={columns} />
    </div>
  )
}

export default EmployeesActionsReportTable
