import { useBoolean, usePrevious } from 'ahooks'
import { Button, Col, Input, Row, Space } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { SearchProps } from 'antd/es/input'
import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'
import React, { FC, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import ExtendedFilter from 'modules/task/components/ExtendedFilter'
import { initialExtendedFilterFormValues } from 'modules/task/components/ExtendedFilter/constants'
import {
  ExtendedFilterFormFields,
  ExtendedFilterProps,
} from 'modules/task/components/ExtendedFilter/types'
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
import { useGetUserList, useUserRole } from 'modules/user/hooks'

import FilterButton from 'components/Buttons/FilterButton'
import { SyncIcon } from 'components/Icons'

import { SortOrderEnum } from 'shared/constants/sort'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { MaybeNull, MaybeUndefined } from 'shared/types/utils'
import { calculatePaginationParams, getInitialPaginationParams } from 'shared/utils/pagination'

import { DEFAULT_PAGE_SIZE, FilterTypeEnum } from './constants'
import { ColStyled, RowStyled } from './styles'
import { getInitialFastFilter, mapExtendedFilterFormFieldsToQueries } from './utils'

const { Search } = Input

const TaskListPage: FC = () => {
  const breakpoints = useBreakpoint()
  const { role } = useUserRole()
  const colRef = useRef<number>()

  const [selectedTaskId, setSelectedTaskId] = useState<MaybeNull<number>>(null)

  const [taskAdditionalInfoExpanded, { toggle: toggleTaskAdditionalInfoExpanded }] =
    useBoolean(false)

  const [isExtendedFilterOpened, { toggle: toggleOpenExtendedFilter }] = useBoolean(false)

  const [extendedFilterFormValues, setExtendedFilterFormValues] =
    useState<ExtendedFilterFormFields>(initialExtendedFilterFormValues)

  const initialFastFilter = getInitialFastFilter(role)

  const [queryArgs, setQueryArgs] = useState<GetTaskListQueryArgs>({
    filter: initialFastFilter,
    ...getInitialPaginationParams({ limit: DEFAULT_PAGE_SIZE }),
    sort: getSort('olaNextBreachTime', SortOrderEnum.Ascend),
  })

  const [fastFilter, setFastFilter] = useState<MaybeUndefined<FastFilterEnum>>(initialFastFilter)

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

  const { currentData: userList = [], isFetching: userListIsFetching } = useGetUserList(
    { isManager: true },
    { skip: !isExtendedFilterOpened },
  )

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

  const debouncedToggleOpenExtendedFilter = useDebounceFn(toggleOpenExtendedFilter)

  const handleExtendedFilterSubmit: ExtendedFilterProps['onSubmit'] = (values) => {
    setAppliedFilterType(FilterTypeEnum.Extended)
    toggleOpenExtendedFilter()
    setExtendedFilterFormValues(values)
    setFastFilter(undefined)
    triggerFilterChange(mapExtendedFilterFormFieldsToQueries(values))
    handleCloseTaskCard()
  }

  const handleFastFilterChange = (value: FastFilterEnum) => {
    setAppliedFilterType(FilterTypeEnum.Fast)
    setFastFilter(value)

    setExtendedFilterFormValues(initialExtendedFilterFormValues)
    setSearchValue(undefined)

    triggerFilterChange({
      filter: value,
    })

    handleCloseTaskCard()
  }

  const handleSearchByTaskId = useDebounceFn<NonNullable<SearchProps['onSearch']>>(
    (value) => {
      if (value) {
        setAppliedFilterType(FilterTypeEnum.Search)
        triggerFilterChange({
          taskId: value,
        })
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

      if (columnKey && (columnKey as string) in sortableFieldToSortValues) {
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

  return (
    <TaskListLayout>
      <Row data-testid='task-list-page' gutter={[0, 40]}>
        <Col span={24}>
          <Row className='task-list-page-header' justify='space-between' align='bottom'>
            <Col xxl={16} xl={14}>
              <Row align='middle' gutter={[30, 30]}>
                <Col span={17}>
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

      {isExtendedFilterOpened && (
        <ExtendedFilter
          formValues={extendedFilterFormValues}
          initialFormValues={initialExtendedFilterFormValues}
          userList={userList}
          userListIsLoading={userListIsFetching}
          onClose={debouncedToggleOpenExtendedFilter}
          onSubmit={handleExtendedFilterSubmit}
        />
      )}
    </TaskListLayout>
  )
}

export default TaskListPage
