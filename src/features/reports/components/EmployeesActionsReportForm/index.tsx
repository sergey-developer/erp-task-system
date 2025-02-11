import { Button, Col, Flex, Form, Popover, Row, Select, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { UserDTO } from 'features/users/api/dto'
import React, { FC } from 'react'

import DatePicker from 'components/DatePicker'
import { QuestionCircleIcon } from 'components/Icons'
import Space from 'components/Space'

import { UPDATE_TEXT } from 'shared/constants/common'
import { idAndFullNameSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'
import { filterOptionBy } from 'shared/utils/common'

import { EmployeesActionsReportFormFields, EmployeesActionsReportFormProps } from './types'

const { RangePicker } = DatePicker
const { Text } = Typography

const periodHint = (
  <Space direction='vertical'>
    <Text>Фильтрует список действий по:</Text>
    <ul>
      <li>Дате создания заявки, если выбранный пользователь является инициатором</li>
      <li>Дате выполнения заявки, если выбранный пользователь является исполнителем</li>
      <li>Дате закрытия заявки, если выбранный пользователь является контролером</li>
    </ul>
  </Space>
)

const EmployeesActionsReportForm: FC<EmployeesActionsReportFormProps> = ({
  users,
  usersIsLoading,

  onSubmit,
}) => {
  const [form] = useForm<EmployeesActionsReportFormFields>()

  return (
    <Form<EmployeesActionsReportFormFields>
      data-testid='employees-actions-report-form'
      form={form}
      onFinish={onSubmit}
    >
      <Form.Item
        data-testid='employee-form-item'
        name='employee'
        label='Сотрудник'
        labelCol={{ span: 5 }}
        labelAlign='left'
        rules={onlyRequiredRules}
      >
        <Select<UserDTO['id'], UserDTO>
          data-testid='employee-select'
          fieldNames={idAndFullNameSelectFieldNames}
          disabled={usersIsLoading}
          loading={usersIsLoading}
          options={users}
          placeholder='Выберите сотрудника'
          showSearch
          filterOption={filterOptionBy('fullName')}
        />
      </Form.Item>

      <Form.Item
        data-testid='period-form-item'
        label='Период'
        labelCol={{ span: 5 }}
        labelAlign='left'
      >
        <Flex gap={8} align='center'>
          <Form.Item name='period' noStyle>
            <RangePicker allowEmpty={[true, true]} />
          </Form.Item>

          <Popover placement='right' content={periodHint}>
            <QuestionCircleIcon />
          </Popover>
        </Flex>
      </Form.Item>

      <Row justify='end'>
        <Col>
          <Button htmlType='submit'>{UPDATE_TEXT}</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default EmployeesActionsReportForm
