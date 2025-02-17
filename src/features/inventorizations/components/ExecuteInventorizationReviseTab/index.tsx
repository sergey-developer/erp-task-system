import { useBoolean, useSetState } from 'ahooks'
import {
  Button,
  Col,
  Dropdown,
  Flex,
  FormInstance,
  Input,
  notification,
  Row,
  Space,
  Typography,
  Upload,
  UploadProps,
} from 'antd'
import { SearchProps } from 'antd/es/input'
import { AttachmentTypeEnum } from 'features/attachments/api/constants'
import { useCreateAttachment, useDeleteAttachment } from 'features/attachments/hooks'
import { useIdBelongAuthUser } from 'features/auth/hooks'
import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentCategoryDTO } from 'features/equipments/api/dto'
import { GetEquipmentsCatalogRequest } from 'features/equipments/api/schemas'
import { CheckEquipmentFormModalProps } from 'features/equipments/components/CheckEquipmentFormModal/types'
import { getCheckEquipmentFormInitialValues } from 'features/equipments/components/CheckEquipmentFormModal/utils'
import { EquipmentFormModalProps } from 'features/equipments/components/EquipmentFormModal/types'
import { checkEquipmentCategoryIsConsumable } from 'features/equipments/helpers'
import {
  useCreateEquipment,
  useGetEquipment,
  useGetEquipmentCategories,
  useGetEquipmentsCatalog,
} from 'features/equipments/hooks'
import { CheckInventorizationEquipmentsModalProps } from 'features/inventorizations/components/CheckInventorizationEquipmentsModal'
import { CheckInventorizationEquipmentsTableRow } from 'features/inventorizations/components/CheckInventorizationEquipmentsTable/types'
import {
  CreateInventorizationEquipmentFormFields,
  CreateInventorizationEquipmentModalProps,
} from 'features/inventorizations/components/CreateInventorizationEquipmentModal/types'
import ReviseInventorizationEquipmentTable from 'features/inventorizations/components/ReviseInventorizationEquipmentTable'
import { ReviseInventorizationEquipmentTableProps } from 'features/inventorizations/components/ReviseInventorizationEquipmentTable/types'
import {
  checkInventorizationStatusIsInProgress,
  checkInventorizationStatusIsNew,
} from 'features/inventorizations/helpers'
import {
  useCheckInventorizationEquipments,
  useCheckInventorizationEquipmentsTemplate,
  useCreateInventorizationEquipment,
  useGetInventorizationEquipments,
  useLazyGetInventorizationEquipmentsTemplate,
  useLazyGetInventorizationEquipmentsXlsx,
  useUpdateInventorizationEquipment,
} from 'features/inventorizations/hooks'
import { defaultGetNomenclaturesRequestParams } from 'features/nomenclatures/api/constants'
import { useGetNomenclature, useGetNomenclatures } from 'features/nomenclatures/hooks'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { useUserPermissions } from 'features/users/hooks'
import isNumber from 'lodash/isNumber'
import omit from 'lodash/omit'
import stubFalse from 'lodash/stubFalse'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import { DownIcon } from 'components/Icons'
import ModalFallback from 'components/Modals/ModalFallback'
import TableRowsErrors from 'components/TableRowsErrors'

