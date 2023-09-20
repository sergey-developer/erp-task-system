import { useBoolean, useSetState } from 'ahooks'
import React, { FC, useCallback, useState } from 'react'

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

import FilterButton from 'components/Buttons/FilterButton'
import Space from 'components/Space'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { calculatePaginationParams, getInitialPaginationParams } from 'shared/utils/pagination'

const initialFilterValues: Pick<RelocationTaskListFilterFormFields, 'status'> = {
  status: [
    RelocationTaskStatusEnum.New,
    RelocationTaskStatusEnum.Completed,
    RelocationTaskStatusEnum.Returned,
  ],
}

const initialGetRelocationTaskListParams: Pick<
  GetRelocationTaskListQueryArgs,
  'status' | 'ordering' | 'offset' | 'limit'
> = {
  ...getInitialPaginationParams(),
  ordering: 'deadline_at',
  status: initialFilterValues.status,
}

const RelocationTaskListPage: FC = () => {
  const [filterOpened, { toggle: toggleOpenFilter }] = useBoolean(false)
  const debouncedToggleOpenFilter = useDebounceFn(toggleOpenFilter)
  const [filterValues, setFilterValues] = useState<RelocationTaskListFilterFormFields>()

  const [getRelocationTaskListParams, setGetRelocationTaskListParams] =
    useSetState<GetRelocationTaskListQueryArgs>(initialGetRelocationTaskListParams)

  const { currentData: relocationTaskList, isFetching: relocationTaskListIsFetching } =
    useGetRelocationTaskList(getRelocationTaskListParams)

  const handleTablePagination = useCallback(
    (pagination: Parameters<RelocationTaskTableProps['onChange']>[0]) => {
      setGetRelocationTaskListParams(calculatePaginationParams(pagination))
    },
    [setGetRelocationTaskListParams],
  )

  const handleTableSort = useCallback(
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

  const handleChangeTable = useCallback<RelocationTaskTableProps['onChange']>(
    (pagination, _, sorter) => {
      handleTablePagination(pagination)
      handleTableSort(sorter)
    },
    [handleTablePagination, handleTableSort],
  )

  const handleApplyFilter = (values: RelocationTaskListFilterFormFields) => {
    setFilterValues(values)
    setGetRelocationTaskListParams(values)
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
          onChange={handleChangeTable}
        />
      </Space>

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
