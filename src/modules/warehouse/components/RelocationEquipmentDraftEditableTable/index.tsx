import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'
import { Button, Form } from 'antd'
import isUndefined from 'lodash/isUndefined'
import random from 'lodash/random'
import { NamePath } from 'rc-field-form/es/interface'
import { DefaultOptionType } from 'rc-select/lib/Select'
import { FC, useCallback, useMemo } from 'react'

import { env } from 'configs/env'

import {
  EquipmentConditionEnum,
  equipmentConditionOptions,
} from 'modules/warehouse/constants/equipment'
import { InventorizationEquipmentListItemModel } from 'modules/warehouse/models'
import { RelocationTaskDraftFormFields } from 'modules/warehouse/types'
import { makeInventorizationEquipmentsSelectOptions } from 'modules/warehouse/utils/inventorization'
import {
  checkRelocationTaskTypeIsReturnWrittenOff,
  checkRelocationTaskTypeIsWriteOff,
} from 'modules/warehouse/utils/relocationTask'

import { MinusCircleIcon } from 'components/Icons'

import { onlyRequiredRules } from 'shared/constants/validation'
import { MaybeUndefined } from 'shared/types/utils'
import { filterOptionBy } from 'shared/utils/common'

import {
  InventorizationEquipmentTableRow,
  RelocationEquipmentDraftEditableTableProps,
} from './types'

const formItemProps: EditableProTableProps<InventorizationEquipmentTableRow, any>['formItemProps'] =
  {
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

const RelocationEquipmentDraftEditableTable: FC<RelocationEquipmentDraftEditableTableProps> = ({
  name,
  editableKeys,
  setEditableKeys,
  isLoading,

  currencies,
  currenciesIsLoading,

  equipmentIsLoading,

  equipments,
  equipmentsIsLoading,

  onClickCreateImage,
}) => {
  const form = Form.useFormInstance<RelocationTaskDraftFormFields>()

  const typeFormValue: MaybeUndefined<RelocationTaskDraftFormFields['type']> = Form.useWatch(
    'type',
    form,
  )

  const typeIsWriteOff = checkRelocationTaskTypeIsWriteOff(typeFormValue)
  const typeIsReturnWrittenOff = checkRelocationTaskTypeIsReturnWrittenOff(typeFormValue)

  const equipmentsOptions = useMemo<DefaultOptionType[]>(
    () => makeInventorizationEquipmentsSelectOptions(equipments),
    [equipments],
  )

  const currencyOptions = useMemo<DefaultOptionType[]>(
    () => currencies.map((cur) => ({ label: cur.title, value: cur.id })),
    [currencies],
  )

  const handleDeleteRow = useCallback(
    (row: InventorizationEquipmentTableRow) => {
      const tableDataSource: InventorizationEquipmentTableRow[] = form.getFieldValue(name)
      form.setFieldsValue({ [name]: tableDataSource.filter((item) => item.rowId !== row.rowId) })
    },
    [form, name],
  )

  const columns: ProColumns<InventorizationEquipmentTableRow>[] = [
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
        allowClear: false,
        loading: equipmentsIsLoading,
        disabled: isLoading || equipmentsIsLoading,
        options: equipmentsOptions,
        onChange: (
          value: InventorizationEquipmentListItemModel['id'],
          option: { equipment: InventorizationEquipmentListItemModel['equipment'] },
        ) => {
          const rowKey = config.rowKey as NamePath
          form.setFieldValue([...rowKey, 'equipment'], option.equipment)
        },
        showSearch: true,
        virtual: true,
        filterOption: filterOptionBy('label'),
      }),
    },
    {
      key: 'serialNumber',
      dataIndex: 'serialNumber',
      title: 'Серийный номер',
      fieldProps: { disabled: true, placeholder: null },
      // @ts-ignore
      formItemProps: { 'data-testid': 'serial-number-form-item' },
    },
    {
      key: 'condition',
      dataIndex: 'condition',
      width: 190,
      title: 'Состояние',
      valueType: 'select',
      formItemProps: {
        rules: onlyRequiredRules,
        // @ts-ignore
        'data-testid': 'condition-form-item',
      },
      fieldProps: {
        disabled: isLoading || typeIsWriteOff || equipmentIsLoading,
        options: equipmentConditionOptions,
      },
    },
    {
      key: 'price',
      dataIndex: 'price',
      title: 'Стоимость',
      valueType: 'digit',
      fieldProps: { disabled: isLoading || typeIsWriteOff || equipmentIsLoading, min: 0 },
      // @ts-ignore
      formItemProps: { 'data-testid': 'price-form-item' },
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
      // @ts-ignore
      formItemProps: { 'data-testid': 'currency-form-item' },
    },
    {
      key: 'quantity',
      dataIndex: 'quantity',
      title: 'Количество',
      valueType: 'digit',
      fieldProps: { disabled: true, placeholder: null },
      // @ts-ignore
      formItemProps: { 'data-testid': 'quantity-form-item' },
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
              onClick={() => onClickCreateImage({ rowIndex: schema.index! })}
            >
              Добавить
            </Button>
          )
        }
      },
      // @ts-ignore
      formItemProps: { 'data-testid': 'attachments-form-item' },
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
    <div data-testid='relocation-equipment-draft-editable-table-container'>
      <EditableProTable<InventorizationEquipmentTableRow>
        virtual={!env.isTest}
        rowKey='rowId'
        name={name}
        columns={columns}
        recordCreatorProps={{
          record: () => ({
            rowId: random(1, 9999999),
            ...(typeIsWriteOff && { condition: EquipmentConditionEnum.WrittenOff }),
            ...(typeIsReturnWrittenOff && { condition: EquipmentConditionEnum.Working }),
          }),
          disabled: isLoading,
          creatorButtonText: 'Добавить оборудование',
        }}
        formItemProps={formItemProps}
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

export default RelocationEquipmentDraftEditableTable
