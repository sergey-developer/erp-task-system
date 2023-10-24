import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'
import { Button, Form } from 'antd'
import { DefaultOptionType } from 'rc-select/lib/Select'
import { FC, ReactNode, useCallback, useMemo } from 'react'

import {
  EquipmentCategoryEnum,
  equipmentConditionOptions,
} from 'modules/warehouse/constants/equipment'
import { EquipmentModel } from 'modules/warehouse/models'

import { MinusCircleIcon } from 'components/Icons'
import Space from 'components/Space'

import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'
import { makeString } from 'shared/utils/string'

import { AddEquipmentButton } from './styles'
import { RelocationEquipmentEditableTableProps, RelocationEquipmentRowFields } from './types'

const formItemProps: EditableProTableProps<RelocationEquipmentRowFields, any>['formItemProps'] = {
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
  editableKeys,
  setEditableKeys,

  isLoading,
  equipmentListIsLoading,

  currencyList,
  currencyListIsLoading,

  equipmentCatalogList,
  equipmentCatalogListIsLoading,

  canAddEquipment,
  addEquipmentBtnDisabled,
  onClickAddEquipment,
}) => {
  const form = Form.useFormInstance()
  const relocateFromFormValue: MaybeUndefined<IdType> = Form.useWatch('relocateFrom', form)

  const equipmentCatalogOptions = useMemo<DefaultOptionType[]>(
    () =>
      equipmentCatalogList.map((eqp) => ({
        label: makeString(', ', eqp.title, eqp.serialNumber, eqp.inventoryNumber),
        value: eqp.id,
      })),
    [equipmentCatalogList],
  )

  const currencyOptions = useMemo<DefaultOptionType[]>(
    () => currencyList.map((cur) => ({ label: cur.title, value: cur.id })),
    [currencyList],
  )

  const handleDeleteRow = useCallback(
    (row: RelocationEquipmentRowFields) => {
      const tableDataSource: RelocationEquipmentRowFields[] = form.getFieldValue('equipments')

      form.setFieldsValue({
        equipments: tableDataSource.filter((item) => item.rowId !== row?.rowId),
      })
    },
    [form],
  )

  const columns: ProColumns<RelocationEquipmentRowFields>[] = [
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
      fieldProps: (form, config) => ({
        dropdownRender:
          canAddEquipment && onClickAddEquipment
            ? (menu: ReactNode) => (
                <Space $block direction='vertical'>
                  <AddEquipmentButton
                    type='link'
                    disabled={addEquipmentBtnDisabled}
                    onClick={() =>
                      onClickAddEquipment({
                        rowIndex: config.rowIndex,
                        rowId: config.entity.rowId!,
                      })
                    }
                  >
                    Добавить оборудование
                  </AddEquipmentButton>

                  {menu}
                </Space>
              )
            : undefined,
        allowClear: false,
        loading: equipmentCatalogListIsLoading,
        disabled: isLoading || !relocateFromFormValue,
        options: equipmentCatalogOptions,
        showSearch: true,
        onChange: () => {
          form.resetFields(['quantity'])
        },
        filterOption: (input: string, option: DefaultOptionType) =>
          option ? (option.label as string).toLowerCase().includes(input.toLowerCase()) : false,
      }),
    },
    {
      key: 'serialNumber',
      dataIndex: 'serialNumber',
      title: 'Серийный номер',
      fieldProps: { disabled: true, placeholder: null },
    },
    {
      key: 'purpose',
      dataIndex: 'purpose',
      title: 'Назначение',
      fieldProps: { disabled: true, placeholder: null },
    },
    {
      key: 'condition',
      dataIndex: 'condition',
      width: 190,
      title: 'Состояние',
      valueType: 'select',
      formItemProps: { rules: [{ required: true }] },
      fieldProps: { disabled: isLoading, options: equipmentConditionOptions },
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      title: 'Доступно',
      valueType: 'digit',
      fieldProps: { disabled: true, placeholder: null },
    },
    {
      key: 'price',
      dataIndex: 'price',
      title: 'Стоимость',
      valueType: 'digit',
      fieldProps: { disabled: isLoading, min: 0 },
    },
    {
      key: 'currency',
      dataIndex: 'currency',
      title: 'Валюта',
      valueType: 'select',
      fieldProps: { options: currencyOptions, loading: currencyListIsLoading, disabled: isLoading },
    },
    {
      key: 'quantity',
      dataIndex: 'quantity',
      title: 'Количество',
      valueType: 'digit',
      formItemProps: { rules: [{ required: true }] },
      fieldProps: (form, config) => {
        if (form) {
          const amount: MaybeUndefined<number> = form.getFieldValue(
            (config.rowKey as unknown as string[]).concat('amount'),
          )

          const category: MaybeUndefined<EquipmentModel['category']> = form.getFieldValue(
            (config.rowKey as unknown as string[]).concat('category'),
          )

          const isConsumable = category?.code === EquipmentCategoryEnum.Consumable

          return { min: 1, max: amount, disabled: (!!category && !isConsumable) || isLoading }
        }
      },
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
          disabled={isLoading}
        />,
      ],
    },
  ]

  return (
    <EditableProTable<RelocationEquipmentRowFields>
      data-testid='relocation-equipment-editable-table'
      rowKey='rowId'
      name='equipments'
      columns={columns}
      recordCreatorProps={{
        record: () => ({
          rowId: Math.floor(new Date().getTime() * Math.random() * 1000),
        }),
        disabled: isLoading,
        creatorButtonText: 'Добавить оборудование',
      }}
      formItemProps={formItemProps}
      loading={equipmentListIsLoading}
      editable={{
        type: 'multiple',
        form,
        editableKeys,
        onChange: setEditableKeys,
        onValuesChange: (record, recordList) => {
          form.setFieldValue('equipments', recordList)
        },
        actionRender: (row) => [
          <Button
            key='delete'
            type='text'
            icon={<MinusCircleIcon />}
            onClick={() => handleDeleteRow(row)}
            disabled={isLoading}
          />,
        ],
      }}
    />
  )
}

export default RelocationEquipmentEditableTable
