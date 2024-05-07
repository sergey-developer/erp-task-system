import { useSetState } from 'ahooks'
import { Flex, Typography } from 'antd'
import { FC, useCallback } from 'react'

import { useGetEquipmentCategories } from 'modules/warehouse/hooks/equipment'
import { useGetInventorizationEquipments } from 'modules/warehouse/hooks/inventorization'
import { GetInventorizationEquipmentsQueryArgs } from 'modules/warehouse/models'

import { useGetLocations } from 'shared/hooks/catalogs/location'
import { IdType } from 'shared/types/common'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import ReviseEquipmentTable from '../ReviseEquipmentTable'
import { ReviseEquipmentTableProps } from '../ReviseEquipmentTable/types'

type ExecuteInventorizationReviseTabProps = {
  inventorizationId: IdType
}

const { Title } = Typography

const ExecuteInventorizationReviseTab: FC<ExecuteInventorizationReviseTabProps> = ({
  inventorizationId,
}) => {
  const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocations(
    {
      responsibilityArea: false,
    },
    { skip: true },
  )

  const { currentData: equipmentCategories = [], isFetching: equipmentCategoriesIsFetching } =
    useGetEquipmentCategories(undefined, { skip: true })

  const [getInventorizationEquipmentsParams, setGetInventorizationEquipmentsParams] =
    useSetState<GetInventorizationEquipmentsQueryArgs>({
      inventorizationId,
      ...getInitialPaginationParams(),
    })

  const {
    currentData: paginatedInventorizationEquipments,
    isFetching: inventorizationEquipmentsIsFetching,
  } = useGetInventorizationEquipments(getInventorizationEquipmentsParams)

  const onTablePagination = useCallback(
    (pagination: Parameters<ReviseEquipmentTableProps['onTableChange']>[0]) => {
      setGetInventorizationEquipmentsParams(calculatePaginationParams(pagination))
    },
    [setGetInventorizationEquipmentsParams],
  )

  const onChangeTable = useCallback<ReviseEquipmentTableProps['onTableChange']>(
    (pagination) => {
      onTablePagination(pagination)
    },
    [onTablePagination],
  )

  return (
    <Flex vertical gap='small'>
      <Title level={5}>Перечень оборудования для сверки</Title>

      <ReviseEquipmentTable
        pagination={extractPaginationParams(paginatedInventorizationEquipments)}
        dataSource={extractPaginationResults(paginatedInventorizationEquipments)}
        loading={inventorizationEquipmentsIsFetching}
        onTableChange={onChangeTable}
      />
    </Flex>
  )
}

export default ExecuteInventorizationReviseTab
