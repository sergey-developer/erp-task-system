import { useBoolean, useLocalStorageState, useSetState } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import { ReportsStorageKeysEnum } from 'features/reports/api/constants'
import { GetHistoryNomenclatureOperationsReportQueryArgs } from 'features/reports/api/dto'
import { HistoryNomenclatureOperationsReportFilterFormFields } from 'features/reports/components/HistoryNomenclatureOperationsReportFilter/types'
import HistoryNomenclatureOperationsReportForm from 'features/reports/components/HistoryNomenclatureOperationsReportForm'
import { HistoryNomenclatureOperationsReportFormProps } from 'features/reports/components/HistoryNomenclatureOperationsReportForm/types'
import HistoryNomenclatureOperationsReportTable from 'features/reports/components/HistoryNomenclatureOperationsReportTable'
import { HistoryNomenclatureOperationsReportTableProps } from 'features/reports/components/HistoryNomenclatureOperationsReportTable/types'
import {
  useGetHistoryNomenclatureOperationsReport,
  useLazyGetHistoryNomenclatureOperationsReportXlsx,
} from 'features/reports/hooks'
import { useGetEquipmentNomenclatures } from 'features/warehouse/hooks/equipment'
import omit from 'lodash/omit'
import React, { FC, useCallback, useState } from 'react'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { useGetCustomersCatalog } from 'shared/catalogs/customers/hooks'
import { useGetLocationsCatalog } from 'shared/catalogs/hooks/locations'
import { DATE_FORMAT } from 'shared/constants/dateTime'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'
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

const EquipmentDetails = React.lazy(() => import('features/warehouse/components/EquipmentDetails'))

const RelocationTaskDetails = React.lazy(
  () => import('features/warehouse/components/RelocationTaskDetails'),
)

const HistoryNomenclatureOperationsReportFilter = React.lazy(
  () => import('features/reports/components/HistoryNomenclatureOperationsReportFilter'),
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

  const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocationsCatalog(
    undefined,
    { skip: !filterOpened },
  )

  const { currentData: customers = [], isFetching: customersIsFetching } = useGetCustomersCatalog(
    undefined,
    { skip: !filterOpened },
  )

  const { currentData: equipmentNomenclatures, isFetching: equipmentNomenclaturesIsFetching } =
    useGetEquipmentNomenclatures({ limit: 999999 })

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
        const fileName = extractFileNameFromHeaders(data.meta.response.headers)
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
