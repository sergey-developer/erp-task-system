import { useBoolean, useSetState } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import omit from 'lodash/omit'
import React, { FC, useCallback, useState } from 'react'

import { AmountEquipmentSpentReportFilterFormFields } from 'modules/reports/components/AmountEquipmentSpentReportFilter/types'
import AmountEquipmentSpentReportForm from 'modules/reports/components/AmountEquipmentSpentReportForm'
import { AmountEquipmentSpentReportFormProps } from 'modules/reports/components/AmountEquipmentSpentReportForm/types'
import AmountEquipmentSpentReportTable from 'modules/reports/components/AmountEquipmentSpentReportTable'
import { AmountEquipmentSpentReportTableProps } from 'modules/reports/components/AmountEquipmentSpentReportTable/types'
import {
  useGetAmountEquipmentSpentReport,
  useLazyGetAmountEquipmentSpentReportXlsx,
} from 'modules/reports/hooks'
import { GetAmountEquipmentSpentReportQueryArgs } from 'modules/reports/models'
import {
  useGetEquipmentCategoryList,
  useGetEquipmentNomenclatureList,
} from 'modules/warehouse/hooks/equipment'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { MimetypeEnum } from 'shared/constants/mimetype'
import { useGetLocations } from 'shared/hooks/catalogs/location'
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

import FilterButton from '../../../../components/Buttons/FilterButton'

const EquipmentDetails = React.lazy(() => import('modules/warehouse/components/EquipmentDetails'))

const RelocationTaskDetails = React.lazy(
  () => import('modules/warehouse/components/RelocationTaskDetails'),
)

const AmountEquipmentSpentReportFilter = React.lazy(
  () => import('modules/reports/components/AmountEquipmentSpentReportFilter'),
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

  const [filterOpened, { toggle: toggleOpenFilter }] = useBoolean(false)
  const debouncedToggleOpenFilter = useDebounceFn(toggleOpenFilter)
  const [filterValues, setFilterValues] = useState<AmountEquipmentSpentReportFilterFormFields>()

  const [reportParams, setReportParams] =
    useSetState<GetAmountEquipmentSpentReportQueryArgs>(initialPaginationParams)

  const isShowReport =
    !!reportParams.nomenclature && (!!reportParams.relocateFrom || !!reportParams.relocateTo)

  const { currentData: report, isFetching: reportIsFetching } = useGetAmountEquipmentSpentReport(
    reportParams,
    { skip: !isShowReport },
  )

  const [getReportXlsx, { isFetching: getReportXlsxIsFetching }] =
    useLazyGetAmountEquipmentSpentReportXlsx()

  const { currentData: equipmentNomenclatures, isFetching: equipmentNomenclaturesIsFetching } =
    useGetEquipmentNomenclatureList({ categories: filterValues?.categories })

  const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocations()

  const { currentData: equipmentCategories = [], isFetching: equipmentCategoriesIsFetching } =
    useGetEquipmentCategoryList(undefined, { skip: !filterOpened })

  const onClickUpdate: AmountEquipmentSpentReportFormProps['onSubmit'] = (values) => {
    setReportParams({
      nomenclature: values.nomenclature,
      relocateFrom: values.relocateFrom,
      relocateTo: values.relocateTo,
      createdAtFrom: values.period?.[0]?.toISOString(),
      createdAtTo: values.period?.[1]?.toISOString(),
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

  const onApplyFilter = (values: AmountEquipmentSpentReportFilterFormFields) => {
    setFilterValues(values)
    setReportParams({ ...values, offset: initialPaginationParams.offset })
    toggleOpenFilter()
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
