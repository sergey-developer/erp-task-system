import { useBoolean, usePrevious } from 'ahooks'
import {
  Button,
  Col,
  Row,
  Space,
  TablePaginationConfig,
  TableProps,
} from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { SearchProps } from 'antd/es/input'
import { SorterResult } from 'antd/es/table/interface'
import isArray from 'lodash/isArray'
import { GetComponentProps } from 'rc-table/es/interface'
import React, { FC, useCallback, useEffect, useState } from 'react'

import { FilterIcon, SyncIcon } from 'components/Icons'
import TaskCard from 'modules/task/features/TaskCard/CardContainer'
import { useGetTaskCounters, useLazyGetTaskList } from 'modules/task/hooks'
import { GetTaskListQueryArgs } from 'modules/task/models'
import { useUserRole } from 'modules/user/hooks'
import { SortOrderEnum } from 'shared/constants/sort'
import { useDebounceFn } from 'shared/hooks'
import { MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

import ExtendedFilter, {
  ExtendedFilterProps,
} from '../../features/ExtendedFilter'
import { initialExtendedFilterFormValues } from '../../features/ExtendedFilter/constants'
import {
  ExtendedFilterFormFields,
  ExtendedFilterQueries,
} from '../../features/ExtendedFilter/interfaces'
import FastFilter from '../../features/FastFilter'
import { FastFilterEnum } from '../../features/FastFilter/constants'
import TaskTable from '../../features/TaskTable'
import {
  SortableField,
  sortableFieldToSortValues,
} from '../../features/TaskTable/constants/sort'
import { TaskTableListItem } from '../../features/TaskTable/interfaces'
import { getSort } from '../../features/TaskTable/utils'
import { DEFAULT_PAGE_SIZE, FilterTypeEnum } from './constants'
import { FastFilterQueries, TaskIdFilterQueries } from './interfaces'
import { ColFlexStyled, RowStyled, RowWrapStyled, SearchStyled } from './styles'
import { mapExtendedFilterFormFieldsToQueries } from './utils'

const TaskListPage: FC = () => {
  const breakpoints = useBreakpoint()
  const { isEngineerRole, role } = useUserRole()

  const {
    data: taskCounters,
    isError: isGetTaskCountersError,
    isFetching: taskCountersIsFetching,
    refetch: refetchTaskCounters,
  } = useGetTaskCounters()

  const initialFastFilter: FastFilterEnum = isEngineerRole
    ? FastFilterEnum.Mine
    : FastFilterEnum.All

  const [queryArgs, setQueryArgs] = useState<GetTaskListQueryArgs>({
    filter: initialFastFilter,
    limit: DEFAULT_PAGE_SIZE,
    offset: 0,
    sort: getSort('olaNextBreachTime', SortOrderEnum.Ascend),
  })

  /**
   * Намеренно используется LazyQuery чтобы можно было перезапрашивать список по условию.
   * Это также можно сделать если передать аргумент `skip` в обычный Query, но тогда
   * данные будут сбрасываться, это связано с багом https://github.com/reduxjs/redux-toolkit/issues/2871
   * Как баг починят, будет видно, оставлять как есть или можно использовать обычный Query.
   */
  const {
    fn: fetchTaskList,
    state: { data: taskListResponse, isFetching: taskListIsFetching },
  } = useLazyGetTaskList()

  useEffect(() => {
    if (!sortableFieldToSortValues.status.includes(queryArgs.sort)) {
      fetchTaskList(queryArgs)
    }
  }, [fetchTaskList, queryArgs])

  const [selectedTask, setSelectedTask] =
    useState<MaybeNull<TaskTableListItem['id']>>(null)

  const [
    taskAdditionalInfoExpanded,
    { toggle: toggleTaskAdditionalInfoExpanded },
  ] = useBoolean(false)

  const [isExtendedFilterOpened, { toggle: toggleOpenExtendedFilter }] =
    useBoolean(false)

  const [extendedFilterFormValues, setExtendedFilterFormValues] =
    useState<ExtendedFilterFormFields>(initialExtendedFilterFormValues)

  const [fastFilter, setFastFilter] =
    useState<MaybeUndefined<FastFilterEnum>>(initialFastFilter)

  const [searchValue, setSearchValue] = useState<string>()

  const [appliedFilterType, setAppliedFilterType] = useState<
    MaybeNull<FilterTypeEnum>
  >(FilterTypeEnum.Fast)

  const previousAppliedFilterType =
    usePrevious<typeof appliedFilterType>(appliedFilterType)

  const debouncedToggleOpenExtendedFilter = useDebounceFn(
    toggleOpenExtendedFilter,
  )

  const handleExtendedFilterSubmit: ExtendedFilterProps['onSubmit'] = (
    values,
  ) => {
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

  const handleSearchByTaskId = useDebounceFn<
    NonNullable<SearchProps['onSearch']>
  >(
    (value) => {
      if (value) {
        setAppliedFilterType(FilterTypeEnum.Search)
        triggerFilterChange({
          taskId: value,
        })
      } else {
        if (!previousAppliedFilterType) return

        setAppliedFilterType(previousAppliedFilterType!)

        const prevFilter = isEqual(
          previousAppliedFilterType,
          FilterTypeEnum.Extended,
        )
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

  const debouncedSetSelectedTask = useDebounceFn(setSelectedTask)

  const handleTableRowClick: GetComponentProps<TaskTableListItem> = useCallback(
    (record: TaskTableListItem) => ({
      onClick: () => debouncedSetSelectedTask(record.id),
    }),
    [debouncedSetSelectedTask],
  )

  const handleCloseTaskCard = useCallback(() => {
    setSelectedTask(null)
  }, [setSelectedTask])

  const handleTableSort = (
    sorter: SorterResult<TaskTableListItem> | SorterResult<TaskTableListItem>[],
  ) => {
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
          sort: getSort(
            columnKey as SortableField,
            order || SortOrderEnum.Ascend,
          ),
        }))
      }
    }
  }

  const handleTablePagination = (pagination: TablePaginationConfig) => {
    setQueryArgs((prevState) => ({
      ...prevState,
      offset: (pagination.current! - 1) * pagination.pageSize!,
      limit: pagination.pageSize!,
    }))
  }

  const handleChangeTable = useCallback<
    NonNullable<TableProps<TaskTableListItem>['onChange']>
  >((pagination, _, sorter) => {
    handleTableSort(sorter)
    handleTablePagination(pagination)
  }, [])

  const triggerFilterChange = (
    filterQueryParams:
      | ExtendedFilterQueries
      | FastFilterQueries
      | TaskIdFilterQueries,
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
      ...filterQueryParams,
    }))
  }

  const handleRefetchTaskList = useDebounceFn(() => {
    fetchTaskList(queryArgs)
    handleCloseTaskCard()
    refetchTaskCounters()
  }, [fetchTaskList, queryArgs])

  const searchFilterApplied: boolean = isEqual(
    appliedFilterType,
    FilterTypeEnum.Search,
  )

  const getTableRowClassName = (record: TaskTableListItem): string =>
    isEqual(record.id, selectedTask) ? 'table-row--selected' : ''

  return (
    <>
      <RowWrapStyled data-testid='page-task-list' gutter={[0, 40]}>
        <Row justify='space-between' align='bottom'>
          <Col span={13}>
            <Row align='middle' gutter={[30, 30]}>
              <Col>
                <FastFilter
                  data={taskCounters}
                  selectedFilter={queryArgs.filter}
                  onChange={handleFastFilterChange}
                  isError={isGetTaskCountersError}
                  disabled={taskListIsFetching}
                  isLoading={taskCountersIsFetching}
                />
              </Col>

              <Col>
                <Button
                  icon={<FilterIcon $size='large' />}
                  onClick={debouncedToggleOpenExtendedFilter}
                  disabled={taskListIsFetching || searchFilterApplied}
                >
                  Фильтры
                </Button>
              </Col>
            </Row>
          </Col>

          <Col span={10}>
            <Row justify='end' gutter={[16, 8]}>
              <Col>
                <SearchStyled
                  $breakpoints={breakpoints}
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

        <ColFlexStyled span={24} flex='1'>
          <RowStyled>
            <Col span={selectedTask ? (breakpoints.xxl ? 15 : 12) : 24}>
              <TaskTable
                rowClassName={getTableRowClassName}
                sort={queryArgs.sort}
                onRow={handleTableRowClick}
                dataSource={taskListResponse?.results || []}
                loading={taskListIsFetching}
                onChange={handleChangeTable}
                pagination={taskListResponse?.pagination || false}
                userRole={role!}
              />
            </Col>

            {!!selectedTask && (
              <Col span={breakpoints.xxl ? 9 : 12}>
                <TaskCard
                  taskId={selectedTask}
                  additionalInfoExpanded={taskAdditionalInfoExpanded}
                  onExpandAdditionalInfo={toggleTaskAdditionalInfoExpanded}
                  closeTaskCard={handleCloseTaskCard}
                />
              </Col>
            )}
          </RowStyled>
        </ColFlexStyled>
      </RowWrapStyled>

      {isExtendedFilterOpened && (
        <ExtendedFilter
          formValues={extendedFilterFormValues}
          initialFormValues={initialExtendedFilterFormValues}
          onClose={debouncedToggleOpenExtendedFilter}
          onSubmit={handleExtendedFilterSubmit}
        />
      )}
    </>
  )
}

export default TaskListPage
