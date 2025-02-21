import { useBoolean, useLocalStorageState, useSetState } from 'ahooks'
import { Col, Row } from 'antd'
import { GetFiscalAccumulatorTasksReportRequest } from 'features/reports/api/schemas'
import {
  FiscalAccumulatorTasksReportFilterFormFields,
  FiscalAccumulatorTasksReportFilterProps,
} from 'features/reports/components/FiscalAccumulatorTasksReportFilter/types'
import FiscalAccumulatorTasksReportTable from 'features/reports/components/FiscalAccumulatorTasksReportTable'
import {
  FiscalAccumulatorTasksReportTableItem,
  FiscalAccumulatorTasksReportTableProps,
} from 'features/reports/components/FiscalAccumulatorTasksReportTable/types'
import { useGetFiscalAccumulatorTasksReport } from 'features/reports/hooks'
import TasksFiltersStorage, {
  TasksFilterStorageItem,
} from 'features/tasks/components/TasksFiltersStorage'
import UpdateTasksButton from 'features/tasks/components/UpdateTasksButton'
import { TasksUpdateVariantsEnum, tasksUpdateVariantsIntervals } from 'features/tasks/constants'
import { TaskStorageKeysEnum } from 'features/tasks/services/taskLocalStorageService/constants'
import { TasksFiltersStorageType } from 'features/tasks/services/taskLocalStorageService/taskLocalStorage.service'
import { parseTasksFiltersStorage } from 'features/tasks/services/taskLocalStorageService/helpers'
import debounce from 'lodash/debounce'
import pick from 'lodash/pick'
import React, { FC, useCallback, useState } from 'react'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'

import { useGetCustomersCatalog } from 'shared/catalogs/customers/hooks'
import { useGetMacroregionsCatalog } from 'shared/catalogs/macroregions/hooks'
import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { useGetSupportGroups } from 'shared/supportGroups/hooks'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'

const FiscalAccumulatorTasksReportFilter = React.lazy(
  () => import('features/reports/components/FiscalAccumulatorTasksReportFilter'),
)

const TaskDetails = React.lazy(() => import('features/tasks/components/TaskDetails'))

const initialFilterValues: Readonly<FiscalAccumulatorTasksReportFilterFormFields> = {
  customers: [],
  macroregions: [],
  supportGroups: [],
}

