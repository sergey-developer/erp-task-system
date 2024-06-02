import { useSetState } from 'ahooks'
import { Col, Flex, Input, Row, Typography } from 'antd'
import { SearchProps } from 'antd/es/input'
import React, { FC, useCallback, useState } from 'react'

import { useGetInventorizationEquipments } from 'modules/warehouse/hooks/inventorization'
import { GetInventorizationEquipmentsQueryArgs } from 'modules/warehouse/models'

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

type ExecuteInventorizationReviseTabProps = {
  inventorizationId: IdType
}

const { Title } = Typography
const { Search } = Input

const ExecuteInventorizationReviseTab: FC<ExecuteInventorizationReviseTabProps> = ({
  inventorizationId,
}) => {
  const [searchValue, setSearchValue] = useState<string>()

  // const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocations(
  //   { responsibilityArea: false },
  //   { skip: true },
  // )
  //
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
        // dataSource={[
        //   {
        //     id: 1,
        //     equipment: {
        //       id: 1,
        //       title: 'title',
        //       serialNumber: 'serialNumber',
        //       inventoryNumber: 'inventoryNumber',
        //       category: { id: 1, code: EquipmentCategoryEnum.Equipment, title: 'title' },
        //     },
        //     quantity: { diff: 123, fact: 321, plan: 454 },
        //     locationFact: { id: 1, title: 'locationFact' },
        //     hasDiff: null,
        //     isFilled: false,
        //     locationPlan: { id: 123, title: 'locationPlan' },
        //   },
        // ]}
        loading={inventorizationEquipmentsIsFetching}
        onTableChange={onChangeTable}
      />
    </Flex>
  )
}

export default ExecuteInventorizationReviseTab
