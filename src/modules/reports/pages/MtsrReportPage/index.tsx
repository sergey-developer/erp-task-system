import { useSetState } from 'ahooks'
import { Col, Flex, Radio, RadioGroupProps, Row } from 'antd'
import React, { FC, useCallback, useState } from 'react'

import MtsrReportForm from 'modules/reports/components/MtsrReportForm'
import { MtsrReportFormProps } from 'modules/reports/components/MtsrReportForm/types'
import MtsrReportTable from 'modules/reports/components/MtsrReportTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'modules/reports/components/MtsrReportTable/sort'
import { MtsrReportTableProps } from 'modules/reports/components/MtsrReportTable/types'
import {
  useGetMacroregionsMtsrReport,
  useGetSupportGroupsMtsrReport,
  useGetUsersMtsrReport,
  useGetWorkGroupsMtsrReport,
} from 'modules/reports/hooks'
import { GetMtsrReportBaseQueryArgs } from 'modules/reports/types'
import { useGetCustomerList } from 'modules/warehouse/hooks/customer'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { IdType } from 'shared/types/common'
import { formatDate } from 'shared/utils/date'

import {
  getMtsrReportInitialQueryArgs,
  initialLevelObjects,
  mtsrReportFormInitialValues,
  mtsrReportLevelDict,
  MtsrReportLevelEnum,
} from './constants'

const MtsrReportPage: FC = () => {
  const [selectedReportLevel, setSelectedReportLevel] = useState<MtsrReportLevelEnum>(
    MtsrReportLevelEnum.Macroregions,
  )

  const [selectedReportLevelObjects, setSelectedReportLevelObjects] =
    useSetState<typeof initialLevelObjects>(initialLevelObjects)

  const [baseMtsrReportQueryArgs, setBaseMtsrReportQueryArgs] =
    useSetState<GetMtsrReportBaseQueryArgs>(getMtsrReportInitialQueryArgs)

  const { currentData: macroregionsMtsrReport = [], isFetching: macroregionsMtsrReportIsFetching } =
    useGetMacroregionsMtsrReport(baseMtsrReportQueryArgs, {
      skip: selectedReportLevel !== MtsrReportLevelEnum.Macroregions,
    })

  const {
    currentData: supportGroupsMtsrReport = [],
    isFetching: supportGroupsMtsrReportIsFetching,
  } = useGetSupportGroupsMtsrReport(
    {
      ...baseMtsrReportQueryArgs,
      macroregions: selectedReportLevelObjects[MtsrReportLevelEnum.Macroregions],
    },
    {
      skip: selectedReportLevel !== MtsrReportLevelEnum.SupportGroups,
    },
  )

  const { currentData: workGroupsMtsrReport = [], isFetching: workGroupsMtsrReportIsFetching } =
    useGetWorkGroupsMtsrReport(
      {
        ...baseMtsrReportQueryArgs,
        macroregions: selectedReportLevelObjects[MtsrReportLevelEnum.Macroregions],
        supportGroups: selectedReportLevelObjects[MtsrReportLevelEnum.SupportGroups],
      },
      {
        skip: selectedReportLevel !== MtsrReportLevelEnum.WorkGroups,
      },
    )

  const { currentData: usersMtsrReport = [], isFetching: usersMtsrReportIsFetching } =
    useGetUsersMtsrReport(
      {
        ...baseMtsrReportQueryArgs,
        macroregions: selectedReportLevelObjects[MtsrReportLevelEnum.Macroregions],
        supportGroups: selectedReportLevelObjects[MtsrReportLevelEnum.SupportGroups],
        workGroups: selectedReportLevelObjects[MtsrReportLevelEnum.WorkGroups],
      },
      {
        skip: selectedReportLevel !== MtsrReportLevelEnum.Users,
      },
    )

  const { currentData: customers = [], isFetching: customersIsFetching } = useGetCustomerList()

  const onClickUpdate = useCallback<MtsrReportFormProps['onSubmit']>(
    (values) => {
      setBaseMtsrReportQueryArgs({
        customers: values.customers,
        dateStart: formatDate(values.period[0], DATE_FORMAT),
        dateEnd: formatDate(values.period[1], DATE_FORMAT),
      })
    },
    [setBaseMtsrReportQueryArgs],
  )

  const onTableSort = useCallback(
    (sorter: Parameters<MtsrReportTableProps['onChange']>[2]) => {
      if (sorter) {
        const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter

        if (field && (field as string) in sortableFieldToSortValues) {
          setBaseMtsrReportQueryArgs({
            ordering: order ? getSort(field as SortableField, order) : undefined,
          })
        }
      }
    },
    [setBaseMtsrReportQueryArgs],
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

  const report =
    macroregionsMtsrReport || supportGroupsMtsrReport || workGroupsMtsrReport || usersMtsrReport

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
          sort={baseMtsrReportQueryArgs?.ordering}
        />
      </Flex>
    </Flex>
  )
}

export default MtsrReportPage
