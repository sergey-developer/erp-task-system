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
    <div data-testid='history-nomenclature-operations-report-table'>
      <ParentSizedTable<HistoryNomenclatureOperationsReportTableItem>
        {...props}
        rowKey='id'
        columns={columns}
      />
    </div>
  )
}

export default HistoryNomenclatureOperationsReportTable
