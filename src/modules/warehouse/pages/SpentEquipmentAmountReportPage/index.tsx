import { useSetState } from 'ahooks'
import { Col, Row } from 'antd'
import React, { FC } from 'react'

import SpentEquipmentAmountReportForm from 'modules/reports/components/SpentEquipmentAmountReportForm'
import { SpentEquipmentAmountReportFormProps } from 'modules/reports/components/SpentEquipmentAmountReportForm/types'
import { useGetEquipmentNomenclatureList } from 'modules/warehouse/hooks/equipment'

import { useGetLocationList } from 'shared/hooks/catalogs/location'
import { IdType } from 'shared/types/common'
import { PaginationParams } from 'shared/types/pagination'
import { extractPaginationResults, getInitialPaginationParams } from 'shared/utils/pagination'

const initialPaginationParams = getInitialPaginationParams()

const SpentEquipmentAmountReportPage: FC = () => {
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

  const onClickUpdate: SpentEquipmentAmountReportFormProps['onSubmit'] = (values) => {
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
      <Row data-testid='spent-equipment-amount-report-page' gutter={[0, 16]}>
        <Col span={7}>
          <SpentEquipmentAmountReportForm
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

export default SpentEquipmentAmountReportPage
