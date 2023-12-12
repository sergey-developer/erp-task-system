import { useBoolean, useLocalStorageState, usePrevious, useSetState } from 'ahooks'
import { Button, Col, Input, Row, Space } from 'antd'
import { SearchProps } from 'antd/es/input'
import debounce from 'lodash/debounce'
import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useGetSupportGroupList } from 'modules/supportGroup/hooks'
import {
  TasksFilterFormFields,
  TasksFilterProps,
} from 'modules/task/components/ExtendedFilter/types'
import FastFilterList from 'modules/task/components/FastFilterList'
import TaskTable from 'modules/task/components/TaskTable'
import {
  SortableField,
  sortableFieldToSortValues,
} from 'modules/task/components/TaskTable/constants/sort'
import { TaskTableListItem, TaskTableProps } from 'modules/task/components/TaskTable/types'
import { getSort } from 'modules/task/components/TaskTable/utils'
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
import { useGetTaskList } from 'modules/task/hooks/task'
import { useGetTaskCounters } from 'modules/task/hooks/taskCounters'
import {
  ExtendedFilterQueries,
  FastFilterQueries,
  GetTaskListQueryArgs,
  TaskIdFilterQueries,
} from 'modules/task/models'
import { TasksFiltersStorageType } from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'
import { parseTasksFiltersStorage } from 'modules/task/services/taskLocalStorageService/utils/parseTasksFiltersStorage'
import { taskDetailsTabExist } from 'modules/task/utils/task'
import {
  useGetUserList,
  useOnChangeUserStatus,
  UseOnChangeUserStatusFn,
  useUserRole,
} from 'modules/user/hooks'
import { checkUserStatusOffline } from 'modules/user/utils'
import { useGetCustomerList } from 'modules/warehouse/hooks/customer'
import { useGetWorkGroupList } from 'modules/workGroup/hooks'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'

