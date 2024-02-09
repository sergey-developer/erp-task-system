import { useBoolean, useSetState } from 'ahooks'
import { Col, Flex, Row, Typography } from 'antd'
import React, { FC, useCallback, useState } from 'react'

import { useAuthUser } from 'modules/auth/hooks'
import EmployeesActionsReportForm from 'modules/reports/components/EmployeesActionsReportForm'
import { EmployeesActionsReportFormProps } from 'modules/reports/components/EmployeesActionsReportForm/types'
import EmployeesActionsReportTable from 'modules/reports/components/EmployeesActionsReportTable'
import { EmployeesActionsReportTableProps } from 'modules/reports/components/EmployeesActionsReportTable/types'
import { useGetEmployeesActionsReport } from 'modules/reports/hooks'
import { GetEmployeesActionsReportQueryArgs } from 'modules/reports/models'
import { useGetUsers } from 'modules/user/hooks'

import ModalFallback from 'components/Modals/ModalFallback'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

const EquipmentDetails = React.lazy(() => import('modules/warehouse/components/EquipmentDetails'))

const RelocationTaskDetails = React.lazy(
  () => import('modules/warehouse/components/RelocationTaskDetails'),
)

const { Title } = Typography

const initialPaginationParams = getInitialPaginationParams()

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

  const [reportParams, setReportParams] = useSetState<GetEmployeesActionsReportQueryArgs>({
    ...initialPaginationParams,
    employeeId: 0,
  })

  const employeeSelected = !!reportParams.employeeId

  const { currentData: report, isFetching: reportIsFetching } = useGetEmployeesActionsReport(
    reportParams,
    { skip: !employeeSelected },
  )

  const { currentData: users = [], isFetching: usersIsFetching } = useGetUsers(
    { manager: authUser?.id!, allHierarchySubordinates: true },
    { skip: !authUser?.id },
  )

  const onClickUpdate: EmployeesActionsReportFormProps['onSubmit'] = (values) => {
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
          <EmployeesActionsReportForm
            users={users}
            usersIsLoading={usersIsFetching}
            onSubmit={onClickUpdate}
          />
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
