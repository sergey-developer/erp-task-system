import { useBoolean, useSetState } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import omit from 'lodash/omit'
import React, { FC, useCallback, useState } from 'react'

import HistoryNomenclatureOperationsReportForm from 'modules/reports/components/HistoryNomenclatureOperationsReportForm'
import { HistoryNomenclatureOperationsReportFormProps } from 'modules/reports/components/HistoryNomenclatureOperationsReportForm/types'
import HistoryNomenclatureOperationsReportTable from 'modules/reports/components/HistoryNomenclatureOperationsReportTable'
import { HistoryNomenclatureOperationsReportTableProps } from 'modules/reports/components/HistoryNomenclatureOperationsReportTable/types'
import {
  useGetHistoryNomenclatureOperationsReport,
  useLazyGetHistoryNomenclatureOperationsReportXlsx,
} from 'modules/reports/hooks'
import { GetHistoryNomenclatureOperationsReportQueryArgs } from 'modules/reports/models'
import { useGetEquipmentNomenclatureList } from 'modules/warehouse/hooks/equipment'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { useGetLocations } from 'shared/hooks/catalogs/location'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { base64ToArrayBuffer } from 'shared/utils/common'
import { downloadFile } from 'shared/utils/file'
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

const initialPaginationParams = getInitialPaginationParams()
const { Title } = Typography

const HistoryNomenclatureOperationsReportPage: FC = () => {
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

  const [reportParams, setReportParams] =
    useSetState<GetHistoryNomenclatureOperationsReportQueryArgs>(initialPaginationParams)

  const isShowReport =
    !!reportParams.nomenclature && (!!reportParams.relocateFrom || !!reportParams.relocateTo)

  const { currentData: report, isFetching: reportIsFetching } =
    useGetHistoryNomenclatureOperationsReport(reportParams, { skip: !isShowReport })

  const [getReportXlsx, { isFetching: getReportXlsxIsFetching }] =
    useLazyGetHistoryNomenclatureOperationsReportXlsx()

  const { currentData: equipmentNomenclatures, isFetching: equipmentNomenclaturesIsFetching } =
    useGetEquipmentNomenclatureList()

  const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocations()

  const onClickUpdate: HistoryNomenclatureOperationsReportFormProps['onSubmit'] = (values) => {
    setReportParams({
      nomenclature: values.nomenclature,
      relocateFrom: values.relocateFrom,
      relocateTo: values.relocateTo,
      createdAtFrom: values.period?.[0].toISOString(),
      createdAtTo: values.period?.[1].toISOString(),
      offset: initialPaginationParams.offset,
    })
  }

  const onExportExcel = async () => {
    try {
      const report = await getReportXlsx(omit(reportParams, 'offset', 'limit')).unwrap()

      downloadFile(
        base64ToArrayBuffer(report),
        MimetypeEnum.Xlsx,
        'Отчет по количеству потраченного оборудования',
      )
    } catch {}
  }

  const onTablePagination = useCallback(
    (pagination: Parameters<HistoryNomenclatureOperationsReportTableProps['onChange']>[0]) => {
      setReportParams(calculatePaginationParams(pagination))
    },
    [setReportParams],
  )

  const onChangeTable = useCallback<HistoryNomenclatureOperationsReportTableProps['onChange']>(
    (pagination) => {
      onTablePagination(pagination)
    },
    [onTablePagination],
  )

  return (
    <>
      <Row data-testid='history-nomenclature-operations-report-page' gutter={[0, 16]}>
        <Col span={7}>
          <HistoryNomenclatureOperationsReportForm
            nomenclatures={extractPaginationResults(equipmentNomenclatures)}
            nomenclaturesIsLoading={equipmentNomenclaturesIsFetching}
            locations={locations}
            locationsIsLoading={locationsIsFetching}
            onSubmit={onClickUpdate}
          />
        </Col>

        {isShowReport && (
          <Col span={24}>
            <Space $block direction='vertical' size='middle'>
              <Title level={5}>Количество потраченного оборудования</Title>

              <Button onClick={onExportExcel} loading={getReportXlsxIsFetching}>
                Выгрузить в Excel
              </Button>

              <HistoryNomenclatureOperationsReportTable
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

export default HistoryNomenclatureOperationsReportPage
