import { FilterTwoTone } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, TableProps } from 'antd'
import { SearchProps } from 'antd/es/input'
import { camelize } from 'humps'
import React, { FC, useCallback, useState } from 'react'
import { GetComponentProps } from 'rc-table/lib/interface'

import FilterTag from 'components/FilterTag'
import {
  ExtendedFilterFormFields,
  ExtendedFilterQueries,
  FastFilterEnum,
  GetTaskListApiArg,
  QuickFilterQueries,
  Task,
  TaskIdFilterQueries,
} from 'modules/tasks/models'
import { useTaskListQuery } from 'modules/tasks/tasks.service'
import { MaybeNull } from 'shared/interfaces/utils'

import FilterDrawer, { FilterDrawerProps } from '../FilterDrawer'
import TaskDetail from '../TaskDetail'
import TaskTable from '../TaskTable'
import { ColumnsTypeContentEnum } from '../TaskTable/constants'
import {
  DEFAULT_FAST_FILTER,
  DEFAULT_PAGE_LIMIT,
  SMART_SORT_TO_FIELD_SORT_DIRECTIONS,
  SORTED_FIELDS,
  initialExtendedFilterFormValues,
} from './constants'
import { FilterListItem } from './interfaces'
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
]

const TaskListPage: FC = () => {
  const [queryArgs, setQueryArgs] = useState<GetTaskListApiArg>({
    filter: DEFAULT_FAST_FILTER,
    limit: DEFAULT_PAGE_LIMIT,
    offset: 0,
  })

  const { data: tasksListResponse, isFetching } = useTaskListQuery(queryArgs)

  const [selectedTask, setSelectedTask] = useState<MaybeNull<Task>>(null)

  const [extendedFilterForm] = Form.useForm<ExtendedFilterFormFields>()

  const [isFilterDrawerVisible, setIsFilterDrawerVisible] =
    useState<boolean>(false)

  const [extendedFilterFormValues, setExtendedFilterFormValues] =
    useState<ExtendedFilterFormFields>(initialExtendedFilterFormValues)

  const [fastFilterValue, setFastFilterValue] =
    useState<FastFilterEnum>(DEFAULT_FAST_FILTER)

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

  const handleTableRowClick: GetComponentProps<Task> = useCallback(
    (record: Task) => ({
      onClick: () => setSelectedTask(record),
    }),
    [setSelectedTask],
  )

  const handleCloseTaskDetail = useCallback(() => {
    setSelectedTask(null)
  }, [setSelectedTask])

  /** обработка изменений сортировки/пагинации в таблице */
  const handleChangeTable = useCallback<
    NonNullable<TableProps<Task>['onChange']>
  >((pagination, filters, sorter) => {
    const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter

    const newQueryArgs: Partial<GetTaskListApiArg> = {
      offset: (pagination.current! - 1) * pagination.pageSize!,
      limit: pagination.pageSize!,
    }

    if (SORTED_FIELDS.includes(field as string)) {
      const key = camelize(`${field}_${order}`)
      newQueryArgs.smartSort =
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
      smartSearchAssignee: undefined,
      smartSearchDescription: undefined,
      smartSearchName: undefined,
      taskId: undefined,
      ...filterQueryParams,
    }))
  }

  return (
    <>
      <RowWrapStyled gutter={[0, 40]}>
        <Row justify='space-between'>
          <Col span={15}>
            <Row align='middle'>
              <Col span={10}>
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

          <Col span={7}>
            <Row justify='space-between'>
              <Col span={14}>
                <Search
                  allowClear
                  onSearch={handleTaskIdFilterSearch}
                  placeholder='Искать заявку по номеру'
                />
              </Col>

              <Col span={8}>
                <Button>+ Создать заявку</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <ColFlexStyled span={24} flex='1'>
          <RowStyled>
            <Col span={selectedTask ? 16 : 24}>
              <TaskTable
                onRow={handleTableRowClick}
                dataSource={tasksListResponse?.results}
                columns={ColumnsTypeContentEnum.All}
                loading={isFetching}
                onChange={handleChangeTable}
                pagination={tasksListResponse?.pagination}
              />
            </Col>

            {!!selectedTask && (
              <Col span={8}>
                <TaskDetail onClose={handleCloseTaskDetail} />
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
