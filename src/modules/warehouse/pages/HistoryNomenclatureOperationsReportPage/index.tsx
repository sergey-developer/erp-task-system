import { useBoolean, useLocalStorageState, useSetState } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import omit from 'lodash/omit'
import React, { FC, useCallback, useState } from 'react'

import { HistoryNomenclatureOperationsReportFilterFormFields } from 'modules/reports/components/HistoryNomenclatureOperationsReportFilter/types'
import HistoryNomenclatureOperationsReportForm from 'modules/reports/components/HistoryNomenclatureOperationsReportForm'
import { HistoryNomenclatureOperationsReportFormProps } from 'modules/reports/components/HistoryNomenclatureOperationsReportForm/types'
import HistoryNomenclatureOperationsReportTable from 'modules/reports/components/HistoryNomenclatureOperationsReportTable'
import { HistoryNomenclatureOperationsReportTableProps } from 'modules/reports/components/HistoryNomenclatureOperationsReportTable/types'
import { ReportsStorageKeysEnum } from 'modules/reports/constants'
import {
  useGetHistoryNomenclatureOperationsReport,
  useLazyGetHistoryNomenclatureOperationsReportXlsx,
} from 'modules/reports/hooks'
import { GetHistoryNomenclatureOperationsReportQueryArgs } from 'modules/reports/models'
import { useGetCustomerList } from 'modules/warehouse/hooks/customer'
import { useGetEquipmentNomenclatureList } from 'modules/warehouse/hooks/equipment'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { useGetLocations } from 'shared/hooks/catalogs/location'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'
import { base64ToBytes } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'
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

const HistoryNomenclatureOperationsReportFilter = React.lazy(
  () => import('modules/reports/components/HistoryNomenclatureOperationsReportFilter'),
)

const { Title } = Typography
const initialPaginationParams = getInitialPaginationParams()
const initialFilterValues: HistoryNomenclatureOperationsReportFilterFormFields = {
  conditions: undefined,
  locations: undefined,
  owners: undefined,
}

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

  const [filtersFromStorage, setFiltersInStorage] = useLocalStorageState<
    MaybeUndefined<HistoryNomenclatureOperationsReportFilterFormFields>
  >(ReportsStorageKeysEnum.HistoryNomenclatureOperationsReportFilter)
  const [filterOpened, { toggle: toggleOpenFilter }] = useBoolean(false)
  const debouncedToggleOpenFilter = useDebounceFn(toggleOpenFilter)
  const [filterValues, setFilterValues] =
    useState<HistoryNomenclatureOperationsReportFilterFormFields>(filtersFromStorage || {})

  const [reportParams, setReportParams] =
    useSetState<GetHistoryNomenclatureOperationsReportQueryArgs>({
      ...initialPaginationParams,
      ...filterValues,
      nomenclatureId: 0,
    })

  const isShowReport = !!reportParams.nomenclatureId

  const { currentData: report, isFetching: reportIsFetching } =
    useGetHistoryNomenclatureOperationsReport(reportParams, { skip: !isShowReport })

  const [getReportXlsx, { isFetching: getReportXlsxIsFetching }] =
    useLazyGetHistoryNomenclatureOperationsReportXlsx()

  const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocations(
    undefined,
    { skip: !filterOpened },
  )

  const { currentData: customers = [], isFetching: customersIsFetching } = useGetCustomerList(
    undefined,
    { skip: !filterOpened },
  )

  const { currentData: equipmentNomenclatures, isFetching: equipmentNomenclaturesIsFetching } =
    useGetEquipmentNomenclatureList({ limit: 999999 })

  const onClickUpdate: HistoryNomenclatureOperationsReportFormProps['onSubmit'] = (values) => {
    setReportParams({
      nomenclatureId: values.nomenclature,
      createdAtFrom: values.period?.[0] ? formatDate(values.period[0], DATE_FORMAT) : undefined,
      createdAtTo: values.period?.[1] ? formatDate(values.period[1], DATE_FORMAT) : undefined,
      offset: initialPaginationParams.offset,
    })
  }

  const onExportExcel = async () => {
    try {
      const { data } = await getReportXlsx(omit(reportParams, 'offset', 'limit'))

      if (data?.value && data?.meta?.response) {
        const fileName = decodeURIComponent(
          data.meta.response.headers['content-disposition'].split('filename=')[1],
        )
        downloadFile(base64ToBytes(data.value), MimetypeEnum.Xlsx, fileName)
      }
    } catch {}
  }

  const onApplyFilter = (values: HistoryNomenclatureOperationsReportFilterFormFields) => {
    setFilterValues(values)
    setReportParams({ ...values, offset: initialPaginationParams.offset })
    toggleOpenFilter()
    setFiltersInStorage(values)
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
            onSubmit={onClickUpdate}
          />
        </Col>

        {isShowReport && (
          <Col span={24}>
            <Space $block direction='vertical' size='middle'>
              <Title level={5}>История операций по номенклатуре</Title>

              <Space>
                <FilterButton onClick={debouncedToggleOpenFilter} />

                <Button onClick={onExportExcel} loading={getReportXlsxIsFetching}>
                  Выгрузить в Excel
                </Button>
              </Space>

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

      {filterOpened && (
        <React.Suspense fallback={<ModalFallback open tip='Загрузка компонента фильтров' />}>
          <HistoryNomenclatureOperationsReportFilter
            open={filterOpened}
            values={filterValues}
            initialValues={initialFilterValues}
            locations={locations}
            locationsIsLoading={locationsIsFetching}
            owners={customers}
            ownersIsLoading={customersIsFetching}
            onClose={debouncedToggleOpenFilter}
            onApply={onApplyFilter}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default HistoryNomenclatureOperationsReportPage
