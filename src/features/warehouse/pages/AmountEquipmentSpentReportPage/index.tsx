import { useBoolean, useLocalStorageState, useSetState } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import { useGetEquipmentCategories, useGetEquipmentNomenclatures } from 'features/equipments/hooks'
import { ReportsStorageKeysEnum } from 'features/reports/api/constants'
import { GetAmountEquipmentSpentReportRequest } from 'features/reports/api/dto'
import { AmountEquipmentSpentReportFilterFormFields } from 'features/reports/components/AmountEquipmentSpentReportFilter/types'
import AmountEquipmentSpentReportForm from 'features/reports/components/AmountEquipmentSpentReportForm'
import { AmountEquipmentSpentReportFormProps } from 'features/reports/components/AmountEquipmentSpentReportForm/types'
import AmountEquipmentSpentReportTable from 'features/reports/components/AmountEquipmentSpentReportTable'
import { AmountEquipmentSpentReportTableProps } from 'features/reports/components/AmountEquipmentSpentReportTable/types'
import {
  useGetAmountEquipmentSpentReport,
  useLazyGetAmountEquipmentSpentReportXlsx,
} from 'features/reports/hooks'
import omit from 'lodash/omit'
import React, { FC, useCallback, useState } from 'react'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { useGetLocationsCatalog } from 'shared/catalogs/locations/hooks'
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

const EquipmentDetails = React.lazy(() => import('features/equipments/components/EquipmentDetails'))

const RelocationTaskDetails = React.lazy(
  () => import('features/warehouse/components/RelocationTaskDetails'),
)

const AmountEquipmentSpentReportFilter = React.lazy(
  () => import('features/reports/components/AmountEquipmentSpentReportFilter'),
)

const { Title } = Typography
const initialPaginationParams = getInitialPaginationParams()
const initialFilterValues: AmountEquipmentSpentReportFilterFormFields = {
  categories: undefined,
}

const AmountEquipmentSpentReportPage: FC = () => {
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
    MaybeUndefined<AmountEquipmentSpentReportFilterFormFields>
  >(ReportsStorageKeysEnum.AmountEquipmentSpentReportFilters)
  const [filterOpened, { toggle: toggleOpenFilter }] = useBoolean(false)
  const debouncedToggleOpenFilter = useDebounceFn(toggleOpenFilter)
  const [filterValues, setFilterValues] = useState<AmountEquipmentSpentReportFilterFormFields>(
    filtersFromStorage || {},
  )

  const [reportParams, setReportParams] = useSetState<GetAmountEquipmentSpentReportRequest>({
    ...initialPaginationParams,
    ...filterValues,
  })

  const isShowReport =
    !!reportParams.nomenclature && (!!reportParams.relocateFrom || !!reportParams.relocateTo)

  const { currentData: report, isFetching: reportIsFetching } = useGetAmountEquipmentSpentReport(
    reportParams,
    { skip: !isShowReport },
  )

  const [getReportXlsx, { isFetching: getReportXlsxIsFetching }] =
    useLazyGetAmountEquipmentSpentReportXlsx()

  const { currentData: equipmentNomenclatures, isFetching: equipmentNomenclaturesIsFetching } =
    useGetEquipmentNomenclatures({ ...filterValues, limit: 999999 })

  const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocationsCatalog()

  const { currentData: equipmentCategories = [], isFetching: equipmentCategoriesIsFetching } =
    useGetEquipmentCategories(undefined, { skip: !filterOpened })

  const onClickUpdate: AmountEquipmentSpentReportFormProps['onSubmit'] = (values) => {
    setReportParams({
      nomenclature: values.nomenclature,
      relocateFrom: values.relocateFrom,
      relocateTo: values.relocateTo,
      createdAtFrom: values.period?.[0] ? formatDate(values.period[0], DATE_FORMAT) : undefined,
      createdAtTo: values.period?.[1] ? formatDate(values.period[1], DATE_FORMAT) : undefined,
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

  const onApplyFilter = (values: AmountEquipmentSpentReportFilterFormFields) => {
    setFilterValues(values)
    setReportParams({ ...values, offset: initialPaginationParams.offset })
    toggleOpenFilter()
    setFiltersInStorage(values)
  }

  const onTablePagination = useCallback(
    (pagination: Parameters<AmountEquipmentSpentReportTableProps['onChange']>[0]) => {
      setReportParams(calculatePaginationParams(pagination))
    },
    [setReportParams],
  )

  const onChangeTable = useCallback<AmountEquipmentSpentReportTableProps['onChange']>(
    (pagination) => {
      onTablePagination(pagination)
    },
    [onTablePagination],
  )

  return (
    <>
      <Row data-testid='amount-equipment-spent-report-page' gutter={[0, 16]}>
        <Col span={7}>
          <AmountEquipmentSpentReportForm
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

              <Space>
                <FilterButton onClick={debouncedToggleOpenFilter} />

                <Button onClick={onExportExcel} loading={getReportXlsxIsFetching}>
                  Выгрузить в Excel
                </Button>
              </Space>

              <AmountEquipmentSpentReportTable
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
          <AmountEquipmentSpentReportFilter
            open={filterOpened}
            values={filterValues}
            initialValues={initialFilterValues}
            categories={equipmentCategories}
            categoriesIsLoading={equipmentCategoriesIsFetching}
            onClose={debouncedToggleOpenFilter}
            onApply={onApplyFilter}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default AmountEquipmentSpentReportPage
