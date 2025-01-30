import { Flex } from 'antd'
import { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { getColumns } from './columns'
import { EmployeesActionsReportTableItem, EmployeesActionsReportTableProps } from './types'

const EmployeesActionsReportTable: FC<EmployeesActionsReportTableProps> = ({
  onClickEquipment,
  onClickRelocationTask,
  ...props
}) => {
  const columns = useMemo(
    () => getColumns({ onClickEquipment, onClickRelocationTask }),
    [onClickEquipment, onClickRelocationTask],
  )

  return (
    <Flex data-testid='employees-actions-report-table'>
      <ParentSizedTable<EmployeesActionsReportTableItem> {...props} rowKey='id' columns={columns} />
    </Flex>
  )
}

export default EmployeesActionsReportTable
