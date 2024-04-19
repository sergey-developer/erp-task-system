import { useBoolean, useSetState } from 'ahooks'
import { Button, Flex, Space } from 'antd'
import React, { FC, useCallback, useState } from 'react'

import { UserPermissionsEnum } from 'modules/user/constants'
import { useGetUsers, useMatchUserPermissions } from 'modules/user/hooks'
import { CreateInventorizationRequestModalProps } from 'modules/warehouse/components/CreateInventorizationRequestModal/types'
import InventorizationTable from 'modules/warehouse/components/InventorizationTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'modules/warehouse/components/InventorizationTable/sort'
import { InventorizationTableProps } from 'modules/warehouse/components/InventorizationTable/types'
import {
  InventorizationsFilterFormFields,
  InventorizationsFilterProps,
} from 'modules/warehouse/components/InventorizationsFilter/types'
import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'modules/warehouse/constants/inventorization'
import { useGetEquipmentNomenclatures } from 'modules/warehouse/hooks/equipment'
import {
  useCreateInventorization,
  useGetInventorizations,
} from 'modules/warehouse/hooks/inventorization'
import { useGetWarehouseList } from 'modules/warehouse/hooks/warehouse'
import { GetInventorizationsQueryArgs } from 'modules/warehouse/models'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { mergeDateTime } from 'shared/utils/date'
import { getFieldsErrors } from 'shared/utils/form'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

const InventorizationsFilter = React.lazy(
  () => import('modules/warehouse/components/InventorizationsFilter'),
)

const CreateInventorizationRequestModal = React.lazy(
  () => import('modules/warehouse/components/CreateInventorizationRequestModal'),
)

const initialFilterValues: Pick<InventorizationsFilterFormFields, 'types' | 'statuses'> = {
  types: [InventorizationTypeEnum.External, InventorizationTypeEnum.Internal],
  statuses: [
    InventorizationStatusEnum.New,
    InventorizationStatusEnum.InProgress,
    InventorizationStatusEnum.Completed,
    InventorizationStatusEnum.Closed,
  ],
}

const initialGetInventorizationsQueryArgs: Partial<
  Pick<GetInventorizationsQueryArgs, 'ordering' | 'types' | 'statuses' | 'offset' | 'limit'>
> = {
  ...getInitialPaginationParams(),
  ordering: 'deadline_at',
  ...initialFilterValues,
}

const InventorizationsPage: FC = () => {
  const permissions = useMatchUserPermissions([UserPermissionsEnum.InventorizationCreate])

  const [filterOpened, { toggle: toggleOpenFilter }] = useBoolean(false)
  const debouncedToggleOpenFilter = useDebounceFn(toggleOpenFilter)
  const [filterValues, setFilterValues] = useState<InventorizationsFilterFormFields>()

  const [
    createInventorizationRequestModalOpened,
    { toggle: toggleOpenCreateInventorizationRequestModal },
  ] = useBoolean(false)

  const debouncedToggleOpenCreateInventorizationRequestModal = useDebounceFn(
    toggleOpenCreateInventorizationRequestModal,
  )

  const [selectedWarehouses, setSelectedWarehouses] = useState<IdType[]>()
  const debouncedSetSelectedWarehouses = useDebounceFn(setSelectedWarehouses, undefined, 1000)

  const {
    currentData: equipmentNomenclaturesResponse,
    isFetching: equipmentNomenclaturesIsFetching,
  } = useGetEquipmentNomenclatures(
    { limit: 999999, warehouses: selectedWarehouses },
    { skip: !createInventorizationRequestModalOpened },
  )

  const equipmentNomenclatures = extractPaginationResults(equipmentNomenclaturesResponse)

  const { currentData: warehouses = [], isFetching: warehousesIsFetching } = useGetWarehouseList(
    undefined,
    { skip: !createInventorizationRequestModalOpened },
  )

  const { currentData: users = [], isFetching: usersIsFetching } = useGetUsers(
    { warehouses: selectedWarehouses },
    {
      skip: !createInventorizationRequestModalOpened,
    },
  )

  const [createInventorizationMutation, { isLoading: createInventorizationIsLoading }] =
    useCreateInventorization()

  const [getInventorizationsQueryArgs, setGetInventorizationsQueryArgs] =
    useSetState<GetInventorizationsQueryArgs>(initialGetInventorizationsQueryArgs)

  const { currentData: inventorizations, isFetching: inventorizationsIsFetching } =
    useGetInventorizations(getInventorizationsQueryArgs)

  const onCreateInventorization = useCallback<CreateInventorizationRequestModalProps['onSubmit']>(
    async ({ deadlineAtDate, deadlineAtTime, ...values }, setFields) => {
      try {
        await createInventorizationMutation({
          ...values,
          deadlineAt: mergeDateTime(deadlineAtDate, deadlineAtTime).toISOString(),
        }).unwrap()

        toggleOpenCreateInventorizationRequestModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [createInventorizationMutation, toggleOpenCreateInventorizationRequestModal],
  )

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

  const onApplyFilter = useCallback<InventorizationsFilterProps['onApply']>(
    (values) => {
      setFilterValues(values)
      setGetInventorizationsQueryArgs({
        types: values.types,
        statuses: values.statuses,
        offset: initialGetInventorizationsQueryArgs.offset,
      })
      toggleOpenFilter()
    },
    [setGetInventorizationsQueryArgs, toggleOpenFilter],
  )

  return (
    <>
      <Flex data-testid='inventorizations-page' vertical gap='middle'>
        <Space size='middle'>
          <FilterButton onClick={debouncedToggleOpenFilter} />

          {permissions.inventorizationCreate && (
            <Button onClick={debouncedToggleOpenCreateInventorizationRequestModal}>
              Создать поручение
            </Button>
          )}
        </Space>

        <InventorizationTable
          dataSource={extractPaginationResults(inventorizations)}
          pagination={extractPaginationParams(inventorizations)}
          loading={inventorizationsIsFetching}
          sort={getInventorizationsQueryArgs.ordering}
          onChange={onChangeTable}
        />
      </Flex>

      {filterOpened && (
        <React.Suspense fallback={<ModalFallback open tip='Загрузка данных для фильтров' />}>
          <InventorizationsFilter
            open={filterOpened}
            values={filterValues}
            initialValues={initialFilterValues}
            onClose={debouncedToggleOpenFilter}
            onApply={onApplyFilter}
          />
        </React.Suspense>
      )}

      {createInventorizationRequestModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback open tip='Загрузка данных для создания поручения на инвентаризацию' />
          }
        >
          <CreateInventorizationRequestModal
            open={createInventorizationRequestModalOpened}
            onSubmit={onCreateInventorization}
            onChangeWarehouses={debouncedSetSelectedWarehouses}
            onCancel={debouncedToggleOpenCreateInventorizationRequestModal}
            confirmLoading={createInventorizationIsLoading}
            nomenclatures={equipmentNomenclatures}
            nomenclaturesIsLoading={equipmentNomenclaturesIsFetching}
            warehouses={warehouses}
            warehousesIsLoading={warehousesIsFetching}
            executors={users}
            executorsIsLoading={usersIsFetching}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default InventorizationsPage
