import { Button, Col, Form, Row, Select } from 'antd'
import React, { FC } from 'react'

import DatePicker from 'components/DatePicker'

import { UPDATE_TEXT } from 'shared/constants/common'
import { idAndTitleSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'

import { MtsrReportFormFields, MtsrReportFormProps } from './types'

const { RangePicker } = DatePicker

const MtsrReportForm: FC<MtsrReportFormProps> = ({
  customers,
  customersIsLoading,
  initialValues,
  onSubmit,
}) => {
  const [form] = Form.useForm<MtsrReportFormFields>()

  return (
    <Form<MtsrReportFormFields>
      data-testid='mtsr-report-form'
      form={form}
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item data-testid='customers-form-item' name='customers' label='Клиенты'>
        <Select
          mode='multiple'
          fieldNames={idAndTitleSelectFieldNames}
          options={customers}
          loading={customersIsLoading}
          disabled={customersIsLoading}
          placeholder='Выберите из списка'
        />
      </Form.Item>

      <Form.Item
        data-testid='period-form-item'
        label='Период'
        name='period'
        rules={onlyRequiredRules}
      >
        <RangePicker />
      </Form.Item>

      <Row justify='end'>
        <Col>
          <Button htmlType='submit'>{UPDATE_TEXT}</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default MtsrReportForm
