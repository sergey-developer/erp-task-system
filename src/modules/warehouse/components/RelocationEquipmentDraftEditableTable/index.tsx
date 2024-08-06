import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { EditableProTableProps } from '@ant-design/pro-table/es/components/EditableTable'
import { Button, Form } from 'antd'
import isUndefined from 'lodash/isUndefined'
import random from 'lodash/random'
import { DefaultOptionType } from 'rc-select/lib/Select'
import { FC, useCallback, useMemo } from 'react'

import { env } from 'configs/env'

import {
  EquipmentConditionEnum,
  equipmentConditionOptions,
} from 'modules/warehouse/constants/equipment'
import { RelocationTaskDraftFormFields } from 'modules/warehouse/types'
import { makeInventorizationEquipmentsSelectOptions } from 'modules/warehouse/utils/inventorization'
import { checkRelocationTaskTypeIsWriteOff } from 'modules/warehouse/utils/relocationTask'

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
      fieldProps: (form) => ({
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
      fieldProps: { disabled: true, placeholder: null },
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
        data-testid='relocation-equipment-draft-editable-table'
        virtual={!env.isTest}
        rowKey='rowId'
        name={name}
        columns={columns}
        recordCreatorProps={{
          record: () => ({
            rowId: random(1, 9999999),
            ...(typeIsWriteOff && { condition: EquipmentConditionEnum.WrittenOff }),
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
