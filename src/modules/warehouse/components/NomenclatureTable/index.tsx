import { FC } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'

import { columns } from './columns'
import { NomenclatureTableItem, NomenclatureTableProps } from './types'

const NomenclatureTable: FC<NomenclatureTableProps> = (props) => {
  return (
    <div data-testid='nomenclature-table'>
      <ParentSizedTable<NomenclatureTableItem>
        {...props}
        rowKey='id'
        columns={columns}
        pagination={false}
        showSorterTooltip={false}
      />
    </div>
  )
}

export default NomenclatureTable
