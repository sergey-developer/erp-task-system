import { useBoolean, useSetState } from 'ahooks'
import { Button, Col, Flex, Form, Popover, Row, Select, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { FC, useCallback, useState } from 'react'

import { useAuthUser } from 'modules/auth/hooks'
import EmployeesActionsReportTable from 'modules/reports/components/EmployeesActionsReportTable'
import { EmployeesActionsReportTableProps } from 'modules/reports/components/EmployeesActionsReportTable/types'
import { useGetEmployeesActionsReport } from 'modules/reports/hooks'
import { GetEmployeesActionsReportQueryArgs } from 'modules/reports/models'
import { useGetUsers } from 'modules/user/hooks'
import { UserListItemModel } from 'modules/user/models'

import DatePicker from 'components/DatePicker'
import QuestionCircleIconStyled from 'components/Icons/QuestionCircleIcon'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { idAndFullNameSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { filterOptionBy } from 'shared/utils/common'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import { FormFields } from './types'

const EquipmentDetails = React.lazy(() => import('modules/warehouse/components/EquipmentDetails'))
const RelocationTaskDetails = React.lazy(
  () => import('modules/warehouse/components/RelocationTaskDetails'),
)

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
  const [equipmentId, setEquipmentId] = useState<IdType>()
  const [equipmentOpened, { setTrue: openEquipment, setFalse: closeEquipment }] = useBoolean(false)
  const onOpenEquipment = useDebounceFn((id: IdType) => {
    openEquipment()
    setEquipmentId(id)
  })
  const onCloseEquipment = useDebounceFn(() => {
    closeEquipment()
    setEquipmentId(undefined)
  })

  const [relocationTaskId, setRelocationTaskId] = useState<IdType>()
  const [relocationTaskOpened, { setTrue: openRelocationTask, setFalse: closeRelocationTask }] =
    useBoolean(false)
  const onOpenRelocationTask = useDebounceFn((id: IdType) => {
    openRelocationTask()
    setRelocationTaskId(id)
  })
  const onCloseRelocationTask = useDebounceFn(() => {
    closeRelocationTask()
    setRelocationTaskId(undefined)
  })

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
    <>
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
            <Flex vertical>
              <Title level={5}>Действия сотрудников</Title>

              <EmployeesActionsReportTable
                dataSource={extractPaginationResults(report)}
                pagination={extractPaginationParams(report)}
                loading={reportIsFetching}
                onChange={onChangeTable}
                onClickEquipment={onOpenEquipment}
                onClickRelocationTask={onOpenRelocationTask}
              />
            </Flex>
          </Col>
        )}
      </Row>

      {equipmentOpened && equipmentId && (
        <React.Suspense fallback={<ModalFallback open tip='Загрузка карточки оборудования' />}>
          <EquipmentDetails
            open={equipmentOpened}
            onClose={onCloseEquipment}
            equipmentId={equipmentId}
          />
        </React.Suspense>
      )}

      {relocationTaskOpened && relocationTaskId && (
        <React.Suspense
          fallback={<ModalFallback open tip='Загрузка карточки заявки на перемещение' />}
        >
          <RelocationTaskDetails
            open={relocationTaskOpened}
            onClose={onCloseRelocationTask}
            relocationTaskId={relocationTaskId}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default EmployeesActionsReportPage
