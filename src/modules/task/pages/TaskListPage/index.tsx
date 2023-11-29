import { useBoolean, useLocalStorageState, usePrevious, useSetState } from 'ahooks'
import { Button, Col, Input, Row, Space } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { SearchProps } from 'antd/es/input'
import debounce from 'lodash/debounce'
import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import React, { FC, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useGetSupportGroupList } from 'modules/supportGroup/hooks'
import ExtendedFilter from 'modules/task/components/ExtendedFilter'
import {
  ExtendedFilterFormFields,
  ExtendedFilterProps,
} from 'modules/task/components/ExtendedFilter/types'
import ExtendedFilterList, {
  ExtendedFilterListItem,
} from 'modules/task/components/ExtendedFilterList'
import FastFilterList from 'modules/task/components/FastFilterList'
import TaskTable from 'modules/task/components/TaskTable'
import {
  SortableField,
  sortableFieldToSortValues,
} from 'modules/task/components/TaskTable/constants/sort'
import { TaskTableListItem, TaskTableProps } from 'modules/task/components/TaskTable/types'
import { getSort } from 'modules/task/components/TaskTable/utils'
import { FastFilterEnum, TaskCardTabsEnum, FilterTypeEnum } from 'modules/task/constants/task'
import { useGetTaskList } from 'modules/task/hooks/task'
import { useGetTaskCounters } from 'modules/task/hooks/taskCounters'
import {
  ExtendedFilterQueries,
  FastFilterQueries,
  GetTaskListQueryArgs,
  TaskIdFilterQueries,
} from 'modules/task/models'
import { TaskListPageFiltersStorage } from 'modules/task/services/taskLocalStorage/taskLocalStorage.service'
import { parseTaskListPageFilters } from 'modules/task/services/taskLocalStorage/utils/taskListPageFilters'
import { validateTaskCardTab } from 'modules/task/utils/task'
import {
  useGetUserList,
  useOnChangeUserStatus,
  UseOnChangeUserStatusFn,
  useUserRole,
} from 'modules/user/hooks'
import { useGetCustomerList } from 'modules/warehouse/hooks/customer'
import { useGetWorkGroupList } from 'modules/workGroup/hooks'

import FilterButton from 'components/Buttons/FilterButton'
import Spinner from 'components/Spinner'
import UpdateTasksButton from 'components/Buttons/UpdateTasksButton'

