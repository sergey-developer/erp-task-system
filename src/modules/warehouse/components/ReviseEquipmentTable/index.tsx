import { EditableProTable } from '@ant-design/pro-components'
import { FC, useMemo } from 'react'

import { getColumns } from './columns'
import { TableWrapperStyled } from './styles'
import { ReviseEquipmentTableItem, ReviseEquipmentTableProps } from './types'

const ReviseEquipmentTable: FC<ReviseEquipmentTableProps> = ({
  dataSource,

  locations,
  locationsIsLoading,

  onChangeQuantityFact,
  onChangeLocationFact,

  ...props
}) => {
  const editableKeys = useMemo(() => dataSource.map((item) => item.id), [dataSource])

  const columns = useMemo(
    () => getColumns({ locations, locationsIsLoading, onChangeQuantityFact, onChangeLocationFact }),
    [locations, locationsIsLoading, onChangeLocationFact, onChangeQuantityFact],
  )

  return (
    <TableWrapperStyled data-testid='revise-equipment-table'>
      <EditableProTable<ReviseEquipmentTableItem>
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
