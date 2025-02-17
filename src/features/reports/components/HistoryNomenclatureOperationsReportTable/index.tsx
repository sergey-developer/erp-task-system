import { Flex } from 'antd'
import { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { getColumns } from './columns'
import {
  HistoryNomenclatureOperationsReportTableItem,
  HistoryNomenclatureOperationsReportTableProps,
} from './types'

const HistoryNomenclatureOperationsReportTable: FC<
  HistoryNomenclatureOperationsReportTableProps
> = ({ onClickEquipment, onClickRelocationTask, ...props }) => {
  const columns = useMemo(
    () => getColumns({ onClickEquipment, onClickRelocationTask }),
    [onClickEquipment, onClickRelocationTask],
  )

  return (
    <Flex data-testid='history-nomenclatureDetail-operations-report-table'>
      <ParentSizedTable<HistoryNomenclatureOperationsReportTableItem>
        {...props}
        rowKey='id'
        columns={columns}
      />
    </Flex>
  )
}

export default HistoryNomenclatureOperationsReportTable
