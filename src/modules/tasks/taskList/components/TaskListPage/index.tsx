import { FilterTwoTone } from '@ant-design/icons'
import { Button, Col, Input, Row, Table } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import FilterTag from 'components/FilterTag'

import { FiltersEnum, tableColumns } from './constants'

const { Search } = Input

const dataSource: any[] = [
  {
    task: 'REQ0000007898',
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

const filterList = [
  {
    text: 'Все',
    value: FiltersEnum.All,
    amount: 378,
  },
  {
    text: 'Просроченные',
    value: FiltersEnum.Overdue,
    amount: 145,
  },
  {
    text: 'Решить сегодня',
    value: FiltersEnum.DecideToday,
    amount: 45,
  },
  {
    text: 'Свободные',
    value: FiltersEnum.Free,
    amount: 11,
  },
]

const TaskListPage: FC = () => {
  const [, setSearchParams] = useSearchParams()
  const [selectedFilter, setSelectedFilter] = useState<string>(FiltersEnum.All)

  const handleChangeFilter = (value: FiltersEnum) => {
    setSelectedFilter(value)
    setSearchParams({ filter: selectedFilter })
  }

  return (
    <Row gutter={[0, 40]}>
      <Col span={24}>
        <Row justify='space-between'>
          <Col span={15}>
            <Row align='middle'>
              <Col span={14}>
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
                <Button icon={<FilterTwoTone />}>Фильтры</Button>
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
            <Table
              dataSource={dataSource}
              columns={tableColumns}
              pagination={false}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default TaskListPage
