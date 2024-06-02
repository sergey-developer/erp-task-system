import { EditableProTable } from '@ant-design/pro-components'
import { FC, useMemo } from 'react'

import { getColumns } from './columns'
import { TableWrapperStyled } from './styles'
import { InventorizationEquipmentTableItem, ReviseEquipmentTableProps } from './types'

const ReviseEquipmentTable: FC<ReviseEquipmentTableProps> = ({
  dataSource,
  locations,
  locationsIsLoading,
  ...props
}) => {
  const editableKeys = useMemo(() => dataSource.map((item) => item.id), [dataSource])

  const columns = useMemo(
    () => getColumns({ locations, locationsIsLoading }),
    [locations, locationsIsLoading],
  )

  return (
    <TableWrapperStyled>
      <EditableProTable<InventorizationEquipmentTableItem>
        data-testid='revise-equipment-table'
        rowKey='id'
        columns={columns}
        ghost
        value={dataSource}
        recordCreatorProps={false}
        editable={{ type: 'multiple', editableKeys }}
        {...props}
      />
    </TableWrapperStyled>
  )
}

export default ReviseEquipmentTable
