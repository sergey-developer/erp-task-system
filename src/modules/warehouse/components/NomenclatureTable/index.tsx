import { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { getColumns } from './columns'
import { NomenclatureTableItem, NomenclatureTableProps } from './types'

const NomenclatureTable: FC<NomenclatureTableProps> = ({
  onClickName,
  ...props
}) => {
  const columns = useMemo(() => getColumns({ onClickName }), [onClickName])

  return (
    <div data-testid='nomenclature-table'>
      <ParentSizedTable<NomenclatureTableItem>
        {...props}
        rowKey='id'
        columns={columns}
        showSorterTooltip={false}
      />
    </div>
  )
}

export default NomenclatureTable
