import { FilterTwoTone, SyncOutlined } from '@ant-design/icons'
import { useBoolean, usePrevious } from 'ahooks'
import { Button, Col, Form, Row, Space, TableProps } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { SearchProps } from 'antd/es/input'
import { camelize } from 'humps'
import React, { FC, useCallback, useState } from 'react'

import FilterTag from 'components/FilterTag'
import {
  FastFilterEnum,
  FilterTypeEnum,
  SortEnum,
} from 'modules/task/components/TaskList/constants/enums'
import useFastFilterList from 'modules/task/components/TaskList/hooks/useFastFilterList'
import useGetTaskList from 'modules/task/components/TaskList/hooks/useGetTaskList'
import {
  GetTaskListQueryArgsModel,
  TaskListItemModel,
} from 'modules/task/components/TaskList/models'
import TaskDetails from 'modules/task/components/TaskView/components/TaskDetailsContainer'
import useUserRole from 'modules/user/hooks/useUserRole'
import { GetComponentProps } from 'rc-table/lib/interface'
import { Keys, MaybeNull } from 'shared/interfaces/utils'
import isArray from 'shared/utils/array/isArray'

import FilterDrawer, { FilterDrawerProps } from '../FilterDrawer'
import TaskTable from '../TaskTable'
import {
  DEFAULT_PAGE_LIMIT,
  SMART_SORT_TO_FIELD_SORT_DIRECTIONS,
  SORTED_FIELDS,
  SortDirectionsEnum,
  SortedFieldsEnum,
  initialExtendedFilterFormValues,
} from './constants'
import {
  ExtendedFilterFormFields,
  ExtendedFilterQueries,
  FastFilterQueries,
  TaskIdFilterQueries,
} from './interfaces'
import { ColFlexStyled, RowStyled, RowWrapStyled, SearchStyled } from './styles'
import { mapExtendedFilterFormFieldsToQueries } from './utils'

