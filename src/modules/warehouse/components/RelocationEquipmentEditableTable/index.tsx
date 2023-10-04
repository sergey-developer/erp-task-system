import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'
import { Button, Form } from 'antd'
import { DefaultOptionType } from 'rc-select/lib/Select'
import { FC, ReactNode, useCallback, useMemo } from 'react'

import { equipmentConditionOptions } from 'modules/warehouse/constants/equipment'

import { MinusCircleIcon } from 'components/Icons'
import Space from 'components/Space'

import { makeString } from 'shared/utils/string'

import { AddEquipmentButton } from './styles'
import { RelocationEquipmentEditableTableProps, RelocationEquipmentFormFields } from './types'

const recordCreatorProps: EditableProTableProps<
  RelocationEquipmentFormFields,
  any
>['recordCreatorProps'] = {
  record: () => ({
    rowId: Math.floor(new Date().getTime() * Math.random() * 1000),
  }),
  creatorButtonText: 'Добавить оборудование',
}

const formItemProps: EditableProTableProps<RelocationEquipmentFormFields, any>['formItemProps'] = {
  rules: [
    {
      validator: async (_, value) => {
        if (value.length < 1) {
          throw new Error('Добавьте оборудование')
        }
      },
    },
  ],
  // @ts-ignore
  'data-testid': 'relocation-equipment-editable-table-form-item',
}

const RelocationEquipmentEditableTable: FC<RelocationEquipmentEditableTableProps> = ({
  currencyList,
  currencyListIsLoading,

  equipmentList,
  equipmentListIsLoading,
}) => {
  const form = Form.useFormInstance()

  const equipmentOptions = useMemo<DefaultOptionType[]>(
    () =>
      equipmentList.map((eqp) => ({
        label: makeString(', ', eqp.title, eqp.serialNumber, eqp.inventoryNumber),
        value: eqp.id,
      })),
    [equipmentList],
  )

  const currencyOptions = useMemo<DefaultOptionType[]>(
    () => currencyList.map((cur) => ({ label: cur.title, value: cur.id })),
    [currencyList],
  )

  const handleDeleteRow = useCallback(
    (row: RelocationEquipmentFormFields) => {
      const tableDataSource: RelocationEquipmentFormFields[] = form.getFieldValue('equipments')

      form.setFieldsValue({
        equipments: tableDataSource.filter((item) => item.rowId !== row?.rowId),
      })
    },
    [form],
  )

  const columns: ProColumns<RelocationEquipmentFormFields>[] = useMemo(
    () => [
      {
        key: 'id',
        dataIndex: 'id',
        width: 440,
        title: 'Оборудование',
        valueType: 'select',
        formItemProps: {
          rules: [{ required: true }],
          // @ts-ignore
          'data-testid': 'equipment-form-item',
        },
        fieldProps: {
          dropdownRender: (menu: ReactNode) => (
            <Space $block direction='vertical'>
              <AddEquipmentButton type='link'>Добавить оборудование</AddEquipmentButton>

              {menu}
            </Space>
          ),
          allowClear: false,
          loading: equipmentListIsLoading,
          options: equipmentOptions,
          showSearch: true,
          filterOption: (input: string, option: DefaultOptionType) =>
            option ? (option.label as string).toLowerCase().includes(input.toLowerCase()) : false,
        },
      },
      {
        key: 'serialNumber',
        dataIndex: 'serialNumber',
        title: 'Серийный номер',
        fieldProps: {
          disabled: true,
          placeholder: null,
        },
      },
      {
        key: 'purpose',
        dataIndex: 'purpose',
        title: 'Назначение',
        fieldProps: {
          disabled: true,
          placeholder: null,
        },
      },
      {
        key: 'condition',
        dataIndex: 'condition',
        width: 190,
        title: 'Состояние',
        valueType: 'select',
        formItemProps: { rules: [{ required: true }] },
        fieldProps: {
          options: equipmentConditionOptions,
        },
      },
      {
        key: 'amount',
        dataIndex: 'amount',
        title: 'Доступно',
        valueType: 'digit',
        fieldProps: {
          disabled: true,
          placeholder: null,
        },
      },
      {
        key: 'price',
        dataIndex: 'price',
        title: 'Стоимость',
        valueType: 'digit',
      },
      {
        key: 'currency',
        dataIndex: 'currency',
        title: 'Валюта',
        valueType: 'select',
        fieldProps: {
          options: currencyOptions,
          loading: currencyListIsLoading,
        },
      },
      {
        key: 'quantity',
        dataIndex: 'quantity',
        title: 'Количество',
        valueType: 'digit',
        formItemProps: { rules: [{ required: true }] },
        fieldProps: { min: 1 },
      },
      {
        title: '',
        valueType: 'option',
        width: 50,
        render: (_, row) => [
          <Button
            key='delete'
            type='text'
            icon={<MinusCircleIcon />}
            onClick={() => handleDeleteRow(row)}
          />,
        ],
      },
    ],
    [
      currencyListIsLoading,
      currencyOptions,
      equipmentListIsLoading,
      equipmentOptions,
      handleDeleteRow,
    ],
  )

  return (
    <EditableProTable<RelocationEquipmentFormFields>
      data-testid='relocation-equipment-editable-table'
      rowKey='rowId'
      name='equipments'
      columns={columns}
      recordCreatorProps={recordCreatorProps}
      formItemProps={formItemProps}
      editable={{
        type: 'multiple',
        form,
        onValuesChange: (record, recordList) => {
          form.setFieldValue('equipments', recordList)
        },
        actionRender: (row) => [
          <Button
            key='delete'
            type='text'
            icon={<MinusCircleIcon />}
            onClick={() => handleDeleteRow(row)}
          />,
        ],
      }}
    />
  )
}

export default RelocationEquipmentEditableTable