import { isBadRequestError, isErrorResponse, TableRowsApiErrors } from 'shared/api/baseApi'
import { useGetCurrenciesCatalog } from 'shared/catalogs/currencies/hooks'
import { useLazyGetCustomersCatalog } from 'shared/catalogs/customers/hooks'
import { useGetLocationsCatalog } from 'shared/catalogs/locations/hooks'
import { useGetMacroregionsCatalog } from 'shared/catalogs/macroregions/hooks'
import { useGetWorkTypesCatalog } from 'shared/catalogs/workTypes/hooks'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { undefinedSelectOption } from 'shared/constants/selectField'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { FileToSend } from 'shared/types/file'
import { base64ToBytes } from 'shared/utils/common'
import { extractFileNameFromHeaders } from 'shared/utils/extractFileNameFromHeaders'
import { downloadFile, extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

import { InventorizationDetailDTO } from '../../api/dto'
import { GetInventorizationEquipmentsRequest } from '../../api/schemas'

const CreateInventorizationEquipmentModal = React.lazy(
  () => import('features/inventorizations/components/CreateInventorizationEquipmentModal'),
)

const EquipmentFormModal = React.lazy(
  () => import('features/equipments/components/EquipmentFormModal'),
)

const CheckEquipmentFormModal = React.lazy(
  () => import('features/equipments/components/CheckEquipmentFormModal'),
)

const CheckInventorizationEquipmentsModal = React.lazy(
  () => import('features/inventorizations/components/CheckInventorizationEquipmentsModal'),
)

export type ExecuteInventorizationReviseTabProps = {
  inventorization: Pick<InventorizationDetailDTO, 'id' | 'warehouses' | 'executor' | 'status'>
}

const { Title } = Typography
const { Search } = Input

const ExecuteInventorizationReviseTab: FC<ExecuteInventorizationReviseTabProps> = ({
  inventorization,
}) => {
  const permissions = useUserPermissions([UserPermissionsEnum.InventorizationUpdate])
  const inventorizationExecutorIsCurrentUser = useIdBelongAuthUser(inventorization.executor.id)

  const [searchValue, setSearchValue] = useState<string>()

  const [equipmentId, setEquipmentId] = useState<IdType>()

  const [createInventorizationEquipmentForm, setCreateInventorizationEquipmentForm] =
    useState<FormInstance<CreateInventorizationEquipmentFormFields>>()

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<IdType>()
  const [
    userChangedNomenclature,
    { setTrue: setUserChangedNomenclature, setFalse: resetUserChangedNomenclature },
  ] = useBoolean(false)

  const [selectedOwnerId, setSelectedOwnerId] = useState<IdType>()

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryDTO>()
  const categoryIsConsumable = checkEquipmentCategoryIsConsumable(selectedCategory?.code)

  // get inventorizationDetail equipments
  const [getInventorizationEquipmentsArgs, setGetInventorizationEquipmentsArgs] =
    useSetState<GetInventorizationEquipmentsRequest>({
      inventorizationId: inventorization.id,
      ...getInitialPaginationParams(),
    })

  const {
    currentData: paginatedInventorizationEquipments,
    isFetching: inventorizationEquipmentsIsFetching,
    refetch: refetchGetInventorizationEquipments,
    fulfilledTimeStamp: getInventorizationEquipmentsFulfilledTimeStamp,
  } = useGetInventorizationEquipments(getInventorizationEquipmentsArgs)
  // get inventorizationDetail equipments

  // edit checked inventorizationDetail equipment
  const [editableCheckedInventorizationEquipment, setEditableCheckedInventorizationEquipment] =
    useState<CheckInventorizationEquipmentsTableRow>()

  const [
    editableCheckedInventorizationEquipmentsIds,
    setEditableCheckedInventorizationEquipmentsIds,
  ] = useState<CheckInventorizationEquipmentsTableRow['rowId'][]>([])

  const [
    editCheckedInventorizationEquipmentModalOpened,
    {
      setFalse: closeEditCheckedInventorizationEquipmentModal,
      setTrue: openEditCheckedInventorizationEquipmentModal,
    },
  ] = useBoolean(false)

  const onOpenEditCheckedInventorizationEquipmentModal = useDebounceFn<
    CheckInventorizationEquipmentsModalProps['onClickEdit']
  >(
    (row) => {
      openEditCheckedInventorizationEquipmentModal()
      setEditableCheckedInventorizationEquipment(row)
      row.category && setSelectedCategory(row.category)
      row.nomenclature && setSelectedNomenclatureId(row.nomenclature.id)
      row.owner && setSelectedOwnerId(row.owner.id)
      setEditableCheckedInventorizationEquipmentsIds((prevState) => prevState.concat(row.rowId))
    },
    [openEditCheckedInventorizationEquipmentModal],
  )

  const onCloseEditCheckedInventorizationEquipmentModal = useCallback(() => {
    closeEditCheckedInventorizationEquipmentModal()
    setEditableCheckedInventorizationEquipment(undefined)
    setSelectedCategory(undefined)
    setSelectedNomenclatureId(undefined)
    setSelectedOwnerId(undefined)
    resetUserChangedNomenclature()
  }, [closeEditCheckedInventorizationEquipmentModal, resetUserChangedNomenclature])

  const debouncedOnCloseEditCheckedInventorizationEquipmentModal = useDebounceFn(
    onCloseEditCheckedInventorizationEquipmentModal,
    [onCloseEditCheckedInventorizationEquipmentModal],
  )

  // check inventorizationDetail equipments template
  const [checkedInventorizationEquipments, setCheckedInventorizationEquipments] = useState<
    CheckInventorizationEquipmentsTableRow[]
  >([])

  const [
    checkInventorizationEquipmentsModalOpened,
    {
      setTrue: openCheckInventorizationEquipmentsModal,
      setFalse: closeCheckInventorizationEquipmentsModal,
    },
  ] = useBoolean(false)

  const onCloseCheckInventorizationEquipmentsModal = useDebounceFn(() => {
    closeCheckInventorizationEquipmentsModal()
    setCheckedInventorizationEquipments([])
    setEditableCheckedInventorizationEquipmentsIds([])
  }, [closeCheckInventorizationEquipmentsModal])

  const [
    checkInventorizationEquipmentsTemplateMutation,
    { isLoading: checkInventorizationEquipmentsTemplateIsLoading },
  ] = useCheckInventorizationEquipmentsTemplate()

  // check inventorizationDetail equipments template
  const onCheckByExcel: NonNullable<UploadProps['onChange']> = async ({ file }) => {
    try {
      const equipments = await checkInventorizationEquipmentsTemplateMutation({
        file: file as FileToSend,
        inventorization: inventorization.id,
      }).unwrap()

      setCheckedInventorizationEquipments(
        equipments.map((eqp, index) => ({ rowId: index, ...eqp })),
      )
      openCheckInventorizationEquipmentsModal()
    } catch (error) {
      if (isErrorResponse(error)) {
        if (isBadRequestError(error) && !error.data?.detail) {
          notification.error({
            message: 'Ошибка проверки сверяемого оборудования из Excel',
            description: (
              <TableRowsErrors
                data-testid='check-inventorizationDetail-equipments-template-errors'
                errors={error.data as TableRowsApiErrors}
              />
            ),
          })
        }
      } else {
        console.error('Check inventorization equipments template error: ', error)
      }
    }
  }

  // check inventorizationDetail equipments
  const [
    checkInventorizationEquipmentsMutation,
    { isLoading: checkInventorizationEquipmentsIsLoading },
  ] = useCheckInventorizationEquipments()

  const onCheckInventorizationEquipments = useCallback(async () => {
    try {
      await checkInventorizationEquipmentsMutation({
        inventorization: inventorization.id,
        equipments: checkedInventorizationEquipments.map(
          ({
            rowId,
            title,
            condition,
            purpose,
            macroregion,
            owner,
            nomenclature,
            category,
            currency,
            locationFact,
            ...eqp
          }) => ({
            ...eqp,
            row: rowId,
            title: title!,
            condition: condition!,
            nomenclature: nomenclature!.id,
            category: category!.id,
            purpose: purpose!.id,
            currency: currency?.id,
            owner: owner?.id,
            macroregion: macroregion?.id,
            locationFact:
              locationFact?.id === undefinedSelectOption.value ? null : locationFact?.id,
            isLocationFactUndefined:
              locationFact?.id === undefinedSelectOption.value ? true : undefined,
          }),
        ),
      }).unwrap()

      onCloseCheckInventorizationEquipmentsModal()
      refetchGetInventorizationEquipments()
    } catch (error) {
      if (isErrorResponse(error)) {
        if (isBadRequestError(error)) {
          notification.error({
            message: 'Ошибка проверки сверяемого оборудования',
            description: (
              <TableRowsErrors
                data-testid='check-inventorizationDetail-equipments-errors'
                errors={error.data as TableRowsApiErrors}
              />
            ),
            duration: 0,
          })
        }
      } else {
        console.error('Check inventorization equipments error: ', error)
      }
    }
  }, [
    checkInventorizationEquipmentsMutation,
    checkedInventorizationEquipments,
    inventorization.id,
    onCloseCheckInventorizationEquipmentsModal,
    refetchGetInventorizationEquipments,
  ])
  // check inventorizationDetail equipments

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
    resetUserChangedNomenclature()
  }, [closeCreateEquipmentModal, resetUserChangedNomenclature])

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

  const [
    getInventorizationEquipmentsTemplate,
    { isFetching: getInventorizationEquipmentsTemplateIsFetching },
  ] = useLazyGetInventorizationEquipmentsTemplate()

  const [
    updateInventorizationEquipmentMutation,
    { isLoading: updateInventorizationEquipmentIsLoading },
  ] = useUpdateInventorizationEquipment()

  const [createEquipmentMutation, { isLoading: createEquipmentIsLoading }] = useCreateEquipment()

  const [createAttachment, { isLoading: createAttachmentIsLoading }] = useCreateAttachment()
  const [deleteAttachment, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

  const { currentData: nomenclaturesResponse, isFetching: nomenclaturesIsFetching } =
    useGetNomenclatures(
      categoryIsConsumable
        ? { ...defaultGetNomenclaturesRequestParams, equipmentHasSerialNumber: false }
        : defaultGetNomenclaturesRequestParams,
      {
        skip:
          (!createEquipmentModalOpened && !editCheckedInventorizationEquipmentModalOpened) ||
          !selectedCategory,
      },
    )
  const nomenclatures = extractPaginationResults(nomenclaturesResponse)

  const { currentData: nomenclature, isFetching: nomenclatureIsFetching } = useGetNomenclature(
    selectedNomenclatureId!,
    {
      skip:
        (!createEquipmentModalOpened && !editCheckedInventorizationEquipmentModalOpened) ||
        !selectedNomenclatureId,
    },
  )

  const { currentData: workTypes = [], isFetching: workTypesIsFetching } = useGetWorkTypesCatalog(
    undefined,
    {
      skip:
        (!createEquipmentModalOpened && !editCheckedInventorizationEquipmentModalOpened) ||
        !selectedCategory ||
        !selectedNomenclatureId,
    },
  )

  const { currentData: currencies = [], isFetching: currenciesIsFetching } =
    useGetCurrenciesCatalog(undefined, {
      skip: !createEquipmentModalOpened && !editCheckedInventorizationEquipmentModalOpened,
    })

  const [getCustomers, { data: customers = [], isFetching: customersIsFetching }] =
    useLazyGetCustomersCatalog()

  useEffect(() => {
    if (
      (createEquipmentModalOpened || editCheckedInventorizationEquipmentModalOpened) &&
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
    editCheckedInventorizationEquipmentModalOpened,
  ])

  const { currentData: macroregions = [], isFetching: macroregionsIsFetching } =
    useGetMacroregionsCatalog({ customers: [selectedOwnerId!] }, { skip: !selectedOwnerId })

  const {
    currentData: equipmentCategories = [],
    isFetching: equipmentCategoriesIsFetching,
    isSuccess: isEquipmentCategoriesFetchedSuccess,
  } = useGetEquipmentCategories(undefined, {
    skip:
      !createInventorizationEquipmentModalOpened &&
      !createEquipmentModalOpened &&
      !editCheckedInventorizationEquipmentModalOpened,
  })

  const getEquipmentCatalogRequest = useMemo<GetEquipmentsCatalogRequest>(
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
    useGetEquipmentsCatalog(getEquipmentCatalogRequest, {
      skip: !createInventorizationEquipmentModalOpened || !isEquipmentCategoriesFetchedSuccess,
    })

  const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocationsCatalog({
    responsibilityArea: false,
  })

  const { currentData: equipment, isFetching: equipmentIsFetching } = useGetEquipment(
    { equipmentId: equipmentId! },
    { skip: !equipmentId },
  )

  const onCreateInventorizationEquipment = useCallback<
    CreateInventorizationEquipmentModalProps['onSubmit']
  >(
    async (values, form) => {
      try {
        await createInventorizationEquipmentMutation({
          inventorizationId: inventorization.id,
          ...values,
        }).unwrap()
        onCloseCreateInventorizationEquipmentModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          form.setFields(getFieldsErrors(error.data))
        }
      }
    },
    [
      createInventorizationEquipmentMutation,
      inventorization.id,
      onCloseCreateInventorizationEquipmentModal,
    ],
  )

  const onTablePagination = useCallback(
    (pagination: Parameters<ReviseInventorizationEquipmentTableProps['onTableChange']>[0]) => {
      setGetInventorizationEquipmentsArgs(calculatePaginationParams(pagination))
    },
    [setGetInventorizationEquipmentsArgs],
  )

  const onChangeTable = useCallback<ReviseInventorizationEquipmentTableProps['onTableChange']>(
    (pagination) => {
      onTablePagination(pagination)
    },
    [onTablePagination],
  )

  const onChangeQuantityFact: ReviseInventorizationEquipmentTableProps['onChangeQuantityFact'] =
    useDebounceFn(
      async (record, value, locationFact) => {
        const valueIsNumber = isNumber(value)
        if (valueIsNumber && value < 0) return

        await updateInventorizationEquipmentMutation({
          inventorizationEquipmentId: record.id,
          quantityFact: valueIsNumber ? value : null,
          locationFact: locationFact
            ? locationFact.id === undefinedSelectOption.value
              ? null
              : locationFact.id
            : null,
          isLocationFactUndefined: locationFact?.id === undefinedSelectOption.value,
          locationFactOption: locationFact,
          getInventorizationEquipmentsArgs,
        })
      },
      [getInventorizationEquipmentsArgs, updateInventorizationEquipmentMutation],
      500,
    )

  const onChangeLocationFact: ReviseInventorizationEquipmentTableProps['onChangeLocationFact'] =
    useDebounceFn(
      async (record, value, quantityFact) => {
        await updateInventorizationEquipmentMutation({
          inventorizationEquipmentId: record.id,
          locationFact: value.id === undefinedSelectOption.value ? null : value.id,
          isLocationFactUndefined: value.id === undefinedSelectOption.value,
          quantityFact,
          locationFactOption: value,
          getInventorizationEquipmentsArgs,
        })
      },
      [getInventorizationEquipmentsArgs, updateInventorizationEquipmentMutation],
      500,
    )

  const onChangeCategory = useCallback<EquipmentFormModalProps['onChangeCategory']>(
    (category) => {
      setSelectedCategory(category)
      setSelectedNomenclatureId(undefined)
      resetUserChangedNomenclature()
    },
    [resetUserChangedNomenclature],
  )

  const onChangeNomenclature = useCallback<EquipmentFormModalProps['onChangeNomenclature']>(
    (id) => {
      setSelectedNomenclatureId(id)
      setUserChangedNomenclature()
    },
    [setUserChangedNomenclature],
  )

  const onCreateEquipmentImage = useCallback<NonNullable<UploadProps['customRequest']>>(
    async (options) => {
      await createAttachment({ type: AttachmentTypeEnum.EquipmentImage }, options)
    },
    [createAttachment],
  )

  const onCreateEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
    async ({ images, ...values }, form) => {
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
          form.setFields(getFieldsErrors(error.data))
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

  const onGetInventorizationEquipmentsTemplate = useDebounceFn(async () => {
    const { data } = await getInventorizationEquipmentsTemplate()

    if (data?.value && data?.meta?.response) {
      try {
        const fileName = extractFileNameFromHeaders(data.meta.response.headers)
        downloadFile(base64ToBytes(data.value), MimetypeEnum.Xlsx, fileName)
      } catch (error) {
        console.error('Error while downloading inventorization equipments template file')
      }
    }
  })

  const onEditCheckedInventorizationEquipment = useCallback<
    CheckEquipmentFormModalProps['onSubmit']
  >(
    (values) => {
      if (!editableCheckedInventorizationEquipment) return
      const updatedEquipment: CheckInventorizationEquipmentsTableRow = {
        rowId: editableCheckedInventorizationEquipment.rowId,
        isCredited: editableCheckedInventorizationEquipment.isCredited,
        title: values.title,
        isNew: values.isNew,
        isRepaired: values.isRepaired,
        isWarranty: values.isWarranty,
        comment: values.comment,
        price: values.price,
        usageCounter: values.usageCounter,
        inventoryNumber: values.inventoryNumber,
        serialNumber: values.serialNumber,
        condition: values.condition,
        quantityFact: isNumber(values.quantity)
          ? values.quantity
          : editableCheckedInventorizationEquipment.quantityFact,
        purpose: workTypes.find((w) => w.id === values.purpose),
        nomenclature: nomenclatures.find((n) => n.id === values.nomenclature),
        category: equipmentCategories.find((c) => c.id === values.category),
        currency: values.currency ? currencies.find((c) => c.id === values.currency) : undefined,
        owner: values.owner ? customers.find((c) => c.id === values.owner) : undefined,
        macroregion: values.macroregion
          ? macroregions.find((m) => m.id === values.macroregion)
          : undefined,
        locationFact:
          values.location === undefinedSelectOption.value
            ? editableCheckedInventorizationEquipment.locationFact
            : locations.find((l) => l.id === values.location),
      }

      setCheckedInventorizationEquipments((prevState) => {
        const newState = [...prevState]
        newState.splice(updatedEquipment.rowId, 1, updatedEquipment)
        return newState
      })

      onCloseEditCheckedInventorizationEquipmentModal()
    },
    [
      currencies,
      customers,
      editableCheckedInventorizationEquipment,
      equipmentCategories,
      locations,
      macroregions,
      nomenclatures,
      onCloseEditCheckedInventorizationEquipmentModal,
      workTypes,
    ],
  )

  const [
    getInventorizationEquipmentsXlsx,
    { isFetching: getInventorizationEquipmentsXlsxIsFetching },
  ] = useLazyGetInventorizationEquipmentsXlsx()

  const onDownloadInventorizationEquipments = async () => {
    const { data } = await getInventorizationEquipmentsXlsx(
      omit(getInventorizationEquipmentsArgs, 'limit', 'offset'),
    )

    if (data?.value && data?.meta?.response) {
      try {
        const fileName = extractFileNameFromHeaders(data.meta.response.headers)
        downloadFile(base64ToBytes(data.value), MimetypeEnum.Xlsx, fileName)
      } catch (error) {
        console.error('Error while downloading inventorization equipments file')
      }
    }
  }

  const createEquipmentFormValues = useMemo(
    () =>
      createEquipmentModalOpened ? { title: nomenclature ? nomenclature.title : '' } : undefined,
    [createEquipmentModalOpened, nomenclature],
  )

  const editCheckedInventorizationEquipmentFormValues = useMemo(
    () =>
      editCheckedInventorizationEquipmentModalOpened
        ? {
            title: userChangedNomenclature
              ? nomenclature?.title
              : editableCheckedInventorizationEquipment?.title,
          }
        : undefined,
    [
      editCheckedInventorizationEquipmentModalOpened,
      editableCheckedInventorizationEquipment?.title,
      nomenclature?.title,
      userChangedNomenclature,
    ],
  )

  return (
    <>
      <Flex data-testid='execute-inventorizationDetail-revise-tab' vertical gap='small'>
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
            <Space>
              {permissions.inventorizationUpdate &&
                inventorizationExecutorIsCurrentUser &&
                (checkInventorizationStatusIsNew(inventorization.status) ||
                  checkInventorizationStatusIsInProgress(inventorization.status)) && (
                  <>
                    <Dropdown.Button
                      menu={{
                        items: [
                          {
                            key: 'Скачать с оборудованием',
                            label: (
                              <Button
                                type='text'
                                loading={getInventorizationEquipmentsXlsxIsFetching}
                              >
                                Скачать с оборудованием
                              </Button>
                            ),
                            onClick: onDownloadInventorizationEquipments,
                          },
                        ],
                      }}
                      icon={<DownIcon />}
                      trigger={['click']}
                      loading={getInventorizationEquipmentsTemplateIsFetching}
                      onClick={onGetInventorizationEquipmentsTemplate}
                    >
                      Скачать шаблон
                    </Dropdown.Button>

                    <Upload
                      data-testid='check-by-excel-upload'
                      showUploadList={false}
                      beforeUpload={stubFalse}
                      onChange={onCheckByExcel}
                    >
                      <Button loading={checkInventorizationEquipmentsTemplateIsLoading}>
                        Сверить из Excel
                      </Button>
                    </Upload>
                  </>
                )}

              <Button onClick={debouncedOpenCreateInventorizationEquipmentModal}>
                Добавить оборудование
              </Button>
            </Space>
          </Col>
        </Row>

        <ReviseInventorizationEquipmentTable
          pagination={extractPaginationParams(paginatedInventorizationEquipments)}
          dataSource={extractPaginationResults(paginatedInventorizationEquipments)}
          fulfilledTimeStamp={getInventorizationEquipmentsFulfilledTimeStamp}
          loading={inventorizationEquipmentsIsFetching}
          locations={locations}
          locationsIsLoading={locationsIsFetching}
          onTableChange={onChangeTable}
          onChangeQuantityFact={onChangeQuantityFact}
          changeQuantityFactIsLoading={updateInventorizationEquipmentIsLoading}
          onChangeLocationFact={onChangeLocationFact}
          changeLocationFactIsLoading={updateInventorizationEquipmentIsLoading}
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
            equipments={equipmentCatalog}
            equipmentsIsLoading={equipmentCatalogIsFetching}
            equipment={equipment}
            equipmentIsLoading={equipmentIsFetching}
            onChangeEquipment={setEquipmentId}
            onClickCreateEquipment={onOpenCreateEquipmentModal}
            warehouses={inventorization.warehouses}
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
            nomenclatures={nomenclatures}
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

      {checkInventorizationEquipmentsModalOpened && (
        <React.Suspense
          fallback={<ModalFallback open onCancel={onCloseCheckInventorizationEquipmentsModal} />}
        >
          <CheckInventorizationEquipmentsModal
            open={checkInventorizationEquipmentsModalOpened}
            onCancel={onCloseCheckInventorizationEquipmentsModal}
            onSubmit={onCheckInventorizationEquipments}
            data={checkedInventorizationEquipments}
            isLoading={checkInventorizationEquipmentsIsLoading}
            onClickEdit={onOpenEditCheckedInventorizationEquipmentModal}
            editTouchedRowsIds={editableCheckedInventorizationEquipmentsIds}
          />
        </React.Suspense>
      )}

      {editCheckedInventorizationEquipmentModalOpened && editableCheckedInventorizationEquipment && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={debouncedOnCloseEditCheckedInventorizationEquipmentModal}
              tip='Загрузка модалки редактирования оборудования'
            />
          }
        >
          <CheckEquipmentFormModal
            open={editCheckedInventorizationEquipmentModalOpened}
            title='Изменить сверяемое оборудование'
            onCancel={debouncedOnCloseEditCheckedInventorizationEquipmentModal}
            onSubmit={onEditCheckedInventorizationEquipment}
            initialValues={getCheckEquipmentFormInitialValues(
              editableCheckedInventorizationEquipment,
            )}
            values={editCheckedInventorizationEquipmentFormValues}
            isCredited={editableCheckedInventorizationEquipment.isCredited}
            categories={equipmentCategories}
            categoriesIsLoading={equipmentCategoriesIsFetching}
            category={selectedCategory}
            onChangeCategory={onChangeCategory}
            locations={locations}
            locationsIsLoading={locationsIsFetching}
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
            nomenclatures={nomenclatures}
            nomenclaturesIsLoading={nomenclaturesIsFetching}
            onChangeNomenclature={onChangeNomenclature}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default ExecuteInventorizationReviseTab
