import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'
import { Button, Form } from 'antd'
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

import { onlyRequiredRules } from 'shared/constants/validation'
import { MaybeUndefined } from 'shared/types/utils'
import { filterOptionBy } from 'shared/utils/common'
import { makeString } from 'shared/utils/string'

import { CreateEquipmentButton } from '../RelocationEquipmentEditableTable/styles'
import { RelocationEquipmentRow, RelocationEquipmentSimplifiedEditableTableProps } from './types'

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
  'data-testid': 'relocation-equipment-simplified-editable-table-form-item',
}

const RelocationEquipmentSimplifiedEditableTable: FC<
  RelocationEquipmentSimplifiedEditableTableProps
> = ({
  name,

  editableKeys,
  setEditableKeys,

  isLoading,
  equipmentListIsLoading,

  equipmentCatalogList,
  equipmentCatalogListIsLoading,

  canCreateEquipment,
  addEquipmentBtnDisabled,
  onClickCreateEquipment,
}) => {
  const form = Form.useFormInstance()

  const equipmentCatalogOptions = useMemo<DefaultOptionType[]>(
    () =>
      equipmentCatalogList.map((eqp) => ({
        label: makeString(', ', eqp.title, eqp.serialNumber, eqp.inventoryNumber),
        value: eqp.id,
      })),
    [equipmentCatalogList],
  )

  const handleDeleteRow = useCallback(
    (row: RelocationEquipmentRow) => {
      const tableDataSource: RelocationEquipmentRow[] = form.getFieldValue(name)
      form.setFieldsValue({ [name]: tableDataSource.filter((item) => item.rowId !== row?.rowId) })
    },
    [form, name],
  )

  const columns: ProColumns<RelocationEquipmentRow>[] = [
    {
      key: 'id',
      dataIndex: 'id',
      width: 440,
      title: 'Оборудование',
      valueType: 'select',
      formItemProps: { rules: onlyRequiredRules },
      fieldProps: (form, config) => ({
        dropdownRender:
          canCreateEquipment && onClickCreateEquipment
            ? (menu: ReactNode) => (
                <Space $block direction='vertical'>
                  <CreateEquipmentButton
                    type='link'
                    disabled={addEquipmentBtnDisabled}
                    onClick={() =>
                      onClickCreateEquipment({
                        tableName: name,
                        rowIndex: config.rowIndex,
                        rowId: config.entity.rowId!,
                      })
                    }
                  >
                    Добавить оборудование
                  </CreateEquipmentButton>

                  {menu}
                </Space>
              )
            : undefined,
        allowClear: false,
        loading: equipmentCatalogListIsLoading,
        disabled: isLoading,
        options: equipmentCatalogOptions,
        showSearch: true,
        onChange: () => form.resetFields(['quantity']),
        filterOption: filterOptionBy('label'),
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
      formItemProps: { rules: onlyRequiredRules },
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
      key: 'quantity',
      dataIndex: 'quantity',
      title: 'Количество',
      valueType: 'digit',
      formItemProps: { rules: onlyRequiredRules },
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
      data-testid='relocation-equipment-simplified-editable-table'
      rowKey='rowId'
      name={name}
      columns={columns}
      recordCreatorProps={{
        record: () => ({ rowId: random(1, 9999999) }),
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
        onValuesChange: (record, recordList) => form.setFieldValue(name, recordList),
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

export default RelocationEquipmentSimplifiedEditableTable
