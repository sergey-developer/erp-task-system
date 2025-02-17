import { Flex } from 'antd'
import { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { getColumns } from './columns'
import { AmountEquipmentSpentReportTableItem, AmountEquipmentSpentReportTableProps } from './types'

const AmountEquipmentSpentReportTable: FC<AmountEquipmentSpentReportTableProps> = ({
  onClickEquipment,
  onClickRelocationTask,
  ...props
}) => {
  const columns = useMemo(
    () => getColumns({ onClickEquipment, onClickRelocationTask }),
    [onClickEquipment, onClickRelocationTask],
  )

  return (
    <Flex data-testid='amount-equipmentDetail-spent-report-table'>
      <ParentSizedTable<AmountEquipmentSpentReportTableItem>
        {...props}
        rowKey='id'
        columns={columns}
      />
    </Flex>
  )
}

export default AmountEquipmentSpentReportTable
