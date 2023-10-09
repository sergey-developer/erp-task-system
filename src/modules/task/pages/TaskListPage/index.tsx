import { useBoolean, usePrevious, useSetState } from 'ahooks'
import { Button, Col, Input, Row, Space } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { SearchProps } from 'antd/es/input'
import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import React, { FC, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

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
import TaskCard from 'modules/task/components/TaskCard/CardContainer'
import TaskListLayout from 'modules/task/components/TaskListLayout'
import TaskTable from 'modules/task/components/TaskTable'
import {
  SortableField,
  sortableFieldToSortValues,
} from 'modules/task/components/TaskTable/constants/sort'
import { TaskTableListItem, TaskTableProps } from 'modules/task/components/TaskTable/types'
import { getSort } from 'modules/task/components/TaskTable/utils'
import { FastFilterEnum } from 'modules/task/constants/task'
import { useLazyGetTaskList } from 'modules/task/hooks/task'
import { useGetTaskCounters } from 'modules/task/hooks/taskCounters'
import {
  ExtendedFilterQueries,
  FastFilterQueries,
  GetTaskListQueryArgs,
  TaskIdFilterQueries,
} from 'modules/task/models'
import {
  TaskListPageFiltersStorage,
  taskLocalStorageService,
} from 'modules/task/services/taskLocalStorage/taskLocalStorage.service'
import { parseTaskListPageFilters } from 'modules/task/services/taskLocalStorage/utils/taskListPageFilters'
import { useGetUserList, useUserRole } from 'modules/user/hooks'
import { useGetCustomerList } from 'modules/warehouse/hooks/customer'
import { useGetWorkGroupList } from 'modules/workGroup/hooks'

import FilterButton from 'components/Buttons/FilterButton'
import { SyncIcon } from 'components/Icons'

import { SortOrderEnum } from 'shared/constants/sort'
import { useGetMacroregionList } from 'shared/hooks/macroregion'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { MaybeNull, MaybeUndefined } from 'shared/types/utils'
import { calculatePaginationParams, getInitialPaginationParams } from 'shared/utils/pagination'

import { DEFAULT_PAGE_SIZE, FilterTypeEnum } from './constants'
import { ColStyled, RowStyled } from './styles'
import {
  getInitialFastFilter,
  getInitialExtendedFilterFormValues,
  mapExtendedFilterFormFieldsToQueries,
} from './utils'

const { Search } = Input
const initialExtendedFilterFormValues = getInitialExtendedFilterFormValues()

const TaskListPage: FC = () => {
  const breakpoints = useBreakpoint()
  const { role } = useUserRole()
  const colRef = useRef<number>()

  const [selectedTaskId, setSelectedTaskId] = useState<MaybeNull<IdType>>(null)

  const [taskAdditionalInfoExpanded, { toggle: toggleTaskAdditionalInfoExpanded }] =
    useBoolean(false)

  const initialFastFilter = getInitialFastFilter(role)
  const [fastFilter, setFastFilter] = useState<MaybeUndefined<FastFilterEnum>>(initialFastFilter)

  const [extendedFilterOpened, { toggle: toggleOpenExtendedFilter }] = useBoolean(false)

  const [preloadedExtendedFilters, setPreloadedExtendedFilters] =
    useSetState<TaskListPageFiltersStorage>(
      () => taskLocalStorageService.getTaskListPageFilters() || {},
    )

  const [selectedCustomers, setSelectedCustomers] = useState<MaybeUndefined<IdType[]>>(
    preloadedExtendedFilters.customers,
  )
  const [selectedMacroregions, setSelectedMacroregions] = useState<MaybeUndefined<IdType[]>>(
    preloadedExtendedFilters.macroregions,
  )

  const [extendedFilterFormValues, setExtendedFilterFormValues] =
    useSetState<ExtendedFilterFormFields>({
      ...initialExtendedFilterFormValues,
      ...preloadedExtendedFilters,
    })

  const [queryArgs, setQueryArgs] = useState<GetTaskListQueryArgs>(() => ({
    filter: initialFastFilter,
    ...getInitialPaginationParams({ limit: DEFAULT_PAGE_SIZE }),
    ...preloadedExtendedFilters,
    sort: getSort('olaNextBreachTime', SortOrderEnum.Ascend),
  }))

  const [searchValue, setSearchValue] = useState<string>()

  const [appliedFilterType, setAppliedFilterType] = useState<MaybeNull<FilterTypeEnum>>(
    FilterTypeEnum.Fast,
  )

  const previousAppliedFilterType = usePrevious<typeof appliedFilterType>(appliedFilterType)

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
  } = useGetTaskCounters()

  /**
   * Намеренно используется LazyQuery чтобы можно было перезапрашивать список по условию.
   * Это также можно сделать если передать аргумент `skip` в обычный Query, но тогда
   * данные будут сбрасываться, это связано с багом https://github.com/reduxjs/redux-toolkit/issues/2871
   * Как баг починят, будет видно, оставлять как есть или можно использовать обычный Query.
   */
  const [getTaskList, { data: taskList, isFetching: taskListIsFetching }] = useLazyGetTaskList()

  useEffect(() => {
    if (queryArgs.sort && !sortableFieldToSortValues.status.includes(queryArgs.sort)) {
      getTaskList(queryArgs)
    }
  }, [getTaskList, queryArgs])

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

  const saveSupportGroupFilterToStorage = (
    data: Pick<ExtendedFilterFormFields, 'customers' | 'macroregions' | 'supportGroups'>,
  ) => taskLocalStorageService.setTaskListPageFilters(data)

  const handleExtendedFilterSubmit: ExtendedFilterProps['onSubmit'] = (values) => {
    setAppliedFilterType(FilterTypeEnum.Extended)
    toggleOpenExtendedFilter()
    setExtendedFilterFormValues(values)
    setFastFilter(undefined)
    triggerFilterChange(mapExtendedFilterFormFieldsToQueries(values))
    handleCloseTaskCard()
    const supportGroupValues = pick(values, 'customers', 'macroregions', 'supportGroups')
    saveSupportGroupFilterToStorage(supportGroupValues)
    setPreloadedExtendedFilters(supportGroupValues)
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
    // сбрасывать сохранённый фильтр?
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
        if (!previousAppliedFilterType) return

        setAppliedFilterType(previousAppliedFilterType!)

        const prevFilter = isEqual(previousAppliedFilterType, FilterTypeEnum.Extended)
          ? mapExtendedFilterFormFieldsToQueries(extendedFilterFormValues)
          : isEqual(previousAppliedFilterType, FilterTypeEnum.Fast)
          ? { filter: fastFilter }
          : {}

        triggerFilterChange(prevFilter)
      }

      handleCloseTaskCard()
    },
    [previousAppliedFilterType, extendedFilterFormValues, fastFilter],
  )

  const onChangeSearch: NonNullable<SearchProps['onChange']> = (event) => {
    const value = event.target.value
    setSearchValue(value)
    if (!value) handleSearchByTaskId(value)
  }

  const debouncedSetSelectedTaskId = useDebounceFn(setSelectedTaskId)

  const handleTableRowClick = useCallback<TaskTableProps['onRow']>(
    (record) => ({
      onClick: () => debouncedSetSelectedTaskId(record.id),
    }),
    [debouncedSetSelectedTaskId],
  )

  const handleCloseTaskCard = useCallback(() => {
    setSelectedTaskId(null)
  }, [setSelectedTaskId])

  const handleTableSort = (sorter: Parameters<TaskTableProps['onChange']>[2]) => {
    /**
     * При сортировке по возрастанию (ascend), поля sorter.column и sorter.order равны undefined
     * Пока не ясно почему так происходит, но данная проблема уже была до рефакторинга сортировки,
     * при изначальной реализации
     */
    if (sorter) {
      const { columnKey, order } = isArray(sorter) ? sorter[0] : sorter

      if (columnKey && columnKey in sortableFieldToSortValues) {
        setQueryArgs((prevState) => ({
          ...prevState,
          sort: getSort(columnKey as SortableField, order || SortOrderEnum.Ascend),
        }))
      }
    }
  }

  const handleTablePagination = useCallback(
    (pagination: Parameters<TaskTableProps['onChange']>[0]) => {
      setQueryArgs((prevState) => ({
        ...prevState,
        ...calculatePaginationParams(pagination),
      }))
    },
    [],
  )

  const handleChangeTable = useCallback<TaskTableProps['onChange']>(
    (pagination, _, sorter) => {
      handleTableSort(sorter)
      handleTablePagination(pagination)
    },
    [handleTablePagination],
  )

  const triggerFilterChange = (
    filterQueryParams: ExtendedFilterQueries | FastFilterQueries | TaskIdFilterQueries,
  ) => {
    setQueryArgs((prevState) => ({
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
  }

  const handleRefetchTaskList = useDebounceFn(() => {
    getTaskList(queryArgs)
    handleCloseTaskCard()
    refetchTaskCounters()
  }, [getTaskList, queryArgs])

  const searchFilterApplied: boolean = isEqual(appliedFilterType, FilterTypeEnum.Search)

  const getTableRowClassName = useCallback(
    (record: TaskTableListItem): string =>
      isEqual(record.id, selectedTaskId) ? 'table-row--selected' : '',
    [selectedTaskId],
  )

  const handleCloseFilter = (filter: ExtendedFilterListItem) => {
    const isDeleted = taskLocalStorageService.deleteTaskListPageFilter(filter.name)

    if (isDeleted) {
      setExtendedFilterFormValues({ [filter.name]: undefined })
      if (filter.name === 'customers') setSelectedCustomers([])
      if (filter.name === 'macroregions') setSelectedMacroregions([])
      setPreloadedExtendedFilters({ [filter.name]: undefined })
      triggerFilterChange({ [filter.name]: undefined })
    }
  }

  return (
    <TaskListLayout>
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
                        selectedFilter={queryArgs.filter}
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
                    <Button
                      icon={<SyncIcon />}
                      onClick={handleRefetchTaskList}
                      disabled={taskListIsFetching}
                    >
                      Обновить заявки
                    </Button>

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
                sort={queryArgs.sort}
                onRow={handleTableRowClick}
                dataSource={taskList?.results || []}
                loading={taskListIsFetching}
                onChange={handleChangeTable}
                pagination={taskList?.pagination || false}
                userRole={role!}
              />
            </ColStyled>

            {!!selectedTaskId && (
              <ColStyled span={breakpoints.xxl ? 9 : 12}>
                <TaskCard
                  taskId={selectedTaskId}
                  additionalInfoExpanded={taskAdditionalInfoExpanded}
                  onExpandAdditionalInfo={toggleTaskAdditionalInfoExpanded}
                  closeTaskCard={handleCloseTaskCard}
                />
              </ColStyled>
            )}
          </RowStyled>
        </Col>
      </Row>

      {extendedFilterOpened && (
        <ExtendedFilter
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
    </TaskListLayout>
  )
}

export default TaskListPage
