import { EditableProTable, ProColumns } from '@ant-design/pro-components'
import { Button, Form } from 'antd'
import random from 'lodash/random'
import React, { FC, useMemo } from 'react'

import { env } from 'configs/env'

import { makeInfrastructureWorkTypesSelectOptions } from 'modules/infrastructures/utils/infrastructureWorkType/infrastructureWorkTypesSelectOptions'

import { DeleteIcon } from 'components/Icons'

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

  onClickDeleteInfrastructureWorkType,
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
    {
      key: 'delete',
      width: 50,
      renderFormItem: (schema, config) => {
        return (
          config.record && (
            <Button
              type='text'
              disabled={!managerIsCurrentUser}
              icon={<DeleteIcon $cursor='pointer' $color='fireOpal' />}
              onClick={() => {
                onClickDeleteInfrastructureWorkType({
                  rowIndex: schema.index!,
                  id: config.record!.id,
                })
              }}
            />
          )
        )
      },
    },
  ]

  return (
    <div data-testid='change-infrastructure-order-form-table-container'>
      <EditableProTable<ChangeInfrastructureOrderFormTableRow>
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
          onChange: onChange,
          onValuesChange: (record, recordList) => form.setFieldValue(name, recordList),
        }}
      />
    </div>
  )
}

export default ChangeInfrastructureOrderFormTable
