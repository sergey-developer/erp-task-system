import { Flex, Table } from 'antd'
import { FC } from 'react'

import { getColumns } from './columns'
import { RelocationEquipmentTableItem, RelocationEquipmentTableProps } from './types'

const RelocationEquipmentTable: FC<RelocationEquipmentTableProps> = ({
  onClickImages,
  ...props
}) => {
  return (
    <Flex data-testid='relocation-equipment-table'>
      <Table<RelocationEquipmentTableItem>
        {...props}
        rowKey='id'
        columns={getColumns({ onClickImages })}
      />
    </Flex>
  )
}

export default RelocationEquipmentTable
