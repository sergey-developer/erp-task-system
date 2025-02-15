import { useBoolean, useSetState } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import { useAuthUser } from 'features/auth/hooks'
import { GetEmployeesActionsReportRequest } from 'features/reports/api/schemas'
import EmployeesActionsReportForm from 'features/reports/components/EmployeesActionsReportForm'
import { EmployeesActionsReportFormProps } from 'features/reports/components/EmployeesActionsReportForm/types'
import EmployeesActionsReportTable from 'features/reports/components/EmployeesActionsReportTable'
import { EmployeesActionsReportTableProps } from 'features/reports/components/EmployeesActionsReportTable/types'
import {
  useGetEmployeesActionsReport,
  useLazyGetEmployeesActionsReportXlsx,
} from 'features/reports/hooks'
import { useGetUsers } from 'features/users/hooks'
import omit from 'lodash/omit'
import React, { FC, useCallback, useState } from 'react'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { base64ToBytes } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'
import { extractFileNameFromHeaders } from 'shared/utils/extractFileNameFromHeaders'
import { downloadFile } from 'shared/utils/file'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

const EquipmentDetails = React.lazy(() => import('features/equipments/components/EquipmentDetails'))

const RelocationTaskDetails = React.lazy(
  () => import('features/relocationTasks/components/RelocationTaskDetails'),
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

  const [reportParams, setReportParams] = useSetState<GetEmployeesActionsReportRequest>({
    ...initialPaginationParams,
    employeeId: 0,
  })

  const isShowReport = !!reportParams.employeeId

  const { currentData: report, isFetching: reportIsFetching } = useGetEmployeesActionsReport(
    reportParams,
    { skip: !isShowReport },
  )

  const [getReportXlsx, { isFetching: getReportXlsxIsFetching }] =
    useLazyGetEmployeesActionsReportXlsx()

  const { currentData: users = [], isFetching: usersIsFetching } = useGetUsers(
    { manager: authUser?.id!, allHierarchySubordinates: true },
    { skip: !authUser?.id },
  )

  const onClickUpdate: EmployeesActionsReportFormProps['onSubmit'] = (values) => {
    setReportParams({
      employeeId: values.employee,
      actionFrom: values.period?.[0] ? formatDate(values.period[0], DATE_FORMAT) : undefined,
      actionTo: values.period?.[1] ? formatDate(values.period[1], DATE_FORMAT) : undefined,
      offset: initialPaginationParams.offset,
    })
  }

  const onExportExcel = async () => {
    const { data } = await getReportXlsx(omit(reportParams, 'offset', 'limit'))

    if (data?.value && data?.meta?.response) {
      const fileName = extractFileNameFromHeaders(data.meta.response.headers)
      downloadFile(base64ToBytes(data.value), MimetypeEnum.Xlsx, fileName)
    }
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

        {isShowReport && (
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
                onClickEquipment={onOpenEquipment}
                onClickRelocationTask={onOpenRelocationTask}
              />
            </Space>
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
