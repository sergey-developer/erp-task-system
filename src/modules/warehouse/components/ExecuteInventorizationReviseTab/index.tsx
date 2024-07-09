import { useBoolean, useSetState } from 'ahooks'
import { Button, Col, Flex, Input, Row, Typography } from 'antd'
import { SearchProps } from 'antd/es/input'
import isNumber from 'lodash/isNumber'
import React, { FC, useCallback, useMemo, useState } from 'react'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  useGetEquipmentCatalogList,
  useGetEquipmentCategories,
} from 'modules/warehouse/hooks/equipment'
import {
  useGetInventorizationEquipments,
  useUpdateInventorizationEquipment,
} from 'modules/warehouse/hooks/inventorization'
import { GetInventorizationEquipmentsQueryArgs } from 'modules/warehouse/models'
import { InventorizationRequestArgs } from 'modules/warehouse/types'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'

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

  const [
    createEquipmentModalOpened,
    { setTrue: openCreateEquipmentModal, setFalse: closeCreateEquipmentModal },
  ] = useBoolean(false)

  const debouncedOpenCreateEquipmentModal = useDebounceFn(openCreateEquipmentModal)
  const debouncedCloseCreateEquipmentModal = useDebounceFn(closeCreateEquipmentModal)

  const {
    currentData: equipmentCategories = [],
    isFetching: equipmentCategoriesIsFetching,
    isSuccess: isEquipmentCategoriesFetchedSuccess,
  } = useGetEquipmentCategories(undefined, { skip: !createEquipmentModalOpened })

  const notConsumableEquipmentCategoriesIds = useMemo(
    () =>
      equipmentCategories
        .filter((c) => !checkEquipmentCategoryIsConsumable(c.code))
        .map((c) => c.id),
    [equipmentCategories],
  )

  const { currentData: equipmentCatalogs = [], isFetching: equipmentCatalogsIsFetching } =
    useGetEquipmentCatalogList(
      {
        conditions: [
          EquipmentConditionEnum.Working,
          EquipmentConditionEnum.Broken,
          EquipmentConditionEnum.NonRepairable,
        ],
        categories: notConsumableEquipmentCategoriesIds,
      },
      { skip: !createEquipmentModalOpened || !isEquipmentCategoriesFetchedSuccess },
    )

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
        isLocationFactUndefined: locationFact === undefinedSelectOption.value,
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
        isLocationFactUndefined: value === undefinedSelectOption.value,
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
    <>
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

          <Col>
            <Button onClick={debouncedOpenCreateEquipmentModal}>Добавить оборудование</Button>
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
    </>
  )
}

export default ExecuteInventorizationReviseTab
