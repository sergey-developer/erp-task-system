import { useBoolean, useSetState } from 'ahooks'
import { Button, Col, Flex, FormInstance, Input, Row, Typography, UploadProps } from 'antd'
import { SearchProps } from 'antd/es/input'
import isNumber from 'lodash/isNumber'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import { AttachmentTypeEnum } from 'modules/attachment/constants'
import { useCreateAttachment, useDeleteAttachment } from 'modules/attachment/hooks'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { defaultGetNomenclatureListParams } from 'modules/warehouse/constants/nomenclature'
import { useLazyGetCustomerList } from 'modules/warehouse/hooks/customer'
import {
  useCreateEquipment,
  useGetEquipment,
  useGetEquipmentCatalogs,
  useGetEquipmentCategories,
} from 'modules/warehouse/hooks/equipment'
import {
  useCreateInventorizationEquipment,
  useGetInventorizationEquipments,
  useUpdateInventorizationEquipment,
} from 'modules/warehouse/hooks/inventorization'
import { useGetNomenclature, useGetNomenclatureList } from 'modules/warehouse/hooks/nomenclature'
import { useGetWorkTypes } from 'modules/warehouse/hooks/workType'
import {
  EquipmentCategoryListItemModel,
  GetEquipmentCatalogListQueryArgs,
  GetInventorizationEquipmentsQueryArgs,
  WarehouseListItemModel,
} from 'modules/warehouse/models'
import { InventorizationRequestArgs } from 'modules/warehouse/types'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'

import ModalFallback from 'components/Modals/ModalFallback'

import { undefinedSelectOption } from 'shared/constants/selectField'
import { useGetLocations } from 'shared/hooks/catalogs/location'
import { useGetCurrencyList } from 'shared/hooks/currency'
import { useGetMacroregions } from 'shared/hooks/macroregion'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import {
  CreateInventorizationEquipmentFormFields,
  CreateInventorizationEquipmentModalProps,
} from '../CreateInventorizationEquipmentModal/types'
import { EquipmentFormModalProps } from '../EquipmentFormModal/types'
import ReviseEquipmentTable from '../ReviseEquipmentTable'
import { ReviseEquipmentTableProps } from '../ReviseEquipmentTable/types'

const CreateInventorizationEquipmentModal = React.lazy(
  () => import('../CreateInventorizationEquipmentModal'),
)

