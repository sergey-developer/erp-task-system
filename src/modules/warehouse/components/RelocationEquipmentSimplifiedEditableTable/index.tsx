import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { Button, Form } from 'antd'
import isUndefined from 'lodash/isUndefined'
import random from 'lodash/random'
import { DefaultOptionType } from 'rc-select/lib/Select'
import { FC, ReactNode, useCallback, useMemo } from 'react'

import { env } from 'configs/env'

import { equipmentConditionOptions } from 'modules/warehouse/constants/equipment'
import { EquipmentModel } from 'modules/warehouse/models'
import {
  checkEquipmentCategoryIsConsumable,
  makeEquipmentsCatalogSelectOptions,
} from 'modules/warehouse/utils/equipment'

import { SelectOptionButton } from 'components/Buttons/SelectOptionButton'
import { MinusCircleIcon } from 'components/Icons'
import Space from 'components/Space'

import { onlyRequiredRules } from 'shared/constants/validation'
import { MaybeUndefined } from 'shared/types/utils'
import { filterOptionBy } from 'shared/utils/common'

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

  equipmentsCatalog,
  equipmentsCatalogIsLoading,

  canCreateEquipment,
  onClickCreateEquipment,

  onClickCreateImage,
}) => {
  const form = Form.useFormInstance()

  const equipmentsCatalogOptions = useMemo<DefaultOptionType[]>(
    () => makeEquipmentsCatalogSelectOptions(equipmentsCatalog),
    [equipmentsCatalog],
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
                  <SelectOptionButton
                    type='link'
                    onClick={() =>
                      onClickCreateEquipment({ tableName: name, rowIndex: config.rowIndex })
                    }
                  >
                    Добавить оборудование
                  </SelectOptionButton>

                  {menu}
                </Space>
              )
            : undefined,
        allowClear: false,
        loading: equipmentsCatalogIsLoading,
        disabled: isLoading || equipmentsCatalogIsLoading,
        options: equipmentsCatalogOptions,
        showSearch: true,
        virtual: true,
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
    <div data-testid='relocation-equipment-simplified-editable-table-container'>
      <EditableProTable<RelocationEquipmentRow>
        data-testid='relocation-equipment-simplified-editable-table'
        virtual={!env.isTest}
        rowKey='rowId'
        name={name}
        columns={columns}
        recordCreatorProps={{
          record: () => ({ rowId: random(1, 9999999) }),
          disabled: isLoading || equipmentListIsLoading,
          creatorButtonText: 'Добавить оборудование',
        }}
        formItemProps={{ rules: required ? onlyRequiredRules : undefined }}
        loading={equipmentListIsLoading}
        editable={{
          type: 'multiple',
          form,
          editableKeys,
          onChange: setEditableKeys,
          onValuesChange: (record, recordList) => form.setFieldValue(name, recordList),
        }}
      />
    </div>
  )
}

export default RelocationEquipmentSimplifiedEditableTable
