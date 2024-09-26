import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { Form } from 'antd'
import random from 'lodash/random'
import { DefaultOptionType } from 'rc-select/lib/Select'
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
  editableKeys,
  name,

  infrastructureWorkTypes,

  managerIsCurrentUser,
}) => {
  const form = Form.useFormInstance<ChangeInfrastructureOrdersFormsTabFormFields>()

  const infrastructureWorkTypesOptions = useMemo<DefaultOptionType[]>(
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
        virtual: true,
      }),
    },
    {
      dataIndex: ['type', 'budgetType'],
      title: 'Бюджет',
      fieldProps: { disabled: true, placeholder: null },
    },
    {
      dataIndex: 'laborCosts',
      title: 'Количество нч/шт',
      valueType: 'digit',
      fieldProps: { disabled: true, placeholder: null },
    },
    {
      dataIndex: 'amount',
      title: 'Количество единиц',
      valueType: 'digit',
      fieldProps: (form, config) => {
        const name: MaybeUndefined<IdType> = form?.getFieldValue(
          (config.rowKey as unknown as string[]).concat(['type', 'id']),
        )

        return { disabled: !managerIsCurrentUser || !name, placeholder: null, min: 0 }
      },
    },
    {
      dataIndex: 'cost',
      title: 'Цена, руб',
      valueType: 'digit',
      fieldProps: { disabled: true, placeholder: null },
    },
    {
      dataIndex: 'price',
      title: 'Стоимость, руб',
      valueType: 'digit',
      fieldProps: { disabled: true, placeholder: null },
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
          disabled: !managerIsCurrentUser,
        }}
        editable={{
          type: 'multiple',
          form,
          editableKeys,
        }}
      />
    </div>
  )
}

export default ChangeInfrastructureOrderFormTable
