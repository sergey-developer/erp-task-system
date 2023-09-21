import { useBoolean, useSetState } from 'ahooks'
import debounce from 'lodash/debounce'
import React, { FC, useCallback, useState } from 'react'

import { RelocationEquipmentTableProps } from 'modules/warehouse/components/RelocationEquipmentTable/types'
import RelocationTaskListFilter from 'modules/warehouse/components/RelocationTaskListFilter'
import { RelocationTaskListFilterFormFields } from 'modules/warehouse/components/RelocationTaskListFilter/types'
import RelocationTaskTable from 'modules/warehouse/components/RelocationTaskTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'modules/warehouse/components/RelocationTaskTable/sort'
import { RelocationTaskTableProps } from 'modules/warehouse/components/RelocationTaskTable/types'
import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'
import { useGetRelocationTaskList } from 'modules/warehouse/hooks/relocationTask'
import { GetRelocationTaskListQueryArgs } from 'modules/warehouse/models'
import { relocationTaskListFilterToParams } from 'modules/warehouse/utils/relocationTask'

import FilterButton from 'components/Buttons/FilterButton'
import Space from 'components/Space'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { calculatePaginationParams, getInitialPaginationParams } from 'shared/utils/pagination'

import { DEFAULT_DEBOUNCE_VALUE } from '../../../../shared/constants/common'
import RelocationTaskDetails from '../../components/RelocationTaskDetails'

const initialFilterValues: Pick<RelocationTaskListFilterFormFields, 'status'> = {
  status: [
    RelocationTaskStatusEnum.New,
    RelocationTaskStatusEnum.Completed,
    RelocationTaskStatusEnum.Returned,
  ],
}

const initialGetRelocationTaskListParams: Pick<
  GetRelocationTaskListQueryArgs,
  'statuses' | 'ordering' | 'offset' | 'limit'
> = {
  ...getInitialPaginationParams(),
  ordering: 'deadline_at',
  statuses: initialFilterValues.status,
}

const RelocationTaskListPage: FC = () => {
  const [filterOpened, { toggle: toggleOpenFilter }] = useBoolean(false)
  const debouncedToggleOpenFilter = useDebounceFn(toggleOpenFilter)
  const [filterValues, setFilterValues] = useState<RelocationTaskListFilterFormFields>()

  const [selectedRelocationTaskId, setSelectedRelocationTaskId] = useState<IdType>()

  const [relocationTaskOpened, { toggle: toggleOpenRelocationTask }] = useBoolean(false)
  const debouncedToggleOpenRelocationTask = useDebounceFn(toggleOpenRelocationTask)

  const [getRelocationTaskListParams, setGetRelocationTaskListParams] =
    useSetState<GetRelocationTaskListQueryArgs>(initialGetRelocationTaskListParams)

  const { currentData: relocationTaskList, isFetching: relocationTaskListIsFetching } =
    useGetRelocationTaskList(getRelocationTaskListParams)

  const handleRelocationTaskTablePagination = useCallback(
    (pagination: Parameters<RelocationTaskTableProps['onChange']>[0]) => {
      setGetRelocationTaskListParams(calculatePaginationParams(pagination))
    },
    [setGetRelocationTaskListParams],
  )

  const handleRelocationTaskTableSort = useCallback(
    (sorter: Parameters<RelocationTaskTableProps['onChange']>[2]) => {
      if (sorter) {
        const { columnKey, order } = Array.isArray(sorter) ? sorter[0] : sorter

        if (columnKey && columnKey in sortableFieldToSortValues) {
          setGetRelocationTaskListParams({
            ordering: order ? getSort(columnKey as SortableField, order) : undefined,
          })
        }
      }
    },
    [setGetRelocationTaskListParams],
  )

  const handleChangeRelocationTaskTable = useCallback<RelocationTaskTableProps['onChange']>(
    (pagination, _, sorter) => {
      handleRelocationTaskTablePagination(pagination)
      handleRelocationTaskTableSort(sorter)
    },
    [handleRelocationTaskTablePagination, handleRelocationTaskTableSort],
  )

  const handleRelocationTaskTableRowClick = useCallback<RelocationTaskTableProps['onRow']>(
    (record) => ({
      onClick: debounce(() => {
        setSelectedRelocationTaskId(record.id)
        toggleOpenRelocationTask()
      }, DEFAULT_DEBOUNCE_VALUE),
    }),
    [toggleOpenRelocationTask],
  )

  const handleRelocationEquipmentTablePagination = useCallback(
    (pagination: Parameters<RelocationEquipmentTableProps['onChange']>[0]) => {
    },
    [],
  )

  const handleChangeRelocationEquipmentTable = useCallback<
    RelocationEquipmentTableProps['onChange']
  >(
    (pagination) => {
      handleRelocationEquipmentTablePagination(pagination)
    },
    [handleRelocationEquipmentTablePagination],
  )

  const handleApplyFilter = (values: RelocationTaskListFilterFormFields) => {
    setFilterValues(values)
    setGetRelocationTaskListParams(relocationTaskListFilterToParams(values))
    toggleOpenFilter()
  }

  return (
    <>
      <Space data-testid='relocation-task-list-page' $block direction='vertical' size='middle'>
        <FilterButton onClick={debouncedToggleOpenFilter} />

        <RelocationTaskTable
          dataSource={relocationTaskList?.results || []}
          pagination={relocationTaskList?.pagination || false}
          loading={relocationTaskListIsFetching}
          sort={getRelocationTaskListParams.ordering}
          onChange={handleChangeRelocationTaskTable}
          onRow={handleRelocationTaskTableRowClick}
        />
      </Space>

      {relocationTaskOpened && (
        <RelocationTaskDetails
          visible={relocationTaskOpened}
          onClose={debouncedToggleOpenRelocationTask}
          relocationTask={{
            id: 1,
            status: RelocationTaskStatusEnum.New,
            createdAt: new Date().toDateString(),
            comment: 'comment',
            deadlineAt: new Date().toDateString(),
            createdBy: { id: 1, fullName: 'fullName' },
            executor: { id: 1, fullName: 'fullName' },
            relocateTo: { id: 1, title: 'relocateTo' },
            relocateFrom: { id: 1, title: 'relocateFrom' },
            documents: [
              { id: 1, url: 'url123', size: 554454, name: 'name 1' },
              { id: 2, url: 'url123', size: 554454, name: 'name 2' },
            ],
          }}
          relocationTaskIsLoading={false}
          relocationEquipmentList={[
            {
              id: 1,
              title: 'title 1',
              purpose: 'purpose 1',
              condition: 'condition',
              quantity: 4325,
              serialNumber: '5837rhjkejtr8734',
            },
          ]}
          relocationEquipmentListIsLoading={false}
          onChangeEquipmentTable={handleChangeRelocationEquipmentTable}
        />
      )}

      {filterOpened && (
        <RelocationTaskListFilter
          visible={filterOpened}
          values={filterValues}
          initialValues={initialFilterValues}
          onClose={debouncedToggleOpenFilter}
          onApply={handleApplyFilter}
        />
      )}
    </>
  )
}

export default RelocationTaskListPage
