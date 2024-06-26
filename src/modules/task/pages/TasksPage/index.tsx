import { useBoolean, useLocalStorageState, usePrevious, useSetState } from 'ahooks'
import { Button, Col, Input, Row, Space } from 'antd'
import { SearchProps } from 'antd/es/input'
import debounce from 'lodash/debounce'
import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useGetSupportGroupList } from 'modules/supportGroup/hooks'
import FastFilters from 'modules/task/components/FastFilters'
import { fastFiltersConfig } from 'modules/task/components/FastFilters/config'
import TaskTable from 'modules/task/components/TaskTable'
import {
  SortableField,
  sortableFieldToSortValues,
} from 'modules/task/components/TaskTable/constants/sort'
import { TaskTableProps } from 'modules/task/components/TaskTable/types'
import { getSort, parseSort } from 'modules/task/components/TaskTable/utils'
import { TasksFilterFormFields, TasksFilterProps } from 'modules/task/components/TasksFilter/types'
import TasksFiltersStorage, {
  TasksFilterStorageItem,
} from 'modules/task/components/TasksFiltersStorage'
import UpdateTasksButton from 'modules/task/components/UpdateTasksButton'
import {
  FastFilterEnum,
  FilterTypeEnum,
  TaskDetailsTabsEnum,
  TaskStorageKeysEnum,
  TasksUpdateVariantsEnum,
  tasksUpdateVariantsIntervals,
} from 'modules/task/constants/task'
import { useGetTasks } from 'modules/task/hooks/task'
import { useGetTaskCounters } from 'modules/task/hooks/taskCounters'
import { FastFilterQueries, GetTasksQueryArgs, TasksFilterQueries } from 'modules/task/models'
import { TasksFiltersStorageType } from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'
import { parseTasksFiltersStorage } from 'modules/task/services/taskLocalStorageService/utils'
import { taskDetailsTabExist } from 'modules/task/utils/task'
import { UserPermissionsEnum } from 'modules/user/constants'
import {
  useGetUsers,
  useUserPermissions,
  useOnChangeUserStatus,
  UseOnChangeUserStatusFn,
} from 'modules/user/hooks'
import { checkUserStatusOffline } from 'modules/user/utils'
import { useGetCustomerList } from 'modules/warehouse/hooks/customer'
import { useGetWorkGroups } from 'modules/workGroup/hooks'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'

import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { SortOrderEnum } from 'shared/constants/sort'
import { useGetMacroregions } from 'shared/hooks/macroregion'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { useDrawerHeightByTable } from 'shared/hooks/useDrawerHeightByTable'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'
import { MaybeUndefined } from 'shared/types/utils'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import { DEFAULT_PAGE_SIZE, tableItemBoundaryStyles } from './constants'
import {
  getInitialTasksFilterValues,
  getTasksByOlaNextBreachTime,
  mapFilterToQueryArgs,
} from './utils'

const TaskDetails = React.lazy(() => import('modules/task/components/TaskDetails'))
const TasksFilter = React.lazy(() => import('modules/task/components/TasksFilter'))

const { Search } = Input
const initialTasksFilterValues = getInitialTasksFilterValues()

