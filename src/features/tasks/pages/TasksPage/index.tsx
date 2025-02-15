import { useBoolean, useLocalStorageState, usePrevious, useSetState } from 'ahooks'
import { Button, Col, Flex, Input, Row, Space } from 'antd'
import { SearchProps } from 'antd/es/input'
import { TasksFastFilterEnum } from 'features/tasks/api/constants'
import { TaskCountersDTO } from 'features/tasks/api/dto'
import {
  GetTaskCountersRequest,
  GetTasksRequest,
  TasksFastFilterRequestArgs,
  TasksFilterRequestArgs,
} from 'features/tasks/api/schemas'
import { firstLineOptionValue } from 'features/tasks/components/CreateTaskModal'
import {
  CreateTaskFormFields,
  CreateTaskModalProps,
} from 'features/tasks/components/CreateTaskModal/types'
import FastFilters from 'features/tasks/components/FastFilters'
import {
  fastFilterByLinesOptions,
  fastFilterOptions,
} from 'features/tasks/components/FastFilters/options'
import { FastFiltersProps } from 'features/tasks/components/FastFilters/types'
import TaskTable from 'features/tasks/components/TaskTable'
import {
  SortableField,
  sortableFieldToSortValues,
} from 'features/tasks/components/TaskTable/constants/sort'
import { TaskTableProps } from 'features/tasks/components/TaskTable/types'
import { getSort, parseSort } from 'features/tasks/components/TaskTable/utils'
import {
  TasksFilterFormFields,
  TasksFilterProps,
} from 'features/tasks/components/TasksFilter/types'
import TasksFiltersStorage, {
  TasksFilterStorageItem,
} from 'features/tasks/components/TasksFiltersStorage'
import UpdateTasksButton from 'features/tasks/components/UpdateTasksButton'
import {
  TaskDetailsTabsEnum,
  TasksFilterTypeEnum,
  TasksUpdateVariantsEnum,
  tasksUpdateVariantsIntervals,
} from 'features/tasks/constants'
import { taskDetailsTabExist } from 'features/tasks/helpers'
import { useCreateTask, useGetTaskCounters, useGetTasks } from 'features/tasks/hooks'
import { TaskStorageKeysEnum } from 'features/tasks/services/taskLocalStorageService/constants'
import { parseTasksFiltersStorage } from 'features/tasks/services/taskLocalStorageService/helpers'
import { TasksFiltersStorageType } from 'features/tasks/services/taskLocalStorageService/taskLocalStorage.service'
import { TaskFastFilterByLinesType, TasksFastFilterType } from 'features/tasks/types'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { checkUserStatusOffline } from 'features/users/helpers'
import {
  useGetUsers,
  useOnChangeUserStatus,
  UseOnChangeUserStatusFn,
  useUserPermissions,
} from 'features/users/hooks'
import debounce from 'lodash/debounce'
import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'

import { isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { useGetCustomersCatalog } from 'shared/catalogs/customers/hooks'
import { LocationTypeEnum } from 'shared/catalogs/locations/api/constants'
import { useGetLocationsCatalog } from 'shared/catalogs/locations/hooks'
import { useGetMacroregionsCatalog } from 'shared/catalogs/macroregions/hooks'
import { useGetWorkGroupsCatalog } from 'shared/catalogs/workGroups/hooks'
import { useGetWorkTypesCatalog } from 'shared/catalogs/workTypes/hooks'
import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { SortOrderEnum } from 'shared/constants/sort'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { useDrawerHeightByTable } from 'shared/hooks/useDrawerHeightByTable'
import { useGetSupportGroups } from 'shared/supportGroups/hooks'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'
import { MaybeUndefined } from 'shared/types/utils'
import { mergeDateTime } from 'shared/utils/date'
import { extractOriginFiles } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'
import { useGetWorkGroups } from 'shared/workGroups/hooks/useGetWorkGroups'

import { DEFAULT_PAGE_SIZE, tableItemBoundaryStyles } from './constants'
import {
  getInitialTasksFilterValues,
  getTasksByOlaNextBreachTime,
  mapFilterToRequest,
} from './utils'

const TaskDetails = React.lazy(() => import('features/tasks/components/TaskDetails'))
const TasksFilter = React.lazy(() => import('features/tasks/components/TasksFilter'))
const CreateTaskModal = React.lazy(() => import('features/tasks/components/CreateTaskModal'))

const { Search } = Input
const initialTasksFilterValues = getInitialTasksFilterValues()
const initialFastFilter = TasksFastFilterEnum.AllLines
const initialFastFilterByLines = TasksFastFilterEnum.AllLines

const getFastFilterByLinesQueryValue = (
  value: TaskFastFilterByLinesType,
): GetTaskCountersRequest['line'] => (value === TasksFastFilterEnum.AllLines ? undefined : value)

const TasksPage: FC = () => {
  const { tableRef, drawerHeight } = useDrawerHeightByTable()

  const permissions = useUserPermissions([
    UserPermissionsEnum.SelfWorkGroupsRead,
    UserPermissionsEnum.AnyWorkGroupsRead,
    UserPermissionsEnum.FirstLineTasksRead,
    UserPermissionsEnum.SecondLineTasksRead,
    UserPermissionsEnum.WorkGroupTasksRead,
    UserPermissionsEnum.InternalTasksCreate,
    UserPermissionsEnum.ClassificationOfWorkTypes,
  ])

  const isShowFastFilterByLines = !!(
    permissions.firstLineTasksRead &&
    (permissions.secondLineTasksRead || permissions.workGroupTasksRead)
  )

  // todo: создать хук для useSearchParams который парсит значения в нужный тип
  const [searchParams] = useSearchParams()
  const viewTaskId = Number(searchParams.get('viewTask')) || undefined
  const currentTab = taskDetailsTabExist(searchParams.get('tab') || '')
    ? (searchParams.get('tab') as TaskDetailsTabsEnum)
    : undefined

  // create task
  const [selectedTaskType, setSelectedTaskType] = useState<CreateTaskFormFields['type']>()
  const [selectedTaskWorkGroup, setSelectedTaskWorkGroup] =
    useState<CreateTaskFormFields['workGroup']>()

  const [createTaskModalOpened, { setTrue: openCreateTaskModal, setFalse: closeCreateTaskModal }] =
    useBoolean(false)

  const debouncedOpenCreateTaskModal = useDebounceFn(openCreateTaskModal)

  const onCloseCreateTaskModal = useCallback(() => {
    closeCreateTaskModal()
    setSelectedTaskType(undefined)
    setSelectedTaskWorkGroup(undefined)
  }, [closeCreateTaskModal])

  const debouncedOnCloseCreateTaskModal = useDebounceFn(onCloseCreateTaskModal, [
    onCloseCreateTaskModal,
  ])
  // create task

  const [autoUpdateEnabled, { toggle: toggleAutoUpdateEnabled }] = useBoolean(false)

  const [selectedTaskId, setSelectedTaskId] = useState<MaybeUndefined<IdType>>(viewTaskId)
  const [additionalInfoExpanded, { toggle: toggleAdditionalInfoExpanded }] = useBoolean(false)

  const [activeTab, setActiveTab] = useState<MaybeUndefined<TaskDetailsTabsEnum>>(currentTab)

  const [fastFilter, setFastFilter] =
    useState<MaybeUndefined<TasksFastFilterType>>(initialFastFilter)

  const [fastFilterByLines, setFastFilterByLines] =
    useState<MaybeUndefined<TaskFastFilterByLinesType>>(initialFastFilterByLines)

  const [tasksFilterOpened, { toggle: toggleTasksFilter }] = useBoolean(false)

  const debouncedToggleTasksFilter = useDebounceFn(toggleTasksFilter)

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

  const [getTasksRequestArgs, setGetTasksRequestArgs] = useSetState<GetTasksRequest>(() => ({
    ...getInitialPaginationParams({ limit: DEFAULT_PAGE_SIZE }),
    ...tasksFiltersStorage,
    filters: [initialFastFilter],
    sort: getSort('olaNextBreachTime', SortOrderEnum.Ascend),
  }))

  const [searchValue, setSearchValue] = useState<string>()

  const [appliedFilterType, setAppliedFilterType] = useState<TasksFilterTypeEnum>(
    TasksFilterTypeEnum.Fast,
  )
  const prevAppliedFilterType = usePrevious<typeof appliedFilterType>(appliedFilterType)

  // todo: refactor to avoid setting undefined
  const triggerGetTasks = useCallback(
    (filterQueryParams: TasksFilterRequestArgs | TasksFastFilterRequestArgs | FilterParams) => {
      setGetTasksRequestArgs((prevState) => ({
        ...prevState,
        offset: 0,
        completeAtFrom: undefined,
        completeAtTo: undefined,
        filters: undefined,
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
    [setGetTasksRequestArgs],
  )

  const closeTask = useCallback(() => {
    setSelectedTaskId(undefined)
    setActiveTab(undefined)
  }, [])

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
        triggerGetTasks(initialSupportGroupFilters)
      }
    },
    [setTasksFilterValues, setTasksFiltersStorage, triggerGetTasks],
  )

  useOnChangeUserStatus(onChangeUserStatus)

  const [getTaskCountersRequestArgs, setGetTaskCountersRequestArgs] =
    useSetState<GetTaskCountersRequest>(tasksFiltersStorage || {})

  const [createTaskMutation, { isLoading: createTaskIsLoading }] = useCreateTask()

  const {
    data: taskCounters,
    isError: isGetTaskCountersError,
    isFetching: taskCountersIsFetching,
    refetch: refetchTaskCounters,
  } = useGetTaskCounters(getTaskCountersRequestArgs, {
    pollingInterval: autoUpdateEnabled
      ? tasksUpdateVariantsIntervals[TasksUpdateVariantsEnum.AutoUpdate1M]
      : undefined,
  })

  const {
    currentData: originalTasks,
    isFetching: tasksIsFetching,
    refetch: refetchTasks,
  } = useGetTasks(getTasksRequestArgs, {
    pollingInterval: autoUpdateEnabled
      ? tasksUpdateVariantsIntervals[TasksUpdateVariantsEnum.AutoUpdate1M]
      : undefined,
  })

  const { currentData: workTypes = [], isFetching: workTypesIsFetching } = useGetWorkTypesCatalog(
    { taskType: selectedTaskType! },
    { skip: !(selectedTaskType && createTaskModalOpened) },
  )

  const { currentData: locationsCatalog = [], isFetching: locationsCatalogIsFetching } =
    useGetLocationsCatalog(
      { locationTypes: [LocationTypeEnum.Shop] },
      { skip: !createTaskModalOpened },
    )

  const { currentData: workGroupsCatalog = [], isFetching: workGroupsCatalogIsFetching } =
    useGetWorkGroupsCatalog(undefined, { skip: !createTaskModalOpened })

  const { currentData: tasksFilterUsers = [], isFetching: tasksFilterUsersIsFetching } =
    useGetUsers({ isManager: true }, { skip: !tasksFilterOpened })

  const { currentData: createTaskModalUsers = [], isFetching: createTaskModalUsersIsFetching } =
    useGetUsers(undefined, { skip: !createTaskModalOpened })

  const { currentData: observers = [], isFetching: observersIsFetching } = useGetUsers(
    {
      readTasksWorkGroup:
        selectedTaskWorkGroup === firstLineOptionValue ? 'None' : selectedTaskWorkGroup!,
    },
    { skip: !(createTaskModalOpened && selectedTaskWorkGroup) },
  )

  const { currentData: executors = [], isFetching: executorsIsFetching } = useGetUsers(
    {
      resolveTasksWorkGroup:
        selectedTaskWorkGroup === firstLineOptionValue ? 'None' : selectedTaskWorkGroup!,
    },
    { skip: !(createTaskModalOpened && selectedTaskWorkGroup) },
  )

  const { currentData: customers = [], isFetching: customersIsFetching } = useGetCustomersCatalog(
    undefined,
    { skip: !tasksFilterOpened && !createTaskModalOpened },
  )

  const { currentData: supportGroups = [], isFetching: supportGroupsIsFetching } =
    useGetSupportGroups(
      {
        customers: selectedCustomers,
        macroregions: selectedMacroregions,
        assignedToUser: true,
      },
      { skip: !tasksFilterOpened },
    )

  const { currentData: macroregions = [], isFetching: macroregionsIsFetching } =
    useGetMacroregionsCatalog({ customers: selectedCustomers }, { skip: !tasksFilterOpened })

  const { data: workGroups = [], isFetching: workGroupsIsFetching } = useGetWorkGroups(undefined, {
    skip: tasksFilterOpened
      ? !permissions.selfWorkGroupsRead && !permissions.anyWorkGroupsRead
      : !tasksFilterOpened,
  })

  const onApplyFilter: TasksFilterProps['onSubmit'] = (values) => {
    setAppliedFilterType(TasksFilterTypeEnum.Extended)
    setTasksFilterValues(values)
    triggerGetTasks(mapFilterToRequest(values))
    setTasksFiltersStorage(pick(values, 'customers', 'macroregions', 'supportGroups'))
    setFastFilter(undefined)
    setFastFilterByLines(undefined)
    toggleTasksFilter()
    closeTask()
  }

  const onCreateTask = useCallback<CreateTaskModalProps['onSubmit']>(
    async ({ attachments, olaNextBreachDate, olaNextBreachTime, workGroup, ...values }, form) => {
      try {
        const newTask = await createTaskMutation({
          ...values,
          workGroup: workGroup === firstLineOptionValue ? undefined : workGroup,
          olaNextBreachTime: mergeDateTime(olaNextBreachDate, olaNextBreachTime).toISOString(),
          attachments: attachments?.length ? extractOriginFiles(attachments) : undefined,
        }).unwrap()

        setSelectedTaskId(newTask.id)
        onCloseCreateTaskModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          form.setFields(getFieldsErrors(error.data))
        }
      }
    },
    [createTaskMutation, onCloseCreateTaskModal],
  )

  const resetExtendedFilterToInitialValues = useCallback(() => {
    setTasksFilterValues(initialTasksFilterValues)
    setSelectedCustomers(initialTasksFilterValues.customers)
    setSelectedMacroregions(initialTasksFilterValues.macroregions)
  }, [setTasksFilterValues])

  const onBaseFastFilterChange = useCallback(() => {
    setAppliedFilterType(TasksFilterTypeEnum.Fast)
    resetExtendedFilterToInitialValues()
    setSearchValue(undefined)
    closeTask()
  }, [closeTask, resetExtendedFilterToInitialValues])

  const getFastFilterQueryValue = useCallback(
    (
      fastFilter?: TasksFastFilterType,
      fastFilterByLines?: TaskFastFilterByLinesType,
    ): TasksFastFilterEnum[] => {
      const filter = fastFilter ? [fastFilter] : []
      const filterByLines = fastFilterByLines
        ? [isShowFastFilterByLines ? fastFilterByLines : TasksFastFilterEnum.AllLines]
        : []

      return fastFilter === TasksFastFilterEnum.AllLines
        ? filterByLines
        : [...filter, ...filterByLines]
    },
    [isShowFastFilterByLines],
  )

  const onFastFilterChange = useCallback<
    FastFiltersProps<TasksFastFilterType, TaskCountersDTO>['onChange']
  >(
    (value) => {
      onBaseFastFilterChange()
      setFastFilter(value)
      triggerGetTasks({ filters: getFastFilterQueryValue(value, fastFilterByLines) })
    },
    [fastFilterByLines, getFastFilterQueryValue, onBaseFastFilterChange, triggerGetTasks],
  )

  const onFastFilterByLinesChange = useCallback<
    FastFiltersProps<TaskFastFilterByLinesType, TaskCountersDTO>['onChange']
  >(
    (value) => {
      onBaseFastFilterChange()
      setFastFilterByLines(value)
      triggerGetTasks({ filters: getFastFilterQueryValue(fastFilter, value) })
      setGetTaskCountersRequestArgs({ line: getFastFilterByLinesQueryValue(value) })
    },
    [
      fastFilter,
      getFastFilterQueryValue,
      onBaseFastFilterChange,
      setGetTaskCountersRequestArgs,
      triggerGetTasks,
    ],
  )

  const onSearch: NonNullable<SearchProps['onSearch']> = (value) => {
    if (value) {
      setAppliedFilterType(TasksFilterTypeEnum.Search)
      triggerGetTasks({ search: value })
    } else {
      if (!prevAppliedFilterType) return

      setAppliedFilterType(prevAppliedFilterType)

      if (isEqual(prevAppliedFilterType, TasksFilterTypeEnum.Extended)) {
        triggerGetTasks(mapFilterToRequest(tasksFilterValues))
      }

      if (isEqual(prevAppliedFilterType, TasksFilterTypeEnum.Fast)) {
        triggerGetTasks({ filters: getFastFilterQueryValue(fastFilter, fastFilterByLines) })
        setGetTaskCountersRequestArgs({
          line: fastFilterByLines ? getFastFilterByLinesQueryValue(fastFilterByLines) : undefined,
        })
      }
    }

    closeTask()
  }

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

  const onTableSort = useCallback(
    (sorter: Parameters<TaskTableProps['onChange']>[2]) => {
      const { field, order } = isArray(sorter) ? sorter[0] : sorter

      if (field && (field as string) in sortableFieldToSortValues) {
        setGetTasksRequestArgs({
          sort: getSort(field as SortableField, order || SortOrderEnum.Ascend),
        })
      }
    },
    [setGetTasksRequestArgs],
  )

  const onTablePagination = useCallback(
    (pagination: Parameters<TaskTableProps['onChange']>[0]) => {
      setGetTasksRequestArgs(calculatePaginationParams(pagination))
    },
    [setGetTasksRequestArgs],
  )

  const onChangeTable = useCallback<TaskTableProps['onChange']>(
    (pagination, _, sorter) => {
      onTableSort(sorter)
      onTablePagination(pagination)
    },
    [onTablePagination, onTableSort],
  )

  const onRefetchTasks = useDebounceFn(() => {
    closeTask()
    refetchTasks()
    refetchTaskCounters()
  })

  const searchFilterApplied: boolean = isEqual(appliedFilterType, TasksFilterTypeEnum.Search)

  const onRemoveTasksFilter = (filter: TasksFilterStorageItem) => {
    setTasksFiltersStorage((prevState) => ({ ...prevState, [filter.name]: undefined }))
    setTasksFilterValues({ [filter.name]: undefined })
    if (filter.name === 'customers') setSelectedCustomers([])
    if (filter.name === 'macroregions') setSelectedMacroregions([])
    triggerGetTasks({ [filter.name]: undefined })
  }

  const tasks = useMemo(() => {
    const extractedTasks = extractPaginationResults(originalTasks)
    const columnKey = getTasksRequestArgs.sort
      ? parseSort(getTasksRequestArgs.sort).columnKey
      : undefined

    return columnKey === 'olaNextBreachTime'
      ? getTasksByOlaNextBreachTime(extractedTasks)
      : extractedTasks
  }, [originalTasks, getTasksRequestArgs.sort])

  return (
    <>
      <Row data-testid='tasks-page' gutter={[0, 40]}>
        <Col span={24}>
          <Row className='tasks-page-header' justify='space-between' gutter={[0, 20]}>
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
                      <Flex vertical gap='small'>
                        {isShowFastFilterByLines && (
                          <FastFilters<TaskFastFilterByLinesType, TaskCountersDTO>
                            data-testid='fast-filter-by-lines'
                            options={fastFilterByLinesOptions}
                            value={fastFilterByLines}
                            onChange={onFastFilterByLinesChange}
                            counters={taskCounters}
                            countersVisible={!isGetTaskCountersError}
                            disabled={tasksIsFetching}
                            loading={taskCountersIsFetching}
                          />
                        )}

                        <FastFilters<TasksFastFilterType, TaskCountersDTO>
                          data-testid='fast-filter'
                          options={fastFilterOptions}
                          value={fastFilter}
                          onChange={onFastFilterChange}
                          counters={taskCounters}
                          countersVisible={!isGetTaskCountersError}
                          disabled={tasksIsFetching}
                          loading={taskCountersIsFetching}
                        />
                      </Flex>
                    </Col>
                  </Row>
                </Col>

                <Col xl={5} xxl={3}>
                  <FilterButton
                    onClick={debouncedToggleTasksFilter}
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
                      onClick={onRefetchTasks}
                      disabled={tasksIsFetching || taskCountersIsFetching}
                      onAutoUpdate={toggleAutoUpdateEnabled}
                    />

                    {permissions.internalTasksCreate && (
                      <Button onClick={debouncedOpenCreateTaskModal}>Создать заявку</Button>
                    )}
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <TaskTable
            ref={tableRef}
            sort={getTasksRequestArgs.sort}
            onRow={onTableRow}
            dataSource={tasks}
            loading={tasksIsFetching}
            onChange={onChangeTable}
            pagination={extractPaginationParams(originalTasks)}
          />
        </Col>
      </Row>

      {!!selectedTaskId && (
        <React.Suspense
          fallback={<ModalFallback tip='Загрузка карточки заявки' open onCancel={closeTask} />}
        >
          <TaskDetails
            taskId={selectedTaskId}
            activeTab={activeTab}
            additionalInfoExpanded={additionalInfoExpanded}
            onExpandAdditionalInfo={toggleAdditionalInfoExpanded}
            onClose={closeTask}
            height={drawerHeight}
          />
        </React.Suspense>
      )}

      {tasksFilterOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              tip='Загрузка компонента фильтров заявок'
              open
              onCancel={debouncedToggleTasksFilter}
            />
          }
        >
          <TasksFilter
            open={tasksFilterOpened}
            permissions={permissions}
            formValues={tasksFilterValues}
            initialFormValues={initialTasksFilterValues}
            customers={customers}
            customersIsLoading={customersIsFetching}
            onChangeCustomers={setSelectedCustomers}
            macroregions={macroregions}
            macroregionsIsLoading={macroregionsIsFetching}
            onChangeMacroregions={setSelectedMacroregions}
            supportGroups={supportGroups}
            supportGroupsIsLoading={supportGroupsIsFetching}
            users={tasksFilterUsers}
            usersIsLoading={tasksFilterUsersIsFetching}
            workGroups={workGroups}
            workGroupsIsLoading={workGroupsIsFetching}
            onClose={debouncedToggleTasksFilter}
            onSubmit={onApplyFilter}
          />
        </React.Suspense>
      )}

      {createTaskModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              tip='Загрузка модалки создания заявки'
              open
              onCancel={debouncedOnCloseCreateTaskModal}
            />
          }
        >
          <CreateTaskModal
            open={createTaskModalOpened}
            onCancel={debouncedOnCloseCreateTaskModal}
            onSubmit={onCreateTask}
            confirmLoading={createTaskIsLoading}
            permissions={permissions}
            workGroups={workGroupsCatalog}
            workGroupsIsLoading={workGroupsCatalogIsFetching}
            onChangeType={setSelectedTaskType}
            onChangeWorkGroup={setSelectedTaskWorkGroup}
            users={createTaskModalUsers}
            usersIsLoading={createTaskModalUsersIsFetching}
            executors={executors}
            executorsIsLoading={executorsIsFetching}
            observers={observers}
            observersIsLoading={observersIsFetching}
            workTypes={workTypes}
            workTypesIsLoading={workTypesIsFetching}
            customers={customers}
            customersIsLoading={customersIsFetching}
            locations={locationsCatalog}
            locationsIsLoading={locationsCatalogIsFetching}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default TasksPage
