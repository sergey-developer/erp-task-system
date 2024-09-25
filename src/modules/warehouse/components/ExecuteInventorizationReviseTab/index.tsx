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
import isNumber from 'lodash/isNumber'
import stubFalse from 'lodash/stubFalse'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import { AttachmentTypeEnum } from 'modules/attachment/constants'
import { useCreateAttachment, useDeleteAttachment } from 'modules/attachment/hooks'
import { useIdBelongAuthUser } from 'modules/auth/hooks'
import { UserPermissionsEnum } from 'modules/user/constants'
import { useUserPermissions } from 'modules/user/hooks'
import { CheckEquipmentFormModalProps } from 'modules/warehouse/components/CheckEquipmentFormModal/types'
import { getEquipmentFormInitialValues } from 'modules/warehouse/components/CheckEquipmentFormModal/utils'
import { CheckInventorizationEquipmentsModalProps } from 'modules/warehouse/components/CheckInventorizationEquipmentsModal'
import { CheckInventorizationEquipmentsTableRow } from 'modules/warehouse/components/CheckInventorizationEquipmentsTable/types'
import {
  CreateInventorizationEquipmentFormFields,
  CreateInventorizationEquipmentModalProps,
} from 'modules/warehouse/components/CreateInventorizationEquipmentModal/types'
import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'
import ReviseEquipmentTable from 'modules/warehouse/components/ReviseEquipmentTable'
import { ReviseEquipmentTableProps } from 'modules/warehouse/components/ReviseEquipmentTable/types'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { defaultGetNomenclaturesParams } from 'modules/warehouse/constants/nomenclature'
import { useLazyGetCustomerList } from 'modules/warehouse/hooks/customer'
import {
  useCreateEquipment,
  useGetEquipment,
  useGetEquipmentCategories,
  useGetEquipmentsCatalog,
} from 'modules/warehouse/hooks/equipment'
import {
  useCheckInventorizationEquipments,
  useCheckInventorizationEquipmentsTemplate,
  useCreateInventorizationEquipment,
  useGetInventorizationEquipments,
  useLazyGetInventorizationEquipmentsTemplate,
  useUpdateInventorizationEquipment,
} from 'modules/warehouse/hooks/inventorization'
import { useGetNomenclature, useGetNomenclatures } from 'modules/warehouse/hooks/nomenclature'
import { useGetWorkTypes } from 'modules/warehouse/hooks/workType'
import {
  EquipmentCategoryListItemModel,
  GetEquipmentsCatalogQueryArgs,
  GetInventorizationEquipmentsQueryArgs,
  InventorizationModel,
} from 'modules/warehouse/models'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'
import {
  checkInventorizationStatusIsInProgress,
  checkInventorizationStatusIsNew,
} from 'modules/warehouse/utils/inventorization'

import { DownIcon } from 'components/Icons'
import ModalFallback from 'components/Modals/ModalFallback'

import { SAVE_TEXT } from 'shared/constants/common'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { undefinedSelectOption } from 'shared/constants/selectField'
import { useGetLocationsCatalog } from 'shared/hooks/catalogs/locations'
import { useGetCurrencyList } from 'shared/hooks/currency'
import { useGetMacroregions } from 'shared/hooks/macroregion'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse, TableRowsApiErrors } from 'shared/services/baseApi'
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

import TableRowsErrors from '../../../../components/TableRowsErrors'

const CreateInventorizationEquipmentModal = React.lazy(
  () => import('../CreateInventorizationEquipmentModal'),
)

const EquipmentFormModal = React.lazy(
  () => import('modules/warehouse/components/EquipmentFormModal'),
)

const CheckEquipmentFormModal = React.lazy(
  () => import('modules/warehouse/components/CheckEquipmentFormModal'),
)

const CheckInventorizationEquipmentsModal = React.lazy(
  () => import('modules/warehouse/components/CheckInventorizationEquipmentsModal'),
)

