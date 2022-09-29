import { useBoolean, usePrevious } from 'ahooks'
import { Button, Col, Form, Row, Space, TableProps } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { SearchProps } from 'antd/es/input'
import isArray from 'lodash/isArray'
import { GetComponentProps } from 'rc-table/es/interface'
import React, { FC, useCallback, useState } from 'react'

import { FilterIcon, SyncIcon } from 'components/Icons'
import {
  FastFilterEnum,
  FilterTypeEnum,
} from 'modules/task/features/TaskList/constants/common'
import useGetTaskCounters from 'modules/task/features/TaskList/hooks/useGetTaskCounters'
import useGetTaskList from 'modules/task/features/TaskList/hooks/useGetTaskList'
import { GetTaskListQueryArgsModel } from 'modules/task/features/TaskList/models'
import TaskDetails from 'modules/task/features/TaskView/components/TaskDetailsContainer'
import useUserRole from 'modules/user/hooks/useUserRole'
import useDebounceFn from 'shared/hooks/useDebounceFn'
import { MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

import ExtendedFilter, { ExtendedFilterProps } from '../ExtendedFilter'
import { initialExtendedFilterFormValues } from '../ExtendedFilter/constants'
import {
  ExtendedFilterFormFields,
  ExtendedFilterQueries,
} from '../ExtendedFilter/interfaces'
import FastFilter from '../FastFilter'
import TaskTable from '../TaskTable'
import {
  SortableFieldKey,
  sortableFieldToSortValues,
} from '../TaskTable/constants/sort'
import { TaskTableListItem } from '../TaskTable/interfaces'
import getSort from '../TaskTable/utils/getSort'
import { DEFAULT_PAGE_SIZE } from './constants'
import { FastFilterQueries, TaskIdFilterQueries } from './interfaces'
import { ColFlexStyled, RowStyled, RowWrapStyled, SearchStyled } from './styles'
import { mapExtendedFilterFormFieldsToQueries } from './utils'

const TaskListPage: FC = () => {
  const breakpoints = useBreakpoint()
  const { isEngineerRole } = useUserRole()

  const {
    data: taskCounters,
    isError: isGetTaskCountersError,
    isFetching: taskCountersIsFetching,
    refetch: refetchTaskCounters,
  } = useGetTaskCounters()

  const initialFastFilter: FastFilterEnum = isEngineerRole
    ? FastFilterEnum.Mine
    : FastFilterEnum.All

  const [queryArgs, setQueryArgs] = useState<GetTaskListQueryArgsModel>({
    filter: initialFastFilter,
    limit: DEFAULT_PAGE_SIZE,
    offset: 0,
    sort: getSort('workGroup', 'descend'),
  })

  const {
    data: taskListResponse,
    isFetching: taskListIsFetching,
    refetch: refetchTaskList,
  } = useGetTaskList(queryArgs)

  const [selectedTask, setSelectedTask] =
    useState<MaybeNull<TaskTableListItem['id']>>(null)

  const [
    taskAdditionalInfoExpanded,
    { toggle: toggleTaskAdditionalInfoExpanded },
  ] = useBoolean(false)

  const [extendedFilterForm] = Form.useForm<ExtendedFilterFormFields>()

  const [isExtendedFilterOpened, { toggle: toggleExtendedFilterOpened }] =
    useBoolean(false)

  const debouncedToggleExtendedFilterOpened = useDebounceFn(
    toggleExtendedFilterOpened,
  )

  const [extendedFilterFormValues, setExtendedFilterFormValues] =
    useState<ExtendedFilterFormFields>(initialExtendedFilterFormValues)

  const [fastFilterValue, setFastFilterValue] =
    useState<MaybeUndefined<FastFilterEnum>>(initialFastFilter)

  const [appliedFilterType, setAppliedFilterType] = useState<
    MaybeNull<FilterTypeEnum>
  >(FilterTypeEnum.Fast)

  const previousAppliedFilterType =
    usePrevious<typeof appliedFilterType>(appliedFilterType)

  const handleExtendedFilterSubmit: ExtendedFilterProps['onSubmit'] = (
    values,
  ) => {
    setAppliedFilterType(FilterTypeEnum.Extended)
    toggleExtendedFilterOpened()
    setExtendedFilterFormValues(values)
    setFastFilterValue(undefined)
    triggerFilterChange(mapExtendedFilterFormFieldsToQueries(values))
    handleCloseTaskDetails()
  }

  const handleFastFilterChange = (value: FastFilterEnum) => {
    setAppliedFilterType(FilterTypeEnum.Fast)
    setFastFilterValue(value)

    extendedFilterForm.resetFields()
    setExtendedFilterFormValues(initialExtendedFilterFormValues)

    triggerFilterChange({
      filter: value,
    })

    if (!isEqual(value, fastFilterValue)) {
      handleCloseTaskDetails()
    }
  }

  const handleTaskIdFilterSearch = useDebounceFn<
    NonNullable<SearchProps['onSearch']>
  >((value) => {
    if (value) {
      setAppliedFilterType(FilterTypeEnum.Search)
      triggerFilterChange({
        taskId: value,
      })
    } else {
      setAppliedFilterType(previousAppliedFilterType!)

      const prevFilter = isEqual(
        previousAppliedFilterType,
        FilterTypeEnum.Extended,
      )
        ? mapExtendedFilterFormFieldsToQueries(extendedFilterFormValues)
        : isEqual(previousAppliedFilterType, FilterTypeEnum.Fast)
        ? { filter: fastFilterValue }
        : {}

      triggerFilterChange(prevFilter)
    }

    handleCloseTaskDetails()
  })

  const debouncedSetSelectedTask = useDebounceFn(setSelectedTask)

  const handleTableRowClick: GetComponentProps<TaskTableListItem> = useCallback(
    (record: TaskTableListItem) => ({
      onClick: () => debouncedSetSelectedTask(record.id),
    }),
    [debouncedSetSelectedTask],
  )

  const handleCloseTaskDetails = useCallback(() => {
    setSelectedTask(null)
  }, [setSelectedTask])

  /** обработка изменений сортировки/пагинации в таблице */
  const handleChangeTable = useCallback<
    NonNullable<TableProps<TaskTableListItem>['onChange']>
  >((pagination, _, sorter) => {
    const newQueryArgs: Partial<GetTaskListQueryArgsModel> = {
      offset: (pagination.current! - 1) * pagination.pageSize!,
      limit: pagination.pageSize!,
    }

    if (sorter) {
      const { columnKey, order } = isArray(sorter) ? sorter[0] : sorter

      if (columnKey && columnKey in sortableFieldToSortValues) {
        newQueryArgs.sort = getSort(
          columnKey as SortableFieldKey,
          order || 'ascend',
        )
      }
    }

    setQueryArgs((state) => ({
      ...state,
      ...newQueryArgs,
    }))
  }, [])

  const triggerFilterChange = (
    filterQueryParams:
      | ExtendedFilterQueries
      | FastFilterQueries
      | TaskIdFilterQueries,
  ) => {
    setQueryArgs((prev) => ({
      ...prev,
      offset: 0,
      completeAtFrom: undefined,
      completeAtTo: undefined,
      filter: undefined,
      status: undefined,
      searchByAssignee: undefined,
      searchByName: undefined,
      searchByTitle: undefined,
      taskId: undefined,
      workGroupId: undefined,
      ...filterQueryParams,
    }))
  }

  const handleRefetchTaskList = useDebounceFn(() => {
    refetchTaskList()
    handleCloseTaskDetails()
    refetchTaskCounters()
  })

  const searchFilterApplied: boolean = isEqual(
    appliedFilterType,
    FilterTypeEnum.Search,
  )

  const getTableRowClassName = (record: TaskTableListItem): string =>
    isEqual(record.id, selectedTask) ? 'table-row--selected' : ''

  return (
    <>
      <RowWrapStyled gutter={[0, 40]}>
        <Row justify='space-between' align='bottom'>
          <Col span={13}>
            <Row align='middle' gutter={[30, 30]}>
              <Col>
                <FastFilter
                  data={taskCounters}
                  selectedFilter={queryArgs.filter}
                  onChange={handleFastFilterChange}
                  isError={isGetTaskCountersError}
                  disabled={searchFilterApplied}
                  isLoading={taskCountersIsFetching}
                />
              </Col>

              <Col>
                <Button
                  data-testid='btn-filter-extended'
                  icon={<FilterIcon $size='large' />}
                  onClick={debouncedToggleExtendedFilterOpened}
                  disabled={searchFilterApplied}
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
                  onSearch={handleTaskIdFilterSearch}
                  placeholder='Искать заявку по номеру'
                />
              </Col>

              <Col>
                <Space align='end' size='middle'>
                  <Button
                    data-testid='btn-reload-taskList'
                    icon={<SyncIcon />}
                    onClick={handleRefetchTaskList}
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
                dataSource={taskListResponse?.results}
                loading={taskListIsFetching}
                onChange={handleChangeTable}
                pagination={taskListResponse?.pagination}
              />
            </Col>

            {!!selectedTask && (
              <Col span={breakpoints.xxl ? 9 : 12}>
                <TaskDetails
                  taskId={selectedTask}
                  additionalInfoExpanded={taskAdditionalInfoExpanded}
                  onExpandAdditionalInfo={toggleTaskAdditionalInfoExpanded}
                  onClose={handleCloseTaskDetails}
                />
              </Col>
            )}
          </RowStyled>
        </ColFlexStyled>
      </RowWrapStyled>

      {isExtendedFilterOpened && (
        <ExtendedFilter
          visible
          form={extendedFilterForm}
          initialFormValues={initialExtendedFilterFormValues}
          onClose={toggleExtendedFilterOpened}
          onSubmit={handleExtendedFilterSubmit}
        />
      )}
    </>
  )
}

export default TaskListPage
