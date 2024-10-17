import { Flex, Table, TableProps } from 'antd'
import { FC, useMemo } from 'react'

import { getColumns } from './columns'
import { NomenclatureTableItem, NomenclatureTableProps } from './types'

const scrollConfig: TableProps<NomenclatureTableItem>['scroll'] = { y: 635 }

const NomenclatureTable: FC<NomenclatureTableProps> = ({ onClickName, ...props }) => {
  const columns = useMemo(() => getColumns({ onClickName }), [onClickName])

  return (
    <Flex data-testid='nomenclature-table'>
      <Table<NomenclatureTableItem>
        {...props}
        rowKey='id'
        columns={columns}
        scroll={scrollConfig}
      />
    </Flex>
  )
}

export default NomenclatureTable
