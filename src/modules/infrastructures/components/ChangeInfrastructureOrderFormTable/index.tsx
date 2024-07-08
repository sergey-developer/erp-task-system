import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { Form } from 'antd'
import { FC } from 'react'

import { env } from 'configs/env'

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
  loading,
  name,

  managerIsCurrentUser,
}) => {
  const form = Form.useFormInstance<ChangeInfrastructureOrdersFormsTabFormFields>()

  const columns: ProColumns<ChangeInfrastructureOrderFormTableRow>[] = [
    {
      key: 'name',
      dataIndex: ['type', 'id'],
      title: 'Наименование работ',
      valueType: 'select',
      formItemProps: {
        // @ts-ignore
        'data-testid': 'name-form-item',
      },
      fieldProps: (form, config) => {
        return {
          allowClear: false,
          loading: false,
          disabled: !managerIsCurrentUser || loading,
          value: config.entity.type?.id,
          options: [{ label: config.entity.type?.title, value: config.entity.type?.id }],
          showSearch: true,
          filterOption: filterOptionBy('label'),
        }
      },
    },
    {
      key: 'budgetType',
      dataIndex: ['type', 'budgetType'],
      title: 'Бюджет',
      fieldProps: { disabled: true, placeholder: null },
    },
    {
      key: 'laborCosts',
      dataIndex: 'laborCosts',
      title: 'Количество нч/шт',
      valueType: 'digit',
      fieldProps: { disabled: true, placeholder: null },
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      title: 'Количество единиц',
      valueType: 'digit',
      fieldProps: (form, config) => {
        const name: MaybeUndefined<IdType> = form?.getFieldValue(
          (config.rowKey as unknown as string[]).concat('name'),
        )

        return { disabled: !managerIsCurrentUser || !name || loading, placeholder: null, min: 0 }
      },
    },
    {
      key: 'cost',
      dataIndex: 'cost',
      title: 'Цена, руб',
      valueType: 'digit',
      fieldProps: { disabled: true, placeholder: null },
    },
    {
      key: 'price',
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
        loading={loading}
        recordCreatorProps={false}
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
