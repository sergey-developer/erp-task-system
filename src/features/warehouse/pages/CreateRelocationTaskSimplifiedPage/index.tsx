import { useBoolean } from 'ahooks'
import {
  Button,
  Col,
  Form,
  FormProps,
  Input,
  Row,
  Select,
  Typography,
  Upload,
  UploadProps,
} from 'antd'
import { AttachmentTypeEnum } from 'features/attachments/api/constants'
import { renderUploadedFile } from 'features/attachments/helpers'
import { useCreateAttachment, useDeleteAttachment } from 'features/attachments/hooks'
import { useAuthUser } from 'features/auth/hooks'
import { getTaskCompleteAtDate } from 'features/task/components/TaskDetails/MainDetails/utils'
import { TaskModel } from 'features/task/models'
import { getOlaStatusTextType } from 'features/task/utils/task'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { useGetUsers, useGetWarehouseMSI, useUserPermissions } from 'features/users/hooks'
import { CreateEquipmentsByFileModalProps } from 'features/warehouse/components/CreateEquipmentsByFileModal'
import { EquipmentFormModalProps } from 'features/warehouse/components/EquipmentFormModal/types'
import { EquipmentByFileTableRow } from 'features/warehouse/components/EquipmentsByFileTable/types'
import RelocationEquipmentSimplifiedEditableTable from 'features/warehouse/components/RelocationEquipmentSimplifiedEditableTable'
import {
  ActiveEquipmentRow,
  RelocationEquipmentRow,
} from 'features/warehouse/components/RelocationEquipmentSimplifiedEditableTable/types'
import { defaultGetNomenclaturesParams } from 'features/warehouse/constants/nomenclature'
import {
  useCreateEquipment,
  useCreateEquipments,
  useGetEquipmentCategories,
  useGetEquipmentsCatalog,
  useImportEquipmentsByFile,
  useLazyGetEquipment,
  useLazyGetEquipmentsTemplate,
} from 'features/warehouse/hooks/equipment'
import { useGetNomenclature, useGetNomenclatures } from 'features/warehouse/hooks/nomenclature'
import { useCreateRelocationTaskITSM } from 'features/warehouse/hooks/relocationTask'
import { useGetWorkTypes } from 'features/warehouse/hooks/workType'
import { EquipmentCategoryListItemModel } from 'features/warehouse/models'
import { SimplifiedRelocationTaskFormFields } from 'features/warehouse/types'
import { checkEquipmentCategoryIsConsumable } from 'features/warehouse/utils/equipment'
import get from 'lodash/get'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import stubFalse from 'lodash/stubFalse'
import { NamePath } from 'rc-field-form/es/interface'
import React, { FC, Key, useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import UploadButton from 'components/Buttons/UploadButton'
import ModalFallback from 'components/Modals/ModalFallback'
import SeparatedText from 'components/SeparatedText'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import { isBadRequestError, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { useLazyGetCustomersCatalog } from 'shared/catalogs/customers/hooks'
import { useGetCurrenciesCatalog } from 'shared/catalogs/hooks/currencies'
import { useGetMacroregionsCatalog } from 'shared/catalogs/hooks/macroregions'
import { CANCEL_TEXT, CREATE_TEXT, SAVE_TEXT } from 'shared/constants/common'
import { filesFormItemProps } from 'shared/constants/form'
import { idAndFullNameSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { FileToSend } from 'shared/types/file'
import { MaybeUndefined } from 'shared/types/utils'
import { filterOptionBy, valueOr } from 'shared/utils/common'
import { extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { extractPaginationResults } from 'shared/utils/pagination'

import { getEquipmentFormInitialValues } from '../CreateRelocationTaskPage/utils'

const CreateEquipmentsByFileModal = React.lazy(
  () => import('features/warehouse/components/CreateEquipmentsByFileModal'),
)

const CreateAttachmentsModal = React.lazy(
  () => import('features/attachments/components/CreateAttachmentsModal'),
)

const EquipmentFormModal = React.lazy(
  () => import('features/warehouse/components/EquipmentFormModal'),
)

const { Text } = Typography
const { TextArea } = Input

const initialValues: Pick<
  SimplifiedRelocationTaskFormFields,
  'equipmentsToShop' | 'equipmentsToWarehouse' | 'equipmentsToWarehouseByFile'
> = {
  equipmentsToShop: [],
  equipmentsToWarehouse: [],
  equipmentsToWarehouseByFile: [],
}

const CreateRelocationTaskSimplifiedPage: FC = () => {
  const location = useLocation()
  const fromPath = get(location, 'state.from', '')

  const task: MaybeUndefined<
    Pick<
      TaskModel,
      | 'id'
      | 'recordId'
      | 'shop'
      | 'assignee'
      | 'olaStatus'
      | 'olaNextBreachTime'
      | 'olaEstimatedTime'
    >
  > = get(location, 'state.task')
  const taskShop = task?.shop

  const navigate = useNavigate()

  const authUser = useAuthUser()
  const permissions = useUserPermissions([UserPermissionsEnum.EquipmentsCreate])

  const [form] = Form.useForm<SimplifiedRelocationTaskFormFields>()

  const equipmentsToShopFormValue: SimplifiedRelocationTaskFormFields['equipmentsToShop'] =
    Form.useWatch('equipmentsToShop', form)

  const equipmentsToWarehouseFormValue: SimplifiedRelocationTaskFormFields['equipmentsToWarehouse'] =
    Form.useWatch('equipmentsToWarehouse', form)

  const [activeEquipmentRow, setActiveEquipmentRow] = useState<ActiveEquipmentRow>()

  const [selectedOwnerId, setSelectedOwnerId] = useState<IdType>()

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<IdType>()
  const [
    userChangedNomenclature,
    { setTrue: setUserChangedNomenclature, setFalse: resetUserChangedNomenclature },
  ] = useBoolean(false)

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  const categoryIsConsumable = checkEquipmentCategoryIsConsumable(selectedCategory?.code)

  const [editableEquipmentByFile, setEditableEquipmentByFile] = useState<EquipmentByFileTableRow>()
  const [editableEquipmentByFileIndex, setEditableEquipmentByFileIndex] = useState<number>()

  const [
    createEquipmentsByFileModalOpened,
    { setTrue: openCreateEquipmentsByFileModal, setFalse: closeCreateEquipmentsByFileModal },
  ] = useBoolean(false)

  const onCloseCreateEquipmentsByFileModal = useDebounceFn(() => {
    closeCreateEquipmentsByFileModal()
    form.setFieldValue('equipmentsToWarehouseByFile', [])
  })

  const [
    createEquipmentModalOpened,
    { setTrue: openCreateEquipmentModal, setFalse: closeCreateEquipmentModal },
  ] = useBoolean(false)

  const onOpenCreateEquipmentModal = useDebounceFn((row: ActiveEquipmentRow) => {
    setActiveEquipmentRow(row)
    openCreateEquipmentModal()
  })

  const onCloseCreateEquipmentModal = useDebounceFn(() => {
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

  const onOpenEditEquipmentByFileModal = useDebounceFn<CreateEquipmentsByFileModalProps['onEdit']>(
    (row: EquipmentByFileTableRow, index) => {
      setEditableEquipmentByFile(row)
      setEditableEquipmentByFileIndex(index)
      row.category && setSelectedCategory(row.category)
      row.nomenclature && setSelectedNomenclatureId(row.nomenclature.id)
      openEditEquipmentByFileModal()
    },
  )

  const onCloseEditEquipmentByFileModal = useDebounceFn(() => {
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

  const onOpenCreateRelocationEquipmentImagesModal = useDebounceFn((row: ActiveEquipmentRow) => {
    setActiveEquipmentRow(row)
    openCreateRelocationEquipmentImagesModal()
  })

  const onCloseCreateRelocationEquipmentImagesModal = useDebounceFn(() => {
    closeCreateRelocationEquipmentImagesModal()
    setActiveEquipmentRow(undefined)
  })

  const [toWarehouseEditableTableRowKeys, setToWarehouseEditableTableRowKeys] = useState<Key[]>([])

  const [fromWarehouseEditableTableRowKeys, setFromWarehouseEditableTableRowKeys] = useState<Key[]>(
    [],
  )

  const { currentData: warehouseMSI, isFetching: warehouseMSIIsFetching } = useGetWarehouseMSI(
    { userId: task?.assignee?.id! },
    { skip: !task?.assignee?.id },
  )

  const { currentData: users = [], isFetching: usersIsFetching } = useGetUsers({
    isManager: false,
  })

  const { currentData: currencies = [], isFetching: currenciesIsFetching } =
    useGetCurrenciesCatalog(undefined, {
      skip: !createEquipmentModalOpened && !editEquipmentByFileModalOpened,
    })

  const {
    currentData: equipmentCatalogsFromWarehouse = [],
    isFetching: equipmentCatalogsFromWarehouseIsFetching,
  } = useGetEquipmentsCatalog({ locationId: warehouseMSI?.id! }, { skip: !warehouseMSI?.id })

  const {
    currentData: equipmentCatalogsToWarehouse = [],
    isFetching: equipmentCatalogsToWarehouseIsFetching,
  } = useGetEquipmentsCatalog({ locationId: taskShop?.id! }, { skip: !taskShop?.id })

  const [getEquipment, { isFetching: equipmentIsFetching }] = useLazyGetEquipment()

  const { currentData: equipmentCategories = [], isFetching: equipmentCategoriesIsFetching } =
    useGetEquipmentCategories(undefined, {
      skip: !createEquipmentModalOpened && !editEquipmentByFileModalOpened,
    })

  const { currentData: workTypes = [], isFetching: workTypesIsFetching } = useGetWorkTypes(
    undefined,
    {
      skip:
        (!createEquipmentModalOpened && !editEquipmentByFileModalOpened) ||
        !selectedCategory ||
        !selectedNomenclatureId,
    },
  )

  const { currentData: nomenclatures, isFetching: nomenclaturesIsFetching } = useGetNomenclatures(
    categoryIsConsumable
      ? { ...defaultGetNomenclaturesParams, equipmentHasSerialNumber: false }
      : defaultGetNomenclaturesParams,
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

  const [getCustomers, { data: customers = [], isFetching: customersIsFetching }] =
    useLazyGetCustomersCatalog()

  useEffect(() => {
    if (
      (createEquipmentModalOpened || editEquipmentByFileModalOpened) &&
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
    editEquipmentByFileModalOpened,
  ])

  const { currentData: macroregions = [], isFetching: macroregionsIsFetching } =
    useGetMacroregionsCatalog(
      {
        ...(!!selectedOwnerId && { customers: [selectedOwnerId] }),
        ...(!!warehouseMSI?.id && { warehouses: [warehouseMSI.id] }),
      },
      { skip: !selectedOwnerId && !warehouseMSI?.id },
    )

  const [createAttachment, { isLoading: createAttachmentIsLoading }] = useCreateAttachment()
  const [deleteAttachment, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

  const [createTaskMutation, { isLoading: createTaskIsLoading }] = useCreateRelocationTaskITSM()

  const [createEquipmentMutation, { isLoading: createEquipmentIsLoading }] = useCreateEquipment()
  const [createEquipmentsMutation, { isLoading: createEquipmentsIsLoading }] = useCreateEquipments()

  const [
    importEquipmentsByFileMutation,
    { isLoading: importEquipmentsByFileIsLoading, data: importedEquipmentsByFile },
  ] = useImportEquipmentsByFile()

  const [getEquipmentListTemplate, { isFetching: getEquipmentListTemplateIsFetching }] =
    useLazyGetEquipmentsTemplate()

  const onCreateEquipmentImage = useCallback<NonNullable<UploadProps['customRequest']>>(
    async (options) => {
      await createAttachment({ type: AttachmentTypeEnum.EquipmentImage }, options)
    },
    [createAttachment],
  )

  const onCreateRelocationEquipmentImage: NonNullable<UploadProps['customRequest']> = async (
    options,
  ) => {
    await createAttachment({ type: AttachmentTypeEnum.RelocationEquipmentImage }, options)
  }

  const onCreateCommonRelocationEquipmentImage: NonNullable<UploadProps['customRequest']> = async (
    options,
  ) => {
    await createAttachment({ type: AttachmentTypeEnum.RelocationTaskImage }, options)
  }

  const onCreateTask = async (values: SimplifiedRelocationTaskFormFields) => {
    if (!task) return

    try {
      await createTaskMutation({
        taskId: task.id,
        controller: values.controller,
        comment: values.comment?.trim(),
        equipmentsToShop: values.equipmentsToShop?.map((eqp) => ({
          id: eqp.id,
          quantity: eqp.quantity,
          condition: eqp.condition,
          attachments: eqp.attachments?.length
            ? extractIdsFromFilesResponse(eqp.attachments)
            : undefined,
          images: values.equipmentsToShopImages?.length
            ? extractIdsFromFilesResponse(values.equipmentsToShopImages)
            : undefined,
        })),
        equipmentsToWarehouse: values.equipmentsToWarehouse?.map((eqp) => ({
          id: eqp.id,
          quantity: eqp.quantity,
          condition: eqp.condition,
          attachments: eqp.attachments?.length
            ? extractIdsFromFilesResponse(eqp.attachments)
            : undefined,
          images: values.equipmentsToWarehouseImages?.length
            ? extractIdsFromFilesResponse(values.equipmentsToWarehouseImages)
            : undefined,
        })),
      }).unwrap()

      navigate(fromPath)
    } catch (error) {
      if (isErrorResponse(error) && isBadRequestError(error)) {
        form.setFields(getFieldsErrors(error.data))
      }
    }
  }

  const pickEquipmentToWarehouse: FormProps<SimplifiedRelocationTaskFormFields>['onValuesChange'] =
    async (changedValues, values) => {
      if (
        changedValues.equipmentsToWarehouse &&
        !Array.isArray(changedValues.equipmentsToWarehouse)
      ) {
        const [index, changes] = Object.entries(changedValues.equipmentsToWarehouse)[0] as [
          string,
          Partial<RelocationEquipmentRow>,
        ]

        if (changes.id) {
          const equipmentPath: NamePath = ['equipmentsToWarehouse', index]
          const currentEquipment = values.equipmentsToWarehouse?.[Number(index)]
          if (currentEquipment) {
            try {
              const equipment = await getEquipment({ equipmentId: changes.id }).unwrap()
              const isConsumable = checkEquipmentCategoryIsConsumable(equipment.category.code)
              form.setFieldValue(equipmentPath, {
                ...currentEquipment,
                serialNumber: equipment.serialNumber,
                purpose: equipment.purpose.title,
                condition: equipment.condition,
                amount: equipment.amount,
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
    }

  const pickEquipmentToShop: FormProps<SimplifiedRelocationTaskFormFields>['onValuesChange'] =
    async (changedValues, values) => {
      if (changedValues.equipmentsToShop && !Array.isArray(changedValues.equipmentsToShop)) {
        const [index, changes] = Object.entries(changedValues.equipmentsToShop)[0] as [
          string,
          Partial<RelocationEquipmentRow>,
        ]

        if (changes.id) {
          const equipmentPath: NamePath = ['equipmentsToShop', index]
          const currentEquipment = values.equipmentsToShop?.[Number(index)]
          if (currentEquipment) {
            try {
              const equipment = await getEquipment({ equipmentId: changes.id }).unwrap()
              const isConsumable = checkEquipmentCategoryIsConsumable(equipment.category.code)
              form.setFieldValue(equipmentPath, {
                ...currentEquipment,
                serialNumber: equipment.serialNumber,
                purpose: equipment.purpose.title,
                condition: equipment.condition,
                amount: equipment.amount,
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
    }

  const onFormChange: FormProps<SimplifiedRelocationTaskFormFields>['onValuesChange'] = async (
    changedValues,
    values,
  ) => {
    await pickEquipmentToWarehouse(changedValues, values)
    await pickEquipmentToShop(changedValues, values)
  }

  const importEquipmentsByFile: NonNullable<UploadProps['onChange']> = async ({ file }) => {
    try {
      const equipments = await importEquipmentsByFileMutation({
        file: file as FileToSend,
      }).unwrap()

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

      form.setFieldValue('equipmentsToWarehouseByFile', equipmentsByFile)
      openCreateEquipmentsByFileModal()
    } catch {}
  }

  const createEquipments = useDebounceFn<CreateEquipmentsByFileModalProps['onCreate']>(async () => {
    const equipmentsByFile: EquipmentByFileTableRow[] = form.getFieldValue(
      'equipmentsToWarehouseByFile',
    )
    if (!equipmentsByFile || !warehouseMSI || !taskShop?.id) return

    try {
      const createdEquipments = await createEquipmentsMutation(
        equipmentsByFile.map(({ rowId, ...eqp }) => ({
          ...eqp,
          location: taskShop.id,
          warehouse: warehouseMSI.id,
          nomenclature: eqp.nomenclature?.id,
          category: eqp.category?.id,
          currency: eqp.currency?.id,
          owner: eqp.owner?.id,
          macroregion: eqp.macroregion?.id,
          purpose: eqp.purpose?.id,
          images: eqp.images?.length ? extractIdsFromFilesResponse(eqp.images) : undefined,
        })),
      ).unwrap()

      const equipmentsPath = 'equipmentsToWarehouse'
      const currentEquipments: RelocationEquipmentRow[] = form.getFieldValue(equipmentsPath)
      const newEquipments: RelocationEquipmentRow[] = []
      const newEditableTableRowKeys: Key[] = []

      createdEquipments.forEach((eqp) => {
        newEquipments.push({
          rowId: eqp.id,
          id: eqp.id,
          serialNumber: eqp.serialNumber || undefined,
          quantity: eqp.quantity,
          condition: eqp.condition,
          purpose: eqp.purpose.title,
          category: eqp.category,
          amount: eqp.availableQuantity,
        })

        newEditableTableRowKeys.push(eqp.id)
      })

      form.setFieldValue(equipmentsPath, [...currentEquipments, ...newEquipments])
      setToWarehouseEditableTableRowKeys((prevState) => prevState.concat(newEditableTableRowKeys))
      onCloseCreateEquipmentsByFileModal()
    } catch {}
  }, [
    createEquipmentsMutation,
    form,
    onCloseCreateEquipmentsByFileModal,
    taskShop?.id,
    warehouseMSI,
  ])

  const createEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
    async ({ images, ...values }) => {
      if (!activeEquipmentRow || !warehouseMSI || !taskShop?.id) return

      try {
        const createdEquipment = await createEquipmentMutation({
          ...values,
          images: images?.length ? extractIdsFromFilesResponse(images) : undefined,
          location: taskShop.id,
          warehouse: warehouseMSI.id,
        }).unwrap()

        const rowPath = [activeEquipmentRow.tableName, activeEquipmentRow.rowIndex]
        const currentRow: RelocationEquipmentRow = form.getFieldValue(rowPath)
        const equipmentRow: RelocationEquipmentRow = {
          rowId: currentRow.rowId,
          id: createdEquipment.id,
          serialNumber: createdEquipment.serialNumber || undefined,
          purpose: createdEquipment.purpose.title,
          condition: createdEquipment.condition,
          amount: createdEquipment.availableQuantity,
          quantity: isNumber(createdEquipment.quantity) ? createdEquipment.quantity : undefined,
          category: createdEquipment.category,
        }

        form.setFieldValue(rowPath, equipmentRow)
        onCloseCreateEquipmentModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          form.setFields(getFieldsErrors(error.data))
        }
      }
    },
    [
      activeEquipmentRow,
      createEquipmentMutation,
      form,
      onCloseCreateEquipmentModal,
      taskShop?.id,
      warehouseMSI,
    ],
  )

  const editEquipmentByFile: EquipmentFormModalProps['onSubmit'] = useCallback(
    (values) => {
      if (!editableEquipmentByFile || !isNumber(editableEquipmentByFileIndex)) return

      const equipmentPath = ['equipmentsToWarehouseByFile', editableEquipmentByFileIndex]
      const updatableEquipmentByFile: EquipmentByFileTableRow = {
        ...values,
        rowId: editableEquipmentByFile.rowId,
        category: equipmentCategories.find((c) => c.id === values.category),
        currency: values.currency ? currencies.find((c) => c.id === values.currency) : undefined,
        owner: values.owner ? customers.find((c) => c.id === values.owner) : undefined,
        macroregion: values.macroregion
          ? macroregions.find((m) => m.id === values.macroregion)
          : undefined,
        purpose: workTypes.find((w) => w.id === values.purpose),
        nomenclature: nomenclature
          ? {
              id: nomenclature.id,
              title: nomenclature.title,
              measurementUnit: nomenclature.measurementUnit.title,
              equipmentHasSerialNumber: nomenclature.equipmentHasSerialNumber,
            }
          : undefined,
      }

      form.setFieldValue(equipmentPath, updatableEquipmentByFile)
      onCloseEditEquipmentByFileModal()
    },
    [
      currencies,
      customers,
      macroregions,
      editableEquipmentByFile,
      editableEquipmentByFileIndex,
      equipmentCategories,
      nomenclature,
      form,
      onCloseEditEquipmentByFileModal,
      workTypes,
    ],
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

  const equipmentImagesFormPath =
    createRelocationEquipmentImagesModalOpened && activeEquipmentRow
      ? [activeEquipmentRow.tableName, activeEquipmentRow.rowIndex, 'attachments']
      : undefined

  const equipmentByFileFormValues = useMemo(
    () => ({
      title: userChangedNomenclature ? nomenclature?.title : editableEquipmentByFile?.title,
      images: isNumber(editableEquipmentByFileIndex)
        ? form.getFieldValue([
            'equipmentsToWarehouseByFile',
            editableEquipmentByFileIndex,
            'images',
          ])
        : undefined,
    }),
    [
      editableEquipmentByFile?.title,
      editableEquipmentByFileIndex,
      form,
      nomenclature?.title,
      userChangedNomenclature,
    ],
  )

  const createEquipmentFormValues = useMemo(
    () =>
      createEquipmentModalOpened ? { title: nomenclature ? nomenclature.title : '' } : undefined,
    [createEquipmentModalOpened, nomenclature],
  )

  const controllerOptions = useMemo(
    () => users.filter((usr) => usr.id !== authUser?.id && usr.id !== task?.assignee?.id),
    [authUser?.id, task?.assignee?.id, users],
  )

  return (
    <>
      <Form<SimplifiedRelocationTaskFormFields>
        data-testid='create-relocation-task-simplified-page'
        form={form}
        layout='vertical'
        onFinish={onCreateTask}
        onValuesChange={onFormChange}
        initialValues={initialValues}
      >
        <Row gutter={[40, 40]}>
          <Col span={24}>
            <SeparatedText>
              <Text strong>Перемещение оборудования для заявки {valueOr(task?.recordId)}</Text>

              {task?.olaStatus && isNumber(task?.olaEstimatedTime) && task?.olaNextBreachTime ? (
                <Text type={getOlaStatusTextType(task.olaStatus)}>
                  {getTaskCompleteAtDate({
                    olaStatus: task.olaStatus,
                    olaEstimatedTime: task.olaEstimatedTime,
                    olaNextBreachTime: task.olaNextBreachTime,
                  })}
                </Text>
              ) : null}
            </SeparatedText>
          </Col>

          <Col span={24}>
            <Row gutter={40}>
              <Col span={8}>
                <Form.Item
                  data-testid='controller-form-item'
                  rules={onlyRequiredRules}
                  label='Контролер'
                  name='controller'
                >
                  <Select
                    placeholder='Выберите значение'
                    options={controllerOptions}
                    loading={usersIsFetching}
                    disabled={usersIsFetching || createTaskIsLoading}
                    fieldNames={idAndFullNameSelectFieldNames}
                    showSearch
                    filterOption={filterOptionBy('fullName')}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item data-testid='comment-form-item' label='Комментарий' name='comment'>
                  <TextArea placeholder='Добавьте комментарий' disabled={createTaskIsLoading} />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Space data-testid='equipments-to-shop-block' $block direction='vertical'>
              <Space>
                <Text strong>Перечень оборудования для перемещения со склада</Text>

                {warehouseMSIIsFetching ? (
                  <Spinner centered={false} />
                ) : (
                  <Text strong>"{valueOr(warehouseMSI?.title)}"</Text>
                )}

                <Text strong>на объект "{valueOr(taskShop?.title)}"</Text>
              </Space>

              <RelocationEquipmentSimplifiedEditableTable
                name='equipmentsToShop'
                required={!equipmentsToWarehouseFormValue?.length}
                editableKeys={fromWarehouseEditableTableRowKeys}
                setEditableKeys={setFromWarehouseEditableTableRowKeys}
                isLoading={createTaskIsLoading}
                equipmentIsLoading={equipmentIsFetching}
                equipments={equipmentCatalogsFromWarehouse}
                equipmentsIsLoading={equipmentCatalogsFromWarehouseIsFetching}
                onClickCreateImage={onOpenCreateRelocationEquipmentImagesModal}
              />

              <Space direction='vertical'>
                <Text type='secondary'>Общие фотографии к перемещению (до 10 штук)</Text>

                <Form.Item name='equipmentsToShopImages' {...filesFormItemProps}>
                  <Upload
                    multiple
                    listType='picture'
                    customRequest={onCreateCommonRelocationEquipmentImage}
                    onRemove={deleteAttachment}
                    itemRender={renderUploadedFile()}
                    disabled={
                      createTaskIsLoading || createAttachmentIsLoading || deleteAttachmentIsLoading
                    }
                    maxCount={10}
                  >
                    <UploadButton
                      label='Добавить фото'
                      disabled={
                        createTaskIsLoading ||
                        createAttachmentIsLoading ||
                        deleteAttachmentIsLoading
                      }
                    />
                  </Upload>
                </Form.Item>
              </Space>
            </Space>
          </Col>

          <Col span={24}>
            <Space data-testid='equipments-to-warehouse-block' $block direction='vertical'>
              <Row justify='space-between' align='middle'>
                <Col>
                  <Space>
                    <Text strong>
                      Перечень оборудования для перемещения с объекта "{valueOr(taskShop?.title)}"
                      на склад
                    </Text>

                    {warehouseMSIIsFetching ? (
                      <Spinner centered={false} />
                    ) : (
                      <Text strong>"{valueOr(warehouseMSI?.title)}"</Text>
                    )}
                  </Space>
                </Col>

                {permissions.equipmentsCreate && (
                  <Col>
                    <Space>
                      <Upload
                        showUploadList={false}
                        beforeUpload={stubFalse}
                        fileList={[]}
                        onChange={importEquipmentsByFile}
                      >
                        <Button loading={importEquipmentsByFileIsLoading}>Добавить из Excel</Button>
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

              <RelocationEquipmentSimplifiedEditableTable
                name='equipmentsToWarehouse'
                required={!equipmentsToShopFormValue?.length}
                editableKeys={toWarehouseEditableTableRowKeys}
                setEditableKeys={setToWarehouseEditableTableRowKeys}
                isLoading={createTaskIsLoading}
                equipmentIsLoading={equipmentIsFetching}
                equipments={equipmentCatalogsToWarehouse}
                equipmentsIsLoading={equipmentCatalogsToWarehouseIsFetching}
                canCreateEquipment={!!permissions.equipmentsCreate}
                onClickCreateEquipment={onOpenCreateEquipmentModal}
                onClickCreateImage={onOpenCreateRelocationEquipmentImagesModal}
              />

              <Form.Item name='equipmentsToWarehouseImages' {...filesFormItemProps}>
                <Upload
                  multiple
                  listType='picture'
                  customRequest={onCreateCommonRelocationEquipmentImage}
                  onRemove={deleteAttachment}
                  itemRender={renderUploadedFile()}
                  disabled={
                    createTaskIsLoading || createAttachmentIsLoading || deleteAttachmentIsLoading
                  }
                  maxCount={10}
                >
                  <UploadButton
                    label='Добавить фото'
                    disabled={
                      createTaskIsLoading || createAttachmentIsLoading || deleteAttachmentIsLoading
                    }
                  />
                </Upload>
              </Form.Item>
            </Space>
          </Col>

          <Col span={24}>
            <Row justify='end' gutter={8}>
              <Col>
                <Button>
                  <Link to={fromPath}>{CANCEL_TEXT}</Link>
                </Button>
              </Col>

              <Col>
                <Button type='primary' htmlType='submit' loading={createTaskIsLoading}>
                  {CREATE_TEXT}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

      {createEquipmentModalOpened && (
        <React.Suspense fallback={<ModalFallback open onCancel={onCloseCreateEquipmentModal} />}>
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
            onCancel={onCloseCreateEquipmentModal}
            onSubmit={createEquipment}
            onUploadImage={onCreateEquipmentImage}
            imageIsUploading={createAttachmentIsLoading}
            onDeleteImage={deleteAttachment}
            imageIsDeleting={deleteAttachmentIsLoading}
          />
        </React.Suspense>
      )}

      {editEquipmentByFileModalOpened && (
        <React.Suspense
          fallback={<ModalFallback open onCancel={onCloseEditEquipmentByFileModal} />}
        >
          <EquipmentFormModal
            open={editEquipmentByFileModalOpened}
            mode='create'
            title='Изменить добавляемое оборудование'
            okText={SAVE_TEXT}
            initialValues={getEquipmentFormInitialValues(editableEquipmentByFile)}
            values={equipmentByFileFormValues}
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
            onCancel={onCloseEditEquipmentByFileModal}
            onSubmit={editEquipmentByFile}
            onUploadImage={onCreateEquipmentImage}
            imageIsUploading={createAttachmentIsLoading}
            onDeleteImage={deleteAttachment}
            imageIsDeleting={deleteAttachmentIsLoading}
          />
        </React.Suspense>
      )}

      {createRelocationEquipmentImagesModalOpened && activeEquipmentRow && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={onCloseCreateRelocationEquipmentImagesModal}
              tip='Загрузка модалки добавления изображений оборудования'
            />
          }
        >
          <CreateAttachmentsModal
            form={form}
            formItemName={equipmentImagesFormPath}
            open={createRelocationEquipmentImagesModalOpened}
            title='Добавить изображения оборудования'
            onCancel={onCloseCreateRelocationEquipmentImagesModal}
            onCreate={onCreateRelocationEquipmentImage}
            onDelete={deleteAttachment}
            isDeleting={deleteAttachmentIsLoading}
            defaultFileList={form.getFieldValue(equipmentImagesFormPath)}
          />
        </React.Suspense>
      )}

      {createEquipmentsByFileModalOpened && importedEquipmentsByFile && (
        <React.Suspense
          fallback={<ModalFallback open onCancel={onCloseCreateEquipmentsByFileModal} />}
        >
          <CreateEquipmentsByFileModal
            open={createEquipmentsByFileModalOpened}
            onCancel={onCloseCreateEquipmentsByFileModal}
            onCreate={createEquipments}
            isCreating={createEquipmentsIsLoading}
            data={
              (form.getFieldValue('equipmentsToWarehouseByFile') || []) as EquipmentByFileTableRow[]
            }
            onEdit={onOpenEditEquipmentByFileModal}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default CreateRelocationTaskSimplifiedPage
