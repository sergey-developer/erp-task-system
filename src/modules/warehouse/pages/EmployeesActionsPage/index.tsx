import { useSetState } from 'ahooks'
import { Button, Col, Flex, Form, Popover, Row, Select, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { FC } from 'react'

import { useAuthUser } from 'modules/auth/hooks'
import { useGetEmployeesActionsReport } from 'modules/reports/hooks'
import { GetEmployeesActionsReportQueryArgs } from 'modules/reports/models'
import { useGetUsers } from 'modules/user/hooks'
import { UserListItemModel } from 'modules/user/models'

import DatePicker from 'components/DatePicker'
import QuestionCircleIconStyled from 'components/Icons/QuestionCircleIcon'
import Space from 'components/Space'

import { idAndFullNameSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'
import { filterOptionBy } from 'shared/utils/common'
import { getInitialPaginationParams } from 'shared/utils/pagination'

import { FormFields } from './types'

const { RangePicker } = DatePicker
const { Text } = Typography

const initialPaginationParams = getInitialPaginationParams()

const periodHint = (
  <Space direction='vertical'>
    <Text>Фильтрует список действий по:</Text>
    <ul>
      <li>Дате создания заявки, если выбранный пользователь является инициатором</li>
      <li>Дате закрытия заявки, если выбранный пользователь является контролером</li>
      <li>Дате выполнения заявки, если выбранный пользователь является исполнителем</li>
    </ul>
  </Space>
)

const EmployeesActionsPage: FC = () => {
  const authUser = useAuthUser()

  const [form] = useForm<FormFields>()

  const [reportParams, setReportParams] = useSetState<GetEmployeesActionsReportQueryArgs>({
    ...initialPaginationParams,
    employeeId: 0,
  })

  const { currentData: report, isFetching: reportIsFetching } = useGetEmployeesActionsReport(
    reportParams,
    { skip: !reportParams.employeeId },
  )

  const { currentData: users, isFetching: usersIsFetching } = useGetUsers(
    { manager: authUser?.id!, allHierarchySubordinates: true },
    { skip: !authUser?.id },
  )

  const onClickUpdate = (values: FormFields) => {
    setReportParams({
      employeeId: values.employee,
      actionFrom: values.period?.[0].toISOString(),
      actionTo: values.period?.[1].toISOString(),
      offset: initialPaginationParams.offset,
    })
  }

  return (
    <Row>
      <Col span={7}>
        <Form<FormFields> form={form} onFinish={onClickUpdate}>
          <Form.Item
            name='employee'
            label='Сотрудник'
            labelCol={{ span: 5 }}
            labelAlign='left'
            rules={onlyRequiredRules}
          >
            <Select<UserListItemModel['id'], UserListItemModel>
              data-testid='employee-select'
              fieldNames={idAndFullNameSelectFieldNames}
              disabled={usersIsFetching}
              loading={usersIsFetching}
              options={users}
              placeholder='Выберите сотрудника'
              showSearch
              filterOption={filterOptionBy('fullName')}
            />
          </Form.Item>

          <Form.Item label='Период' labelCol={{ span: 5 }} labelAlign='left'>
            <Flex gap={8} align='center'>
              <Form.Item name='period' noStyle>
                <RangePicker allowEmpty={[true, true]} />
              </Form.Item>

              <Popover content={periodHint}>
                <QuestionCircleIconStyled />
              </Popover>
            </Flex>
          </Form.Item>

          <Row justify='end'>
            <Col>
              <Button htmlType='submit'>Обновить</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default EmployeesActionsPage
