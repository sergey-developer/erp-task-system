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
    <div data-testid='amount-equipment-spent-report-table'>
      <ParentSizedTable<AmountEquipmentSpentReportTableItem>
        {...props}
        rowKey='id'
        columns={columns}
      />
    </div>
  )
}

export default AmountEquipmentSpentReportTable
