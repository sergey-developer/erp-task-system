import { useSetState } from 'ahooks'
import { Col, Row, Typography } from 'antd'
import React, { FC, useCallback } from 'react'

import HistoryNomenclatureOperationsReportForm from 'modules/reports/components/HistoryNomenclatureOperationsReportForm'
import { HistoryNomenclatureOperationsReportFormProps } from 'modules/reports/components/HistoryNomenclatureOperationsReportForm/types'
import HistoryNomenclatureOperationsReportTable from 'modules/reports/components/HistoryNomenclatureOperationsReportTable'
import { HistoryNomenclatureOperationsReportTableProps } from 'modules/reports/components/HistoryNomenclatureOperationsReportTable/types'
import { useGetHistoryNomenclatureOperationsReport } from 'modules/reports/hooks'
import { GetHistoryNomenclatureOperationsReportQueryArgs } from 'modules/reports/models'
import { useGetEquipmentNomenclatureList } from 'modules/warehouse/hooks/equipment'

import Space from 'components/Space'

import { useGetLocationList } from 'shared/hooks/catalogs/location'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

const initialPaginationParams = getInitialPaginationParams()
const { Title } = Typography

const HistoryNomenclatureOperationsReportPage: FC = () => {
  const [reportParams, setReportParams] =
    useSetState<GetHistoryNomenclatureOperationsReportQueryArgs>(initialPaginationParams)

  const isShowReport =
    !!reportParams.nomenclature && (!!reportParams.relocateFrom || !!reportParams.relocateTo)

  const { currentData: report, isFetching: reportIsFetching } =
    useGetHistoryNomenclatureOperationsReport(reportParams, { skip: !isShowReport })

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
              <Title level={5}>Действия сотрудников</Title>

              <HistoryNomenclatureOperationsReportTable
                dataSource={extractPaginationResults(report)}
                pagination={extractPaginationParams(report)}
                loading={reportIsFetching}
                onChange={onChangeTable}
                onClickEquipment={() => {}}
                onClickRelocationTask={() => {}}
              />
            </Space>
          </Col>
        )}
      </Row>
    </>
  )
}

export default HistoryNomenclatureOperationsReportPage
