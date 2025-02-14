import { useSetState } from 'ahooks'
import { Col, Flex, Radio, RadioGroupProps, Row } from 'antd'
import { GetMtsrReportBaseRequest } from 'features/reports/api/types'
import MtsrReportForm from 'features/reports/components/MtsrReportForm'
import { MtsrReportFormProps } from 'features/reports/components/MtsrReportForm/types'
import MtsrReportTable from 'features/reports/components/MtsrReportTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'features/reports/components/MtsrReportTable/sort'
import { MtsrReportTableProps } from 'features/reports/components/MtsrReportTable/types'
import {
  useGetMacroregionsMtsrReport,
  useGetSupportGroupsMtsrReport,
  useGetUsersMtsrReport,
  useGetWorkGroupsMtsrReport,
} from 'features/reports/hooks'
import React, { FC, useCallback, useState } from 'react'

import { useGetCustomersCatalog } from 'shared/catalogs/customers/hooks'
import { DATE_FORMAT } from 'shared/constants/dateTime'
import { IdType } from 'shared/types/common'
import { formatDate } from 'shared/utils/date'

import {
  getMtsrReportInitialRequest,
  initialLevelObjects,
  mtsrReportFormInitialValues,
  mtsrReportLevelDict,
  MtsrReportLevelEnum,
} from './constants'
import {
  checkIsMacroregionsReportLevel,
  checkIsSupportGroupsReportLevel,
  checkIsUsersReportLevel,
  checkIsWorkGroupsReportLevel,
} from './utils'

const MtsrReportPage: FC = () => {
  const [selectedReportLevel, setSelectedReportLevel] = useState<MtsrReportLevelEnum>(
    MtsrReportLevelEnum.Macroregions,
  )
  const isMacroregionsReportLevel = checkIsMacroregionsReportLevel(selectedReportLevel)
  const isSupportGroupsReportLevel = checkIsSupportGroupsReportLevel(selectedReportLevel)
  const isWorkGroupsReportLevel = checkIsWorkGroupsReportLevel(selectedReportLevel)
  const isUsersReportLevel = checkIsUsersReportLevel(selectedReportLevel)

  const [selectedReportLevelObjects, setSelectedReportLevelObjects] =
    useSetState<typeof initialLevelObjects>(initialLevelObjects)

  const [baseMtsrReportRequestArgs, setBaseMtsrReportRequestArgs] =
    useSetState<GetMtsrReportBaseRequest>(getMtsrReportInitialRequest)

  const { currentData: macroregionsMtsrReport = [], isFetching: macroregionsMtsrReportIsFetching } =
    useGetMacroregionsMtsrReport(baseMtsrReportRequest, { skip: !isMacroregionsReportLevel })

  const {
    currentData: supportGroupsMtsrReport = [],
    isFetching: supportGroupsMtsrReportIsFetching,
  } = useGetSupportGroupsMtsrReport(
    {
      ...baseMtsrReportRequest,
      macroregions: selectedReportLevelObjects[MtsrReportLevelEnum.Macroregions],
    },
    { skip: !isSupportGroupsReportLevel },
  )

  const { currentData: workGroupsMtsrReport = [], isFetching: workGroupsMtsrReportIsFetching } =
    useGetWorkGroupsMtsrReport(
      {
        ...baseMtsrReportRequest,
        macroregions: selectedReportLevelObjects[MtsrReportLevelEnum.Macroregions],
        supportGroups: selectedReportLevelObjects[MtsrReportLevelEnum.SupportGroups],
      },
      { skip: !isWorkGroupsReportLevel },
    )

  const { currentData: usersMtsrReport = [], isFetching: usersMtsrReportIsFetching } =
    useGetUsersMtsrReport(
      {
        ...baseMtsrReportRequest,
        macroregions: selectedReportLevelObjects[MtsrReportLevelEnum.Macroregions],
        supportGroups: selectedReportLevelObjects[MtsrReportLevelEnum.SupportGroups],
        workGroups: selectedReportLevelObjects[MtsrReportLevelEnum.WorkGroups],
      },
      { skip: !isUsersReportLevel },
    )

  const { currentData: customers = [], isFetching: customersIsFetching } = useGetCustomersCatalog()

  const onClickUpdate = useCallback<MtsrReportFormProps['onSubmit']>(
    (values) => {
      setBaseMtsrReportRequest({
        customers: values.customers,
        dateStart: formatDate(values.period[0], DATE_FORMAT),
        dateEnd: formatDate(values.period[1], DATE_FORMAT),
      })
    },
    [setBaseMtsrReportRequest],
  )

  const onTableSort = useCallback(
    (sorter: Parameters<MtsrReportTableProps['onChange']>[2]) => {
      if (sorter) {
        const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter

        if (field && (field as string) in sortableFieldToSortValues) {
          setBaseMtsrReportRequest({
            ordering: order ? getSort(field as SortableField, order) : undefined,
          })
        }
      }
    },
    [setBaseMtsrReportRequest],
  )

  const onChangeTable = useCallback<MtsrReportTableProps['onChange']>(
    (_, __, sorter) => {
      onTableSort(sorter)
    },
    [onTableSort],
  )

  const onSelectTableRow = useCallback<MtsrReportTableProps['onSelect']>(
    (selectedRowKeys) => {
      setSelectedReportLevelObjects({ [selectedReportLevel]: selectedRowKeys as IdType[] })
    },
    [selectedReportLevel, setSelectedReportLevelObjects],
  )

  const onChangeReportLevel: RadioGroupProps['onChange'] = ({ target: { value } }) => {
    setSelectedReportLevel(value as MtsrReportLevelEnum)
  }

  const report = isMacroregionsReportLevel
    ? macroregionsMtsrReport
    : isSupportGroupsReportLevel
    ? supportGroupsMtsrReport
    : isWorkGroupsReportLevel
    ? workGroupsMtsrReport
    : isUsersReportLevel
    ? usersMtsrReport
    : []

  const reportIsLoading =
    macroregionsMtsrReportIsFetching ||
    supportGroupsMtsrReportIsFetching ||
    workGroupsMtsrReportIsFetching ||
    usersMtsrReportIsFetching

  return (
    <Flex data-testid='mtsr-report-page' vertical gap='large'>
      <Row>
        <Col span={7}>
          <MtsrReportForm
            initialValues={mtsrReportFormInitialValues}
            customers={customers}
            customersIsLoading={customersIsFetching}
            onSubmit={onClickUpdate}
          />
        </Col>
      </Row>

      <Flex vertical gap='middle'>
        <Radio.Group buttonStyle='solid' value={selectedReportLevel} onChange={onChangeReportLevel}>
          {Object.keys(mtsrReportLevelDict).map((key) => (
            <Radio.Button key={key} value={key}>
              {mtsrReportLevelDict[key as MtsrReportLevelEnum]}
            </Radio.Button>
          ))}
        </Radio.Group>

        <MtsrReportTable
          dataSource={report}
          loading={reportIsLoading}
          onChange={onChangeTable}
          onSelect={onSelectTableRow}
          selectedRowKeys={selectedReportLevelObjects[selectedReportLevel] as React.Key[]}
          sort={baseMtsrReportRequest?.ordering}
        />
      </Flex>
    </Flex>
  )
}

export default MtsrReportPage
