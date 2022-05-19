import { FilterTwoTone } from '@ant-design/icons'
import { Button, Col, Input, Row, TableProps } from 'antd'
import { camelize } from 'humps'
import React, { FC, useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import FilterTag from 'components/FilterTag'
import {
  GetTaskListApiArg,
  Task,
  TaskListFiltersEnum,
} from 'modules/tasks/models'
import { useTaskListQuery } from 'modules/tasks/tasks.service'

import FilterDrawer, { FilterDrawerProps } from '../FilterDrawer'
import TaskDetail from '../TaskDetail'
import TaskTable from '../TaskTable'
import { ColumnsTypeContentEnum } from '../TaskTable/constants'
import {
  DEFAULT_PAGE_LIMIT,
  SMART_SORT_TO_FIELD_SORT_DIRECTIONS,
  SORTED_FIELDS,
  TASK_LIST_FILTER_KEY,
} from './constants'
import { FilterListItem } from './interfaces'
import { ColFlexStyled, RowStyled, RowWrapStyled } from './styles'
import { initSelectedFilterState } from './utils'

const { Search } = Input

const filterList: Array<FilterListItem> = [
  {
    text: 'Все',
    value: TaskListFiltersEnum.All,
    amount: 378,
  },
  {
    text: 'Мои',
    value: TaskListFiltersEnum.Mine,
    amount: 45,
  },
  {
    text: 'Просроченные',
    value: TaskListFiltersEnum.Overdue,
    amount: 145,
  },
  {
    text: 'Свободные',
    value: TaskListFiltersEnum.Free,
    amount: 11,
  },
]

const TaskListPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [selectedFilter, setSelectedFilter] = useState<TaskListFiltersEnum>(
    () =>
      initSelectedFilterState(
        searchParams.get(TASK_LIST_FILTER_KEY) as TaskListFiltersEnum,
      ),
  )

  const [isFilterDrawerVisible, setIsFilterDrawerVisible] =
    useState<boolean>(false)

  const [queryArgs, setQueryArgs] = useState<GetTaskListApiArg>({
    limit: DEFAULT_PAGE_LIMIT,
    offset: 0,
  })

  const toggleFilterDrawer = () => setIsFilterDrawerVisible((prev) => !prev)

  /** заготовка под сабмит расширенного фильтра todo: допилить */
  const handleFilterDrawerSubmit: FilterDrawerProps['onSubmit'] = (values) => {
    console.log('Filter drawer submit', values)
    if (values.taskStatuses) {
      setQueryArgs((prev) => ({
        ...prev,
        status: values.taskStatuses,
        offset: 0,
      }))
    }

    if (values.creationDate) {
      setQueryArgs((prev) => ({
        ...prev,
        dateFrom: values.creationDate![0].toDateString(),
        dateTo: values.creationDate![1].toDateString(),
      }))
    }
  }

  const handleChangeFilter = (filter: TaskListFiltersEnum) => {
    setSelectedFilter(filter)
    setSearchParams({ filter })
  }

  const { data: taskCurrentResponsePage, isFetching } =
    useTaskListQuery(queryArgs)

  console.log('taskCurrentResponsePage', taskCurrentResponsePage)

  /** обработка изменений сортировки/пагинации в таблице */
  const handleChangeTable = useCallback<
    NonNullable<TableProps<Task>['onChange']>
  >((pagination, filters, sorter) => {
    console.log('handleChangeTable', pagination)

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

  return (
    <div style={{ maxHeight: '100%' }}>
      <RowWrapStyled gutter={[0, 40]}>
        <Row justify='space-between'>
          <Col span={15}>
            <Row align='middle'>
              <Col span={12}>
                {filterList.map((filter, index) => (
                  <FilterTag
                    key={index}
                    checked={selectedFilter === filter.value}
                    onChange={() => handleChangeFilter(filter.value)}
                    text={filter.text}
                    amount={filter.amount}
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
                <Search placeholder='Искать заявку по номеру' />
              </Col>

              <Col span={8}>
                <Button>+ Создать заявку</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <ColFlexStyled span={24} flex='1'>
          <RowStyled>
            <Col span={24}>
              <TaskTable
                dataSource={taskCurrentResponsePage?.results}
                columns={ColumnsTypeContentEnum.All}
                loading={isFetching}
                onChange={handleChangeTable}
                pagination={taskCurrentResponsePage?.pagination}
              />
            </Col>
            {false && (
              <Col span={8}>
                <TaskDetail />
              </Col>
            )}
          </RowStyled>
        </ColFlexStyled>
      </RowWrapStyled>
      <FilterDrawer
        onClose={toggleFilterDrawer}
        onSubmit={handleFilterDrawerSubmit}
        visible={isFilterDrawerVisible}
      />
    </div>
  )
}

export default TaskListPage
