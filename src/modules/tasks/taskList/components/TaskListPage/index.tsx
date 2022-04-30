import { FilterTwoTone } from '@ant-design/icons'
import { Button, Col, Input, Row } from 'antd'
import React, { FC, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import FilterTag from 'components/FilterTag'

import TaskTable from '../TaskTable'
import { TaskStatusEnum, TasksFiltersEnum } from './constants'

const { Search } = Input

const dataSource: any[] = [
  {
    task: 'REQ0000007898',
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
    task: 'REQ0000007898',
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
    task: 'REQ0000007898',
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
    task: 'REQ0000007898',
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
    task: 'REQ0000007898',
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
    task: 'REQ0000007898',
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
  // {
  //   task: 'REQ0000007898',
  //   foreignNumber: 'ЗНО-000345456-001',
  //   object: '1298-Пятерочка (гп.Воскресенск)',
  //   theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
  //   executor: 'Александровский А.А.',
  //   workingGroup: 'РГ гп.Воскресенск (Московская ...',
  //   executeBefore: '06.12.2021, 16:00:25',
  //   comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
  //   createdAt: '06.12.2021, 16:00:25',
  // },
  // {
  //   task: 'REQ0000007898',
  //   foreignNumber: 'ЗНО-000345456-001',
  //   object: '1298-Пятерочка (гп.Воскресенск)',
  //   theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
  //   executor: 'Александровский А.А.',
  //   workingGroup: 'РГ гп.Воскресенск (Московская ...',
  //   executeBefore: '06.12.2021, 16:00:25',
  //   comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
  //   createdAt: '06.12.2021, 16:00:25',
  // },
  // {
  //   task: 'REQ0000007898',
  //   foreignNumber: 'ЗНО-000345456-001',
  //   object: '1298-Пятерочка (гп.Воскресенск)',
  //   theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
  //   executor: 'Александровский А.А.',
  //   workingGroup: 'РГ гп.Воскресенск (Московская ...',
  //   executeBefore: '06.12.2021, 16:00:25',
  //   comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
  //   createdAt: '06.12.2021, 16:00:25',
  // },
  // {
  //   task: 'REQ0000007898',
  //   foreignNumber: 'ЗНО-000345456-001',
  //   object: '1298-Пятерочка (гп.Воскресенск)',
  //   theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
  //   executor: 'Александровский А.А.',
  //   workingGroup: 'РГ гп.Воскресенск (Московская ...',
  //   executeBefore: '06.12.2021, 16:00:25',
  //   comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
  //   createdAt: '06.12.2021, 16:00:25',
  // },
  // {
  //   task: 'REQ0000007898',
  //   foreignNumber: 'ЗНО-000345456-001',
  //   object: '1298-Пятерочка (гп.Воскресенск)',
  //   theme: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
  //   executor: 'Александровский А.А.',
  //   workingGroup: 'РГ гп.Воскресенск (Московская ...',
  //   executeBefore: '06.12.2021, 16:00:25',
  //   comment: 'Нужно приехать на объект в любой день с 12:00 до 16:00',
  //   createdAt: '06.12.2021, 16:00:25',
  // },
]

const filterList = [
  {
    text: 'Все',
    value: TasksFiltersEnum.All,
    amount: 378,
  },
  {
    text: 'Мои',
    value: TasksFiltersEnum.Mine,
    amount: 45,
  },
  {
    text: 'Просроченные',
    value: TasksFiltersEnum.Overdue,
    amount: 145,
  },
  {
    text: 'Свободные',
    value: TasksFiltersEnum.Free,
    amount: 11,
  },
]

const TaskListPage: FC = () => {
  const [, setSearchParams] = useSearchParams()
  const [selectedFilter, setSelectedFilter] = useState<string>(
    TasksFiltersEnum.All,
  )

  const handleChangeFilter = (value: TasksFiltersEnum) => {
    setSelectedFilter(value)
    setSearchParams({ filter: selectedFilter })
  }

  return (
    <Row gutter={[0, 40]}>
      <Col span={24}>
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
      </Col>

      <Col span={24}>
        <Row>
          <Col span={24}>
            <TaskTable dataSource={dataSource} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default TaskListPage
