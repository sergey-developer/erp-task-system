import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'
import { Button, Form } from 'antd'
import isUndefined from 'lodash/isUndefined'
import random from 'lodash/random'
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
import { RelocationEquipmentEditableTableProps, RelocationEquipmentRow } from './types'

const formItemProps: EditableProTableProps<RelocationEquipmentRow, any>['formItemProps'] = {
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

  onClickAddImage,
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
    (row: RelocationEquipmentRow) => {
      const tableDataSource: RelocationEquipmentRow[] = form.getFieldValue('equipments')

      form.setFieldsValue({
        equipments: tableDataSource.filter((item) => item.rowId !== row?.rowId),
      })
    },
    [form],
  )

  const columns: ProColumns<RelocationEquipmentRow>[] = [
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
        dropdownRender: canAddEquipment
          ? (menu: ReactNode) => (
              <Space $block direction='vertical'>
                <AddEquipmentButton
                  type='link'
                  disabled={addEquipmentBtnDisabled}
                  onClick={() =>
                    onClickAddEquipment({
                      id: config.entity.id,
                      rowId: config.entity.rowId,
                      inCreatedTask: config.entity.inCreatedTask,
                      rowIndex: config.rowIndex,
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

          return { min: 1, max: amount || 1, disabled: (!!category && !isConsumable) || isLoading }
        }
      },
    },
    {
      key: 'attachments',
      title: 'Изображения',
      renderFormItem: (schema, config) => {
        if (config.record && !isUndefined(schema.index)) {
          return (
            <Button
              disabled={!config.record.id}
              onClick={() =>
                onClickAddImage({
                  id: config.record!.id,
                  rowId: config.record!.rowId!,
                  inCreatedTask: config.record!.inCreatedTask,
                  rowIndex: schema.index!,
                })
              }
            >
              Добавить
            </Button>
          )
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
    <EditableProTable<RelocationEquipmentRow>
      data-testid='relocation-equipment-editable-table'
      rowKey='rowId'
      name='equipments'
      columns={columns}
      recordCreatorProps={{
        record: () => ({ rowId: random(1, 999999), inCreatedTask: false }),
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
