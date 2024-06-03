import { useSetState } from 'ahooks'
import { Col, Flex, Input, Row, Typography } from 'antd'
import { SearchProps } from 'antd/es/input'
import React, { FC, useCallback, useState } from 'react'

import { useGetInventorizationEquipments } from 'modules/warehouse/hooks/inventorization'
import { GetInventorizationEquipmentsQueryArgs } from 'modules/warehouse/models'

import { useGetLocations } from 'shared/hooks/catalogs/location'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import ReviseEquipmentTable from '../ReviseEquipmentTable'
import { ReviseEquipmentTableProps } from '../ReviseEquipmentTable/types'

export type ExecuteInventorizationReviseTabProps = {
  inventorizationId: IdType
}

const { Title } = Typography
const { Search } = Input

const ExecuteInventorizationReviseTab: FC<ExecuteInventorizationReviseTabProps> = ({
  inventorizationId,
}) => {
  const [searchValue, setSearchValue] = useState<string>()

  const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocations({
    responsibilityArea: false,
  })

  // const { currentData: equipmentCategories = [], isFetching: equipmentCategoriesIsFetching } =
  //   useGetEquipmentCategories(undefined, { skip: true })

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

  const onSearch = useDebounceFn<NonNullable<SearchProps['onSearch']>>(
    (value) => setGetInventorizationEquipmentsParams({ search: value || undefined }),
    [setGetInventorizationEquipmentsParams],
  )

  const onChangeSearch: NonNullable<SearchProps['onChange']> = (event) =>
    setSearchValue(event.target.value)

  return (
    <Flex vertical gap='small'>
      <Title level={5}>Перечень оборудования для сверки</Title>

      <Row>
        <Col span={5}>
          <Search
            allowClear
            onSearch={onSearch}
            onChange={onChangeSearch}
            value={searchValue}
            placeholder='Поиск оборудования'
            disabled={inventorizationEquipmentsIsFetching}
          />
        </Col>
      </Row>

      <ReviseEquipmentTable
        pagination={extractPaginationParams(paginatedInventorizationEquipments)}
        dataSource={extractPaginationResults(paginatedInventorizationEquipments)}
        loading={inventorizationEquipmentsIsFetching}
        locations={locations}
        locationsIsLoading={locationsIsFetching}
        onTableChange={onChangeTable}
      />
    </Flex>
  )
}

export default ExecuteInventorizationReviseTab