const FiscalAccumulatorTasksReportPage: FC = () => {
  const [filterOpened, { toggle: toggleOpenFilter }] = useBoolean(false)
  const debouncedToggleOpenFilter = useDebounceFn(toggleOpenFilter)

  const [selectedTask, setSelectedTask] = useState<FiscalAccumulatorTasksReportTableItem>()
  const [taskOpened, { setTrue: openTask, setFalse: originCloseTask }] = useBoolean(false)
  const closeTask = useDebounceFn(originCloseTask)

  const [additionalInfoExpanded, { toggle: toggleAdditionalInfoExpanded }] = useBoolean(false)

  const [autoUpdateEnabled, { toggle: toggleAutoUpdateEnabled }] = useBoolean(false)

  const [tasksFiltersStorage, setTasksFiltersStorage] = useLocalStorageState<
    MaybeUndefined<TasksFiltersStorageType>
  >(TaskStorageKeysEnum.TasksFilters)

  const [selectedCustomers, setSelectedCustomers] = useState<MaybeUndefined<IdType[]>>(
    tasksFiltersStorage?.customers,
  )

  const [selectedMacroregions, setSelectedMacroregions] = useState<MaybeUndefined<IdType[]>>(
    tasksFiltersStorage?.macroregions,
  )

  const [filterValues, setFilterValues] = useSetState<FiscalAccumulatorTasksReportFilterFormFields>(
    {
      ...initialFilterValues,
      ...tasksFiltersStorage,
    },
  )

  const [fiscalAccumulatorTasksRequestArgs, setFiscalAccumulatorTasksRequestArgs] =
    useSetState<GetFiscalAccumulatorTasksReportRequest>(tasksFiltersStorage || {})

  const { currentData: customers = [], isFetching: customersIsFetching } = useGetCustomersCatalog(
    undefined,
    { skip: !filterOpened },
  )

  const { currentData: macroregions = [], isFetching: macroregionsIsFetching } =
    useGetMacroregionsCatalog({ customers: selectedCustomers }, { skip: !filterOpened })

  const { currentData: supportGroups = [], isFetching: supportGroupsIsFetching } =
    useGetSupportGroups(
      {
        customers: selectedCustomers,
        macroregions: selectedMacroregions,
        assignedToUser: true,
      },
      { skip: !filterOpened },
    )

  const {
    currentData: fiscalAccumulatorTasks = [],
    isFetching: fiscalAccumulatorTasksIsFetching,
    refetch: refetchFiscalAccumulatorTasks,
  } = useGetFiscalAccumulatorTasksReport(fiscalAccumulatorTasksRequestArgs, {
    pollingInterval: autoUpdateEnabled
      ? tasksUpdateVariantsIntervals[TasksUpdateVariantsEnum.AutoUpdate1M]
      : undefined,
  })

  const handleApplyFilter: FiscalAccumulatorTasksReportFilterProps['onSubmit'] = (values) => {
    setFilterValues(values)
    setFiscalAccumulatorTasksRequestArgs(values)
    setTasksFiltersStorage(pick(values, 'customers', 'macroregions', 'supportGroups'))
    toggleOpenFilter()
  }

  const handleRemoveTasksFilter = (filter: TasksFilterStorageItem) => {
    setFilterValues({ [filter.name]: undefined })
    if (filter.name === 'customers') setSelectedCustomers([])
    if (filter.name === 'macroregions') setSelectedMacroregions([])
    setFiscalAccumulatorTasksRequestArgs({ [filter.name]: undefined })
    setTasksFiltersStorage((prevState) => ({ ...prevState, [filter.name]: undefined }))
  }

  const onClickRow = useCallback<FiscalAccumulatorTasksReportTableProps['onRow']>(
    (record) => ({
      onClick: debounce(() => {
        setSelectedTask(record)
        openTask()
      }, DEFAULT_DEBOUNCE_VALUE),
    }),
    [openTask],
  )

  return (
    <>
      <Row data-testid='fiscal-accumulator-tasks-report-page' gutter={[24, 24]}>
        <Col span={24}>
          <Row justify='space-between' gutter={[16, 16]}>
            <Col>
              <Row align='middle' gutter={24}>
                <Col>
                  <FilterButton
                    onClick={debouncedToggleOpenFilter}
                    disabled={fiscalAccumulatorTasksIsFetching}
                  />
                </Col>

                {tasksFiltersStorage && (
                  <Col>
                    <TasksFiltersStorage
                      filters={parseTasksFiltersStorage(tasksFiltersStorage)}
                      onClose={handleRemoveTasksFilter}
                    />
                  </Col>
                )}
              </Row>
            </Col>

            <Col>
              <UpdateTasksButton
                onClick={refetchFiscalAccumulatorTasks}
                disabled={fiscalAccumulatorTasksIsFetching}
                onAutoUpdate={toggleAutoUpdateEnabled}
              />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <FiscalAccumulatorTasksReportTable
            loading={fiscalAccumulatorTasksIsFetching}
            dataSource={fiscalAccumulatorTasks}
            onRow={onClickRow}
          />
        </Col>
      </Row>

      {filterOpened && (
        <React.Suspense fallback={<ModalFallback open onCancel={debouncedToggleOpenFilter} />}>
          <FiscalAccumulatorTasksReportFilter
            open={filterOpened}
            values={filterValues}
            initialValues={initialFilterValues}
            customers={customers}
            customersIsLoading={customersIsFetching}
            onChangeCustomers={setSelectedCustomers}
            macroregions={macroregions}
            macroregionsIsLoading={macroregionsIsFetching}
            onChangeMacroregions={setSelectedMacroregions}
            supportGroups={supportGroups}
            supportGroupsIsLoading={supportGroupsIsFetching}
            onClose={debouncedToggleOpenFilter}
            onSubmit={handleApplyFilter}
          />
        </React.Suspense>
      )}

      {taskOpened && selectedTask && (
        <React.Suspense fallback={<ModalFallback open onCancel={closeTask} />}>
          <TaskDetails
            taskId={selectedTask.id}
            onClose={closeTask}
            additionalInfoExpanded={additionalInfoExpanded}
            onExpandAdditionalInfo={toggleAdditionalInfoExpanded}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default FiscalAccumulatorTasksReportPage
