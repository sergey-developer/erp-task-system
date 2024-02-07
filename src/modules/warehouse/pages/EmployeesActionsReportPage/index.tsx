import { useSetState } from 'ahooks'
import { Button, Col, Flex, Form, Popover, Row, Select, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import omit from 'lodash/omit'
import React, { FC, useCallback } from 'react'

import { useAuthUser } from 'modules/auth/hooks'
import EmployeesActionsReportTable from 'modules/reports/components/EmployeesActionsReportTable'
import { EmployeesActionsReportTableProps } from 'modules/reports/components/EmployeesActionsReportTable/types'
import {
  useGetEmployeesActionsReport,
  useLazyGetEmployeesActionsReportXlsx,
} from 'modules/reports/hooks'
import { GetEmployeesActionsReportQueryArgs } from 'modules/reports/models'
import { useGetUsers } from 'modules/user/hooks'
import { UserListItemModel } from 'modules/user/models'

import DatePicker from 'components/DatePicker'
import QuestionCircleIconStyled from 'components/Icons/QuestionCircleIcon'
import Space from 'components/Space'

import { idAndFullNameSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'
import { clickDownloadLink, filterOptionBy } from 'shared/utils/common'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import { MimetypeEnum } from '../../../../shared/constants/mimetype'
import { FormFields } from './types'

const { RangePicker } = DatePicker
const { Text, Title } = Typography

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

const EmployeesActionsReportPage: FC = () => {
  const authUser = useAuthUser()

  const [form] = useForm<FormFields>()

  const [reportParams, setReportParams] = useSetState<GetEmployeesActionsReportQueryArgs>({
    ...initialPaginationParams,
    employeeId: 0,
  })

  const employeeSelected = !!reportParams.employeeId

  const { currentData: report, isFetching: reportIsFetching } = useGetEmployeesActionsReport(
    reportParams,
    { skip: !employeeSelected },
  )

  const [getReportXlsx, { isFetching: getReportXlsxIsFetching }] =
    useLazyGetEmployeesActionsReportXlsx()

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

  const onExportExcel = async () => {
    try {
      const report = await getReportXlsx(omit(reportParams, 'offset', 'limit')).unwrap()
      clickDownloadLink(report, MimetypeEnum.Xlsx, 'Отчет по действиям сотрудника')
    } catch {}
  }

  const onTablePagination = useCallback(
    (pagination: Parameters<EmployeesActionsReportTableProps['onChange']>[0]) => {
      setReportParams(calculatePaginationParams(pagination))
    },
    [setReportParams],
  )

  const onChangeTable = useCallback<EmployeesActionsReportTableProps['onChange']>(
    (pagination) => {
      onTablePagination(pagination)
    },
    [onTablePagination],
  )

  return (
    <Row data-testid='employees-actions-report-page' gutter={[0, 16]}>
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

      {employeeSelected && (
        <Col span={24}>
          <Space $block direction='vertical' size='middle'>
            <Title level={5}>Действия сотрудников</Title>

            <Button onClick={onExportExcel} loading={getReportXlsxIsFetching}>
              Выгрузить в Excel
            </Button>

            <EmployeesActionsReportTable
              dataSource={extractPaginationResults(report)}
              pagination={extractPaginationParams(report)}
              loading={reportIsFetching}
              onChange={onChangeTable}
            />
          </Space>
        </Col>
      )}
    </Row>
  )
}

export default EmployeesActionsReportPage