import { UserStatusCodeEnum } from 'shared/constants/catalogs'
import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { SortOrderEnum } from 'shared/constants/sort'
import { StorageKeysEnum } from 'shared/constants/storage'
import {
  TasksUpdateVariantsEnum,
  tasksUpdateVariantsIntervals,
} from 'shared/constants/tasksUpdateVariants'
import { useGetMacroregionList } from 'shared/hooks/macroregion'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { MaybeNull, MaybeUndefined } from 'shared/types/utils'
import {
  calculatePaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import { DEFAULT_PAGE_SIZE } from './constants'
import { ColStyled, RowStyled } from './styles'
import {
  getInitialExtendedFilterFormValues,
  getInitialFastFilter,
  mapExtendedFilterFormFieldsToQueries,
} from './utils'

const TaskCard = React.lazy(() => import('modules/task/components/TaskCard/CardContainer'))

const { Search } = Input
const initialExtendedFilterFormValues = getInitialExtendedFilterFormValues()

const TaskListPage: FC = () => {
  // todo: создать хук для useSearchParams который парсит значения в нужный тип
  const [searchParams, setSearchParams] = useSearchParams()
  const viewTaskId = Number(searchParams.get('viewTask')) || undefined
  const taskCardTab = validateTaskCardTab(searchParams.get('taskCardTab') || '')
    ? (searchParams.get('taskCardTab') as TaskCardTabsEnum)
    : undefined

  const breakpoints = useBreakpoint()

  const { role } = useUserRole()

  const colRef = useRef<number>()

  const [selectedTaskId, setSelectedTaskId] = useState<IdType>()

  const [activeTaskCardTab, setActiveTaskCardTab] = useState<TaskCardTabsEnum>()

  const [autoUpdateEnabled, { toggle: toggleAutoUpdateEnabled }] = useBoolean(false)

  const [taskAdditionalInfoExpanded, { toggle: toggleTaskAdditionalInfoExpanded }] =
    useBoolean(false)

  const initialFastFilter = getInitialFastFilter(role)
  const [fastFilter, setFastFilter] = useState<MaybeUndefined<FastFilterEnum>>(initialFastFilter)

  const [extendedFilterOpened, { toggle: toggleOpenExtendedFilter }] = useBoolean(false)

  const [preloadedExtendedFilters, setPreloadedExtendedFilters] = useLocalStorageState<
    MaybeUndefined<TaskListPageFiltersStorage>
  >(StorageKeysEnum.TaskListPageFilters)

  const [selectedCustomers, setSelectedCustomers] = useState<MaybeUndefined<IdType[]>>(
    preloadedExtendedFilters?.customers,
  )
  const [selectedMacroregions, setSelectedMacroregions] = useState<MaybeUndefined<IdType[]>>(
    preloadedExtendedFilters?.macroregions,
  )

  const [extendedFilterFormValues, setExtendedFilterFormValues] =
    useSetState<ExtendedFilterFormFields>({
      ...initialExtendedFilterFormValues,
      ...preloadedExtendedFilters,
    })

  const [taskListQueryArgs, setTaskListQueryArgs] = useSetState<GetTaskListQueryArgs>(() => ({
    filter: initialFastFilter,
    ...getInitialPaginationParams({ limit: DEFAULT_PAGE_SIZE }),
    ...preloadedExtendedFilters,
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

  const onUpdateUserStatus = useCallback<UseOnChangeUserStatusFn>(
    (status) => {
      if (status.code === UserStatusCodeEnum.Offline) {
        setPreloadedExtendedFilters(undefined)
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
    [setExtendedFilterFormValues, setPreloadedExtendedFilters, triggerFilterChange],
  )

  useOnChangeUserStatus(onUpdateUserStatus)

  useEffect(() => {
    if (!selectedTaskId && !!viewTaskId) {
      setSelectedTaskId(viewTaskId)
      setActiveTaskCardTab(taskCardTab)
      setSearchParams(undefined)
    }
  }, [selectedTaskId, setSearchParams, taskCardTab, viewTaskId])

  useLayoutEffect(() => {
    const taskListLayoutEl: MaybeNull<HTMLElement> = document.querySelector('.task-list-layout')

    const taskListLayoutHeaderEl: MaybeNull<HTMLElement> = document.querySelector(
      '.task-list-layout-header',
    )

    const taskListPageHeaderEl: MaybeNull<HTMLElement> =
      document.querySelector('.task-list-page-header')

    if (taskListLayoutEl && taskListPageHeaderEl && taskListLayoutHeaderEl) {
      const spaceBetweenElements = 56

      colRef.current =
        taskListLayoutEl.offsetHeight -
        taskListPageHeaderEl.offsetHeight -
        taskListLayoutHeaderEl.offsetHeight -
        spaceBetweenElements
    }
  }, [])

  const {
    data: taskCounters,
    isError: isGetTaskCountersError,
    isFetching: taskCountersIsFetching,
    refetch: refetchTaskCounters,
  } = useGetTaskCounters(preloadedExtendedFilters, {
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

  const handleExtendedFilterSubmit: ExtendedFilterProps['onSubmit'] = (values) => {
    setAppliedFilterType(FilterTypeEnum.Extended)
    setExtendedFilterFormValues(values)
    triggerFilterChange(mapExtendedFilterFormFieldsToQueries(values))
    setPreloadedExtendedFilters(pick(values, 'customers', 'macroregions', 'supportGroups'))
    setFastFilter(undefined)
    toggleOpenExtendedFilter()
    handleCloseTaskCard()
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
    handleCloseTaskCard()
  }

  const handleSearchByTaskId = useDebounceFn<NonNullable<SearchProps['onSearch']>>(
    (value) => {
      if (value) {
        setAppliedFilterType(FilterTypeEnum.Search)
        triggerFilterChange({ taskId: value })
      } else {
        if (!prevAppliedFilterType) return

        setAppliedFilterType(prevAppliedFilterType)

        const prevFilter = isEqual(prevAppliedFilterType, FilterTypeEnum.Extended)
          ? mapExtendedFilterFormFieldsToQueries(extendedFilterFormValues)
          : isEqual(prevAppliedFilterType, FilterTypeEnum.Fast)
          ? { filter: fastFilter }
          : {}

        triggerFilterChange(prevFilter)
      }

      handleCloseTaskCard()
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

  const handleCloseTaskCard = useCallback(() => {
    setSelectedTaskId(undefined)
    setActiveTaskCardTab(undefined)
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
    handleCloseTaskCard()
    refetchTaskList()
    refetchTaskCounters()
  })

  const searchFilterApplied: boolean = isEqual(appliedFilterType, FilterTypeEnum.Search)

  const getTableRowClassName = useCallback(
    (record: TaskTableListItem): string =>
      isEqual(record.id, selectedTaskId) ? 'table-row--selected' : '',
    [selectedTaskId],
  )

  const handleCloseFilter = (filter: ExtendedFilterListItem) => {
    setPreloadedExtendedFilters((prevState) => ({ ...prevState, [filter.name]: undefined }))
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
                    {preloadedExtendedFilters && (
                      <Col>
                        <ExtendedFilterList
                          data={parseTaskListPageFilters(preloadedExtendedFilters)}
                          onClose={handleCloseFilter}
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

        <Col span={24} style={{ height: colRef.current }}>
          <RowStyled>
            <ColStyled span={selectedTaskId ? (breakpoints.xxl ? 15 : 12) : 24}>
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
            </ColStyled>

            {!!selectedTaskId && (
              <ColStyled span={breakpoints.xxl ? 9 : 12}>
                <React.Suspense fallback={<Spinner />}>
                  <TaskCard
                    taskId={selectedTaskId}
                    activeTab={activeTaskCardTab}
                    additionalInfoExpanded={taskAdditionalInfoExpanded}
                    onExpandAdditionalInfo={toggleTaskAdditionalInfoExpanded}
                    closeTaskCard={handleCloseTaskCard}
                  />
                </React.Suspense>
              </ColStyled>
            )}
          </RowStyled>
        </Col>
      </Row>

      {extendedFilterOpened && (
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
          onSubmit={handleExtendedFilterSubmit}
        />
      )}
    </>
  )
}

export default TaskListPage
