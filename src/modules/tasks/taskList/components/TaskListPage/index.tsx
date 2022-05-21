import { FilterTwoTone } from '@ant-design/icons'
import { Button, Col, Input, InputProps, Row, TableProps } from 'antd'
import { SearchProps } from 'antd/es/input'
import { camelize } from 'humps'
import React, { FC, useCallback, useEffect, useState } from 'react'

import FilterTag from 'components/FilterTag'
import {
  ExtendedFilterFormFields,
  FastFilterEnum,
  GetTaskListApiArg,
  Task,
} from 'modules/tasks/models'
import { useTaskListQuery } from 'modules/tasks/tasks.service'

import FilterDrawer, { FilterDrawerProps } from '../FilterDrawer'
import TaskDetail from '../TaskDetail'
import TaskTable from '../TaskTable'
import { ColumnsTypeContentEnum } from '../TaskTable/constants'
import {
  DATE_FILTER_FORMAT,
  DEFAULT_FAST_FILTER,
  DEFAULT_PAGE_LIMIT,
  SMART_SORT_TO_FIELD_SORT_DIRECTIONS,
  SORTED_FIELDS,
  initialExtendedFilterFormValues,
} from './constants'
import { FilterListItem } from './interfaces'
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
  const [isFilterDrawerVisible, setIsFilterDrawerVisible] =
    useState<boolean>(false)

  const [extendedFilter, setExtendedFilter] =
    useState<ExtendedFilterFormFields>(initialExtendedFilterFormValues)

  const [fastFilter, setFastFilter] =
    useState<FastFilterEnum>(DEFAULT_FAST_FILTER)

  const [taskIdFilter, setTaskIdFilter] = useState<string>('')

  const [queryArgs, setQueryArgs] = useState<GetTaskListApiArg>({
    limit: DEFAULT_PAGE_LIMIT,
    offset: 0,
  })

  const { data: tasksListResponse, isFetching } = useTaskListQuery(queryArgs)

  const toggleFilterDrawer = () => setIsFilterDrawerVisible((prev) => !prev)

  const handleFilterDrawerSubmit: FilterDrawerProps['onSubmit'] = (values) => {
    setExtendedFilter(values)
  }

  const handleFastFilterChange = (value: FastFilterEnum) => {
    setFastFilter(value)
  }

  const handleTaskIdFilterChange: InputProps['onChange'] = (evt) => {
    console.log('handleTaskIdFilterChange', evt.target.value)
    // setTaskIdFilterValue(evt.target.value)
  }

  const handleTaskIdFilterSearch: SearchProps['onSearch'] = (value) => {
    console.log('handleTaskIdFilterSearch', value)
    setTaskIdFilter(value)
  }

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

  /** обработка изменений фильтрации */
  useEffect(() => {
    const { creationDateRange, smartSearchField, smartSearchValue, status } =
      extendedFilter

    setQueryArgs((prev) => ({
      ...prev,
      dateFrom: creationDateRange
        ? creationDateRange[0].format(DATE_FILTER_FORMAT)
        : undefined,
      dateTo: creationDateRange
        ? creationDateRange[1].format(DATE_FILTER_FORMAT)
        : undefined,
      filter: fastFilter,
      status,
      taskId: taskIdFilter || undefined,
      offset: 0,
      smartSearchAssignee: undefined,
      smartSearchDescription: undefined,
      smartSearchName: undefined,
      [smartSearchField]: smartSearchValue,
    }))
  }, [extendedFilter, fastFilter, taskIdFilter])

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
                    checked={fastFilter === value}
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
                  onChange={handleTaskIdFilterChange}
                  onSearch={handleTaskIdFilterSearch}
                  placeholder='Искать заявку по номеру'
                  // value={taskIdFilterValue}
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
            <Col span={24}>
              <TaskTable
                dataSource={tasksListResponse?.results}
                columns={ColumnsTypeContentEnum.All}
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
        initialValues={initialExtendedFilterFormValues}
        onClose={toggleFilterDrawer}
        onSubmit={handleFilterDrawerSubmit}
        visible={isFilterDrawerVisible}
      />
    </>
  )
}

export default TaskListPage
