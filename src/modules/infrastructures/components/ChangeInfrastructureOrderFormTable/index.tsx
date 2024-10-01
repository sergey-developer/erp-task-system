import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { Form } from 'antd'
import random from 'lodash/random'
import { FC, useMemo } from 'react'

import { env } from 'configs/env'

import { makeInfrastructureWorkTypesSelectOptions } from 'modules/infrastructures/utils/infrastructureWorkType/infrastructureWorkTypesSelectOptions'

import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'
import { filterOptionBy } from 'shared/utils/common'

import { ChangeInfrastructureOrdersFormsTabFormFields } from '../ChangeInfrastructureOrdersFormsTab/types'
import {
  ChangeInfrastructureOrderFormTableProps,
  ChangeInfrastructureOrderFormTableRow,
} from './types'

const ChangeInfrastructureOrderFormTable: FC<ChangeInfrastructureOrderFormTableProps> = ({
  name,

  editableKeys,
  onChange,

  infrastructureWorkTypes,

  managerIsCurrentUser,

  onChangeWorkType,
  infrastructureOrderFormWorkTypeCostIsFetching,

  onChangeAmount,
}) => {
  const form = Form.useFormInstance<ChangeInfrastructureOrdersFormsTabFormFields>()

  const infrastructureWorkTypesOptions = useMemo(
    () =>
      infrastructureWorkTypes
        ? makeInfrastructureWorkTypesSelectOptions(infrastructureWorkTypes)
        : [],
    [infrastructureWorkTypes],
  )

  const columns: ProColumns<ChangeInfrastructureOrderFormTableRow>[] = [
    {
      dataIndex: ['type', 'id'],
      title: 'Наименование работ',
      valueType: 'select',
      formItemProps: {
        // @ts-ignore
        'data-testid': 'name-form-item',
      },
      fieldProps: (form, config) => ({
        allowClear: false,
        loading: false,
        disabled: !managerIsCurrentUser,
        showSearch: true,
        filterOption: filterOptionBy('label'),
        options: infrastructureWorkTypesOptions,
        onChange: (value: IdType) => onChangeWorkType(config.entity, value),
      }),
    },
    {
      dataIndex: ['type', 'budgetType'],
      title: 'Бюджет',
      fieldProps: { disabled: true, placeholder: null },
      // @ts-ignore
      formItemProps: { 'data-testid': 'budget-type-form-item' },
    },
    {
      dataIndex: 'laborCosts',
      title: 'Количество нч/шт',
      valueType: 'digit',
      fieldProps: { disabled: true, placeholder: null },
      // @ts-ignore
      formItemProps: { 'data-testid': 'labor-costs-form-item' },
    },
    {
      dataIndex: 'amount',
      title: 'Количество единиц',
      valueType: 'digit',
      fieldProps: (form, config) => {
        const name: MaybeUndefined<IdType> = form?.getFieldValue(
          (config.rowKey as unknown as string[]).concat(['type', 'id']),
        )

        const amount: ChangeInfrastructureOrderFormTableRow['amount'] = form?.getFieldValue(
          (config.rowKey as unknown as string[]).concat('amount'),
        )

        return {
          disabled: !managerIsCurrentUser || !name || infrastructureOrderFormWorkTypeCostIsFetching,
          placeholder: null,
          min: 0,
          onBlur: async () => {
            await onChangeAmount(config.entity, amount)
          },
        }
      },
      // @ts-ignore
      formItemProps: { 'data-testid': 'amount-form-item' },
    },
    {
      dataIndex: 'cost',
      title: 'Цена, руб',
      valueType: 'digit',
      fieldProps: { disabled: true, placeholder: null },
      // @ts-ignore
      formItemProps: { 'data-testid': 'cost-form-item' },
    },
    {
      dataIndex: 'price',
      title: 'Стоимость, руб',
      valueType: 'digit',
      fieldProps: { disabled: true, placeholder: null },
      // @ts-ignore
      formItemProps: { 'data-testid': 'price-form-item' },
    },
  ]

  return (
    <div data-testid='change-infrastructure-order-form-table-container'>
      <EditableProTable<ChangeInfrastructureOrderFormTableRow>
        data-testid='change-infrastructure-order-form-table'
        ghost
        virtual={!env.isTest}
        rowKey='rowId'
        name={name}
        columns={columns}
        recordCreatorProps={{
          record: () => ({
            rowId: random(1, 9999999),
          }),
          creatorButtonText: 'Добавить работы',
          disabled: !managerIsCurrentUser || infrastructureOrderFormWorkTypeCostIsFetching,
        }}
        editable={{
          type: 'multiple',
          form,
          editableKeys,
          onChange: onChange,
          onValuesChange: (record, recordList) => form.setFieldValue(name, recordList),
        }}
      />
    </div>
  )
}

export default ChangeInfrastructureOrderFormTable
