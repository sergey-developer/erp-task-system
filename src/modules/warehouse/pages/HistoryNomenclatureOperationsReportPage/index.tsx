import { useSetState } from 'ahooks'
import { Col, Row } from 'antd'
import React, { FC } from 'react'

import HistoryNomenclatureOperationsReportForm from 'modules/reports/components/HistoryNomenclatureOperationsReportForm'
import { HistoryNomenclatureOperationsReportFormProps } from 'modules/reports/components/HistoryNomenclatureOperationsReportForm/types'
import { useGetEquipmentNomenclatureList } from 'modules/warehouse/hooks/equipment'

import { useGetLocationList } from 'shared/hooks/catalogs/location'
import { IdType } from 'shared/types/common'
import { PaginationParams } from 'shared/types/pagination'
import { extractPaginationResults, getInitialPaginationParams } from 'shared/utils/pagination'

const initialPaginationParams = getInitialPaginationParams()

const HistoryNomenclatureOperationsReportPage: FC = () => {
  const [reportParams, setReportParams] = useSetState<
    Partial<
      PaginationParams & {
        nomenclature: IdType
        relocateFrom: IdType
        relocateTo: IdType
        createdAtFrom: string
        createdAtTo: string
      }
    >
  >({
    ...initialPaginationParams,
  })

  const { currentData: equipmentNomenclatures, isFetching: equipmentNomenclaturesIsFetching } =
    useGetEquipmentNomenclatureList()

  const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocationList()

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
      </Row>
    </>
  )
}

export default HistoryNomenclatureOperationsReportPage
