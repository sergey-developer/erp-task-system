import { useBoolean, useSetState } from 'ahooks'
import { Button, Flex, Space, UploadProps } from 'antd'
import { AttachmentTypeEnum } from 'features/attachments/api/constants'
import { useCreateAttachment, useDeleteAttachment } from 'features/attachments/hooks'
import { useGetEquipmentNomenclatures } from 'features/equipments/hooks'
import { CreateInventorizationRequestModalProps } from 'features/inventorizations/components/CreateInventorizationRequestModal/types'
import InventorizationTable from 'features/inventorizations/components/InventorizationTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'features/inventorizations/components/InventorizationTable/sort'
import { InventorizationTableProps } from 'features/inventorizations/components/InventorizationTable/types'
import {
  InventorizationsFilterFormFields,
  InventorizationsFilterProps,
} from 'features/inventorizations/components/InventorizationsFilter/types'
import { useCreateInventorization, useGetInventorizations } from 'features/inventorizations/hooks'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { useGetUsers, useUserPermissions } from 'features/users/hooks'
import { useGetWarehouses } from 'features/warehouse/hooks/warehouse'
import debounce from 'lodash/debounce'
import React, { FC, useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'

import { isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { useDrawerHeightByTable } from 'shared/hooks/useDrawerHeightByTable'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'
import { mergeDateTime } from 'shared/utils/date'
import { extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import { InventorizationStatusEnum, InventorizationTypeEnum } from '../../api/constants'
import { GetInventorizationsRequest } from '../../api/schemas'

const InventorizationsFilter = React.lazy(
  () => import('features/inventorizations/components/InventorizationsFilter'),
)

const CreateInventorizationRequestModal = React.lazy(
  () => import('features/inventorizations/components/CreateInventorizationRequestModal'),
)

const InventorizationDetails = React.lazy(
  () => import('features/inventorizations/components/InventorizationDetails'),
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

const initialGetInventorizationsRequestArgs: Partial<
  Pick<GetInventorizationsRequest, 'ordering' | 'types' | 'statuses' | 'offset' | 'limit'>
> = {
  ...getInitialPaginationParams(),
  ordering: 'deadline_at',
  ...initialFilterValues,
}

const InventorizationsPage: FC = () => {
  const permissions = useUserPermissions([UserPermissionsEnum.InventorizationCreate])
  const [searchParams] = useSearchParams()
  const inventorizationId = Number(searchParams.get('inventorizationId')) || undefined

  const { tableRef, drawerHeight } = useDrawerHeightByTable()

  const [filterOpened, { toggle: toggleOpenFilter }] = useBoolean(false)
  const debouncedToggleOpenFilter = useDebounceFn(toggleOpenFilter)
  const [filterValues, setFilterValues] = useState<InventorizationsFilterFormFields>()

  const [
    inventorizationDetailsOpened,
    { setTrue: openInventorizationDetails, setFalse: closeInventorizationDetails },
  ] = useBoolean(!!inventorizationId)

  const onCloseInventorizationDetails = useDebounceFn(() => {
    closeInventorizationDetails()
    setSelectedInventorizationId(undefined)
  })

  const [selectedInventorizationId, setSelectedInventorizationId] =
    useState<MaybeUndefined<IdType>>(inventorizationId)

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

  const { currentData: warehouses = [], isFetching: warehousesIsFetching } = useGetWarehouses(
    undefined,
    { skip: !createInventorizationRequestModalOpened },
  )

  const { currentData: users = [], isFetching: usersIsFetching } = useGetUsers(
    { warehouses: selectedWarehouses },
    {
      skip: !createInventorizationRequestModalOpened,
    },
  )

  const [createAttachmentMutation, { isLoading: createAttachmentIsLoading }] = useCreateAttachment()
  const [deleteAttachmentMutation, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

  const createAttachment = useCallback<NonNullable<UploadProps['customRequest']>>(
    async (options) => {
      await createAttachmentMutation({ type: AttachmentTypeEnum.InventorizationFile }, options)
    },
    [createAttachmentMutation],
  )

  const [createInventorizationMutation, { isLoading: createInventorizationIsLoading }] =
    useCreateInventorization()

  const [getInventorizationsRequestArgs, setGetInventorizationsRequestArgs] =
    useSetState<GetInventorizationsRequest>(initialGetInventorizationsRequestArgs)

  const { currentData: inventorizations, isFetching: inventorizationsIsFetching } =
    useGetInventorizations(getInventorizationsRequestArgs)

  const onCreateInventorization = useCallback<CreateInventorizationRequestModalProps['onSubmit']>(
    async ({ deadlineAtDate, deadlineAtTime, attachments, ...values }, setFields) => {
      try {
        const newInventorization = await createInventorizationMutation({
          ...values,
          deadlineAt: mergeDateTime(deadlineAtDate, deadlineAtTime).toISOString(),
          attachments: attachments?.length ? extractIdsFromFilesResponse(attachments) : undefined,
        }).unwrap()

        toggleOpenCreateInventorizationRequestModal()
        setSelectedInventorizationId(newInventorization.id)
        openInventorizationDetails()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [
      createInventorizationMutation,
      openInventorizationDetails,
      toggleOpenCreateInventorizationRequestModal,
    ],
  )

  const onTablePagination = useCallback(
    (pagination: Parameters<InventorizationTableProps['onChange']>[0]) => {
      setGetInventorizationsRequestArgs(calculatePaginationParams(pagination))
    },
    [setGetInventorizationsRequestArgs],
  )

  const onTableSort = useCallback(
    (sorter: Parameters<InventorizationTableProps['onChange']>[2]) => {
      if (sorter) {
        const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter
        if (field && (field as string) in sortableFieldToSortValues) {
          setGetInventorizationsRequestArgs({
            ordering: order ? getSort(field as SortableField, order) : undefined,
          })
        }
      }
    },
    [setGetInventorizationsRequestArgs],
  )

  const onChangeTable = useCallback<InventorizationTableProps['onChange']>(
    (pagination, _, sorter) => {
      onTablePagination(pagination)
      onTableSort(sorter)
    },
    [onTablePagination, onTableSort],
  )

  const onClickTableRow = useCallback<InventorizationTableProps['onRow']>(
    (record) => ({
      onClick: debounce(() => {
        setSelectedInventorizationId(record.id)
        openInventorizationDetails()
      }, DEFAULT_DEBOUNCE_VALUE),
    }),
    [openInventorizationDetails],
  )

  const onApplyFilter = useCallback<InventorizationsFilterProps['onApply']>(
    (values) => {
      setFilterValues(values)
      setGetInventorizationsRequestArgs({
        types: values.types,
        statuses: values.statuses,
        offset: initialGetInventorizationsRequestArgs.offset,
      })
      toggleOpenFilter()
    },
    [setGetInventorizationsRequestArgs, toggleOpenFilter],
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
          ref={tableRef}
          dataSource={extractPaginationResults(inventorizations)}
          pagination={extractPaginationParams(inventorizations)}
          loading={inventorizationsIsFetching}
          sort={getInventorizationsRequestArgs.ordering}
          onChange={onChangeTable}
          onRow={onClickTableRow}
        />
      </Flex>

      {filterOpened && (
        <React.Suspense fallback={<ModalFallback open tip='Загрузка фильтров' />}>
          <InventorizationsFilter
            open={filterOpened}
            values={filterValues}
            initialValues={initialFilterValues}
            onClose={debouncedToggleOpenFilter}
            onApply={onApplyFilter}
          />
        </React.Suspense>
      )}

      {inventorizationDetailsOpened && selectedInventorizationId && (
        <React.Suspense fallback={<ModalFallback open tip='Загрузка карточки инвентаризации' />}>
          <InventorizationDetails
            open={inventorizationDetailsOpened}
            onClose={onCloseInventorizationDetails}
            height={drawerHeight}
            inventorizationId={selectedInventorizationId}
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
            onCreateAttachment={createAttachment}
            attachmentIsCreating={createAttachmentIsLoading}
            onDeleteAttachment={deleteAttachmentMutation}
            attachmentIsDeleting={deleteAttachmentIsLoading}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default InventorizationsPage
