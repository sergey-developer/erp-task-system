import { useSetState } from 'ahooks'
import { FC, useCallback } from 'react'

import RelocationTaskTable from 'modules/warehouse/components/RelocationTaskTable'
import { RelocationTaskTableProps } from 'modules/warehouse/components/RelocationTaskTable/types'
import { useGetRelocationTaskList } from 'modules/warehouse/hooks/relocationTask'
import { GetRelocationTaskListQueryArgs } from 'modules/warehouse/models'

import Space from 'components/Space'

import { calculatePaginationParams, getInitialPaginationParams } from 'shared/utils/pagination'

const RelocationTaskListPage: FC = () => {
  const [getRelocationTaskListParams, setGetRelocationTaskListParams] =
    useSetState<GetRelocationTaskListQueryArgs>({
      ...getInitialPaginationParams(),
    })

  const { currentData: relocationTaskList, isFetching: relocationTaskListIsFetching } =
    useGetRelocationTaskList(getRelocationTaskListParams)

  const handleTablePagination = useCallback(
    (pagination: Parameters<RelocationTaskTableProps['onChange']>[0]) => {
      setGetRelocationTaskListParams(calculatePaginationParams(pagination))
    },
    [setGetRelocationTaskListParams],
  )

  const handleChangeTable = useCallback<RelocationTaskTableProps['onChange']>(
    (pagination) => {
      handleTablePagination(pagination)
    },
    [handleTablePagination],
  )

  return (
    <Space data-testid='relocation-task-list-page' $block direction='vertical' size='middle'>
      <RelocationTaskTable
        dataSource={relocationTaskList?.results || []}
        pagination={relocationTaskList?.pagination || false}
        loading={relocationTaskListIsFetching}
        onChange={handleChangeTable}
      />
    </Space>
  )
}

export default RelocationTaskListPage
