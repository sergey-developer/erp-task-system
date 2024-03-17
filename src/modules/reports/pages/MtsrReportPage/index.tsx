import { useSetState } from 'ahooks'
import { Col, Flex, Row } from 'antd'
import moment from 'moment-timezone'
import { FC, useCallback, useState } from 'react'

import MtsrReportForm from 'modules/reports/components/MtsrReportForm'
import {
  MtsrReportFormFields,
  MtsrReportFormProps,
} from 'modules/reports/components/MtsrReportForm/types'
import MtsrReportTable from 'modules/reports/components/MtsrReportTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'modules/reports/components/MtsrReportTable/sort'
import { MtsrReportTableProps } from 'modules/reports/components/MtsrReportTable/types'
import {
  GetMacroregionsMtsrReportQueryArgs,
  GetSupportGroupsMtsrReportQueryArgs,
  GetUsersMtsrReportQueryArgs,
  GetWorkGroupsMtsrReportQueryArgs,
} from 'modules/reports/models'
import { useGetCustomerList } from 'modules/warehouse/hooks/customer'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { IdType } from 'shared/types/common'
import { formatDate } from 'shared/utils/date'

const mtsrReportFormInitialValues: MtsrReportFormFields = {
  period: [moment().set('date', 1), moment()],
}

type GetMtsrReportQueryArgs =
  | GetMacroregionsMtsrReportQueryArgs
  | GetSupportGroupsMtsrReportQueryArgs
  | GetWorkGroupsMtsrReportQueryArgs
  | GetUsersMtsrReportQueryArgs

const MtsrReportPage: FC = () => {
  const [selectedTableRowsKeys, setSelectedTableRowsKeys] = useState<IdType[]>([])

  const [mtsrReportQueryArgs, setMtsrReportQueryArgs] = useSetState<GetMtsrReportQueryArgs>({
    dateStart: formatDate(mtsrReportFormInitialValues.period[0], DATE_FORMAT),
    dateEnd: formatDate(mtsrReportFormInitialValues.period[1], DATE_FORMAT),
    ordering: '-average_execution_time',
  })

  const { currentData: customers = [], isFetching: customersIsFetching } = useGetCustomerList()

  const onClickUpdate = useCallback<MtsrReportFormProps['onSubmit']>(
    (values) => {
      setMtsrReportQueryArgs({
        customers: values.customers,
        dateStart: formatDate(values.period[0], DATE_FORMAT),
        dateEnd: formatDate(values.period[1], DATE_FORMAT),
      })
    },
    [setMtsrReportQueryArgs],
  )

  const onTableSort = useCallback(
    (sorter: Parameters<MtsrReportTableProps['onChange']>[2]) => {
      if (sorter) {
        const { columnKey, order } = Array.isArray(sorter) ? sorter[0] : sorter

        if (columnKey && (columnKey as string) in sortableFieldToSortValues) {
          setMtsrReportQueryArgs({
            ordering: order ? getSort(columnKey as SortableField, order) : undefined,
          })
        }
      }
    },
    [setMtsrReportQueryArgs],
  )

  const onChangeTable = useCallback<MtsrReportTableProps['onChange']>(
    (_, __, sorter) => {
      onTableSort(sorter)
    },
    [onTableSort],
  )

  const onSelectTableRow = useCallback<MtsrReportTableProps['onSelect']>((selectedRowKeys) => {
    setSelectedTableRowsKeys(selectedRowKeys as IdType[])
  }, [])

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

      <MtsrReportTable
        dataSource={[
          {
            id: 1,
            title: 'title1',
            completedTasks: 1,
            allTasks: 1,
            averageExecutionTime: 1,
            overdueTasks: 1,
            returnedAmount: 1,
          },
          {
            id: 2,
            title: 'title2',
            completedTasks: 2,
            allTasks: 2,
            averageExecutionTime: 2,
            overdueTasks: 2,
            returnedAmount: 2,
          },
        ]}
        loading={false}
        onChange={onChangeTable}
        onSelect={onSelectTableRow}
        sort={mtsrReportQueryArgs?.ordering}
      />
    </Flex>
  )
}

export default MtsrReportPage