const TasksPage: FC = () => {
  const permissions = useUserPermissions([
    UserPermissionsEnum.SelfWorkGroupsRead,
    UserPermissionsEnum.AnyWorkGroupsRead,
    UserPermissionsEnum.FirstLineTasksRead,
    UserPermissionsEnum.SecondLineTasksRead,
    UserPermissionsEnum.WorkGroupTasksRead,
  ])

  const { tableRef, drawerHeight } = useDrawerHeightByTable()

  // todo: создать хук для useSearchParams который парсит значения в нужный тип
  const [searchParams] = useSearchParams()
  const viewTaskId = Number(searchParams.get('viewTask')) || undefined
  const taskDetailsTab = taskDetailsTabExist(searchParams.get('taskDetailsTab') || '')
    ? (searchParams.get('taskDetailsTab') as TaskDetailsTabsEnum)
    : undefined

  const [autoUpdateEnabled, { toggle: toggleAutoUpdateEnabled }] = useBoolean(false)

  const [selectedTaskId, setSelectedTaskId] = useState<MaybeUndefined<IdType>>(viewTaskId)
  const [additionalInfoExpanded, { toggle: toggleAdditionalInfoExpanded }] = useBoolean(false)

  const [activeTaskDetailsTab, setActiveTaskDetailsTab] =
    useState<MaybeUndefined<TaskDetailsTabsEnum>>(taskDetailsTab)

  const initialFastFilter = FastFilterEnum.All
  const [fastFilter, setFastFilter] = useState<MaybeUndefined<FastFilterEnum>>(initialFastFilter)

  const [tasksFilterOpened, { toggle: toggleOpenTasksFilter }] = useBoolean(false)
  const debouncedToggleOpenTasksFilter = useDebounceFn(toggleOpenTasksFilter)

  const [tasksFiltersStorage, setTasksFiltersStorage] = useLocalStorageState<
    MaybeUndefined<TasksFiltersStorageType>
  >(TaskStorageKeysEnum.TasksFilters)
  const parsedTasksFiltersStorage = tasksFiltersStorage
    ? parseTasksFiltersStorage(tasksFiltersStorage)
    : []

  const [selectedCustomers, setSelectedCustomers] = useState<MaybeUndefined<IdType[]>>(
    tasksFiltersStorage?.customers,
  )
  const [selectedMacroregions, setSelectedMacroregions] = useState<MaybeUndefined<IdType[]>>(
    tasksFiltersStorage?.macroregions,
  )

  const [tasksFilterValues, setTasksFilterValues] = useSetState<TasksFilterFormFields>({
    ...initialTasksFilterValues,
    ...tasksFiltersStorage,
  })

  const [getTasksQueryArgs, setGetTasksQueryArgs] = useSetState<GetTasksQueryArgs>(() => ({
    filter: initialFastFilter,
    ...getInitialPaginationParams({ limit: DEFAULT_PAGE_SIZE }),
    ...tasksFiltersStorage,
    sort: getSort('olaNextBreachTime', SortOrderEnum.Ascend),
  }))

  const [searchValue, setSearchValue] = useState<string>()

  const [appliedFilterType, setAppliedFilterType] = useState<FilterTypeEnum>(FilterTypeEnum.Fast)
  const prevAppliedFilterType = usePrevious<typeof appliedFilterType>(appliedFilterType)

  // todo: refactor to avoid setting undefined
  const triggerFilterChange = useCallback(
    (filterQueryParams: TasksFilterQueries | FastFilterQueries | FilterParams) => {
      setGetTasksQueryArgs((prevState) => ({
        ...prevState,
        offset: 0,
        completeAtFrom: undefined,
        completeAtTo: undefined,
        filter: undefined,
        status: undefined,
        isOverdue: undefined,
        isAssigned: undefined,
        searchByAssignee: undefined,
        searchByName: undefined,
        searchByTitle: undefined,
        search: undefined,
        workGroupId: undefined,
        manager: undefined,
        ...filterQueryParams,
      }))
    },
    [setGetTasksQueryArgs],
  )

  const onChangeUserStatus = useCallback<UseOnChangeUserStatusFn>(
    (status) => {
      if (checkUserStatusOffline(status)) {
        setTasksFiltersStorage(undefined)
        const initialSupportGroupFilters = pick(
          initialTasksFilterValues,
          'customers',
          'macroregions',
          'supportGroups',
        )
        setTasksFilterValues(initialSupportGroupFilters)
        setSelectedCustomers(initialSupportGroupFilters.customers)
        setSelectedMacroregions(initialSupportGroupFilters.macroregions)
        triggerFilterChange(initialSupportGroupFilters)
      }
    },
    [setTasksFilterValues, setTasksFiltersStorage, triggerFilterChange],
  )

  useOnChangeUserStatus(onChangeUserStatus)

  const {
    data: taskCounters,
    isError: isGetTaskCountersError,
    isFetching: taskCountersIsFetching,
    refetch: refetchTaskCounters,
  } = useGetTaskCounters(tasksFiltersStorage, {
    pollingInterval: autoUpdateEnabled
      ? tasksUpdateVariantsIntervals[TasksUpdateVariantsEnum.AutoUpdate1M]
      : undefined,
  })

  const {
    currentData: originalTasks,
    isFetching: tasksIsFetching,
    refetch: refetchTaskList,
  } = useGetTasks(getTasksQueryArgs, {
    pollingInterval: autoUpdateEnabled
      ? tasksUpdateVariantsIntervals[TasksUpdateVariantsEnum.AutoUpdate1M]
      : undefined,
  })

  const { currentData: userList = [], isFetching: userListIsFetching } = useGetUsers(
    { isManager: true },
    { skip: !tasksFilterOpened },
  )

  const { currentData: customerList = [], isFetching: customerListIsFetching } = useGetCustomerList(
    undefined,
    { skip: !tasksFilterOpened },
  )

  const { currentData: supportGroupList = [], isFetching: supportGroupListIsFetching } =
    useGetSupportGroupList(
      {
        customers: selectedCustomers,
        macroregions: selectedMacroregions,
        assignedToUser: true,
      },
      { skip: !tasksFilterOpened },
    )

  const { currentData: macroregions = [], isFetching: macroregionsIsFetching } = useGetMacroregions(
    { customers: selectedCustomers },
    { skip: !tasksFilterOpened },
  )

  const { data: workGroups = [], isFetching: workGroupsIsFetching } = useGetWorkGroups(undefined, {
    skip: tasksFilterOpened
      ? !permissions.selfWorkGroupsRead && !permissions.anyWorkGroupsRead
      : !tasksFilterOpened,
  })

  const onApplyFilter: TasksFilterProps['onSubmit'] = (values) => {
    setAppliedFilterType(FilterTypeEnum.Extended)
    setTasksFilterValues(values)
    triggerFilterChange(mapFilterToQueryArgs(values))
    setTasksFiltersStorage(pick(values, 'customers', 'macroregions', 'supportGroups'))
    setFastFilter(undefined)
    toggleOpenTasksFilter()
    closeTask()
  }

  const resetExtendedFilterToInitialValues = () => {
    setTasksFilterValues(initialTasksFilterValues)
    setSelectedCustomers(initialTasksFilterValues.customers)
    setSelectedMacroregions(initialTasksFilterValues.macroregions)
  }

  const onFastFilterChange = (value: FastFilterEnum) => {
    setAppliedFilterType(FilterTypeEnum.Fast)
    setFastFilter(value)
    resetExtendedFilterToInitialValues()
    setSearchValue(undefined)
    triggerFilterChange({ filter: value })
    closeTask()
  }

  const onSearch = useDebounceFn<NonNullable<SearchProps['onSearch']>>(
    (value) => {
      if (value) {
        setAppliedFilterType(FilterTypeEnum.Search)
        triggerFilterChange({ search: value })
      } else {
        if (!prevAppliedFilterType) return

        setAppliedFilterType(prevAppliedFilterType)

        const prevFilter = isEqual(prevAppliedFilterType, FilterTypeEnum.Extended)
          ? mapFilterToQueryArgs(tasksFilterValues)
          : isEqual(prevAppliedFilterType, FilterTypeEnum.Fast)
          ? { filter: fastFilter }
          : {}

        triggerFilterChange(prevFilter)
      }

      closeTask()
    },
    [prevAppliedFilterType, tasksFilterValues, fastFilter],
  )

  const onChangeSearch: NonNullable<SearchProps['onChange']> = (event) => {
    const value = event.target.value
    setSearchValue(value)
    if (!value) onSearch(value)
  }

  const onTableRow = useCallback<TaskTableProps['onRow']>(
    (record) => ({
      onMouseUp: debounce(() => setSelectedTaskId(record.id), DEFAULT_DEBOUNCE_VALUE),
      ...(record.isBoundary && { style: tableItemBoundaryStyles }),
      className: isEqual(record.id, selectedTaskId) ? 'ant-table-row-selected' : '',
    }),
    [selectedTaskId],
  )

  const closeTask = useCallback(() => {
    setSelectedTaskId(undefined)
    setActiveTaskDetailsTab(undefined)
  }, [])

  const onTableSort = useCallback(
    (sorter: Parameters<TaskTableProps['onChange']>[2]) => {
      const { field, order } = isArray(sorter) ? sorter[0] : sorter

      if (field && (field as string) in sortableFieldToSortValues) {
        setGetTasksQueryArgs({
          sort: getSort(field as SortableField, order || SortOrderEnum.Ascend),
        })
      }
    },
    [setGetTasksQueryArgs],
  )

  const onTablePagination = useCallback(
    (pagination: Parameters<TaskTableProps['onChange']>[0]) => {
      setGetTasksQueryArgs(calculatePaginationParams(pagination))
    },
    [setGetTasksQueryArgs],
  )

  const onChangeTable = useCallback<TaskTableProps['onChange']>(
    (pagination, _, sorter) => {
      onTableSort(sorter)
      onTablePagination(pagination)
    },
    [onTablePagination, onTableSort],
  )

  const onRefetchTaskList = useDebounceFn(() => {
    closeTask()
    refetchTaskList()
    refetchTaskCounters()
  })

  const searchFilterApplied: boolean = isEqual(appliedFilterType, FilterTypeEnum.Search)

  const onRemoveTasksFilter = (filter: TasksFilterStorageItem) => {
    setTasksFiltersStorage((prevState) => ({ ...prevState, [filter.name]: undefined }))
    setTasksFilterValues({ [filter.name]: undefined })
    if (filter.name === 'customers') setSelectedCustomers([])
    if (filter.name === 'macroregions') setSelectedMacroregions([])
    triggerFilterChange({ [filter.name]: undefined })
  }

  const tasks = useMemo(() => {
    const extractedTasks = extractPaginationResults(originalTasks)
    const columnKey = getTasksQueryArgs.sort
      ? parseSort(getTasksQueryArgs.sort).columnKey
      : undefined

    return columnKey === 'olaNextBreachTime'
      ? getTasksByOlaNextBreachTime(extractedTasks)
      : extractedTasks
  }, [originalTasks, getTasksQueryArgs.sort])

  return (
    <>
      <Row data-testid='task-list-page' gutter={[0, 40]}>
        <Col span={24}>
          <Row className='task-list-page-header' justify='space-between' gutter={[0, 20]}>
            <Col xxl={16} xl={14}>
              <Row gutter={[16, 16]}>
                <Col span={17}>
                  <Row gutter={[16, 16]}>
                    {!!parsedTasksFiltersStorage.length && (
                      <Col>
                        <TasksFiltersStorage
                          filters={parsedTasksFiltersStorage}
                          onClose={onRemoveTasksFilter}
                        />
                      </Col>
                    )}

                    <Col>
                      <FastFilters
                        config={fastFiltersConfig}
                        counters={taskCounters}
                        selectedFilter={getTasksQueryArgs.filter}
                        onChange={onFastFilterChange}
                        isShowCounters={!isGetTaskCountersError}
                        disabled={tasksIsFetching}
                        isLoading={taskCountersIsFetching}
                        permissions={permissions}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col xl={5} xxl={3}>
                  <FilterButton
                    onClick={debouncedToggleOpenTasksFilter}
                    disabled={tasksIsFetching || searchFilterApplied}
                  />
                </Col>
              </Row>
            </Col>

            <Col span={8}>
              <Row justify='end' gutter={[16, 8]}>
                <Col>
                  <Search
                    allowClear
                    onSearch={onSearch}
                    onChange={onChangeSearch}
                    value={searchValue}
                    placeholder='Искать заявку по номеру'
                    disabled={tasksIsFetching}
                  />
                </Col>

                <Col>
                  <Space align='end' size='middle'>
                    <UpdateTasksButton
                      onClick={onRefetchTaskList}
                      disabled={tasksIsFetching || taskCountersIsFetching}
                      onAutoUpdate={toggleAutoUpdateEnabled}
                    />

                    <Button>Создать заявку</Button>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <TaskTable
            ref={tableRef}
            sort={getTasksQueryArgs.sort}
            onRow={onTableRow}
            dataSource={tasks}
            loading={tasksIsFetching}
            onChange={onChangeTable}
            pagination={extractPaginationParams(originalTasks)}
          />
        </Col>
      </Row>

      {!!selectedTaskId && (
        <React.Suspense fallback={<ModalFallback open onCancel={closeTask} />}>
          <TaskDetails
            taskId={selectedTaskId}
            activeTab={activeTaskDetailsTab}
            additionalInfoExpanded={additionalInfoExpanded}
            onExpandAdditionalInfo={toggleAdditionalInfoExpanded}
            onClose={closeTask}
            height={drawerHeight}
          />
        </React.Suspense>
      )}

      {tasksFilterOpened && (
        <React.Suspense fallback={<ModalFallback open onCancel={debouncedToggleOpenTasksFilter} />}>
          <TasksFilter
            open={tasksFilterOpened}
            permissions={permissions}
            formValues={tasksFilterValues}
            initialFormValues={initialTasksFilterValues}
            customers={customerList}
            customersIsLoading={customerListIsFetching}
            onChangeCustomers={setSelectedCustomers}
            macroregions={macroregions}
            macroregionsIsLoading={macroregionsIsFetching}
            onChangeMacroregions={setSelectedMacroregions}
            supportGroups={supportGroupList}
            supportGroupsIsLoading={supportGroupListIsFetching}
            users={userList}
            usersIsLoading={userListIsFetching}
            workGroups={workGroups}
            workGroupsIsLoading={workGroupsIsFetching}
            onClose={debouncedToggleOpenTasksFilter}
            onSubmit={onApplyFilter}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default TasksPage
