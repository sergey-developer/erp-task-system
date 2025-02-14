import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'
import { Button, Form } from 'antd'
import {
  EquipmentConditionEnum,
  equipmentConditionOptions,
} from 'features/equipments/api/constants'
import {
  checkEquipmentCategoryIsConsumable,
  makeEquipmentsSelectOptions,
} from 'features/equipments/helpers'
import { EquipmentDetailDTO } from 'features/warehouse/models'
import { RelocationTaskFormFields } from 'features/warehouse/types'
import { checkRelocationTaskTypeIsWriteOff } from 'features/warehouse/utils/relocationTask'
import isUndefined from 'lodash/isUndefined'
import random from 'lodash/random'
import { DefaultOptionType } from 'rc-select/lib/Select'
import { FC, ReactNode, useCallback, useMemo } from 'react'

import { env } from 'configs/env'

import { SelectOptionButton } from 'components/Buttons/SelectOptionButton'
import { MinusCircleIcon } from 'components/Icons'
import Space from 'components/Space'

import { onlyRequiredRules } from 'shared/constants/validation'
import { MaybeUndefined } from 'shared/types/utils'
import { filterOptionBy } from 'shared/utils/common'

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
}

const RelocationEquipmentEditableTable: FC<RelocationEquipmentEditableTableProps> = ({
  name,
  editableKeys,
  setEditableKeys,
  isLoading,

  currencies,
  currenciesIsLoading,

  relocationEquipmentsIsLoading,

  equipments,
  equipmentsIsLoading,

  equipmentIsLoading,

  canCreateEquipment = false,
  createEquipmentBtnDisabled,
  onClickCreateEquipment,

  onClickCreateImage,
}) => {
  const form = Form.useFormInstance<RelocationTaskFormFields>()

  const typeFormValue: MaybeUndefined<RelocationTaskFormFields['type']> = Form.useWatch(
    'type',
    form,
  )

  const typeIsWriteOff = checkRelocationTaskTypeIsWriteOff(typeFormValue)

  const equipmentsOptions = useMemo<DefaultOptionType[]>(
    () => makeEquipmentsSelectOptions(equipments),
    [equipments],
  )

  const currencyOptions = useMemo<DefaultOptionType[]>(
    () => currencies.map((cur) => ({ label: cur.title, value: cur.id })),
    [currencies],
  )

  const handleDeleteRow = useCallback(
    (row: RelocationEquipmentRow) => {
      const tableDataSource: RelocationEquipmentRow[] = form.getFieldValue(name)
      form.setFieldsValue({ [name]: tableDataSource.filter((item) => item.rowId !== row.rowId) })
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
      formItemProps: {
        rules: onlyRequiredRules,
        // @ts-ignore
        'data-testid': 'equipment-form-item',
      },
      fieldProps: (form, config) => ({
        dropdownRender: canCreateEquipment
          ? (menu: ReactNode) => (
              <Space $block direction='vertical'>
                <SelectOptionButton
                  type='link'
                  disabled={createEquipmentBtnDisabled}
                  onClick={() => onClickCreateEquipment({ rowIndex: config.rowIndex })}
                >
                  Добавить оборудование
                </SelectOptionButton>

                {menu}
              </Space>
            )
          : undefined,
        allowClear: false,
        loading: equipmentsIsLoading,
        disabled: isLoading || equipmentsIsLoading,
        options: equipmentsOptions,
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
      fieldProps: {
        disabled: isLoading || typeIsWriteOff || equipmentIsLoading,
        options: equipmentConditionOptions,
      },
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
      fieldProps: { disabled: isLoading || typeIsWriteOff || equipmentIsLoading, min: 0 },
    },
    {
      key: 'currency',
      dataIndex: 'currency',
      title: 'Валюта',
      valueType: 'select',
      fieldProps: {
        options: currencyOptions,
        loading: currenciesIsLoading,
        disabled: isLoading || typeIsWriteOff || equipmentIsLoading || currenciesIsLoading,
      },
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

          const category: MaybeUndefined<EquipmentDetailDTO['category']> = form.getFieldValue(
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
                  relocationEquipmentId: config.record!.relocationEquipmentId,
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
    <div data-testid='relocation-equipment-editable-table-container'>
      <EditableProTable<RelocationEquipmentRow>
        data-testid='relocation-equipment-editable-table'
        virtual={!env.isTest}
        rowKey='rowId'
        name={name}
        columns={columns}
        recordCreatorProps={{
          record: () => ({
            rowId: random(1, 9999999),
            ...(typeIsWriteOff && { condition: EquipmentConditionEnum.WrittenOff }),
          }),
          disabled: isLoading || relocationEquipmentsIsLoading,
          creatorButtonText: 'Добавить оборудование',
        }}
        formItemProps={formItemProps}
        loading={relocationEquipmentsIsLoading}
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

export default RelocationEquipmentEditableTable
