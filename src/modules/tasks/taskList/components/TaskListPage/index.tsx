import { FilterTwoTone, SyncOutlined } from '@ant-design/icons'
import { Button, Col, Input, Row, Space, TableProps } from 'antd'
import { camelize } from 'humps'
import React, { FC, useCallback, useState } from 'react'

import FilterTag from 'components/FilterTag'
import {
  FastFilterEnum,
  GetTaskListApiArg,
  SmartSortEnum,
  Task,
} from 'modules/tasks/models'
import { useTaskListQuery } from 'modules/tasks/tasks.service'

import FilterDrawer, { FilterDrawerProps } from '../FilterDrawer'
import TaskDetail from '../TaskDetail'
import TaskTable from '../TaskTable'
import {
  DATE_FILTER_FORMAT,
  DEFAULT_PAGE_LIMIT,
  SMART_SORT_TO_FIELD_SORT_DIRECTIONS,
  SORTED_FIELDS,
  SORTED_FIELDS_ENUM,
} from './constants'
import { FilterListItem, SORT_DIRECTIONS } from './interfaces'
import { ColFlexStyled, RowStyled, RowWrapStyled } from './styles'

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
  const [fastFilterValue, setFastFilterValue] = useState<FastFilterEnum>(
    FastFilterEnum.All,
  )

  const [isFilterDrawerVisible, setIsFilterDrawerVisible] =
    useState<boolean>(false)

  const [queryArgs, setQueryArgs] = useState<GetTaskListApiArg>({
    limit: DEFAULT_PAGE_LIMIT,
    offset: 0,
    filter: fastFilterValue,
    smartSort: SmartSortEnum.ByOlaAsc,
  })

  const { data: tasksListResponse, isFetching } = useTaskListQuery(queryArgs)

  const toggleFilterDrawer = () => setIsFilterDrawerVisible((prev) => !prev)

  const handleFilterDrawerSubmit: FilterDrawerProps['onSubmit'] = (values) => {
    const { creationDate, columnName, columnKeyword, taskStatuses } = values
    const newQueryArgs: Partial<GetTaskListApiArg> = {
      offset: 0,
      status: taskStatuses,
      dateFrom: creationDate
        ? creationDate[0].format(DATE_FILTER_FORMAT)
        : undefined,
      dateTo: creationDate
        ? creationDate[1].format(DATE_FILTER_FORMAT)
        : undefined,
      smartSearchAssignee: undefined,
      smartSearchDescription: undefined,
      smartSearchName: undefined,
    }

    if (columnKeyword) {
      newQueryArgs[columnName] = columnKeyword
    }

    setQueryArgs((prev) => ({ ...prev, ...newQueryArgs }))
  }

  const handleFastFilterChange = (value: FastFilterEnum) => {
    setFastFilterValue(value)
    setQueryArgs((prev) => ({ ...prev, offset: 0, filter: value }))
  }

  /** обработка изменений сортировки/пагинации в таблице */
  const handleChangeTable = useCallback<
    NonNullable<TableProps<Task>['onChange']>
  >((pagination, filters, sorter) => {
    const { field, order = SORT_DIRECTIONS.ascend } = Array.isArray(sorter)
      ? sorter[0]
      : sorter

    const newQueryArgs: Partial<GetTaskListApiArg> = {
      offset: (pagination.current! - 1) * pagination.pageSize!,
      limit: pagination.pageSize!,
    }

    if (SORTED_FIELDS.includes(field as SORTED_FIELDS_ENUM)) {
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
    <>
      <RowWrapStyled gutter={[0, 40]}>
        <Row justify='space-between'>
          <Col span={12}>
            <Row align='middle'>
              <Col span={12}>
                {filterList.map(({ amount, text, value }) => (
                  <FilterTag
                    key={value}
                    checked={fastFilterValue === value}
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
                <Search placeholder='Искать заявку по номеру' />
              </Col>
              <Col>
                <Space align='end'>
                  <Button icon={<SyncOutlined />}>Обновить заявки</Button>
                  <Button>+ Создать заявку</Button>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
        <ColFlexStyled span={24} flex='1'>
          <RowStyled>
            <Col span={24}>
              <TaskTable
                sorting={queryArgs?.smartSort}
                dataSource={tasksListResponse?.results}
                loading={isFetching}
                onChange={handleChangeTable}
                pagination={tasksListResponse?.pagination}
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
    </>
  )
}

export default TaskListPage
