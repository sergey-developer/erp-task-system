import { useBoolean, usePrevious } from 'ahooks'
import { Button, Col, Form, FormProps, Modal, Row, Typography, Upload, UploadProps } from 'antd'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import stubFalse from 'lodash/stubFalse'
import moment from 'moment-timezone'
import { NamePath } from 'rc-field-form/es/interface'
import React, { FC, Key, useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { AttachmentTypeEnum } from 'modules/attachment/constants'
import { useCreateAttachment, useDeleteAttachment } from 'modules/attachment/hooks'
import { useAuthUser } from 'modules/auth/hooks'
import { UserGroupCategoryEnum, UserPermissionsEnum } from 'modules/user/constants'
import { useGetUsers, useGetUsersGroups, useUserPermissions } from 'modules/user/hooks'
import { CreateEquipmentsByFileModalProps } from 'modules/warehouse/components/CreateEquipmentsByFileModal'
import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'
import { EquipmentByFileTableRow } from 'modules/warehouse/components/EquipmentsByFileTable/types'
import RelocationEquipmentEditableTable from 'modules/warehouse/components/RelocationEquipmentEditableTable'
import {
  ActiveEquipmentRow,
  RelocationEquipmentRow,
} from 'modules/warehouse/components/RelocationEquipmentEditableTable/types'
import RelocationTaskForm from 'modules/warehouse/components/RelocationTaskForm'
import {
  LocationOption,
  RelocationTaskFormProps,
  UserGroupOptionGroup,
} from 'modules/warehouse/components/RelocationTaskForm/types'
import { makeUserGroupOptions } from 'modules/warehouse/components/RelocationTaskForm/utils'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { defaultGetNomenclatureListParams } from 'modules/warehouse/constants/nomenclature'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { WarehouseTypeEnum } from 'modules/warehouse/constants/warehouse'
import { useLazyGetCustomerList } from 'modules/warehouse/hooks/customer'
import {
  useCreateEquipment,
  useCreateEquipments,
  useGetEquipmentCategories,
  useGetEquipmentsCatalog,
  useImportEquipmentsByFile,
  useLazyGetEquipment,
  useLazyGetEquipmentListTemplate,
} from 'modules/warehouse/hooks/equipment'
import { useGetNomenclature, useGetNomenclatureList } from 'modules/warehouse/hooks/nomenclature'
import { useCreateRelocationTask } from 'modules/warehouse/hooks/relocationTask'
import { useGetWarehouse } from 'modules/warehouse/hooks/warehouse'
import { useGetWorkTypes } from 'modules/warehouse/hooks/workType'
import {
  CreateEquipmentsBadRequestErrorResponse,
  EquipmentCategoryListItemModel,
} from 'modules/warehouse/models'
import { RelocationTaskFormFields } from 'modules/warehouse/types'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'
import {
  checkRelocationTaskTypeIsEnteringBalances,
  checkRelocationTaskTypeIsWriteOff,
  makeRelocationTasksPageLink,
} from 'modules/warehouse/utils/relocationTask'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { SAVE_TEXT } from 'shared/constants/common'
import { useLazyGetLocationsCatalog } from 'shared/hooks/catalogs/locations'
import { useGetCurrencyList } from 'shared/hooks/currency'
import { useGetMacroregions } from 'shared/hooks/macroregion'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { FileToSend } from 'shared/types/file'
import { checkLocationTypeIsWarehouse } from 'shared/utils/catalogs/location/checkLocationType'
import { extractLocationState } from 'shared/utils/common'
import { mergeDateTime } from 'shared/utils/date'
import { extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { extractPaginationResults } from 'shared/utils/pagination'

import {
  checkCreateEquipmentBtnEnabled,
  getEquipmentFormInitialValues,
  getEquipmentsCatalogParams,
  getRelocateFromLocationsParams,
  getRelocateToLocationsParams,
} from './utils'

const CreateEquipmentsByFileModal = React.lazy(
  () => import('modules/warehouse/components/CreateEquipmentsByFileModal'),
)

const CreateAttachmentListModal = React.lazy(
  () => import('modules/attachment/components/CreateAttachmentListModal'),
)

const EquipmentFormModal = React.lazy(
  () => import('modules/warehouse/components/EquipmentFormModal'),
)

const { Text } = Typography

const equipmentTableNamePath = 'equipments'
const deadlineAtDate = moment().add(24, 'hours')

const initialValues: Pick<
  RelocationTaskFormFields,
  'equipments' | 'equipmentsByFile' | 'type' | 'deadlineAtDate' | 'deadlineAtTime'
> = {
  type: RelocationTaskTypeEnum.Relocation,
  [equipmentTableNamePath]: [],
  equipmentsByFile: [],
  deadlineAtDate,
  deadlineAtTime: deadlineAtDate.clone(),
}

const CreateRelocationTaskPage: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const authUser = useAuthUser()
  const permissions = useUserPermissions([
    UserPermissionsEnum.EquipmentsCreate,
    UserPermissionsEnum.EnteringBalances,
  ])

  const [form] = Form.useForm<RelocationTaskFormFields>()

  const [activeEquipmentRow, setActiveEquipmentRow] = useState<ActiveEquipmentRow>()

  const [selectedOwnerId, setSelectedOwnerId] = useState<IdType>()

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<IdType>()
  const [
    userChangedNomenclature,
    { setTrue: setUserChangedNomenclature, setFalse: resetUserChangedNomenclature },
  ] = useBoolean(false)

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  const categoryIsConsumable = checkEquipmentCategoryIsConsumable(selectedCategory?.code)

  const [createEquipmentsErrors, setCreateEquipmentsErrors] =
    useState<CreateEquipmentsBadRequestErrorResponse>()

  const [editableEquipmentByFile, setEditableEquipmentByFile] = useState<EquipmentByFileTableRow>()
  const [editableEquipmentByFileIndex, setEditableEquipmentByFileIndex] = useState<number>()

  const [
    createEquipmentsByFileModalOpened,
    { setTrue: openCreateEquipmentsByFileModal, setFalse: closeCreateEquipmentsByFileModal },
  ] = useBoolean(false)

  const handleCloseCreateEquipmentsByFileModal = useDebounceFn(() => {
    setCreateEquipmentsErrors(undefined)
    closeCreateEquipmentsByFileModal()
    form.setFieldValue('equipmentsByFile', [])
  })

  const [
    createEquipmentModalOpened,
    { setTrue: openCreateEquipmentModal, setFalse: closeCreateEquipmentModal },
  ] = useBoolean(false)

  const handleOpenCreateEquipmentModal = useDebounceFn((row: ActiveEquipmentRow) => {
    setActiveEquipmentRow(row)
    openCreateEquipmentModal()
  })

  const handleCloseCreateEquipmentModal = useDebounceFn(() => {
    closeCreateEquipmentModal()
    setSelectedNomenclatureId(undefined)
    resetUserChangedNomenclature()
    setSelectedCategory(undefined)
    setSelectedOwnerId(undefined)
    setActiveEquipmentRow(undefined)
  })

  const [
    editEquipmentByFileModalOpened,
    { setTrue: openEditEquipmentByFileModal, setFalse: closeEditEquipmentByFileModal },
  ] = useBoolean(false)

  const handleOpenEditEquipmentByFileModal = useDebounceFn<
    CreateEquipmentsByFileModalProps['onEdit']
  >((row: EquipmentByFileTableRow, index) => {
    setEditableEquipmentByFile(row)
    setEditableEquipmentByFileIndex(index)
    row.category && setSelectedCategory(row.category)
    row.nomenclature && setSelectedNomenclatureId(row.nomenclature.id)
    openEditEquipmentByFileModal()
  })

  const handleCloseEditEquipmentByFileModal = useDebounceFn(() => {
    setEditableEquipmentByFile(undefined)
    setEditableEquipmentByFileIndex(undefined)
    setSelectedCategory(undefined)
    setSelectedNomenclatureId(undefined)
    setSelectedOwnerId(undefined)
    resetUserChangedNomenclature()
    closeEditEquipmentByFileModal()
  })

  const [
    createRelocationEquipmentImagesModalOpened,
    {
      setTrue: openCreateRelocationEquipmentImagesModal,
      setFalse: closeCreateRelocationEquipmentImagesModal,
    },
  ] = useBoolean(false)

  const handleOpenCreateRelocationEquipmentImagesModal = useDebounceFn(
    (row: ActiveEquipmentRow) => {
      setActiveEquipmentRow(row)
      openCreateRelocationEquipmentImagesModal()
    },
  )

  const handleCloseCreateRelocationEquipmentImagesModal = useDebounceFn(() => {
    closeCreateRelocationEquipmentImagesModal()
    setActiveEquipmentRow(undefined)
  })

  const [confirmModalOpened, { toggle: toggleConfirmModal }] = useBoolean(false)

  const [editableTableRowKeys, setEditableTableRowKeys] = useState<Key[]>([])

  const [selectedType, setSelectedType] = useState<RelocationTaskFormFields['type']>(
    RelocationTaskTypeEnum.Relocation,
  )
  const typeIsWriteOff = checkRelocationTaskTypeIsWriteOff(selectedType)
  const typeIsEnteringBalances = checkRelocationTaskTypeIsEnteringBalances(selectedType)

  const [selectedRelocateTo, setSelectedRelocateTo] = useState<LocationOption>()
  const [selectedRelocateFrom, setSelectedRelocateFrom] = useState<LocationOption>()
  const prevSelectedRelocateFrom = usePrevious(selectedRelocateFrom)

  const { currentData: relocateToWarehouse, isFetching: relocateToWarehouseIsFetching } =
    useGetWarehouse(selectedRelocateTo?.value!, {
      skip:
        !selectedRelocateTo ||
        !selectedRelocateFrom ||
        !checkLocationTypeIsWarehouse(selectedRelocateTo.type),
    })

  const { currentData: relocateFromWarehouse, isFetching: relocateFromWarehouseIsFetching } =
    useGetWarehouse(selectedRelocateFrom?.value!, {
      skip:
        !selectedRelocateFrom ||
        !selectedRelocateTo ||
        !checkLocationTypeIsWarehouse(selectedRelocateFrom.type),
    })

  const { currentData: executors = [], isFetching: executorsIsFetching } = useGetUsers({
    isManager: false,
  })

  const { currentData: controllers = [], isFetching: controllersIsFetching } = useGetUsers({
    isManager: false,
    // permissions: [UserPermissionsEnum.ControlRelocationTask],
  })

  const { currentData: executorsUsersGroups = [], isFetching: executorsUsersGroupsIsFetching } =
    useGetUsersGroups()
  // useGetUsersGroups({ category: UserGroupCategoryEnum.ExecuteRelocation })

  const { currentData: controllersUsersGroups = [], isFetching: controllersUsersGroupsIsFetching } =
    useGetUsersGroups({ category: UserGroupCategoryEnum.ControlRelocation })

  const [
    getRelocateFromLocations,
    { currentData: relocateFromLocations = [], isFetching: relocateFromLocationsIsFetching },
  ] = useLazyGetLocationsCatalog()

  const [
    getRelocateToLocations,
    { currentData: relocateToLocations = [], isFetching: relocateToLocationsIsFetching },
  ] = useLazyGetLocationsCatalog()

  /* сделано через lazy т.к. по каким-то причинам запрос не отправляется снова если один из параметров не изменился */
  useEffect(() => {
    getRelocateFromLocations(getRelocateFromLocationsParams(selectedType))
  }, [getRelocateFromLocations, selectedType])

  useEffect(() => {
    if (!typeIsWriteOff) {
      getRelocateToLocations(getRelocateToLocationsParams(selectedType))
    }
  }, [getRelocateToLocations, selectedType, typeIsWriteOff])

  const { currentData: currencies = [], isFetching: currenciesIsFetching } = useGetCurrencyList()

  const { currentData: equipmentsCatalog = [], isFetching: equipmentsCatalogIsFetching } =
    useGetEquipmentsCatalog(
      {
        locationId: selectedRelocateFrom?.value || selectedRelocateTo?.value,
        ...getEquipmentsCatalogParams(selectedType),
      },
      { skip: !selectedRelocateFrom?.value && !selectedRelocateTo?.value },
    )

  const [getEquipment, { isFetching: equipmentIsFetching }] = useLazyGetEquipment()

  const { currentData: equipmentCategoryList = [], isFetching: equipmentCategoryListIsFetching } =
    useGetEquipmentCategories(undefined, {
      skip: !createEquipmentModalOpened && !editEquipmentByFileModalOpened,
    })

  const { currentData: workTypeList = [], isFetching: workTypeListIsFetching } = useGetWorkTypes(
    undefined,
    {
      skip:
        (!createEquipmentModalOpened && !editEquipmentByFileModalOpened) ||
        !selectedCategory ||
        !selectedNomenclatureId,
    },
  )

  const { currentData: nomenclatureList, isFetching: nomenclatureListIsFetching } =
    useGetNomenclatureList(
      categoryIsConsumable
        ? { ...defaultGetNomenclatureListParams, equipmentHasSerialNumber: false }
        : defaultGetNomenclatureListParams,
      {
        skip: (!createEquipmentModalOpened && !editEquipmentByFileModalOpened) || !selectedCategory,
      },
    )

  const { currentData: nomenclature, isFetching: nomenclatureIsFetching } = useGetNomenclature(
    selectedNomenclatureId!,
    {
      skip:
        !selectedNomenclatureId || (!createEquipmentModalOpened && !editEquipmentByFileModalOpened),
    },
  )

  const [getCustomerList, { data: customerList = [], isFetching: customerListIsFetching }] =
    useLazyGetCustomerList()

  useEffect(() => {
    if (
      (createEquipmentModalOpened || editEquipmentByFileModalOpened) &&
      !!selectedCategory &&
      !categoryIsConsumable &&
      !!selectedNomenclatureId
    ) {
      getCustomerList()
    }
  }, [
    createEquipmentModalOpened,
    editEquipmentByFileModalOpened,
    categoryIsConsumable,
    getCustomerList,
    selectedCategory,
    selectedNomenclatureId,
  ])

  const { currentData: macroregions = [], isFetching: macroregionsIsFetching } = useGetMacroregions(
    {
      ...(!!selectedOwnerId && { customers: [selectedOwnerId] }),
      ...(!!selectedRelocateTo?.value && { warehouses: [selectedRelocateTo.value] }),
    },
    { skip: !selectedOwnerId && !selectedRelocateTo?.value },
  )

  const [createAttachment, { isLoading: createAttachmentIsLoading }] = useCreateAttachment()
  const [deleteAttachment, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

  const [createTaskMutation, { isLoading: createTaskIsLoading }] = useCreateRelocationTask()

  const [createEquipmentMutation, { isLoading: createEquipmentIsLoading }] = useCreateEquipment()
  const [createEquipmentsMutation, { isLoading: createEquipmentsIsLoading }] = useCreateEquipments()

  const [
    importEquipmentsByFileMutation,
    { isLoading: importEquipmentsByFileIsLoading, data: importedEquipmentsByFile },
  ] = useImportEquipmentsByFile()

  const [getEquipmentListTemplate, { isFetching: getEquipmentListTemplateIsFetching }] =
    useLazyGetEquipmentListTemplate()

  const createEquipmentImage = useCallback<NonNullable<UploadProps['customRequest']>>(
    async (options) => {
      await createAttachment({ type: AttachmentTypeEnum.EquipmentImage }, options)
    },
    [createAttachment],
  )

  const createRelocationEquipmentImage: NonNullable<UploadProps['customRequest']> = async (
    options,
  ) => {
    await createAttachment({ type: AttachmentTypeEnum.RelocationEquipmentImage }, options)
  }

  const createCommonRelocationEquipmentImage: NonNullable<UploadProps['customRequest']> = async (
    options,
  ) => {
    await createAttachment({ type: AttachmentTypeEnum.RelocationTaskImage }, options)
  }

  const createTask = async (values: RelocationTaskFormFields) => {
    try {
      const createdTask = await createTaskMutation({
        type: values.type,
        deadlineAt: mergeDateTime(values.deadlineAtDate, values.deadlineAtTime).toISOString(),
        equipments: values.equipments.map((eqp) => ({
          id: eqp.id,
          quantity: eqp.quantity,
          condition: eqp.condition,
          currency: eqp.currency,
          price: eqp.price,
          attachments: eqp.attachments?.length
            ? extractIdsFromFilesResponse(eqp.attachments)
            : undefined,
        })),
        relocateToId: values.relocateTo,
        relocateFromId: values.relocateFrom,
        executors: values.executors,
        controller: values.controller,
        comment: values.comment,
        images: values.images?.length ? extractIdsFromFilesResponse(values.images) : undefined,
      }).unwrap()

      const fromPath = extractLocationState(location)?.from

      fromPath
        ? navigate(fromPath)
        : navigate(makeRelocationTasksPageLink({ viewRelocationTask: createdTask.id }))
    } catch (error) {
      if (isErrorResponse(error) && isBadRequestError(error)) {
        form.setFields(getFieldsErrors(error.data))
      }
    }
  }

  const pickEquipment: FormProps<RelocationTaskFormFields>['onValuesChange'] = async (
    changedValues,
    values,
  ) => {
    if (
      changedValues[equipmentTableNamePath] &&
      !Array.isArray(changedValues[equipmentTableNamePath])
    ) {
      const [index, changes] = Object.entries(changedValues[equipmentTableNamePath])[0] as [
        string,
        Partial<RelocationEquipmentRow>,
      ]

      if (changes.id) {
        const equipmentPath: NamePath = [equipmentTableNamePath, index]
        const currentEquipment = values.equipments[Number(index)]

        try {
          const equipment = await getEquipment({ equipmentId: changes.id }).unwrap()
          const isConsumable = checkEquipmentCategoryIsConsumable(equipment.category.code)
          form.setFieldValue(equipmentPath, {
            ...currentEquipment,
            serialNumber: equipment.serialNumber,
            purpose: equipment.purpose.title,
            condition: typeIsWriteOff ? EquipmentConditionEnum.WrittenOff : equipment.condition,
            amount: equipment.amount,
            price: equipment.price,
            currency: equipment.currency?.id,
            quantity: isConsumable ? currentEquipment.quantity : 1,
            category: equipment.category,
          })
        } catch (error) {
          if (isErrorResponse(error) && isForbiddenError(error)) {
            form.setFieldValue(equipmentPath, { rowId: currentEquipment.rowId })
          }
        }
      }
    }
  }

  const importEquipmentsByFile: NonNullable<UploadProps['onChange']> = async ({ file }) => {
    try {
      const equipments = await importEquipmentsByFileMutation({ file: file as FileToSend }).unwrap()
      const equipmentsByFile: Omit<EquipmentByFileTableRow, 'images'>[] = equipments.map((eqp) => ({
        rowId: eqp.rowId,
        nomenclature: eqp.nomenclature || undefined,
        category: eqp.category || undefined,
        purpose: eqp.purpose || undefined,
        currency: eqp.currency || undefined,
        owner: eqp.owner || undefined,
        title: eqp.title || undefined,
        condition: eqp.condition || undefined,
        isNew: isBoolean(eqp.isNew) ? eqp.isNew : undefined,
        isWarranty: isBoolean(eqp.isWarranty) ? eqp.isWarranty : undefined,
        isRepaired: isBoolean(eqp.isRepaired) ? eqp.isRepaired : undefined,
        inventoryNumber: eqp.inventoryNumber || undefined,
        serialNumber: eqp.serialNumber || undefined,
        quantity: isNumber(eqp.quantity) ? eqp.quantity : undefined,
        price: isNumber(eqp.price) ? eqp.price : undefined,
        usageCounter: eqp.usageCounter || undefined,
        comment: eqp.comment || undefined,
      }))

      form.setFieldValue('equipmentsByFile', equipmentsByFile)
      openCreateEquipmentsByFileModal()
    } catch {}
  }

  const createEquipments = useDebounceFn<CreateEquipmentsByFileModalProps['onCreate']>(async () => {
    const equipmentsByFile: EquipmentByFileTableRow[] = form.getFieldValue('equipmentsByFile')
    if (!equipmentsByFile || !selectedRelocateTo) return

    try {
      const createdEquipments = await createEquipmentsMutation(
        equipmentsByFile.map(({ rowId, ...eqp }) => ({
          ...eqp,
          location: selectedRelocateFrom?.value || selectedRelocateTo.value,
          warehouse: selectedRelocateTo.value,
          nomenclature: eqp.nomenclature?.id,
          category: eqp.category?.id,
          currency: eqp.currency?.id,
          owner: eqp.owner?.id,
          macroregion: eqp.macroregion?.id,
          purpose: eqp.purpose?.id,
          images: eqp.images?.length ? extractIdsFromFilesResponse(eqp.images) : undefined,
        })),
      ).unwrap()

      const currentEquipments: RelocationEquipmentRow[] = form.getFieldValue(equipmentTableNamePath)
      const newEquipments: RelocationEquipmentRow[] = []
      const newEditableTableRowKeys: Key[] = []

      createdEquipments.forEach((eqp) => {
        newEquipments.push({
          rowId: eqp.id,
          id: eqp.id,
          serialNumber: eqp.serialNumber || undefined,
          price: isNumber(eqp.price) ? eqp.price : undefined,
          quantity: eqp.quantity,
          condition: eqp.condition,
          purpose: eqp.purpose.title,
          currency: eqp.currency?.id,
          category: eqp.category,
          amount: eqp.availableQuantity,
          attachments: [],
        })

        newEditableTableRowKeys.push(eqp.id)
      })

      form.setFieldValue(equipmentTableNamePath, [...currentEquipments, ...newEquipments])
      setEditableTableRowKeys((prevState) => prevState.concat(newEditableTableRowKeys))
      handleCloseCreateEquipmentsByFileModal()
    } catch (error) {
      if (isErrorResponse(error) && isBadRequestError(error) && error.data.errorList) {
        const errors = error.data.errorList as CreateEquipmentsBadRequestErrorResponse
        setCreateEquipmentsErrors(errors)
      }
    }
  }, [
    createEquipmentsMutation,
    form,
    handleCloseCreateEquipmentsByFileModal,
    selectedRelocateFrom,
    selectedRelocateTo,
  ])

  const createEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
    async ({ images, ...values }, setFields) => {
      if (!activeEquipmentRow || !selectedRelocateTo) return

      try {
        const createdEquipment = await createEquipmentMutation({
          ...values,
          images: images?.length ? extractIdsFromFilesResponse(images) : undefined,
          location: selectedRelocateFrom?.value || selectedRelocateTo.value,
          warehouse: selectedRelocateTo.value,
        }).unwrap()

        const rowPath = [equipmentTableNamePath, activeEquipmentRow.rowIndex]
        const currentRow: RelocationEquipmentRow = form.getFieldValue(rowPath)
        const equipmentRow: RelocationEquipmentRow = {
          rowId: currentRow.rowId,
          id: createdEquipment.id,
          serialNumber: createdEquipment.serialNumber || undefined,
          purpose: createdEquipment.purpose.title,
          condition: typeIsWriteOff
            ? EquipmentConditionEnum.WrittenOff
            : createdEquipment.condition,
          amount: createdEquipment.availableQuantity,
          price: isNumber(createdEquipment.price) ? createdEquipment.price : undefined,
          currency: createdEquipment.currency?.id,
          quantity: isNumber(createdEquipment.quantity) ? createdEquipment.quantity : undefined,
          category: createdEquipment.category,
        }

        form.setFieldValue(rowPath, equipmentRow)
        handleCloseCreateEquipmentModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [
      activeEquipmentRow,
      selectedRelocateTo,
      selectedRelocateFrom,
      createEquipmentMutation,
      form,
      typeIsWriteOff,
      handleCloseCreateEquipmentModal,
    ],
  )

  const editEquipmentByFile: EquipmentFormModalProps['onSubmit'] = useCallback(
    (values) => {
      if (!editableEquipmentByFile || !isNumber(editableEquipmentByFileIndex)) return

      const equipmentPath = ['equipmentsByFile', editableEquipmentByFileIndex]
      const updatableEquipmentByFile: EquipmentByFileTableRow = {
        ...values,
        rowId: editableEquipmentByFile.rowId,
        category: equipmentCategoryList.find((c) => c.id === values.category),
        currency: values.currency ? currencies.find((c) => c.id === values.currency) : undefined,
        owner: values.owner ? customerList.find((c) => c.id === values.owner) : undefined,
        macroregion: values.macroregion
          ? macroregions.find((m) => m.id === values.macroregion)
          : undefined,
        purpose: workTypeList.find((w) => w.id === values.purpose),
        nomenclature: nomenclature
          ? {
              id: nomenclature.id,
              title: nomenclature.title,
              measurementUnit: nomenclature.measurementUnit.title,
              equipmentHasSerialNumber: nomenclature.equipmentHasSerialNumber,
            }
          : undefined,
      }

      setCreateEquipmentsErrors((prevState) => {
        if (prevState) {
          const newState = [...prevState]
          newState[editableEquipmentByFileIndex] = {}
          return newState
        }

        return prevState
      })
      form.setFieldValue(equipmentPath, updatableEquipmentByFile)
      handleCloseEditEquipmentByFileModal()
    },
    [
      currencies,
      customerList,
      editableEquipmentByFile,
      editableEquipmentByFileIndex,
      equipmentCategoryList,
      form,
      handleCloseEditEquipmentByFileModal,
      macroregions,
      nomenclature,
      workTypeList,
    ],
  )

  const handleChangeCategory = useCallback<EquipmentFormModalProps['onChangeCategory']>(
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

  const handleChangeRelocateFrom = useCallback<RelocationTaskFormProps['onChangeRelocateFrom']>(
    (value, option) => {
      const equipments: RelocationEquipmentRow[] = form.getFieldValue(equipmentTableNamePath) || []
      const relocateFrom = form.getFieldValue('relocateFrom')
      const isShowConfirmation = !!equipments.length && !!relocateFrom
      form.setFieldValue('relocateFrom', value)
      setSelectedRelocateFrom(option)
      if (isShowConfirmation) toggleConfirmModal()
    },
    [form, toggleConfirmModal],
  )

  const handleChangeType = useCallback<RelocationTaskFormProps['onChangeType']>(
    (value) => {
      setSelectedType(value)

      if (checkRelocationTaskTypeIsEnteringBalances(value)) {
        const relocateFromValue = undefined
        form.setFieldValue('relocateFrom', relocateFromValue)
        setSelectedRelocateFrom(relocateFromValue)
      }

      if (checkRelocationTaskTypeIsWriteOff(value)) {
        const relocateToValue = undefined
        form.setFieldValue('relocateTo', relocateToValue)
        setSelectedRelocateTo(relocateToValue)

        const equipments: RelocationEquipmentRow[] =
          form.getFieldValue(equipmentTableNamePath) || []
        const newEquipments = equipments.map((eqp) => ({
          ...eqp,
          condition: EquipmentConditionEnum.WrittenOff,
        }))
        form.setFieldValue(equipmentTableNamePath, newEquipments)
      }
    },
    [form],
  )

  /* Установка значений формы */
  useEffect(() => {
    if (authUser && executors.length) {
      form.setFieldsValue({ executors: [authUser.id] })
    }
  }, [form, authUser, executors.length])

  const isRelocationFromMainToMsi =
    relocateFromWarehouse?.type === WarehouseTypeEnum.Main &&
    relocateToWarehouse?.type === WarehouseTypeEnum.Msi

  const controllerIsRequired =
    relocateToWarehouse && relocateFromWarehouse ? !isRelocationFromMainToMsi : true

  const createEquipmentBtnEnabled = checkCreateEquipmentBtnEnabled(
    typeIsEnteringBalances,
    selectedRelocateFrom,
    selectedRelocateTo,
  )

  const equipmentImagesFormPath =
    createRelocationEquipmentImagesModalOpened && activeEquipmentRow
      ? [equipmentTableNamePath, activeEquipmentRow.rowIndex, 'attachments']
      : undefined

  const createEquipmentFormValues = useMemo(
    () =>
      createEquipmentModalOpened ? { title: nomenclature ? nomenclature.title : '' } : undefined,
    [createEquipmentModalOpened, nomenclature],
  )

  const equipmentByFileFormValues = useMemo(
    () =>
      editEquipmentByFileModalOpened
        ? {
            title: userChangedNomenclature ? nomenclature?.title : editableEquipmentByFile?.title,
            images: isNumber(editableEquipmentByFileIndex)
              ? form.getFieldValue(['equipmentsByFile', editableEquipmentByFileIndex, 'images'])
              : undefined,
          }
        : undefined,
    [
      editEquipmentByFileModalOpened,
      editableEquipmentByFile?.title,
      editableEquipmentByFileIndex,
      form,
      nomenclature?.title,
      userChangedNomenclature,
    ],
  )

  const executorsOptions: UserGroupOptionGroup[] = useMemo(() => {
    return makeUserGroupOptions(executors, executorsUsersGroups)
  }, [executors, executorsUsersGroups])

  const controllersOptions: UserGroupOptionGroup[] = useMemo(() => {
    return authUser ? makeUserGroupOptions(controllers, controllersUsersGroups, [authUser.id]) : []
  }, [authUser, controllers, controllersUsersGroups])

  return (
    <>
      <Form<RelocationTaskFormFields>
        data-testid='create-relocation-task-page'
        form={form}
        layout='vertical'
        onFinish={createTask}
        onValuesChange={pickEquipment}
        initialValues={initialValues}
      >
        <Row gutter={[40, 40]}>
          <Col span={24}>
            <RelocationTaskForm
              permissions={permissions}
              isLoading={createTaskIsLoading}
              relocateFromLocations={relocateFromLocations}
              relocateFromLocationsIsLoading={relocateFromLocationsIsFetching}
              relocateToLocations={relocateToLocations}
              relocateToLocationsIsLoading={relocateToLocationsIsFetching}
              executorsOptions={executorsOptions}
              executorsIsLoading={executorsIsFetching || executorsUsersGroupsIsFetching}
              controllersOptions={controllersOptions}
              controllersIsLoading={controllersIsFetching || controllersUsersGroupsIsFetching}
              controllerIsRequired={controllerIsRequired}
              type={selectedType}
              onChangeType={handleChangeType}
              onChangeRelocateFrom={handleChangeRelocateFrom}
              onChangeRelocateTo={setSelectedRelocateTo}
              onUploadImage={createCommonRelocationEquipmentImage}
              imageIsUploading={createAttachmentIsLoading}
              onDeleteImage={deleteAttachment}
              imageIsDeleting={deleteAttachmentIsLoading}
            />
          </Col>

          <Col span={24}>
            <Space $block direction='vertical' size='middle'>
              <Row justify='space-between' align='middle'>
                <Col>
                  <Text strong>Перечень оборудования</Text>
                </Col>

                {permissions.equipmentsCreate && (
                  <Col>
                    <Space>
                      <Upload
                        data-testid='add-from-excel-upload'
                        showUploadList={false}
                        beforeUpload={stubFalse}
                        fileList={[]}
                        onChange={importEquipmentsByFile}
                      >
                        <Button
                          disabled={!createEquipmentBtnEnabled}
                          loading={importEquipmentsByFileIsLoading}
                        >
                          Добавить из Excel
                        </Button>
                      </Upload>

                      <Button
                        onClick={getEquipmentListTemplate}
                        loading={getEquipmentListTemplateIsFetching}
                      >
                        Скачать шаблон
                      </Button>
                    </Space>
                  </Col>
                )}
              </Row>

              <RelocationEquipmentEditableTable
                name={equipmentTableNamePath}
                editableKeys={editableTableRowKeys}
                setEditableKeys={setEditableTableRowKeys}
                isLoading={createTaskIsLoading}
                equipmentIsLoading={equipmentIsFetching}
                currencies={currencies}
                currenciesIsLoading={currenciesIsFetching}
                equipments={equipmentsCatalog}
                equipmentsIsLoading={equipmentsCatalogIsFetching}
                canCreateEquipment={!!permissions.equipmentsCreate}
                createEquipmentBtnDisabled={!createEquipmentBtnEnabled}
                onClickCreateEquipment={handleOpenCreateEquipmentModal}
                onClickCreateImage={handleOpenCreateRelocationEquipmentImagesModal}
              />
            </Space>
          </Col>

          <Col span={24}>
            <Row justify='end' gutter={8}>
              <Col>
                <Button>
                  <Link to={WarehouseRouteEnum.RelocationTasks}>Отменить</Link>
                </Button>
              </Col>

              <Col>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={createTaskIsLoading}
                  disabled={relocateFromWarehouseIsFetching || relocateToWarehouseIsFetching}
                >
                  Создать заявку
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

      <Modal
        title='Перечень перемещаемого оборудования будет очищен'
        open={confirmModalOpened}
        onCancel={() => {
          if (prevSelectedRelocateFrom) {
            toggleConfirmModal()
            form.setFieldValue('relocateFrom', prevSelectedRelocateFrom.value)
            setSelectedRelocateFrom(prevSelectedRelocateFrom)
          }
        }}
        onOk={() => {
          toggleConfirmModal()
          form.setFieldValue(equipmentTableNamePath, [])
        }}
      >
        <Text>Вы действительно хотите сменить объект выбытия?</Text>
      </Modal>

      {createEquipmentModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={handleCloseCreateEquipmentModal}
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
            categories={equipmentCategoryList}
            categoriesIsLoading={equipmentCategoryListIsFetching}
            category={selectedCategory}
            onChangeCategory={handleChangeCategory}
            currencies={currencies}
            currenciesIsLoading={currenciesIsFetching}
            owners={customerList}
            ownersIsLoading={customerListIsFetching}
            onChangeOwner={setSelectedOwnerId}
            macroregions={macroregions}
            macroregionsIsLoading={macroregionsIsFetching}
            workTypes={workTypeList}
            workTypesIsLoading={workTypeListIsFetching}
            nomenclature={nomenclature}
            nomenclatureIsLoading={nomenclatureIsFetching}
            nomenclatures={extractPaginationResults(nomenclatureList)}
            nomenclaturesIsLoading={nomenclatureListIsFetching}
            onChangeNomenclature={onChangeNomenclature}
            onCancel={handleCloseCreateEquipmentModal}
            onSubmit={createEquipment}
            onUploadImage={createEquipmentImage}
            imageIsUploading={createAttachmentIsLoading}
            onDeleteImage={deleteAttachment}
            imageIsDeleting={deleteAttachmentIsLoading}
          />
        </React.Suspense>
      )}

      {editEquipmentByFileModalOpened && (
        <React.Suspense
          fallback={<ModalFallback open onCancel={handleCloseEditEquipmentByFileModal} />}
        >
          <EquipmentFormModal
            open={editEquipmentByFileModalOpened}
            mode='create'
            title='Изменить добавляемое оборудование'
            okText={SAVE_TEXT}
            initialValues={getEquipmentFormInitialValues(editableEquipmentByFile)}
            values={equipmentByFileFormValues}
            categories={equipmentCategoryList}
            categoriesIsLoading={equipmentCategoryListIsFetching}
            category={selectedCategory}
            onChangeCategory={handleChangeCategory}
            currencies={currencies}
            currenciesIsLoading={currenciesIsFetching}
            owners={customerList}
            ownersIsLoading={customerListIsFetching}
            onChangeOwner={setSelectedOwnerId}
            macroregions={macroregions}
            macroregionsIsLoading={macroregionsIsFetching}
            workTypes={workTypeList}
            workTypesIsLoading={workTypeListIsFetching}
            nomenclature={nomenclature}
            nomenclatureIsLoading={nomenclatureIsFetching}
            nomenclatures={extractPaginationResults(nomenclatureList)}
            nomenclaturesIsLoading={nomenclatureListIsFetching}
            onChangeNomenclature={onChangeNomenclature}
            onCancel={handleCloseEditEquipmentByFileModal}
            onSubmit={editEquipmentByFile}
            onUploadImage={createEquipmentImage}
            imageIsUploading={createAttachmentIsLoading}
            onDeleteImage={deleteAttachment}
            imageIsDeleting={deleteAttachmentIsLoading}
            errors={
              createEquipmentsErrors && isNumber(editableEquipmentByFileIndex)
                ? createEquipmentsErrors[editableEquipmentByFileIndex]
                : undefined
            }
          />
        </React.Suspense>
      )}

      {createRelocationEquipmentImagesModalOpened && activeEquipmentRow && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={handleCloseCreateRelocationEquipmentImagesModal}
              tip='Загрузка модалки добавления изображений оборудования'
            />
          }
        >
          <CreateAttachmentListModal
            form={form}
            formItemName={equipmentImagesFormPath}
            open={createRelocationEquipmentImagesModalOpened}
            title='Добавить изображения оборудования'
            onCancel={handleCloseCreateRelocationEquipmentImagesModal}
            onCreate={createRelocationEquipmentImage}
            onDelete={deleteAttachment}
            isDeleting={deleteAttachmentIsLoading}
            defaultFileList={form.getFieldValue(equipmentImagesFormPath)}
          />
        </React.Suspense>
      )}

      {createEquipmentsByFileModalOpened && importedEquipmentsByFile && (
        <React.Suspense
          fallback={<ModalFallback open onCancel={handleCloseCreateEquipmentsByFileModal} />}
        >
          <CreateEquipmentsByFileModal
            open={createEquipmentsByFileModalOpened}
            onCancel={handleCloseCreateEquipmentsByFileModal}
            onCreate={createEquipments}
            isCreating={createEquipmentsIsLoading}
            data={(form.getFieldValue('equipmentsByFile') || []) as EquipmentByFileTableRow[]}
            errors={createEquipmentsErrors}
            onEdit={handleOpenEditEquipmentByFileModal}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default CreateRelocationTaskPage