import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { SortOrderEnum } from 'shared/constants/sort'
import { useGetMacroregionList } from 'shared/hooks/macroregion'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'
import {
  calculatePaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import { DEFAULT_PAGE_SIZE } from './constants'
import {
  getInitialExtendedFilterFormValues,
  getInitialFastFilter,
  mapExtendedFilterFormFieldsToQueries,
} from './utils'

const TaskDetails = React.lazy(() => import('modules/task/components/TaskDetails'))
const ExtendedFilter = React.lazy(() => import('modules/task/components/ExtendedFilter'))

const { Search } = Input
const initialExtendedFilterFormValues = getInitialExtendedFilterFormValues()

const TaskListPage: FC = () => {
  // todo: создать хук для useSearchParams который парсит значения в нужный тип
  const [searchParams, setSearchParams] = useSearchParams()
  const viewTaskId = Number(searchParams.get('viewTask')) || undefined
  const taskDetailsTab = taskDetailsTabExist(searchParams.get('taskDetailsTab') || '')
    ? (searchParams.get('taskDetailsTab') as TaskDetailsTabsEnum)
    : undefined

  const { role } = useUserRole()
  const [autoUpdateEnabled, { toggle: toggleAutoUpdateEnabled }] = useBoolean(false)

  const [selectedTaskId, setSelectedTaskId] = useState<IdType>()
  const [activeTaskDetailsTab, setActiveTaskDetailsTab] = useState<TaskDetailsTabsEnum>()
  const [additionalInfoExpanded, { toggle: toggleAdditionalInfoExpanded }] = useBoolean(false)

  const initialFastFilter = getInitialFastFilter(role)
  const [fastFilter, setFastFilter] = useState<MaybeUndefined<FastFilterEnum>>(initialFastFilter)

  const [extendedFilterOpened, { toggle: toggleOpenExtendedFilter }] = useBoolean(false)

  const [tasksFiltersStorage, setTasksFiltersStorage] = useLocalStorageState<
    MaybeUndefined<TasksFiltersStorageType>
  >(TaskStorageKeysEnum.TasksFilters)

  const [selectedCustomers, setSelectedCustomers] = useState<MaybeUndefined<IdType[]>>(
    tasksFiltersStorage?.customers,
  )
  const [selectedMacroregions, setSelectedMacroregions] = useState<MaybeUndefined<IdType[]>>(
    tasksFiltersStorage?.macroregions,
  )

  const [extendedFilterFormValues, setExtendedFilterFormValues] =
    useSetState<TasksFilterFormFields>({
      ...initialExtendedFilterFormValues,
      ...tasksFiltersStorage,
    })

  const [taskListQueryArgs, setTaskListQueryArgs] = useSetState<GetTaskListQueryArgs>(() => ({
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
    (filterQueryParams: ExtendedFilterQueries | FastFilterQueries | TaskIdFilterQueries) => {
      setTaskListQueryArgs((prevState) => ({
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
        taskId: undefined,
        workGroupId: undefined,
        manager: undefined,
        ...filterQueryParams,
      }))
    },
    [setTaskListQueryArgs],
  )

  const onChangeUserStatus = useCallback<UseOnChangeUserStatusFn>(
    (status) => {
      if (checkUserStatusOffline(status)) {
        setTasksFiltersStorage(undefined)
        const initialSupportGroupFilters = pick(
          initialExtendedFilterFormValues,
          'customers',
          'macroregions',
          'supportGroups',
        )
        setExtendedFilterFormValues(initialSupportGroupFilters)
        setSelectedCustomers(initialSupportGroupFilters.customers)
        setSelectedMacroregions(initialSupportGroupFilters.macroregions)
        triggerFilterChange(initialSupportGroupFilters)
      }
    },
    [setExtendedFilterFormValues, setTasksFiltersStorage, triggerFilterChange],
  )

  useOnChangeUserStatus(onChangeUserStatus)

  useEffect(() => {
    if (!selectedTaskId && !!viewTaskId) {
      setSelectedTaskId(viewTaskId)
      setActiveTaskDetailsTab(taskDetailsTab)
      setSearchParams(undefined)
    }
  }, [selectedTaskId, setSearchParams, taskDetailsTab, viewTaskId])

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
    currentData: taskList,
    isFetching: taskListIsFetching,
    refetch: refetchTaskList,
  } = useGetTaskList(taskListQueryArgs, {
    pollingInterval: autoUpdateEnabled
      ? tasksUpdateVariantsIntervals[TasksUpdateVariantsEnum.AutoUpdate1M]
      : undefined,
  })

  const { currentData: userList = [], isFetching: userListIsFetching } = useGetUserList(
    { isManager: true },
    { skip: !extendedFilterOpened },
  )

  const { currentData: customerList = [], isFetching: customerListIsFetching } = useGetCustomerList(
    undefined,
    { skip: !extendedFilterOpened },
  )

  const { currentData: supportGroupList = [], isFetching: supportGroupListIsFetching } =
    useGetSupportGroupList(
      {
        customers: selectedCustomers,
        macroregions: selectedMacroregions,
        assignedToUser: true,
      },
      { skip: !extendedFilterOpened },
    )

  const { currentData: macroregionList = [], isFetching: macroregionListIsFetching } =
    useGetMacroregionList({ customers: selectedCustomers }, { skip: !extendedFilterOpened })

  const { data: workGroupList = [], isFetching: workGroupListIsFetching } = useGetWorkGroupList(
    undefined,
    { skip: !extendedFilterOpened },
  )

  const debouncedToggleOpenExtendedFilter = useDebounceFn(toggleOpenExtendedFilter)

  const handleApplyFilter: TasksFilterProps['onSubmit'] = (values) => {
    setAppliedFilterType(FilterTypeEnum.Extended)
    setExtendedFilterFormValues(values)
    triggerFilterChange(mapExtendedFilterFormFieldsToQueries(values))
    setTasksFiltersStorage(pick(values, 'customers', 'macroregions', 'supportGroups'))
    setFastFilter(undefined)
    toggleOpenExtendedFilter()
    closeTask()
  }

  const resetExtendedFilterToInitialValues = () => {
    setExtendedFilterFormValues(initialExtendedFilterFormValues)
    setSelectedCustomers(initialExtendedFilterFormValues.customers)
    setSelectedMacroregions(initialExtendedFilterFormValues.macroregions)
  }

  const handleFastFilterChange = (value: FastFilterEnum) => {
    setAppliedFilterType(FilterTypeEnum.Fast)
    setFastFilter(value)
    resetExtendedFilterToInitialValues()
    setSearchValue(undefined)
    triggerFilterChange({ filter: value })
    closeTask()
  }

  const handleSearchByTaskId = useDebounceFn<NonNullable<SearchProps['onSearch']>>(
    (value) => {
      if (value) {
        setAppliedFilterType(FilterTypeEnum.Search)
        triggerFilterChange({ taskId: value })
      } else {
        if (!prevAppliedFilterType) return

        setAppliedFilterType(prevAppliedFilterType!)

        const prevFilter = isEqual(prevAppliedFilterType, FilterTypeEnum.Extended)
          ? mapExtendedFilterFormFieldsToQueries(extendedFilterFormValues)
          : isEqual(prevAppliedFilterType, FilterTypeEnum.Fast)
          ? { filter: fastFilter }
          : {}

        triggerFilterChange(prevFilter)
      }

      closeTask()
    },
    [prevAppliedFilterType, extendedFilterFormValues, fastFilter],
  )

  const onChangeSearch: NonNullable<SearchProps['onChange']> = (event) => {
    const value = event.target.value
    setSearchValue(value)
    if (!value) handleSearchByTaskId(value)
  }

  const handleTableRowClick = useCallback<TaskTableProps['onRow']>(
    (record) => ({
      onClick: debounce(() => setSelectedTaskId(record.id), DEFAULT_DEBOUNCE_VALUE),
    }),
    [],
  )

  const closeTask = useCallback(() => {
    setSelectedTaskId(undefined)
    setActiveTaskDetailsTab(undefined)
  }, [])

  const handleTableSort = useCallback(
    (sorter: Parameters<TaskTableProps['onChange']>[2]) => {
      /**
       * При сортировке по возрастанию (ascend), поля sorter.column и sorter.order равны undefined
       * Пока не ясно почему так происходит, но данная проблема уже была до рефакторинга сортировки,
       * при изначальной реализации
       */
      if (sorter) {
        const { columnKey, order } = isArray(sorter) ? sorter[0] : sorter

        if (columnKey && (columnKey as string) in sortableFieldToSortValues) {
          setTaskListQueryArgs({
            sort: getSort(columnKey as SortableField, order || SortOrderEnum.Ascend),
          })
        }
      }
    },
    [setTaskListQueryArgs],
  )

  const handleTablePagination = useCallback(
    (pagination: Parameters<TaskTableProps['onChange']>[0]) => {
      setTaskListQueryArgs(calculatePaginationParams(pagination))
    },
    [setTaskListQueryArgs],
  )

  const handleChangeTable = useCallback<TaskTableProps['onChange']>(
    (pagination, _, sorter) => {
      handleTableSort(sorter)
      handleTablePagination(pagination)
    },
    [handleTablePagination, handleTableSort],
  )

  const handleRefetchTaskList = useDebounceFn(() => {
    closeTask()
    refetchTaskList()
    refetchTaskCounters()
  })

  const searchFilterApplied: boolean = isEqual(appliedFilterType, FilterTypeEnum.Search)

  const getTableRowClassName = useCallback(
    (record: TaskTableListItem): string =>
      isEqual(record.id, selectedTaskId) ? 'table-row--selected' : '',
    [selectedTaskId],
  )

  const handleRemoveTasksFilter = (filter: TasksFilterStorageItem) => {
    setTasksFiltersStorage((prevState) => ({ ...prevState, [filter.name]: undefined }))
    setExtendedFilterFormValues({ [filter.name]: undefined })
    if (filter.name === 'customers') setSelectedCustomers([])
    if (filter.name === 'macroregions') setSelectedMacroregions([])
    triggerFilterChange({ [filter.name]: undefined })
  }

  return (
    <>
      <Row data-testid='task-list-page' gutter={[0, 40]}>
        <Col span={24}>
          <Row className='task-list-page-header' justify='space-between' align='bottom'>
            <Col xxl={16} xl={14}>
              <Row align='middle' gutter={[30, 30]}>
                <Col span={17}>
                  <Row gutter={[16, 16]}>
                    {tasksFiltersStorage && (
                      <Col>
                        <TasksFiltersStorage
                          filters={parseTasksFiltersStorage(tasksFiltersStorage)}
                          onClose={handleRemoveTasksFilter}
                        />
                      </Col>
                    )}

                    <Col>
                      <FastFilterList
                        data={taskCounters}
                        selectedFilter={taskListQueryArgs.filter}
                        onChange={handleFastFilterChange}
                        isShowCounters={!isGetTaskCountersError}
                        disabled={taskListIsFetching}
                        isLoading={taskCountersIsFetching}
                        userRole={role}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col xl={5} xxl={3}>
                  <FilterButton
                    onClick={debouncedToggleOpenExtendedFilter}
                    disabled={taskListIsFetching || searchFilterApplied}
                  />
                </Col>
              </Row>
            </Col>

            <Col span={8}>
              <Row justify='end' gutter={[16, 8]}>
                <Col>
                  <Search
                    allowClear
                    onSearch={handleSearchByTaskId}
                    onChange={onChangeSearch}
                    value={searchValue}
                    placeholder='Искать заявку по номеру'
                    disabled={taskListIsFetching}
                  />
                </Col>

                <Col>
                  <Space align='end' size='middle'>
                    <UpdateTasksButton
                      onClick={handleRefetchTaskList}
                      disabled={taskListIsFetching || taskCountersIsFetching}
                      onAutoUpdate={toggleAutoUpdateEnabled}
                    />

                    <Button>+ Создать заявку</Button>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <TaskTable
            rowClassName={getTableRowClassName}
            sort={taskListQueryArgs.sort}
            onRow={handleTableRowClick}
            dataSource={extractPaginationResults(taskList)}
            loading={taskListIsFetching}
            onChange={handleChangeTable}
            pagination={taskList?.pagination || false}
            userRole={role!}
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
          />
        </React.Suspense>
      )}

      {extendedFilterOpened && (
        <React.Suspense
          fallback={<ModalFallback open onCancel={debouncedToggleOpenExtendedFilter} />}
        >
          <ExtendedFilter
            open={extendedFilterOpened}
            formValues={extendedFilterFormValues}
            initialFormValues={initialExtendedFilterFormValues}
            customerList={customerList}
            customerListIsLoading={customerListIsFetching}
            onChangeCustomers={setSelectedCustomers}
            macroregionList={macroregionList}
            macroregionListIsLoading={macroregionListIsFetching}
            onChangeMacroregions={setSelectedMacroregions}
            supportGroupList={supportGroupList}
            supportGroupListIsLoading={supportGroupListIsFetching}
            userList={userList}
            userListIsLoading={userListIsFetching}
            workGroupList={workGroupList}
            workGroupListIsLoading={workGroupListIsFetching}
            onClose={debouncedToggleOpenExtendedFilter}
            onSubmit={handleApplyFilter}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default TaskListPage
