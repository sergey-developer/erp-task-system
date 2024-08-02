import { useSetState } from 'ahooks'
import { Flex, Typography } from 'antd'
import React, { FC, useCallback } from 'react'

import { useGetInventorizationEquipments } from 'modules/warehouse/hooks/inventorization'
import {
  GetInventorizationEquipmentsQueryArgs,
  InventorizationModel,
} from 'modules/warehouse/models'

import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import DiscrepanciesEquipmentTable from '../DiscrepanciesEquipmentTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from '../DiscrepanciesEquipmentTable/sort'
import { DiscrepanciesEquipmentTableProps } from '../DiscrepanciesEquipmentTable/types'

export type ExecuteInventorizationDiscrepanciesProps = {
  inventorization: Pick<InventorizationModel, 'id'>
}

const { Title } = Typography

const ExecuteInventorizationDiscrepanciesTab: FC<ExecuteInventorizationDiscrepanciesProps> = ({
  inventorization,
}) => {
  const [getInventorizationEquipmentsParams, setGetInventorizationEquipmentsParams] =
    useSetState<GetInventorizationEquipmentsQueryArgs>({
      inventorizationId: inventorization.id,
      isFilled: true,
      hasDiff: true,
      ordering: '-title',
      ...getInitialPaginationParams(),
    })

  const {
    currentData: paginatedInventorizationEquipments,
    isFetching: inventorizationEquipmentsIsFetching,
  } = useGetInventorizationEquipments(getInventorizationEquipmentsParams)

  const onTableSort = useCallback(
    (sorter: Parameters<DiscrepanciesEquipmentTableProps['onChange']>[2]) => {
      if (sorter) {
        const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter

        if (field && (field as string) in sortableFieldToSortValues) {
          setGetInventorizationEquipmentsParams({
            ordering: order ? getSort(field as SortableField, order) : undefined,
          })
        }
      }
    },
    [setGetInventorizationEquipmentsParams],
  )

  const onTablePagination = useCallback(
    (pagination: Parameters<DiscrepanciesEquipmentTableProps['onChange']>[0]) => {
      setGetInventorizationEquipmentsParams(calculatePaginationParams(pagination))
    },
    [setGetInventorizationEquipmentsParams],
  )

  const onChangeTable = useCallback<DiscrepanciesEquipmentTableProps['onChange']>(
    (pagination, _, sorter) => {
      onTableSort(sorter)
      onTablePagination(pagination)
    },
    [onTablePagination, onTableSort],
  )

  return (
    <Flex data-testid='execute-inventorization-discrepancies-tab' vertical gap='small'>
      <Title level={5}>Список оборудования с расхождением</Title>

      <DiscrepanciesEquipmentTable
        pagination={extractPaginationParams(paginatedInventorizationEquipments)}
        dataSource={extractPaginationResults(paginatedInventorizationEquipments)}
        loading={inventorizationEquipmentsIsFetching}
        onChange={onChangeTable}
        sort={getInventorizationEquipmentsParams.ordering}
      />
    </Flex>
  )
}

export default ExecuteInventorizationDiscrepanciesTab
