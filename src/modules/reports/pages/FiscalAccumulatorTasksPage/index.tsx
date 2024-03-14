import { useBoolean, useLocalStorageState, useSetState } from 'ahooks'
import { Col, Row } from 'antd'
import debounce from 'lodash/debounce'
import pick from 'lodash/pick'
import React, { FC, useCallback, useState } from 'react'

import FiscalAccumulatorTaskTable from 'modules/reports/components/FiscalAccumulatorTaskTable'
import {
  FiscalAccumulatorTaskTableItem,
  FiscalAccumulatorTaskTableProps,
} from 'modules/reports/components/FiscalAccumulatorTaskTable/types'
import {
  FiscalAccumulatorTasksFilterFormFields,
  FiscalAccumulatorTasksFilterProps,
} from 'modules/reports/components/FiscalAccumulatorTasksFilter/types'
import { useGetFiscalAccumulatorTasks } from 'modules/reports/hooks'
import { GetFiscalAccumulatorTasksQueryArgs } from 'modules/reports/models'
import { useGetSupportGroupList } from 'modules/supportGroup/hooks'
import TasksFiltersStorage, {
  TasksFilterStorageItem,
} from 'modules/task/components/TasksFiltersStorage'
import UpdateTasksButton from 'modules/task/components/UpdateTasksButton'
import {
  TaskStorageKeysEnum,
  TasksUpdateVariantsEnum,
  tasksUpdateVariantsIntervals,
} from 'modules/task/constants/task'
import { TasksFiltersStorageType } from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'
import { parseTasksFiltersStorage } from 'modules/task/services/taskLocalStorageService/utils'
import { useGetCustomerList } from 'modules/warehouse/hooks/customer'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'

import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { useGetMacroregionList } from 'shared/hooks/macroregion'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'

const FiscalAccumulatorTasksFilter = React.lazy(
  () => import('modules/reports/components/FiscalAccumulatorTasksFilter'),
)

const TaskDetails = React.lazy(() => import('modules/task/components/TaskDetails'))

const initialFilterValues: Readonly<FiscalAccumulatorTasksFilterFormFields> = {
  customers: [],
  macroregions: [],
  supportGroups: [],
}

const FiscalAccumulatorTasksPage: FC = () => {
  const [filterOpened, { toggle: toggleOpenFilter }] = useBoolean(false)
  const debouncedToggleOpenFilter = useDebounceFn(toggleOpenFilter)

  const [selectedTask, setSelectedTask] = useState<FiscalAccumulatorTaskTableItem>()
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

  const [filterValues, setFilterValues] = useSetState<FiscalAccumulatorTasksFilterFormFields>({
    ...initialFilterValues,
    ...tasksFiltersStorage,
  })

  const [fiscalAccumulatorTasksQueryArgs, setFiscalAccumulatorTasksQueryArgs] =
    useSetState<GetFiscalAccumulatorTasksQueryArgs>(tasksFiltersStorage || {})

  const { currentData: customers = [], isFetching: customersIsFetching } = useGetCustomerList(
    undefined,
    { skip: !filterOpened },
  )

  const { currentData: macroregions = [], isFetching: macroregionsIsFetching } =
    useGetMacroregionList({ customers: selectedCustomers }, { skip: !filterOpened })

  const { currentData: supportGroups = [], isFetching: supportGroupsIsFetching } =
    useGetSupportGroupList(
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
  } = useGetFiscalAccumulatorTasks(fiscalAccumulatorTasksQueryArgs, {
    pollingInterval: autoUpdateEnabled
      ? tasksUpdateVariantsIntervals[TasksUpdateVariantsEnum.AutoUpdate1M]
      : undefined,
  })

  const handleApplyFilter: FiscalAccumulatorTasksFilterProps['onSubmit'] = (values) => {
    setFilterValues(values)
    setFiscalAccumulatorTasksQueryArgs(values)
    setTasksFiltersStorage(pick(values, 'customers', 'macroregions', 'supportGroups'))
    toggleOpenFilter()
  }

  const handleRemoveTasksFilter = (filter: TasksFilterStorageItem) => {
    setFilterValues({ [filter.name]: undefined })
    if (filter.name === 'customers') setSelectedCustomers([])
    if (filter.name === 'macroregions') setSelectedMacroregions([])
    setFiscalAccumulatorTasksQueryArgs({ [filter.name]: undefined })
    setTasksFiltersStorage((prevState) => ({ ...prevState, [filter.name]: undefined }))
  }

  const onClickRow = useCallback<FiscalAccumulatorTaskTableProps['onRow']>(
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
      <Row data-testid='fiscal-accumulator-tasks-page' gutter={[24, 24]}>
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
          <FiscalAccumulatorTaskTable
            loading={fiscalAccumulatorTasksIsFetching}
            dataSource={fiscalAccumulatorTasks}
            onRow={onClickRow}
          />
        </Col>
      </Row>

      {filterOpened && (
        <React.Suspense fallback={<ModalFallback open onCancel={debouncedToggleOpenFilter} />}>
          <FiscalAccumulatorTasksFilter
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

export default FiscalAccumulatorTasksPage
