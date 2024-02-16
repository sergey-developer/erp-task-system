import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { Button, Form } from 'antd'
import isUndefined from 'lodash/isUndefined'
import random from 'lodash/random'
import { DefaultOptionType } from 'rc-select/lib/Select'
import { FC, ReactNode, useCallback, useMemo } from 'react'

import { equipmentConditionOptions } from 'modules/warehouse/constants/equipment'
import { EquipmentModel } from 'modules/warehouse/models'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'

import { MinusCircleIcon } from 'components/Icons'
import Space from 'components/Space'

import { onlyRequiredRules } from 'shared/constants/validation'
import { MaybeUndefined } from 'shared/types/utils'
import { filterOptionBy } from 'shared/utils/common'
import { makeString } from 'shared/utils/string'

import { CreateEquipmentButton } from '../RelocationEquipmentEditableTable/styles'
import { RelocationEquipmentRow, RelocationEquipmentSimplifiedEditableTableProps } from './types'

const RelocationEquipmentSimplifiedEditableTable: FC<
  RelocationEquipmentSimplifiedEditableTableProps
> = ({
  name,
  required,
  isLoading,

  editableKeys,
  setEditableKeys,

  equipmentIsLoading,
  equipmentListIsLoading,

  equipmentCatalogList,
  equipmentCatalogListIsLoading,

  canCreateEquipment,
  onClickCreateEquipment,

  onClickCreateImage,
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
                    onClick={() =>
                      onClickCreateEquipment({ tableName: name, rowIndex: config.rowIndex })
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
        disabled: isLoading || equipmentCatalogListIsLoading,
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
      fieldProps: { disabled: isLoading || equipmentIsLoading, options: equipmentConditionOptions },
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

          const isConsumable = checkEquipmentCategoryIsConsumable(category?.code)

          return {
            min: 1,
            max: amount || 1,
            disabled: (!!category && !isConsumable) || isLoading || equipmentIsLoading,
          }
        }
      },
    },
    {
      key: 'attachments',
      width: 110,
      title: 'Изображения',
      renderFormItem: (schema, config) => {
        if (config.record && !isUndefined(schema.index)) {
          return (
            <Button
              disabled={!config.record.id || isLoading}
              onClick={() =>
                onClickCreateImage({
                  tableName: name,
                  rowIndex: schema.index!,
                  relocationEquipmentId: config.record!.relocationEquipmentId,
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
      key: 'delete',
      width: 50,
      renderFormItem: (schema, config) => {
        return (
          config.record && (
            <Button
              type='text'
              icon={<MinusCircleIcon />}
              onClick={() => handleDeleteRow(config.record!)}
              disabled={isLoading}
            />
          )
        )
      },
    },
  ]

  return (
    <EditableProTable<RelocationEquipmentRow>
      data-testid='relocation-equipment-simplified-editable-table'
      rowKey='rowId'
      virtual
      name={name}
      columns={columns}
      recordCreatorProps={{
        record: () => ({ rowId: random(1, 9999999) }),
        disabled: isLoading || equipmentListIsLoading,
        creatorButtonText: 'Добавить оборудование',
      }}
      formItemProps={{
        rules: required ? onlyRequiredRules : undefined,
        // @ts-ignore
        'data-testid': 'relocation-equipment-simplified-editable-table-form-item',
      }}
      loading={equipmentListIsLoading}
      editable={{
        type: 'multiple',
        form,
        editableKeys,
        onChange: setEditableKeys,
        onValuesChange: (record, recordList) => form.setFieldValue(name, recordList),
      }}
    />
  )
}

export default RelocationEquipmentSimplifiedEditableTable
