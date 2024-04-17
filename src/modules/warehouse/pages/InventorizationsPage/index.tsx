import { useSetState } from 'ahooks'
import { Flex } from 'antd'
import { FC, useCallback } from 'react'

import InventorizationTable from 'modules/warehouse/components/InventorizationTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'modules/warehouse/components/InventorizationTable/sort'
import { InventorizationTableProps } from 'modules/warehouse/components/InventorizationTable/types'
import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'modules/warehouse/constants/inventorization'
import { useGetInventorizations } from 'modules/warehouse/hooks/inventorization'
import { GetInventorizationsQueryArgs } from 'modules/warehouse/models'

import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
} from 'shared/utils/pagination'

const initialGetInventorizationsQueryArgs: Pick<
  GetInventorizationsQueryArgs,
  'ordering' | 'types' | 'statuses'
> = {
  ordering: 'deadline_at',
  types: [InventorizationTypeEnum.External, InventorizationTypeEnum.Internal],
  statuses: [
    InventorizationStatusEnum.New,
    InventorizationStatusEnum.InProgress,
    InventorizationStatusEnum.Completed,
    InventorizationStatusEnum.Closed,
  ],
}

const InventorizationsPage: FC = () => {
  const [getInventorizationsQueryArgs, setGetInventorizationsQueryArgs] =
    useSetState<GetInventorizationsQueryArgs>(initialGetInventorizationsQueryArgs)

  const { currentData: inventorizations, isFetching: inventorizationsIsFetching } =
    useGetInventorizations(getInventorizationsQueryArgs)

  const onTablePagination = useCallback(
    (pagination: Parameters<InventorizationTableProps['onChange']>[0]) => {
      setGetInventorizationsQueryArgs(calculatePaginationParams(pagination))
    },
    [setGetInventorizationsQueryArgs],
  )

  const onTableSort = useCallback(
    (sorter: Parameters<InventorizationTableProps['onChange']>[2]) => {
      if (sorter) {
        const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter
        if (field && (field as string) in sortableFieldToSortValues) {
          setGetInventorizationsQueryArgs({
            ordering: order ? getSort(field as SortableField, order) : undefined,
          })
        }
      }
    },
    [setGetInventorizationsQueryArgs],
  )

  const onChangeTable = useCallback<InventorizationTableProps['onChange']>(
    (pagination, _, sorter) => {
      onTablePagination(pagination)
      onTableSort(sorter)
    },
    [onTablePagination, onTableSort],
  )

  return (
    <Flex data-testid='inventorizations-page' vertical>
      <InventorizationTable
        dataSource={extractPaginationResults(inventorizations)}
        pagination={extractPaginationParams(inventorizations)}
        loading={inventorizationsIsFetching}
        sort={getInventorizationsQueryArgs.ordering}
        onChange={onChangeTable}
      />
    </Flex>
  )
}

export default InventorizationsPage
