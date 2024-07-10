import { useBoolean, useSetState } from 'ahooks'
import { Button, Col, Flex, Input, Row, Typography } from 'antd'
import { SearchProps } from 'antd/es/input'
import isNumber from 'lodash/isNumber'
import React, { FC, useCallback, useMemo, useState } from 'react'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  useGetEquipment,
  useGetEquipmentCatalogList,
  useGetEquipmentCategories,
} from 'modules/warehouse/hooks/equipment'
import {
  useCreateInventorizationEquipment,
  useGetInventorizationEquipments,
  useUpdateInventorizationEquipment,
} from 'modules/warehouse/hooks/inventorization'
import {
  GetInventorizationEquipmentsQueryArgs,
  WarehouseListItemModel,
} from 'modules/warehouse/models'
import { InventorizationRequestArgs } from 'modules/warehouse/types'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'

import ModalFallback from 'components/Modals/ModalFallback'

import { undefinedSelectOption } from 'shared/constants/selectField'
import { useGetLocations } from 'shared/hooks/catalogs/location'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { getFieldsErrors } from 'shared/utils/form'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import { CreateInventorizationEquipmentModalProps } from '../CreateInventorizationEquipmentModal/types'
import ReviseEquipmentTable from '../ReviseEquipmentTable'
import { ReviseEquipmentTableProps } from '../ReviseEquipmentTable/types'

const CreateInventorizationEquipmentModal = React.lazy(
  () => import('../CreateInventorizationEquipmentModal'),
)

export type ExecuteInventorizationReviseTabProps = Pick<
  InventorizationRequestArgs,
  'inventorizationId'
> & {
  warehouses: Pick<WarehouseListItemModel, 'id' | 'title'>[]
}

const { Title } = Typography
const { Search } = Input

const ExecuteInventorizationReviseTab: FC<ExecuteInventorizationReviseTabProps> = ({
  inventorizationId,
  warehouses,
}) => {
  const [searchValue, setSearchValue] = useState<string>()

  const [selectedEquipmentId, setSelectedEquipmentId] = useState<IdType>()

  const [
    createInventorizationEquipmentModalOpened,
    {
      setTrue: openCreateInventorizationEquipmentModal,
      setFalse: closeCreateInventorizationEquipmentModal,
    },
  ] = useBoolean(false)

  const debouncedOpenCreateInventorizationEquipmentModal = useDebounceFn(
    openCreateInventorizationEquipmentModal,
  )

  const onCloseCreateInventorizationEquipmentModal = useCallback(() => {
    closeCreateInventorizationEquipmentModal()
    setSelectedEquipmentId(undefined)
  }, [closeCreateInventorizationEquipmentModal])

  const debouncedCloseCreateInventorizationEquipmentModal = useDebounceFn(
    onCloseCreateInventorizationEquipmentModal,
  )

  const { currentData: equipmentCategories = [], isSuccess: isEquipmentCategoriesFetchedSuccess } =
    useGetEquipmentCategories(undefined, { skip: !createInventorizationEquipmentModalOpened })

  const notConsumableEquipmentCategoriesIds = useMemo(
    () =>
      equipmentCategories
        .filter((c) => !checkEquipmentCategoryIsConsumable(c.code))
        .map((c) => c.id),
    [equipmentCategories],
  )

  const { currentData: equipmentCatalog = [], isFetching: equipmentCatalogIsFetching } =
    useGetEquipmentCatalogList(
      {
        conditions: [
          EquipmentConditionEnum.Working,
          EquipmentConditionEnum.Broken,
          EquipmentConditionEnum.NonRepairable,
        ],
        categories: notConsumableEquipmentCategoriesIds,
      },
      { skip: !createInventorizationEquipmentModalOpened || !isEquipmentCategoriesFetchedSuccess },
    )

  const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocations({
    responsibilityArea: false,
  })

  const { currentData: equipment, isFetching: equipmentIsFetching } = useGetEquipment(
    { equipmentId: selectedEquipmentId! },
    { skip: !selectedEquipmentId },
  )

  const [getInventorizationEquipmentsArgs, setGetInventorizationEquipmentsArgs] =
    useSetState<GetInventorizationEquipmentsQueryArgs>({
      inventorizationId,
      ...getInitialPaginationParams(),
    })

  const {
    currentData: paginatedInventorizationEquipments,
    isFetching: inventorizationEquipmentsIsFetching,
  } = useGetInventorizationEquipments(getInventorizationEquipmentsArgs)

  const [
    createInventorizationEquipmentMutation,
    { isLoading: createInventorizationEquipmentIsLoading },
  ] = useCreateInventorizationEquipment()

  const [updateInventorizationEquipmentMutation] = useUpdateInventorizationEquipment()

  const onCreateInventorizationEquipment = useCallback<
    CreateInventorizationEquipmentModalProps['onSubmit']
  >(
    async (values, setFields) => {
      try {
        await createInventorizationEquipmentMutation({ inventorizationId, ...values }).unwrap()
        onCloseCreateInventorizationEquipmentModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [
      createInventorizationEquipmentMutation,
      inventorizationId,
      onCloseCreateInventorizationEquipmentModal,
    ],
  )

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

        <Row justify='space-between'>
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
            <Button onClick={debouncedOpenCreateInventorizationEquipmentModal}>
              Добавить оборудование
            </Button>
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

      {createInventorizationEquipmentModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback open onCancel={debouncedCloseCreateInventorizationEquipmentModal} />
          }
        >
          <CreateInventorizationEquipmentModal
            open={createInventorizationEquipmentModalOpened}
            onCancel={debouncedCloseCreateInventorizationEquipmentModal}
            equipmentCatalog={equipmentCatalog}
            equipmentCatalogIsLoading={equipmentCatalogIsFetching}
            equipment={equipment}
            equipmentIsLoading={equipmentIsFetching}
            onChangeEquipment={setSelectedEquipmentId}
            warehouses={warehouses}
            isLoading={createInventorizationEquipmentIsLoading}
            onSubmit={onCreateInventorizationEquipment}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default ExecuteInventorizationReviseTab
