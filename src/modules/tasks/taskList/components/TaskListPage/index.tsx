import { FilterTwoTone } from '@ant-design/icons'
import useComponentSize from '@rehooks/component-size'
import { Button, Col, Input, Row } from 'antd'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import FilterTag from 'components/FilterTag'

import { Task } from '../../../models'
import { useTasksListQuery } from '../../../tasks.service'
import TaskDetail from '../TaskDetail'
import TaskTable from '../TaskTable'
import {
  TASK_LIST_FILTER_KEY,
  TaskListFiltersEnum,
  TaskStatusEnum,
} from './constants'
import { FilterListItem } from './interfaces'
import { ColFlexStyled, RowStyled, RowWrapStyled } from './styles'
import { initSelectedFilterState } from './utils'

const { Search } = Input

const dataSource: Array<any> = [
  {
    task: 'REQ0000007801',
    status: TaskStatusEnum.InProgress,
    foreignNumber: 'ЗНО-000345456-001',
    object: '1298-Пятерочка (гп.Воскресенск)',
    theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    executor: 'Александровский А.А.',
    workingGroup: 'РГ гп.Воскресенск (Московская ...',
    executeBefore: '06.12.2021, 16:00:25',
    comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
    createdAt: '06.12.2021, 16:00:25',
  },
  {
    task: 'REQ0000007802',
    status: TaskStatusEnum.Completed,
    foreignNumber: 'ЗНО-000345456-001',
    object: '1298-Пятерочка (гп.Воскресенск)',
    theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    executor: 'Александровский А.А.',
    workingGroup: 'РГ гп.Воскресенск (Московская ...',
    executeBefore: '06.12.2021, 16:00:25',
    comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
    createdAt: '06.12.2021, 16:00:25',
  },
  {
    task: 'REQ0000007803',
    status: TaskStatusEnum.Reclassified,
    foreignNumber: 'ЗНО-000345456-001',
    object: '1298-Пятерочка (гп.Воскресенск)',
    theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    executor: 'Александровский А.А.',
    workingGroup: 'РГ гп.Воскресенск (Московская ...',
    executeBefore: '06.12.2021, 16:00:25',
    comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
    createdAt: '06.12.2021, 16:00:25',
  },
  {
    task: 'REQ0000007804',
    status: TaskStatusEnum.New,
    foreignNumber: 'ЗНО-000345456-001',
    object: '1298-Пятерочка (гп.Воскресенск)',
    theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    executor: 'Александровский А.А.',
    workingGroup: 'РГ гп.Воскресенск (Московская ...',
    executeBefore: '06.12.2021, 16:00:25',
    comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
    createdAt: '06.12.2021, 16:00:25',
  },
  {
    task: 'REQ0000007805',
    status: TaskStatusEnum.Closed,
    foreignNumber: 'ЗНО-000345456-001',
    object: '1298-Пятерочка (гп.Воскресенск)',
    theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    executor: 'Александровский А.А.',
    workingGroup: 'РГ гп.Воскресенск (Московская ...',
    executeBefore: '06.12.2021, 16:00:25',
    comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
    createdAt: '06.12.2021, 16:00:25',
  },
  {
    task: 'REQ0000007806',
    status: TaskStatusEnum.Appointed,
    foreignNumber: 'ЗНО-000345456-001',
    object: '1298-Пятерочка (гп.Воскресенск)',
    theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    executor: 'Александровский А.А.',
    workingGroup: 'РГ гп.Воскресенск (Московская ...',
    executeBefore: '06.12.2021, 16:00:25',
    comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
    createdAt: '06.12.2021, 16:00:25',
  },
  {
    task: 'REQ0000007807',
    status: TaskStatusEnum.InProgress,
    foreignNumber: 'ЗНО-000345456-001',
    object: '1298-Пятерочка (гп.Воскресенск)',
    theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    executor: 'Александровский А.А.',
    workingGroup: 'РГ гп.Воскресенск (Московская ...',
    executeBefore: '06.12.2021, 16:00:25',
    comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
    createdAt: '06.12.2021, 16:00:25',
  },
  {
    task: 'REQ0000007808',
    status: TaskStatusEnum.Completed,
    foreignNumber: 'ЗНО-000345456-001',
    object: '1298-Пятерочка (гп.Воскресенск)',
    theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    executor: 'Александровский А.А.',
    workingGroup: 'РГ гп.Воскресенск (Московская ...',
    executeBefore: '06.12.2021, 16:00:25',
    comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
    createdAt: '06.12.2021, 16:00:25',
  },
  {
    task: 'REQ0000007809',
    status: TaskStatusEnum.Reclassified,
    foreignNumber: 'ЗНО-000345456-001',
    object: '1298-Пятерочка (гп.Воскресенск)',
    theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    executor: 'Александровский А.А.',
    workingGroup: 'РГ гп.Воскресенск (Московская ...',
    executeBefore: '06.12.2021, 16:00:25',
    comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
    createdAt: '06.12.2021, 16:00:25',
  },
  {
    task: 'REQ0000007810',
    status: TaskStatusEnum.New,
    foreignNumber: 'ЗНО-000345456-001',
    object: '1298-Пятерочка (гп.Воскресенск)',
    theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    executor: 'Александровский А.А.',
    workingGroup: 'РГ гп.Воскресенск (Московская ...',
    executeBefore: '06.12.2021, 16:00:25',
    comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
    createdAt: '06.12.2021, 16:00:25',
  },
  {
    task: 'REQ0000007811',
    status: TaskStatusEnum.Closed,
    foreignNumber: 'ЗНО-000345456-001',
    object: '1298-Пятерочка (гп.Воскресенск)',
    theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    executor: 'Александровский А.А.',
    workingGroup: 'РГ гп.Воскресенск (Московская ...',
    executeBefore: '06.12.2021, 16:00:25',
    comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
    createdAt: '06.12.2021, 16:00:25',
  },
  {
    task: 'REQ0000007812',
    status: TaskStatusEnum.Appointed,
    foreignNumber: 'ЗНО-000345456-001',
    object: '1298-Пятерочка (гп.Воскресенск)',
    theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    executor: 'Александровский А.А.',
    workingGroup: 'РГ гп.Воскресенск (Московская ...',
    executeBefore: '06.12.2021, 16:00:25',
    comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
    createdAt: '06.12.2021, 16:00:25',
  },
]

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

  const handleChangeFilter = (filter: TaskListFiltersEnum) => {
    setSelectedFilter(filter)
    setSearchParams({ filter })
  }

  /** todo Логика должна быть с фильтрами */
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [tasks, setTasks] = useState<Task[]>([])
  const { data: taskCurrentPage, isFetching } = useTasksListQuery({
    page: currentPage,
  })

  useEffect(() => {
    if (taskCurrentPage?.length && !isFetching) {
      if (currentPage === 1) {
        setTasks(taskCurrentPage)
      } else {
        setTasks((state) => state.concat(taskCurrentPage))
      }
    }
  }, [taskCurrentPage])

  const handleLoadMore = useCallback(() => {
    setCurrentPage(currentPage + 1)
  }, [currentPage])
  console.log(isFetching)
  const refContainer = useRef<HTMLDivElement>(null)
  const { height: heightContainer } = useComponentSize(refContainer)

  return (
    <RowWrapStyled gutter={[0, 40]} style={{ maxHeight: '100%' }}>
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
              <Button icon={<FilterTwoTone className='font-s-18' />}>
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
          <Col span={16} ref={refContainer}>
            <TaskTable
              heightContainer={heightContainer}
              dataSource={tasks}
              columns={'shorts'}
              onLoadMore={handleLoadMore}
              loadingData={isFetching}
            />
          </Col>
          <Col span={8}>
            <TaskDetail />
          </Col>
        </RowStyled>
      </ColFlexStyled>
    </RowWrapStyled>
  )
}

export default TaskListPage
