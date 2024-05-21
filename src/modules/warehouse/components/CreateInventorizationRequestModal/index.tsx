import { Col, Form, Row, Select } from 'antd'
import sortBy from 'lodash/sortBy'
import { DefaultOptionType } from 'rc-select/lib/Select'
import React, { FC, useMemo } from 'react'

import { TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { inventorizationTypeOptions } from 'modules/warehouse/constants/inventorization'
import { WarehouseListItemModel } from 'modules/warehouse/models'

import DatePicker from 'components/DatePicker'
import BaseModal from 'components/Modals/BaseModal'
import TimePicker from 'components/TimePicker'

import { CREATE_TEXT } from 'shared/constants/common'
import {
  idAndFullNameSelectFieldNames,
  idAndTitleSelectFieldNames,
} from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'
import { IdType } from 'shared/types/common'
import { filterOptionBy } from 'shared/utils/common'

import {
  CreateInventorizationRequestFormFields,
  CreateInventorizationRequestModalProps,
} from './types'
import { deadlineAtDateRules, deadlineAtTimeRules } from './validation'

const CreateInventorizationRequestModal: FC<CreateInventorizationRequestModalProps> = ({
  onSubmit,

  nomenclatures,
  nomenclaturesIsLoading,

  warehouses,
  warehousesIsLoading,
  onChangeWarehouses,

  executors,
  executorsIsLoading,

  ...props
}) => {
  const { confirmLoading: isLoading } = props

  const [form] = Form.useForm<CreateInventorizationRequestFormFields>()

  const equipmentNomenclatures = useMemo(
    () =>
      sortBy(
        nomenclatures
          .reduce<DefaultOptionType[]>((acc, nom) => {
            const optionGroup = acc.find((item) => item.label === nom.group.title)
            const option = { label: nom.title, value: nom.id }

            optionGroup
              ? optionGroup.options!.push(option)
              : acc.push({ title: nom.group.title, label: nom.group.title, options: [option] })

            return acc
          }, [])
          .map((group) => ({ ...group, options: sortBy(group.options, 'label') })),
        'label',
      ),
    [nomenclatures],
  )

  const onFinish = async (values: CreateInventorizationRequestFormFields) => {
    await onSubmit(values, form.setFields)
  }

  const handleChangeWarehouses = (value: IdType[]) => {
    form.setFieldsValue({ nomenclatures: undefined, executor: undefined })
    onChangeWarehouses(value)
  }

  return (
    <BaseModal
      {...props}
      data-testid='create-inventorization-request-modal'
      title='Создать поручение на инвентаризацию'
      okText={CREATE_TEXT}
      onOk={form.submit}
    >
      <Form<CreateInventorizationRequestFormFields>
        layout='vertical'
        form={form}
        onFinish={onFinish}
      >
        <Form.Item data-testid='type-form-item' name='type' label='Тип' rules={onlyRequiredRules}>
          <Select
            placeholder='Выберите тип'
            options={inventorizationTypeOptions}
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          data-testid='warehouses-form-item'
          name='warehouses'
          label='Склады'
          rules={onlyRequiredRules}
        >
          <Select<IdType[], WarehouseListItemModel>
            mode='multiple'
            placeholder='Выберите склад'
            options={warehouses}
            loading={warehousesIsLoading}
            disabled={isLoading || warehousesIsLoading}
            fieldNames={idAndTitleSelectFieldNames}
            onChange={handleChangeWarehouses}
          />
        </Form.Item>

        <Form.Item data-testid='nomenclatures-form-item' name='nomenclatures' label='Номенклатура'>
          <Select
            mode='multiple'
            placeholder='Выберите номенклатуру'
            options={equipmentNomenclatures}
            loading={nomenclaturesIsLoading}
            disabled={isLoading || nomenclaturesIsLoading}
            filterOption={filterOptionBy('label')}
          />
        </Form.Item>

        <Form.Item data-testid='deadline-at-form-item' label='Срок выполнения'>
          <Row justify='space-between'>
            <Col span={15}>
              <Form.Item
                data-testid='deadline-at-date-form-item'
                name='deadlineAtDate'
                rules={deadlineAtDateRules}
              >
                <DatePicker disabled={isLoading} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                data-testid='deadline-at-time-form-item'
                name='deadlineAtTime'
                dependencies={['deadlineAtDate']}
                rules={deadlineAtTimeRules}
              >
                <TimePicker disabled={isLoading} format={TIME_PICKER_FORMAT} placeholder='Время' />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          data-testid='executor-form-item'
          name='executor'
          label='Исполнитель'
          rules={onlyRequiredRules}
        >
          <Select
            placeholder='Выберите исполнителя'
            options={executors}
            loading={executorsIsLoading}
            disabled={isLoading || executorsIsLoading}
            fieldNames={idAndFullNameSelectFieldNames}
          />
        </Form.Item>
      </Form>
    </BaseModal>
  )
}

export default CreateInventorizationRequestModal