const TaskListPage: FC = () => {
  const breakpoints = useBreakpoint()
  const { isEngineerRole } = useUserRole()

  const {
    data: fastFilterList,
    isFetching: fastFilterListIsFetching,
    refetch: refetchFastFilterList,
  } = useFastFilterList()

  const initialFastFilter: FastFilterEnum = isEngineerRole
    ? FastFilterEnum.Mine
    : FastFilterEnum.All

  const [queryArgs, setQueryArgs] = useState<GetTaskListQueryArgsModel>({
    filter: initialFastFilter,
    limit: DEFAULT_PAGE_LIMIT,
    offset: 0,
    sort: SortEnum.ByOlaAsc,
  })

  const {
    data: taskListResponse,
    isFetching: taskListIsFetching,
    refetch: refetchTaskList,
  } = useGetTaskList(queryArgs)

  const [selectedTask, setSelectedTask] =
    useState<MaybeNull<TaskListItemModel['id']>>(null)

  const [extendedFilterForm] = Form.useForm<ExtendedFilterFormFields>()

  const [isFilterDrawerVisible, { toggle: toggleFilterDrawer }] =
    useBoolean(false)

  const [extendedFilterFormValues, setExtendedFilterFormValues] =
    useState<ExtendedFilterFormFields>(initialExtendedFilterFormValues)

  const [fastFilterValue, setFastFilterValue] =
    useState<MaybeNull<FastFilterEnum>>(initialFastFilter)

  const [appliedFilterType, setAppliedFilterType] = useState<
    MaybeNull<FilterTypeEnum>
  >(FilterTypeEnum.Fast)

  const previousAppliedFilterType =
    usePrevious<typeof appliedFilterType>(appliedFilterType)

  const handleFilterDrawerSubmit: FilterDrawerProps['onSubmit'] = (values) => {
    setAppliedFilterType(FilterTypeEnum.Extended)
    toggleFilterDrawer()
    setExtendedFilterFormValues(values)
    setFastFilterValue(null)
    triggerFilterChange(mapExtendedFilterFormFieldsToQueries(values))
  }

  const handleFastFilterChange = (value: FastFilterEnum) => {
    setAppliedFilterType(FilterTypeEnum.Fast)
    setFastFilterValue(value)

    extendedFilterForm.resetFields()
    setExtendedFilterFormValues(initialExtendedFilterFormValues)

    triggerFilterChange({
      filter: value,
    })
  }

  const handleTaskIdFilterSearch: SearchProps['onSearch'] = (value) => {
    if (value) {
      setAppliedFilterType(FilterTypeEnum.Search)
      triggerFilterChange({
        taskId: value,
      })
    } else {
      setAppliedFilterType(previousAppliedFilterType!)

      const prevFilter =
        previousAppliedFilterType === FilterTypeEnum.Extended
          ? mapExtendedFilterFormFieldsToQueries(extendedFilterFormValues)
          : previousAppliedFilterType === FilterTypeEnum.Fast
          ? { filter: fastFilterValue }
          : {}

      triggerFilterChange(prevFilter)
    }
  }

  const handleTableRowClick: GetComponentProps<TaskListItemModel> = useCallback(
    (record: TaskListItemModel) => ({
      onClick: () => setSelectedTask(record.id),
    }),
    [setSelectedTask],
  )

  const handleCloseTaskDetails = useCallback(() => {
    setSelectedTask(null)
  }, [setSelectedTask])

  const handleTaskResolved = useCallback(() => {
    handleCloseTaskDetails()
    refetchTaskList()
  }, [refetchTaskList, handleCloseTaskDetails])

  /** обработка изменений сортировки/пагинации в таблице */
  const handleChangeTable = useCallback<
    NonNullable<TableProps<TaskListItemModel>['onChange']>
  >((pagination, filters, sorter) => {
    const { field, order = SortDirectionsEnum.ascend } = isArray(sorter)
      ? sorter[0]
      : sorter

    const newQueryArgs: Partial<GetTaskListQueryArgsModel> = {
      offset: (pagination.current! - 1) * pagination.pageSize!,
      limit: pagination.pageSize!,
    }

    if (SORTED_FIELDS.includes(field as SortedFieldsEnum)) {
      const key = camelize(`${field}_${order}`)
      newQueryArgs.sort =
        key in SMART_SORT_TO_FIELD_SORT_DIRECTIONS
          ? SMART_SORT_TO_FIELD_SORT_DIRECTIONS[
              key as Keys<typeof SMART_SORT_TO_FIELD_SORT_DIRECTIONS>
            ]
          : undefined
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
      dateFrom: undefined,
      dateTo: undefined,
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

  const handleRefetchTaskList = () => {
    refetchTaskList()
    handleCloseTaskDetails()
    refetchFastFilterList()
  }

  const searchFilterApplied: boolean =
    appliedFilterType === FilterTypeEnum.Search

  return (
    <>
      <RowWrapStyled gutter={[0, 40]}>
        <Row justify='space-between' align='bottom'>
          <Col span={13}>
            <Row align='middle' gutter={[30, 30]}>
              <Col>
                <Space wrap>
                  {fastFilterList.map(({ amount, text, value }) => (
                    <FilterTag
                      key={value}
                      checked={
                        searchFilterApplied ? false : queryArgs.filter === value
                      }
                      onChange={
                        searchFilterApplied
                          ? undefined
                          : () => handleFastFilterChange(value)
                      }
                      text={text}
                      amount={amount}
                      loading={fastFilterListIsFetching}
                      disabled={searchFilterApplied}
                    />
                  ))}
                </Space>
              </Col>

              <Col>
                <Button
                  icon={<FilterTwoTone className='fs-18' />}
                  onClick={toggleFilterDrawer}
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
                    icon={<SyncOutlined />}
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
                sorting={queryArgs.sort}
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
                  onClose={handleCloseTaskDetails}
                  onTaskResolved={handleTaskResolved}
                  refetchTaskList={refetchTaskList}
                />
              </Col>
            )}
          </RowStyled>
        </ColFlexStyled>
      </RowWrapStyled>

      <FilterDrawer
        form={extendedFilterForm}
        initialValues={initialExtendedFilterFormValues}
        onClose={toggleFilterDrawer}
        onSubmit={handleFilterDrawerSubmit}
        visible={isFilterDrawerVisible}
      />
    </>
  )
}

export default TaskListPage
