import { FilterTwoTone, SyncOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Space, TableProps } from 'antd'
import { SearchProps } from 'antd/es/input'
import { camelize } from 'humps'
import React, { FC, useCallback, useState } from 'react'

import FilterTag from 'components/FilterTag'
import { FastFilterEnum, SortEnum } from 'modules/tasks/constants'
import useGetTaskList from 'modules/tasks/taskList/hooks/useGetTaskList'
import {
  GetTaskListQueryArgsModel,
  TaskListItemModel,
} from 'modules/tasks/taskList/models'
import TaskDetails from 'modules/tasks/taskView/components/TaskDetailsContainer'
import useUserRole from 'modules/user/hooks/useUserRole'
import { GetComponentProps } from 'rc-table/lib/interface'
import { MaybeNull } from 'shared/interfaces/utils'

import FilterDrawer, { FilterDrawerProps } from '../FilterDrawer'
import TaskTable from '../TaskTable'
import {
  DEFAULT_FAST_FILTER,
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
  FilterListItem,
  QuickFilterQueries,
  TaskIdFilterQueries,
} from './interfaces'
import { ColFlexStyled, RowStyled, RowWrapStyled } from './styles'
import { mapExtendedFilterFormFieldsToQueries } from './utils'

const { Search } = Input

const filterList: Array<FilterListItem> = [
  {
    text: 'Все',
    value: FastFilterEnum.All,
    amount: 378,
  },
  {
    text: 'Мои',
    value: FastFilterEnum.Mine,
    amount: 45,
  },
  {
    text: 'Просроченные',
    value: FastFilterEnum.Overdue,
    amount: 145,
  },
  {
    text: 'Свободные',
    value: FastFilterEnum.Free,
    amount: 11,
  },
  {
    text: 'Закрытые',
    value: FastFilterEnum.Closed,
    amount: 13,
  },
]

const TaskListPage: FC = () => {
  const { isEngineerRole } = useUserRole()

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

  const [selectedTaskId, setSelectedTaskId] =
    useState<MaybeNull<TaskListItemModel['id']>>(null)

  const [extendedFilterForm] = Form.useForm<ExtendedFilterFormFields>()

  const [isFilterDrawerVisible, setIsFilterDrawerVisible] =
    useState<boolean>(false)

  const [extendedFilterFormValues, setExtendedFilterFormValues] =
    useState<ExtendedFilterFormFields>(initialExtendedFilterFormValues)

  const [fastFilterValue, setFastFilterValue] =
    useState<FastFilterEnum>(initialFastFilter)

  const toggleFilterDrawer = () => setIsFilterDrawerVisible((prev) => !prev)

  const handleFilterDrawerSubmit: FilterDrawerProps['onSubmit'] = (values) => {
    setExtendedFilterFormValues(values)
    setFastFilterValue(DEFAULT_FAST_FILTER)
    triggerFilterChange(mapExtendedFilterFormFieldsToQueries(values))
  }

  const handleFastFilterChange = (value: FastFilterEnum) => {
    setFastFilterValue(value)
    extendedFilterForm.resetFields()
    setExtendedFilterFormValues(initialExtendedFilterFormValues)

    triggerFilterChange({
      filter: value,
    })
  }

  const handleTaskIdFilterSearch: SearchProps['onSearch'] = (value) => {
    if (value) {
      extendedFilterForm.resetFields()
      triggerFilterChange({
        taskId: value,
      })
    } else {
      extendedFilterForm.setFieldsValue(extendedFilterFormValues)
      triggerFilterChange({
        ...mapExtendedFilterFormFieldsToQueries(extendedFilterFormValues),
        filter: fastFilterValue,
      })
    }
  }

  const handleTableRowClick: GetComponentProps<TaskListItemModel> = useCallback(
    (record: TaskListItemModel) => ({
      onClick: () => setSelectedTaskId(record.id),
    }),
    [setSelectedTaskId],
  )

  const handleCloseTaskDetails = useCallback(() => {
    setSelectedTaskId(null)
  }, [setSelectedTaskId])

  /** обработка изменений сортировки/пагинации в таблице */
  const handleChangeTable = useCallback<
    NonNullable<TableProps<TaskListItemModel>['onChange']>
  >((pagination, filters, sorter) => {
    const { field, order = SortDirectionsEnum.ascend } = Array.isArray(sorter)
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
              key as keyof typeof SMART_SORT_TO_FIELD_SORT_DIRECTIONS
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
      | QuickFilterQueries
      | TaskIdFilterQueries,
  ) => {
    setQueryArgs((prev) => ({
      ...prev,
      offset: 0,
      dateFrom: undefined,
      dateTo: undefined,
      filter: DEFAULT_FAST_FILTER,
      status: undefined,
      searchByAssignee: undefined,
      searchByName: undefined,
      searchByTitle: undefined,
      taskId: undefined,
      workGroupId: undefined,
      ...filterQueryParams,
    }))
  }

  return (
    <>
      <RowWrapStyled gutter={[0, 40]}>
        <Row justify='space-between'>
          <Col span={12}>
            <Row align='middle'>
              <Col span={15}>
                {filterList.map(({ amount, text, value }) => (
                  <FilterTag
                    key={value}
                    checked={queryArgs.filter === value}
                    onChange={() => handleFastFilterChange(value)}
                    text={text}
                    amount={amount}
                  />
                ))}
              </Col>

              <Col span={3}>
                <Button
                  icon={<FilterTwoTone className='font-s-18' />}
                  onClick={toggleFilterDrawer}
                >
                  Фильтры
                </Button>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row justify='end' gutter={[8, 8]}>
              <Col span={12}>
                <Search
                  allowClear
                  onSearch={handleTaskIdFilterSearch}
                  placeholder='Искать заявку по номеру'
                />
              </Col>

              <Col>
                <Space align='end'>
                  <Button icon={<SyncOutlined />} onClick={refetchTaskList}>
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
            <Col span={selectedTaskId ? 16 : 24}>
              <TaskTable
                sorting={queryArgs.sort}
                onRow={handleTableRowClick}
                dataSource={taskListResponse?.results}
                loading={taskListIsFetching}
                onChange={handleChangeTable}
                pagination={taskListResponse?.pagination}
              />
            </Col>

            {!!selectedTaskId && (
              <Col span={8}>
                <TaskDetails
                  onClose={handleCloseTaskDetails}
                  taskId={selectedTaskId}
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
