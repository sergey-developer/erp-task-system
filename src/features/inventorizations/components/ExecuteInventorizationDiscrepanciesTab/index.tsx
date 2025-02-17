import { useSetState } from 'ahooks'
import { Flex, Typography } from 'antd'
import { useGetInventorizationEquipments } from 'features/inventorizations/hooks'
import React, { FC, useCallback } from 'react'

import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import { InventorizationDetailDTO } from '../../api/dto'
import { GetInventorizationEquipmentsRequest } from '../../api/schemas'
import DiscrepanciesEquipmentTable from '../DiscrepanciesEquipmentTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from '../DiscrepanciesEquipmentTable/sort'
import { DiscrepanciesEquipmentTableProps } from '../DiscrepanciesEquipmentTable/types'

export type ExecuteInventorizationDiscrepanciesProps = {
  inventorization: Pick<InventorizationDetailDTO, 'id'>
}

const { Title } = Typography

const ExecuteInventorizationDiscrepanciesTab: FC<ExecuteInventorizationDiscrepanciesProps> = ({
  inventorization,
}) => {
  const [getInventorizationEquipmentsParams, setGetInventorizationEquipmentsParams] =
    useSetState<GetInventorizationEquipmentsRequest>({
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
    <Flex data-testid='execute-inventorizationDetail-discrepancies-tab' vertical gap='small'>
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
