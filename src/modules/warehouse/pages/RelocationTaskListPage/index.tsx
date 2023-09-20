import { useSetState } from 'ahooks'
import { FC, useCallback } from 'react'

import RelocationTaskTable from 'modules/warehouse/components/RelocationTaskTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'modules/warehouse/components/RelocationTaskTable/sort'
import { RelocationTaskTableProps } from 'modules/warehouse/components/RelocationTaskTable/types'
import { useGetRelocationTaskList } from 'modules/warehouse/hooks/relocationTask'
import { GetRelocationTaskListQueryArgs } from 'modules/warehouse/models'

import Space from 'components/Space'

import { calculatePaginationParams, getInitialPaginationParams } from 'shared/utils/pagination'

const RelocationTaskListPage: FC = () => {
  const [getRelocationTaskListParams, setGetRelocationTaskListParams] =
    useSetState<GetRelocationTaskListQueryArgs>({
      ...getInitialPaginationParams(),
      ordering: 'deadline_at',
    })

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

  return (
    <Space data-testid='relocation-task-list-page' $block direction='vertical' size='middle'>
      <RelocationTaskTable
        dataSource={relocationTaskList?.results || []}
        pagination={relocationTaskList?.pagination || false}
        loading={relocationTaskListIsFetching}
        sort={getRelocationTaskListParams.ordering}
        onChange={handleChangeTable}
      />
    </Space>
  )
}

export default RelocationTaskListPage