export type ExecuteInventorizationReviseTabProps = {
  inventorization: Pick<InventorizationModel, 'id' | 'warehouses' | 'executor' | 'status'>
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

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  const categoryIsConsumable = checkEquipmentCategoryIsConsumable(selectedCategory?.code)

  // get inventorization equipments
  const [getInventorizationEquipmentsArgs, setGetInventorizationEquipmentsArgs] =
    useSetState<GetInventorizationEquipmentsQueryArgs>({
      inventorizationId: inventorization.id,
      ...getInitialPaginationParams(),
    })

  const {
    currentData: paginatedInventorizationEquipments,
    isFetching: inventorizationEquipmentsIsFetching,
    refetch: refetchGetInventorizationEquipments,
  } = useGetInventorizationEquipments(getInventorizationEquipmentsArgs)
  // get inventorization equipments

  // edit checked inventorization equipment
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

  // check inventorization equipments template
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
        if (isBadRequestError(error)) {
          notification.error({
            message: 'Ошибка проверки сверяемого оборудования из Excel',
            description: <TableRowsErrors errors={error.data as TableRowsApiErrors} />,
          })
        }
      } else {
        console.error('Check inventorization equipments template error: ', error)
      }
    }
  }
  // check inventorization equipments template

  // check inventorization equipments
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
            description: <TableRowsErrors errors={error.data as TableRowsApiErrors} />,
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
  // check inventorization equipments

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

  const [updateInventorizationEquipmentMutation] = useUpdateInventorizationEquipment()

  const [createEquipmentMutation, { isLoading: createEquipmentIsLoading }] = useCreateEquipment()

  const [createAttachment, { isLoading: createAttachmentIsLoading }] = useCreateAttachment()
  const [deleteAttachment, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

  const { currentData: nomenclaturesResponse, isFetching: nomenclaturesIsFetching } =
    useGetNomenclatures(
      categoryIsConsumable
        ? { ...defaultGetNomenclaturesParams, equipmentHasSerialNumber: false }
        : defaultGetNomenclaturesParams,
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

  const { currentData: workTypes = [], isFetching: workTypesIsFetching } = useGetWorkTypes(
    undefined,
    {
      skip:
        (!createEquipmentModalOpened && !editCheckedInventorizationEquipmentModalOpened) ||
        !selectedCategory ||
        !selectedNomenclatureId,
    },
  )

  const { currentData: currencies = [], isFetching: currenciesIsFetching } = useGetCurrencyList(
    undefined,
    { skip: !createEquipmentModalOpened && !editCheckedInventorizationEquipmentModalOpened },
  )

  const [getCustomers, { data: customers = [], isFetching: customersIsFetching }] =
    useLazyGetCustomerList()

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

  const { currentData: macroregions = [], isFetching: macroregionsIsFetching } = useGetMacroregions(
    { customers: [selectedOwnerId!] },
    { skip: !selectedOwnerId },
  )

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

  const getEquipmentCatalogQueryArgs = useMemo<GetEquipmentsCatalogQueryArgs>(
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
    useGetEquipmentsCatalog(getEquipmentCatalogQueryArgs, {
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
        console.error('Error while downloading inventorization equipments template')
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
        quantityFact: values.quantity,
        purpose: workTypes.find((w) => w.id === values.purpose),
        nomenclature: nomenclatures.find((n) => n.id === values.nomenclature),
        category: equipmentCategories.find((c) => c.id === values.category),
        currency: values.currency ? currencies.find((c) => c.id === values.currency) : undefined,
        owner: values.owner ? customers.find((c) => c.id === values.owner) : undefined,
        macroregion: values.macroregion
          ? macroregions.find((m) => m.id === values.macroregion)
          : undefined,
        locationFact: values.location ? locations.find((l) => l.id === values.location) : undefined,
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
            <Space>
              {permissions.inventorizationUpdate &&
                inventorizationExecutorIsCurrentUser &&
                (checkInventorizationStatusIsNew(inventorization.status) ||
                  checkInventorizationStatusIsInProgress(inventorization.status)) && (
                  <>
                    <Dropdown.Button
                      menu={{ items: [] }}
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
            okText={SAVE_TEXT}
            onCancel={debouncedOnCloseEditCheckedInventorizationEquipmentModal}
            onSubmit={onEditCheckedInventorizationEquipment}
            initialValues={getEquipmentFormInitialValues({
              category: editableCheckedInventorizationEquipment.category,
              nomenclature: editableCheckedInventorizationEquipment.nomenclature,
              inventoryNumber: editableCheckedInventorizationEquipment.inventoryNumber,
              serialNumber: editableCheckedInventorizationEquipment.serialNumber,
              condition: editableCheckedInventorizationEquipment.condition,
              comment: editableCheckedInventorizationEquipment.comment,
              owner: editableCheckedInventorizationEquipment.owner,
              price: editableCheckedInventorizationEquipment.price,
              usageCounter: editableCheckedInventorizationEquipment.usageCounter,
              quantity: editableCheckedInventorizationEquipment.quantityFact,
              currency: editableCheckedInventorizationEquipment.currency,
              isNew: editableCheckedInventorizationEquipment.isNew,
              isRepaired: editableCheckedInventorizationEquipment.isRepaired,
              isWarranty: editableCheckedInventorizationEquipment.isWarranty,
              purpose: editableCheckedInventorizationEquipment.purpose,
              location: editableCheckedInventorizationEquipment.locationFact,
              macroregion: editableCheckedInventorizationEquipment.macroregion,
            })}
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
