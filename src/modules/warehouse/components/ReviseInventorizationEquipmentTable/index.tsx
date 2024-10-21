import { EditableProTable } from '@ant-design/pro-components'
import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'
import { Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { DefaultOptionType } from 'rc-select/lib/Select'
import { FC, useEffect, useMemo } from 'react'

import { env } from 'configs/env'

import { undefinedSelectOption } from 'shared/constants/selectField'

import { getColumns, tableName } from './columns'
import { TableWrapperStyled } from './styles'
import {
  ReviseInventorizationEquipmentTableItem,
  ReviseInventorizationEquipmentTableProps,
} from './types'

const ReviseInventorizationEquipmentTable: FC<ReviseInventorizationEquipmentTableProps> = ({
  dataSource,
  fulfilledTimeStamp,

  locations,
  locationsIsLoading,

  onChangeQuantityFact,
  changeQuantityFactIsLoading,

  onChangeLocationFact,
  changeLocationFactIsLoading,

  ...props
}) => {
  const [form] = useForm()

  const editableKeys = useMemo(() => dataSource.map((item) => item.id), [dataSource])

  useEffect(() => {
    if (dataSource.length && fulfilledTimeStamp) {
      form.setFieldValue(tableName, dataSource)
    }
  }, [dataSource, form, fulfilledTimeStamp])

  const locationOptions = useMemo<DefaultOptionType[]>(
    () => [undefinedSelectOption, ...locations.map((loc) => ({ label: loc.title, value: loc.id }))],
    [locations],
  )

  const editableProps: EditableProTableProps<
    ReviseInventorizationEquipmentTableItem,
    any
  >['editable'] = useMemo(() => ({ type: 'multiple', editableKeys }), [editableKeys])

  const columns = useMemo(
    () =>
      getColumns({
        locationOptions,
        locationsIsLoading,

        onChangeQuantityFact,
        changeQuantityFactIsLoading,

        onChangeLocationFact,
        changeLocationFactIsLoading,
      }),
    [
      changeLocationFactIsLoading,
      changeQuantityFactIsLoading,
      locationOptions,
      locationsIsLoading,
      onChangeLocationFact,
      onChangeQuantityFact,
    ],
  )

  return (
    <Form form={form}>
      <TableWrapperStyled data-testid='revise-inventorization-equipment-table'>
        <EditableProTable<ReviseInventorizationEquipmentTableItem>
          name={tableName}
          rowKey='id'
          columns={columns}
          ghost
          virtual={!env.isTest}
          // @ts-ignore
          form={form}
          recordCreatorProps={false}
          editable={editableProps}
          {...props}
        />
      </TableWrapperStyled>
    </Form>
  )
}

export default ReviseInventorizationEquipmentTable
