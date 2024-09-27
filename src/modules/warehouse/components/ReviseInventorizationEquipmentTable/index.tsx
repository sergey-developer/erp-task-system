import { EditableProTable } from '@ant-design/pro-components'
import { DefaultOptionType } from 'rc-select/lib/Select'
import { FC, useMemo } from 'react'

import { undefinedSelectOption } from 'shared/constants/selectField'

import { getColumns } from './columns'
import { TableWrapperStyled } from './styles'
import {
  ReviseInventorizationEquipmentTableItem,
  ReviseInventorizationEquipmentTableProps,
} from './types'

const ReviseInventorizationEquipmentTable: FC<ReviseInventorizationEquipmentTableProps> = ({
  dataSource,

  locations,
  locationsIsLoading,

  onChangeQuantityFact,
  onChangeLocationFact,

  ...props
}) => {
  const editableKeys = useMemo(() => dataSource.map((item) => item.id), [dataSource])

  const locationOptions = useMemo<DefaultOptionType[]>(
    () => [undefinedSelectOption, ...locations.map((loc) => ({ label: loc.title, value: loc.id }))],
    [locations],
  )

  const columns = useMemo(
    () =>
      getColumns({
        locationOptions,
        locationsIsLoading,
        onChangeQuantityFact,
        onChangeLocationFact,
      }),
    [locationOptions, locationsIsLoading, onChangeLocationFact, onChangeQuantityFact],
  )

  return (
    <TableWrapperStyled data-testid='revise-equipment-table'>
      <EditableProTable<ReviseInventorizationEquipmentTableItem>
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

export default ReviseInventorizationEquipmentTable