const EquipmentFormModal = React.lazy(
  () => import('modules/warehouse/components/EquipmentFormModal'),
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

  const [equipmentId, setEquipmentId] = useState<IdType>()

  const [createInventorizationEquipmentForm, setCreateInventorizationEquipmentForm] =
    useState<FormInstance<CreateInventorizationEquipmentFormFields>>()

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<IdType>()

  const [selectedOwnerId, setSelectedOwnerId] = useState<IdType>()

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  const categoryIsConsumable = checkEquipmentCategoryIsConsumable(selectedCategory?.code)

  const [
    createEquipmentModalOpened,
    { setTrue: openCreateEquipmentModal, setFalse: closeCreateEquipmentModal },
  ] = useBoolean(false)

  const onOpenCreateEquipmentModal = useDebounceFn<
    CreateInventorizationEquipmentModalProps['onClickCreateEquipment']
  >(
    (form) => () => {
      setCreateInventorizationEquipmentForm(form)
      openCreateEquipmentModal()
    },
    [openCreateEquipmentModal],
  )

  const onCloseCreateEquipmentModal = useCallback(() => {
    closeCreateEquipmentModal()
    setCreateInventorizationEquipmentForm(undefined)
    setSelectedNomenclatureId(undefined)
    setSelectedCategory(undefined)
    setSelectedOwnerId(undefined)
  }, [closeCreateEquipmentModal])

  const debouncedCloseCreateEquipmentModal = useDebounceFn(onCloseCreateEquipmentModal, [
    onCloseCreateEquipmentModal,
  ])

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
    setEquipmentId(undefined)
  }, [closeCreateInventorizationEquipmentModal])

  const debouncedCloseCreateInventorizationEquipmentModal = useDebounceFn(
    onCloseCreateInventorizationEquipmentModal,
  )

  const [
    createInventorizationEquipmentMutation,
    { isLoading: createInventorizationEquipmentIsLoading },
  ] = useCreateInventorizationEquipment()

  const [updateInventorizationEquipmentMutation] = useUpdateInventorizationEquipment()

  const [createEquipmentMutation, { isLoading: createEquipmentIsLoading }] = useCreateEquipment()

  const [createAttachment, { isLoading: createAttachmentIsLoading }] = useCreateAttachment()
  const [deleteAttachment, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

  const { currentData: nomenclatures, isFetching: nomenclaturesIsFetching } =
    useGetNomenclatureList(
      categoryIsConsumable
        ? { ...defaultGetNomenclatureListParams, equipmentHasSerialNumber: false }
        : defaultGetNomenclatureListParams,
      { skip: !createEquipmentModalOpened || !selectedCategory },
    )

  const { currentData: nomenclature, isFetching: nomenclatureIsFetching } = useGetNomenclature(
    selectedNomenclatureId!,
    { skip: !selectedNomenclatureId || !createEquipmentModalOpened },
  )

  const { currentData: workTypes = [], isFetching: workTypesIsFetching } = useGetWorkTypes(
    undefined,
    {
      skip: !createEquipmentModalOpened || !selectedCategory || !selectedNomenclatureId,
    },
  )

  const { currentData: currencies = [], isFetching: currenciesIsFetching } = useGetCurrencyList()

  const [getCustomers, { data: customers = [], isFetching: customersIsFetching }] =
    useLazyGetCustomerList()

  useEffect(() => {
    if (
      createEquipmentModalOpened &&
      !!selectedCategory &&
      !categoryIsConsumable &&
      !!selectedNomenclatureId
    ) {
      getCustomers()
    }
  }, [
    createEquipmentModalOpened,
    categoryIsConsumable,
    getCustomers,
    selectedCategory,
    selectedNomenclatureId,
  ])

  const { currentData: macroregions = [], isFetching: macroregionsIsFetching } = useGetMacroregions(
    { customers: [selectedOwnerId!] },
    { skip: !selectedOwnerId },
  )

  const {
    currentData: equipmentCategories = [],
    isFetching: equipmentCategoriesIsFetching,
    isSuccess: isEquipmentCategoriesFetchedSuccess,
  } = useGetEquipmentCategories(undefined, {
    skip: !createInventorizationEquipmentModalOpened && !createEquipmentModalOpened,
  })

  const getEquipmentCatalogQueryArgs = useMemo<GetEquipmentCatalogListQueryArgs>(
    () => ({
      categories: equipmentCategories
        .filter((c) => !checkEquipmentCategoryIsConsumable(c.code))
        .map((c) => c.id),
      conditions: [
        EquipmentConditionEnum.Working,
        EquipmentConditionEnum.Broken,
        EquipmentConditionEnum.NonRepairable,
      ],
    }),
    [equipmentCategories],
  )

  // todo: Пока поправить не получилось.
  //  Отправляется лишний запрос после добавления оборудования из модалки добавления оборудования инвентаризации
  const { currentData: equipmentCatalog = [], isFetching: equipmentCatalogIsFetching } =
    useGetEquipmentCatalogs(getEquipmentCatalogQueryArgs, {
      skip: !createInventorizationEquipmentModalOpened || !isEquipmentCategoriesFetchedSuccess,
    })

  const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocations({
    responsibilityArea: false,
  })

  const { currentData: equipment, isFetching: equipmentIsFetching } = useGetEquipment(
    { equipmentId: equipmentId! },
    { skip: !equipmentId },
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

  const onCreateInventorizationEquipment = useCallback<
    CreateInventorizationEquipmentModalProps['onSubmit']
  >(
    async (values, form) => {
      try {
        await createInventorizationEquipmentMutation({ inventorizationId, ...values }).unwrap()
        onCloseCreateInventorizationEquipmentModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          form.setFields(getFieldsErrors(error.data))
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

  const onChangeCategory = useCallback<EquipmentFormModalProps['onChangeCategory']>((category) => {
    setSelectedCategory(category)
    setSelectedNomenclatureId(undefined)
  }, [])

  const onChangeNomenclature = useCallback<EquipmentFormModalProps['onChangeNomenclature']>(
    (id) => setSelectedNomenclatureId(id),
    [],
  )

  const onCreateEquipmentImage = useCallback<NonNullable<UploadProps['customRequest']>>(
    async (options) => {
      await createAttachment({ type: AttachmentTypeEnum.EquipmentImage }, options)
    },
    [createAttachment],
  )

  const onCreateEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
    async ({ images, ...values }, setFields) => {
      if (!createInventorizationEquipmentForm) return

      const createInventorizationEquipmentFormValues =
        createInventorizationEquipmentForm.getFieldsValue()

      try {
        const newEquipment = await createEquipmentMutation({
          ...values,
          images: images?.length ? extractIdsFromFilesResponse(images) : undefined,
          location: createInventorizationEquipmentFormValues.locationFact,
          warehouse: createInventorizationEquipmentFormValues.locationFact,
        }).unwrap()

        onCloseCreateEquipmentModal()

        await onCreateInventorizationEquipment(
          { ...createInventorizationEquipmentFormValues, equipment: newEquipment.id },
          createInventorizationEquipmentForm,
        )
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [
      createEquipmentMutation,
      createInventorizationEquipmentForm,
      onCloseCreateEquipmentModal,
      onCreateInventorizationEquipment,
    ],
  )

  const onSearch = useDebounceFn<NonNullable<SearchProps['onSearch']>>(
    (value) => setGetInventorizationEquipmentsArgs({ search: value || undefined }),
    [setGetInventorizationEquipmentsArgs],
  )

  const onChangeSearch: NonNullable<SearchProps['onChange']> = (event) =>
    setSearchValue(event.target.value)

  const createEquipmentFormValues = useMemo(
    () =>
      createEquipmentModalOpened ? { title: nomenclature ? nomenclature.title : '' } : undefined,
    [createEquipmentModalOpened, nomenclature],
  )

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
            onChangeEquipment={setEquipmentId}
            onClickCreateEquipment={onOpenCreateEquipmentModal}
            warehouses={warehouses}
            isLoading={createInventorizationEquipmentIsLoading}
            onSubmit={onCreateInventorizationEquipment}
          />
        </React.Suspense>
      )}

      {createEquipmentModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={debouncedCloseCreateEquipmentModal}
              tip='Загрузка модалки добавления оборудования'
            />
          }
        >
          <EquipmentFormModal
            open={createEquipmentModalOpened}
            mode='create'
            title='Добавление оборудования'
            okText='Добавить'
            isLoading={createEquipmentIsLoading}
            values={createEquipmentFormValues}
            categories={equipmentCategories}
            categoriesIsLoading={equipmentCategoriesIsFetching}
            category={selectedCategory}
            onChangeCategory={onChangeCategory}
            currencies={currencies}
            currenciesIsLoading={currenciesIsFetching}
            owners={customers}
            ownersIsLoading={customersIsFetching}
            onChangeOwner={setSelectedOwnerId}
            macroregions={macroregions}
            macroregionsIsLoading={macroregionsIsFetching}
            workTypes={workTypes}
            workTypesIsLoading={workTypesIsFetching}
            nomenclature={nomenclature}
            nomenclatureIsLoading={nomenclatureIsFetching}
            nomenclatures={extractPaginationResults(nomenclatures)}
            nomenclaturesIsLoading={nomenclaturesIsFetching}
            onChangeNomenclature={onChangeNomenclature}
            onCancel={debouncedCloseCreateEquipmentModal}
            onSubmit={onCreateEquipment}
            onUploadImage={onCreateEquipmentImage}
            imageIsUploading={createAttachmentIsLoading}
            onDeleteImage={deleteAttachment}
            imageIsDeleting={deleteAttachmentIsLoading}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default ExecuteInventorizationReviseTab
