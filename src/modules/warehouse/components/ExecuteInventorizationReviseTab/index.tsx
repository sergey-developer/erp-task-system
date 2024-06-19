import { useSetState } from 'ahooks'
import { Col, Flex, Input, Row, Typography } from 'antd'
import { SearchProps } from 'antd/es/input'
import isNumber from 'lodash/isNumber'
import React, { FC, useCallback, useState } from 'react'

import {
  useGetInventorizationEquipments,
  useUpdateInventorizationEquipment,
} from 'modules/warehouse/hooks/inventorization'
import { GetInventorizationEquipmentsQueryArgs } from 'modules/warehouse/models'
import { InventorizationRequestArgs } from 'modules/warehouse/types'

import { undefinedSelectOption } from 'shared/constants/selectField'
import { useGetLocations } from 'shared/hooks/catalogs/location'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import ReviseEquipmentTable from '../ReviseEquipmentTable'
import { ReviseEquipmentTableProps } from '../ReviseEquipmentTable/types'

export type ExecuteInventorizationReviseTabProps = Pick<
  InventorizationRequestArgs,
  'inventorizationId'
>

const { Title } = Typography
const { Search } = Input

const ExecuteInventorizationReviseTab: FC<ExecuteInventorizationReviseTabProps> = ({
  inventorizationId,
}) => {
  const [searchValue, setSearchValue] = useState<string>()

  const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocations({
    responsibilityArea: false,
  })

  const [getInventorizationEquipmentsArgs, setGetInventorizationEquipmentsArgs] =
    useSetState<GetInventorizationEquipmentsQueryArgs>({
      inventorizationId,
      ...getInitialPaginationParams(),
    })

  const {
    currentData: paginatedInventorizationEquipments,
    isFetching: inventorizationEquipmentsIsFetching,
  } = useGetInventorizationEquipments(getInventorizationEquipmentsArgs)

  const [updateInventorizationEquipmentMutation] = useUpdateInventorizationEquipment()

  const onTablePagination = useCallback(
    (pagination: Parameters<ReviseEquipmentTableProps['onTableChange']>[0]) => {
      setGetInventorizationEquipmentsArgs(calculatePaginationParams(pagination))
    },
    [setGetInventorizationEquipmentsArgs],
  )

  const onChangeTable = useCallback<ReviseEquipmentTableProps['onTableChange']>(
    (pagination) => {
      onTablePagination(pagination)
    },
    [onTablePagination],
  )

  const onChangeQuantityFact: ReviseEquipmentTableProps['onChangeQuantityFact'] = useDebounceFn(
    async (record, value, locationFact) => {
      const valueIsNumber = isNumber(value)
      if (valueIsNumber && value < 0) return

      await updateInventorizationEquipmentMutation({
        inventorizationEquipmentId: record.id,
        quantityFact: valueIsNumber ? value : null,
        locationFact: locationFact === undefinedSelectOption.value ? null : locationFact,
        isLocationFactUndefined: locationFact === undefinedSelectOption.value ? true : undefined,
        getInventorizationEquipmentsArgs,
      })
    },
    [getInventorizationEquipmentsArgs, updateInventorizationEquipmentMutation],
    500,
  )

  const onChangeLocationFact: ReviseEquipmentTableProps['onChangeLocationFact'] = useDebounceFn(
    async (record, value, quantityFact) => {
      await updateInventorizationEquipmentMutation({
        inventorizationEquipmentId: record.id,
        locationFact: value === undefinedSelectOption.value ? null : value,
        isLocationFactUndefined: value === undefinedSelectOption.value ? true : undefined,
        quantityFact,
        getInventorizationEquipmentsArgs,
      })
    },
    [getInventorizationEquipmentsArgs, updateInventorizationEquipmentMutation],
    500,
  )

  const onSearch = useDebounceFn<NonNullable<SearchProps['onSearch']>>(
    (value) => setGetInventorizationEquipmentsArgs({ search: value || undefined }),
    [setGetInventorizationEquipmentsArgs],
  )

  const onChangeSearch: NonNullable<SearchProps['onChange']> = (event) =>
    setSearchValue(event.target.value)

  return (
    <Flex data-testid='execute-inventorization-revise-tab' vertical gap='small'>
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
        onChangeQuantityFact={onChangeQuantityFact}
        onChangeLocationFact={onChangeLocationFact}
      />
    </Flex>
  )
}

export default ExecuteInventorizationReviseTab
