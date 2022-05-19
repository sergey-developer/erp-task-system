import { FilterTwoTone } from '@ant-design/icons'
import useComponentSize from '@rehooks/component-size'
import { Button, Col, Input, Row } from 'antd'
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/lib/table/interface'
import { camelize } from 'humps'
import { GetComponentProps } from 'rc-table/lib/interface'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import FilterTag from 'components/FilterTag'
import {
  GetTaskListApiArg,
  Task,
  TaskListFiltersEnum,
} from 'modules/tasks/models'
import { useTaskListQuery } from 'modules/tasks/tasks.service'
import { MaybeNull } from 'shared/interfaces/utils'

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
  const [selectedTask, setSelectedTask] = useState<MaybeNull<any>>({})

  const [isFilterDrawerVisible, setIsFilterDrawerVisible] =
    useState<boolean>(false)

  const toggleFilterDrawer = () => setIsFilterDrawerVisible((prev) => !prev)

  /** заготовка под сабмит расширенного фильтра todo: допилить */
  const handleFilterDrawerSubmit: FilterDrawerProps['onSubmit'] = (values) => {
    console.log('Filter drawer submit', values)
  }

  const handleChangeFilter = (filter: TaskListFiltersEnum) => {
    setSelectedFilter(filter)
    setSearchParams({ filter })
  }

  const [queryArgs, setQueryArgs] = useState<GetTaskListApiArg>({
    limit: DEFAULT_PAGE_LIMIT,
    offset: 0,
  })

  const [tasks, setTasks] = useState<Task[]>([])
  const { data: taskCurrentResponsePage, isFetching } =
    useTaskListQuery(queryArgs)

  useEffect(() => {
    if (!isFetching && taskCurrentResponsePage?.results) {
      if (!taskCurrentResponsePage.previous) {
        setTasks(taskCurrentResponsePage?.results)
      } else {
        setTasks((state) =>
          state.concat(taskCurrentResponsePage?.results ?? []),
        )
      }
    }
  }, [
    isFetching,
    taskCurrentResponsePage?.previous,
    taskCurrentResponsePage?.results,
  ])

  const handleRowClick: GetComponentProps<Task> = useCallback(
    (record: Task) => ({
      onClick: () => setSelectedTask(record),
    }),
    [setSelectedTask],
  )

  const handleCloseTaskDetail = useCallback(() => {
    setSelectedTask(null)
  }, [setSelectedTask])

  const handleLoadMore = useCallback(() => {
    if (taskCurrentResponsePage?.next) {
      setQueryArgs((state) => ({
        ...state,
        offset: (queryArgs?.offset ?? 0) + DEFAULT_PAGE_LIMIT,
      }))
    }
  }, [queryArgs?.offset, taskCurrentResponsePage?.next])

  const refContainer = useRef<HTMLDivElement>(null)
  const { height: heightContainer } = useComponentSize(refContainer)

  /** обработка сортировок в таблице */
  const handleChangeTable = useCallback(
    (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<Task> | SorterResult<Task>[],
    ) => {
      const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter
      if (SORTED_FIELDS.includes(field as string)) {
        const key = camelize(`${field}_${order}`)
        setQueryArgs((state) => ({
          ...state,
          smartSort:
            key in SMART_SORT_TO_FIELD_SORT_DIRECTIONS
              ? SMART_SORT_TO_FIELD_SORT_DIRECTIONS[
                  key as keyof typeof SMART_SORT_TO_FIELD_SORT_DIRECTIONS
                ]
              : undefined,
          offset: 0,
        }))
      }
    },
    [],
  )
  return (
    <>
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
            <Col span={selectedTask ? 16 : 24} ref={refContainer}>
              <TaskTable
                onRow={handleRowClick}
                heightContainer={heightContainer}
                dataSource={tasks}
                columns={
                  selectedTask
                    ? ColumnsTypeContentEnum.Short
                    : ColumnsTypeContentEnum.All
                }
                onLoadMore={handleLoadMore}
                loadingData={isFetching}
                onChange={handleChangeTable}
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
        onClose={toggleFilterDrawer}
        onSubmit={handleFilterDrawerSubmit}
        visible={isFilterDrawerVisible}
      />
    </>
  )
}

export default TaskListPage
