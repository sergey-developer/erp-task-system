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
import get from 'lodash/get'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import stubFalse from 'lodash/stubFalse'
import { NamePath } from 'rc-field-form/es/interface'
import React, { FC, Key, useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { AttachmentTypeEnum } from 'modules/attachment/constants'
import { useCreateAttachment, useDeleteAttachment } from 'modules/attachment/hooks'
import { useAuthUser } from 'modules/auth/hooks'
import { renderUploadedFile } from 'modules/attachment/utils'
import { getCompleteAt } from 'modules/task/components/TaskDetails/MainDetails/utils'
import { TaskModel } from 'modules/task/models'
import { getOlaStatusTextType } from 'modules/task/utils/task'
import { useGetUserList, useGetWarehouseMSI, useMatchUserPermissions } from 'modules/user/hooks'
import { CreateEquipmentsByFileModalProps } from 'modules/warehouse/components/CreateEquipmentsByFileModal'
import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'
import { EquipmentByFileTableRow } from 'modules/warehouse/components/EquipmentsByFileTable/types'
import RelocationEquipmentSimplifiedEditableTable from 'modules/warehouse/components/RelocationEquipmentSimplifiedEditableTable'
import {
  ActiveEquipmentRow,
  RelocationEquipmentRow,
} from 'modules/warehouse/components/RelocationEquipmentSimplifiedEditableTable/types'
import { defaultGetNomenclatureListParams } from 'modules/warehouse/constants/nomenclature'
import { useLazyGetCustomerList } from 'modules/warehouse/hooks/customer'
import {
  useCreateEquipment,
  useCreateEquipments,
  useGetEquipmentCatalogList,
  useGetEquipmentCategoryList,
  useImportEquipmentsByFile,
  useLazyGetEquipment,
  useLazyGetEquipmentListTemplate,
} from 'modules/warehouse/hooks/equipment'
import { useGetNomenclature, useGetNomenclatureList } from 'modules/warehouse/hooks/nomenclature'
import { useCreateRelocationTaskITSM } from 'modules/warehouse/hooks/relocationTask'
import { useGetWorkTypeList } from 'modules/warehouse/hooks/workType'
import { EquipmentCategoryListItemModel } from 'modules/warehouse/models'
import { SimplifiedRelocationTaskFormFields } from 'modules/warehouse/types'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'

import UploadButton from 'components/Buttons/UploadButton'
import ModalFallback from 'components/Modals/ModalFallback'
import SeparatedText from 'components/SeparatedText'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import { CANCEL_TEXT, CREATE_TEXT } from 'shared/constants/common'
import { filesFormItemProps } from 'shared/constants/form'
import { idAndFullNameSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'
import { useGetCurrencyList } from 'shared/hooks/currency'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { FileToSend } from 'shared/types/file'
import { MaybeUndefined } from 'shared/types/utils'
import { filterOptionBy, valueOrHyphen } from 'shared/utils/common'
import { extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { extractPaginationResults } from 'shared/utils/pagination'

import { getEquipmentFormInitialValues } from '../CreateRelocationTaskPage/utils'

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

  const permissions = useMatchUserPermissions(['EQUIPMENTS_CREATE'])
  const authUser = useAuthUser()

  const [form] = Form.useForm<SimplifiedRelocationTaskFormFields>()

  const equipmentsToShopFormValue: SimplifiedRelocationTaskFormFields['equipmentsToShop'] =
    Form.useWatch('equipmentsToShop', form)

  const equipmentsToWarehouseFormValue: SimplifiedRelocationTaskFormFields['equipmentsToWarehouse'] =
    Form.useWatch('equipmentsToWarehouse', form)

  const [activeEquipmentRow, setActiveEquipmentRow] = useState<ActiveEquipmentRow>()

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
    {
      userId: authUser?.id!,
      id: task?.assignee?.id,
    },
    { skip: !authUser?.id || !task?.assignee?.id },
  )

  const { currentData: userList = [], isFetching: userListIsFetching } = useGetUserList({
    isManager: false,
  })

  const { currentData: currencyList = [], isFetching: currencyListIsFetching } = useGetCurrencyList(
    undefined,
    { skip: !createEquipmentModalOpened && !editEquipmentByFileModalOpened },
  )

  const {
    currentData: equipmentCatalogListFromWarehouse = [],
    isFetching: equipmentCatalogListFromWarehouseIsFetching,
  } = useGetEquipmentCatalogList({ locationId: warehouseMSI?.id! }, { skip: !warehouseMSI?.id })

  const {
    currentData: equipmentCatalogListToWarehouse = [],
    isFetching: equipmentCatalogListToWarehouseIsFetching,
  } = useGetEquipmentCatalogList({ locationId: taskShop?.id! }, { skip: !taskShop?.id })

  const [getEquipment, { isFetching: equipmentIsFetching }] = useLazyGetEquipment()

  const { currentData: equipmentCategoryList = [], isFetching: equipmentCategoryListIsFetching } =
    useGetEquipmentCategoryList(undefined, {
      skip: !createEquipmentModalOpened && !editEquipmentByFileModalOpened,
    })

  const { currentData: workTypeList = [], isFetching: workTypeListIsFetching } = useGetWorkTypeList(
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
    categoryIsConsumable,
    getCustomerList,
    selectedCategory,
    selectedNomenclatureId,
    editEquipmentByFileModalOpened,
  ])

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
    useLazyGetEquipmentListTemplate()

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

  const handleCreateCommonRelocationEquipmentImage: NonNullable<
    UploadProps['customRequest']
  > = async (options) => {
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
    async ({ images, ...values }, setFields) => {
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
          setFields(getFieldsErrors(error.data))
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
        category: equipmentCategoryList.find((c) => c.id === values.category),
        currency: values.currency ? currencyList.find((c) => c.id === values.currency) : undefined,
        owner: values.owner ? customerList.find((c) => c.id === values.owner) : undefined,
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

      form.setFieldValue(equipmentPath, updatableEquipmentByFile)
      onCloseEditEquipmentByFileModal()
    },
    [
      currencyList,
      customerList,
      editableEquipmentByFile,
      editableEquipmentByFileIndex,
      equipmentCategoryList,
      form,
      onCloseEditEquipmentByFileModal,
      nomenclature,
      workTypeList,
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
              <Text strong>
                Перемещение оборудования для заявки {valueOrHyphen(task?.recordId)}
              </Text>

              {task?.olaStatus && isNumber(task?.olaEstimatedTime) && task?.olaNextBreachTime ? (
                <Text type={getOlaStatusTextType(task.olaStatus)}>
                  {getCompleteAt({
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
                  rules={equipmentsToShopFormValue?.length ? onlyRequiredRules : undefined}
                  label='Контролер'
                  name='controller'
                >
                  <Select
                    placeholder='Выберите значение'
                    options={userList}
                    loading={userListIsFetching}
                    disabled={userListIsFetching || createTaskIsLoading}
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
            <Space direction='vertical'>
              <Space>
                <Text strong>Перечень оборудования для перемещения со склада</Text>

                {warehouseMSIIsFetching ? (
                  <Spinner centered={false} />
                ) : (
                  <Text strong>"{valueOrHyphen(warehouseMSI?.title)}"</Text>
                )}

                <Text strong>на объект "{valueOrHyphen(taskShop?.title)}"</Text>
              </Space>

              <RelocationEquipmentSimplifiedEditableTable
                name='equipmentsToShop'
                required={!equipmentsToWarehouseFormValue?.length}
                editableKeys={fromWarehouseEditableTableRowKeys}
                setEditableKeys={setFromWarehouseEditableTableRowKeys}
                isLoading={createTaskIsLoading}
                equipmentIsLoading={equipmentIsFetching}
                equipmentCatalogList={equipmentCatalogListFromWarehouse}
                equipmentCatalogListIsLoading={equipmentCatalogListFromWarehouseIsFetching}
                onClickCreateImage={onOpenCreateRelocationEquipmentImagesModal}
              />

              <Space direction='vertical'>
                <Text type='secondary'>Общие фотографии к перемещению (до 10 штук)</Text>

                <Form.Item name='equipmentsToShopImages' {...filesFormItemProps}>
                  <Upload
                    multiple
                    listType='picture'
                    customRequest={handleCreateCommonRelocationEquipmentImage}
                    onRemove={deleteAttachment}
                    itemRender={renderUploadedFile}
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
            <Space direction='vertical'>
              <Row justify='space-between' align='middle'>
                <Col>
                  <Space>
                    <Text strong>
                      Перечень оборудования для перемещения с объекта "
                      {valueOrHyphen(taskShop?.title)}" на склад
                    </Text>

                    {warehouseMSIIsFetching ? (
                      <Spinner centered={false} />
                    ) : (
                      <Text strong>"{valueOrHyphen(warehouseMSI?.title)}"</Text>
                    )}
                  </Space>
                </Col>

                {permissions?.equipmentsCreate && (
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
                equipmentCatalogList={equipmentCatalogListToWarehouse}
                equipmentCatalogListIsLoading={equipmentCatalogListToWarehouseIsFetching}
                canCreateEquipment={!!permissions?.equipmentsCreate}
                onClickCreateEquipment={onOpenCreateEquipmentModal}
                onClickCreateImage={onOpenCreateRelocationEquipmentImagesModal}
              />

              <Form.Item name='equipmentsToWarehouseImages' {...filesFormItemProps}>
                <Upload
                  multiple
                  listType='picture'
                  customRequest={handleCreateCommonRelocationEquipmentImage}
                  onRemove={deleteAttachment}
                  itemRender={renderUploadedFile}
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
            categoryList={equipmentCategoryList}
            categoryListIsLoading={equipmentCategoryListIsFetching}
            selectedCategory={selectedCategory}
            onChangeCategory={onChangeCategory}
            currencyList={currencyList}
            currencyListIsLoading={currencyListIsFetching}
            ownerList={customerList}
            ownerListIsLoading={customerListIsFetching}
            workTypeList={workTypeList}
            workTypeListIsLoading={workTypeListIsFetching}
            nomenclature={nomenclature}
            nomenclatureIsLoading={nomenclatureIsFetching}
            nomenclatureList={extractPaginationResults(nomenclatureList)}
            nomenclatureListIsLoading={nomenclatureListIsFetching}
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
            okText='Сохранить'
            initialValues={getEquipmentFormInitialValues(editableEquipmentByFile)}
            values={equipmentByFileFormValues}
            categoryList={equipmentCategoryList}
            categoryListIsLoading={equipmentCategoryListIsFetching}
            selectedCategory={selectedCategory}
            onChangeCategory={onChangeCategory}
            currencyList={currencyList}
            currencyListIsLoading={currencyListIsFetching}
            ownerList={customerList}
            ownerListIsLoading={customerListIsFetching}
            workTypeList={workTypeList}
            workTypeListIsLoading={workTypeListIsFetching}
            nomenclature={nomenclature}
            nomenclatureIsLoading={nomenclatureIsFetching}
            nomenclatureList={extractPaginationResults(nomenclatureList)}
            nomenclatureListIsLoading={nomenclatureListIsFetching}
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
          <CreateAttachmentListModal
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
