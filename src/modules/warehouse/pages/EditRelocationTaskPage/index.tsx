import { useBoolean, usePrevious } from 'ahooks'
import { Button, Col, Form, FormProps, Modal, Row, Typography, Upload, UploadProps } from 'antd'
import { FormItemProps } from 'antd/es/form/FormItem'
import concat from 'lodash/concat'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import stubFalse from 'lodash/stubFalse'
import moment from 'moment-timezone'
import React, { FC, Key, useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { AttachmentTypeEnum } from 'modules/attachment/constants'
import { useCreateAttachment, useDeleteAttachment } from 'modules/attachment/hooks'
import { attachmentsToFiles } from 'modules/attachment/utils'
import { useGetUserList, useMatchUserPermissions } from 'modules/user/hooks'
import { CreateEquipmentsByFileModalProps } from 'modules/warehouse/components/CreateEquipmentsByFileModal'
import { getEquipmentFormInitialValues } from 'modules/warehouse/components/EquipmentDetails/utils'
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
} from 'modules/warehouse/components/RelocationTaskForm/types'
import {
  EquipmentCategoryEnum,
  EquipmentConditionEnum,
} from 'modules/warehouse/constants/equipment'
import { defaultGetNomenclatureListParams } from 'modules/warehouse/constants/nomenclature'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { useLazyGetCustomerList } from 'modules/warehouse/hooks/customer'
import {
  useCreateEquipment,
  useCreateEquipments,
  useGetEquipmentCatalogList,
  useGetEquipmentCategoryList,
  useGetEquipmentListTemplate,
  useImportEquipmentsByFile,
  useLazyGetEquipment,
} from 'modules/warehouse/hooks/equipment'
import { useGetNomenclature, useGetNomenclatureList } from 'modules/warehouse/hooks/nomenclature'
import { useGetRelocationEquipmentAttachmentList } from 'modules/warehouse/hooks/relocationEquipment'
import {
  useGetRelocationEquipmentBalanceList,
  useGetRelocationEquipmentList,
  useGetRelocationTask,
  useUpdateRelocationTask,
} from 'modules/warehouse/hooks/relocationTask'
import { useGetWorkTypeList } from 'modules/warehouse/hooks/workType'
import { EquipmentCategoryListItemModel } from 'modules/warehouse/models'
import { RelocationTaskFormFields } from 'modules/warehouse/types'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'
import {
  checkRelocationTaskTypeIsWriteOff,
  getRelocationTaskListPageLink,
} from 'modules/warehouse/utils/relocationTask'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { useLazyGetLocationList } from 'shared/hooks/catalogs/location'
import { useGetCurrencyList } from 'shared/hooks/currency'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { FileToSend } from 'shared/types/file'
import { checkLocationTypeIsWarehouse } from 'shared/utils/catalogs/location/checkLocationType'
import { mergeDateTime } from 'shared/utils/date'
import { extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { extractPaginationResults } from 'shared/utils/pagination'

import {
  getEquipmentCatalogListParams,
  getRelocateFromLocationListParams,
  getRelocateToLocationListParams,
} from '../CreateRelocationTaskPage/utils'

const CreateEquipmentsByFileModal = React.lazy(
  () => import('modules/warehouse/components/CreateEquipmentsByFileModal'),
)

const AddAttachmentListModal = React.lazy(
  () => import('modules/attachment/components/AddAttachmentListModal'),
)

const EquipmentFormModal = React.lazy(
  () => import('modules/warehouse/components/EquipmentFormModal'),
)

const { Text } = Typography

const initialValues: Pick<RelocationTaskFormFields, 'equipments' | 'equipmentsByFile'> = {
  equipments: [],
  equipmentsByFile: [],
}

const EditRelocationTaskPage: FC = () => {
  const navigate = useNavigate()

  // todo: создать хук который будет возвращать распарсеные значения
  const params = useParams<'id'>()
  const relocationTaskId = Number(params?.id) || undefined

  const permissions = useMatchUserPermissions(['EQUIPMENTS_CREATE'])

  const [form] = Form.useForm<RelocationTaskFormFields>()

  const [activeEquipmentRow, setActiveEquipmentRow] = useState<ActiveEquipmentRow>()

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<IdType>()

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  const categoryIsConsumable = checkEquipmentCategoryIsConsumable(selectedCategory?.code)

  const [
    createEquipmentsByFileModalOpened,
    { setTrue: openCreateEquipmentsByFileModal, setFalse: closeCreateEquipmentsByFileModal },
  ] = useBoolean(false)

  const handleCloseCreateEquipmentsByFileModal = useDebounceFn(() => {
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
    setSelectedCategory(undefined)
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
    closeEditEquipmentByFileModal()
  })

  const [
    addRelocationEquipmentImagesModalOpened,
    {
      setTrue: openAddRelocationEquipmentImagesModal,
      setFalse: closeAddRelocationEquipmentImagesModal,
    },
  ] = useBoolean(false)

  const handleOpenAddRelocationEquipmentImagesModal = useDebounceFn((row: ActiveEquipmentRow) => {
    setActiveEquipmentRow(row)
    openAddRelocationEquipmentImagesModal()
  })

  const handleCloseAddRelocationEquipmentImagesModal = useDebounceFn(() => {
    closeAddRelocationEquipmentImagesModal()
    setActiveEquipmentRow(undefined)
  })

  const [confirmModalOpened, { toggle: toggleConfirmModal }] = useBoolean(false)

  const [editableEquipmentByFile, setEditableEquipmentByFile] = useState<EquipmentByFileTableRow>()
  const [editableEquipmentByFileIndex, setEditableEquipmentByFileIndex] = useState<number>()

  const [editableTableRowKeys, setEditableTableRowKeys] = useState<Key[]>([])

  const [selectedType, setSelectedType] = useState<RelocationTaskFormFields['type']>()
  const typeIsWriteOff = checkRelocationTaskTypeIsWriteOff(selectedType)

  const [selectedRelocateTo, setSelectedRelocateTo] = useState<LocationOption>()
  const [selectedRelocateFrom, setSelectedRelocateFrom] = useState<LocationOption>()
  const prevSelectedRelocateFrom = usePrevious(selectedRelocateFrom)

  const [createAttachment, { isLoading: createAttachmentIsLoading }] = useCreateAttachment()
  const [deleteAttachment, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

  const { currentData: relocationTask, isFetching: relocationTaskIsFetching } =
    useGetRelocationTask({ relocationTaskId: relocationTaskId! })

  const {
    currentData: relocationEquipmentList = [],
    isFetching: relocationEquipmentListIsFetching,
  } = useGetRelocationEquipmentList({ relocationTaskId: relocationTaskId! })

  const activeEquipmentIsRelocationEquipment =
    addRelocationEquipmentImagesModalOpened && activeEquipmentRow && relocationEquipmentList.length
      ? Boolean(
          relocationEquipmentList.find(
            (eqp) => eqp.relocationEquipmentId === activeEquipmentRow.relocationEquipmentId,
          ),
        )
      : false

  const {
    currentData: relocationEquipmentAttachmentList = [],
    isFetching: relocationEquipmentAttachmentListIsFetching,
  } = useGetRelocationEquipmentAttachmentList(
    { relocationEquipmentId: activeEquipmentRow?.relocationEquipmentId! },
    {
      skip:
        !activeEquipmentRow?.relocationEquipmentId ||
        !activeEquipmentIsRelocationEquipment ||
        !addRelocationEquipmentImagesModalOpened,
    },
  )

  const { currentData: userList = [], isFetching: userListIsFetching } = useGetUserList({
    isManager: false,
  })

  const [
    getRelocateFromLocationList,
    { currentData: relocateFromLocationList = [], isFetching: relocateFromLocationListIsFetching },
  ] = useLazyGetLocationList()

  const [
    getRelocateToLocationList,
    { currentData: relocateToLocationList = [], isFetching: relocateToLocationListIsFetching },
  ] = useLazyGetLocationList()

  /* сделано через lazy т.к. по каким-то причинам запрос не отправляется снова если один из параметров не изменился */
  useEffect(() => {
    if (selectedType) {
      getRelocateFromLocationList(getRelocateFromLocationListParams(selectedType))
    }
  }, [getRelocateFromLocationList, selectedType])

  useEffect(() => {
    if (selectedType && !typeIsWriteOff) {
      getRelocateToLocationList(getRelocateToLocationListParams(selectedType))
    }
  }, [getRelocateToLocationList, selectedType, typeIsWriteOff])

  const { currentData: currencyList = [], isFetching: currencyListIsFetching } =
    useGetCurrencyList()

  const { currentData: relocationEquipmentBalanceList = [] } = useGetRelocationEquipmentBalanceList(
    { relocationTaskId: relocationTaskId! },
  )

  const { currentData: equipmentCatalogList = [], isFetching: equipmentCatalogListIsFetching } =
    useGetEquipmentCatalogList(
      {
        locationId: selectedRelocateFrom?.value,
        ...getEquipmentCatalogListParams(selectedType!),
      },
      { skip: !selectedRelocateFrom?.value || !selectedType },
    )

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

  const [updateRelocationTaskMutation, { isLoading: updateRelocationTaskIsLoading }] =
    useUpdateRelocationTask()

  const [createEquipmentMutation, { isLoading: createEquipmentIsLoading }] = useCreateEquipment()
  const [createEquipmentsMutation, { isLoading: createEquipmentsIsLoading }] = useCreateEquipments()

  const [
    importEquipmentsByFileMutation,
    { isLoading: importEquipmentsByFileIsLoading, data: importedEquipmentsByFile },
  ] = useImportEquipmentsByFile()

  const handleCreateEquipmentImage = useCallback<NonNullable<UploadProps['customRequest']>>(
    async (options) => {
      await createAttachment({ type: AttachmentTypeEnum.EquipmentImage }, options)
    },
    [createAttachment],
  )

  const handleCreateRelocationEquipmentImage: NonNullable<UploadProps['customRequest']> = async (
    options,
  ) => {
    await createAttachment({ type: AttachmentTypeEnum.RelocationEquipmentImage }, options)
  }

  const [getEquipmentListTemplate, { isFetching: getEquipmentListTemplateIsFetching }] =
    useGetEquipmentListTemplate()

  const updateRelocationTask = async (values: RelocationTaskFormFields) => {
    if (!relocationTaskId) return

    try {
      const updatedTask = await updateRelocationTaskMutation({
        relocationTaskId,
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
        executor: values.executor,
        comment: values.comment,
      }).unwrap()

      navigate(getRelocationTaskListPageLink(updatedTask.id))
    } catch (error) {
      if (isErrorResponse(error) && isBadRequestError(error)) {
        form.setFields(getFieldsErrors(error.data))
      }
    }
  }

  const pickEquipment: FormProps<RelocationTaskFormFields>['onValuesChange'] =
    async (changedValues, values) => {
      if (changedValues.equipments && !Array.isArray(changedValues.equipments)) {
        const [index, changes] = Object.entries(changedValues.equipments)[0] as [
          string,
          Partial<RelocationEquipmentRow>,
        ]

      if (changes.id && relocationTaskId) {
        const { data: equipment } = await getEquipment({
          equipmentId: changes.id,
          ignoreRelocationTask: relocationTaskId,
        })

        if (equipment) {
          const currentEquipment = values.equipments[Number(index)]
          const isConsumable = equipment.category.code === EquipmentCategoryEnum.Consumable

          form.setFieldValue(['equipments', index], {
            ...currentEquipment,
            quantity: isConsumable ? currentEquipment.quantity : 1,
            serialNumber: equipment.serialNumber,
            purpose: equipment.purpose.title,
            condition: typeIsWriteOff ? EquipmentConditionEnum.WrittenOff : equipment.condition,
            amount: equipment.amount,
            price: equipment.price,
            currency: equipment.currency?.id,
            category: equipment.category,
          })
        }
      }
    }
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
        customerInventoryNumber: eqp.customerInventoryNumber || undefined,
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
    if (!equipmentsByFile || !selectedRelocateFrom || !selectedRelocateTo) return

    try {
      const createdEquipments = await createEquipmentsMutation(
        equipmentsByFile.map(({ rowId, ...eqp }) => ({
          ...eqp,
          location: selectedRelocateFrom.value,
          warehouse: selectedRelocateTo.value,
          nomenclature: eqp.nomenclature?.id,
          category: eqp.category?.id,
          currency: eqp.currency?.id,
          owner: eqp.owner?.id,
          purpose: eqp.purpose?.id,
          images: eqp.images?.length ? extractIdsFromFilesResponse(eqp.images) : undefined,
        })),
      ).unwrap()

      const equipmentsPath = 'equipments'
      const currentEquipments: RelocationEquipmentRow[] = form.getFieldValue(equipmentsPath)
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
        })

        newEditableTableRowKeys.push(eqp.id)
      })

      form.setFieldValue(equipmentsPath, [...currentEquipments, ...newEquipments])
      setEditableTableRowKeys((prevState) => prevState.concat(newEditableTableRowKeys))
      handleCloseCreateEquipmentsByFileModal()
    } catch (error) {
      console.error(error)
    }
  }, [
    createEquipmentsMutation,
    editableEquipmentByFileIndex,
    form,
    handleCloseCreateEquipmentsByFileModal,
    selectedRelocateFrom,
    selectedRelocateTo,
  ])

  const createEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
    async ({ images, ...values }, setFields) => {
      if (!activeEquipmentRow || !selectedRelocateTo?.value || !selectedRelocateFrom?.value) return

      try {
        const createdEquipment = await createEquipmentMutation({
          ...values,
          images: images?.length ? extractIdsFromFilesResponse(images) : undefined,
          location: selectedRelocateFrom.value,
          warehouse: selectedRelocateTo.value,
        }).unwrap()

        const rowPath = ['equipments', activeEquipmentRow.rowIndex]

        form.setFieldValue(rowPath, {
          ...form.getFieldValue(rowPath),
          id: createdEquipment.id,
          serialNumber: createdEquipment.serialNumber,
          purpose: createdEquipment.purpose.title,
          condition: typeIsWriteOff
            ? EquipmentConditionEnum.WrittenOff
            : createdEquipment.condition,
          amount: createdEquipment.availableQuantity,
          price: createdEquipment.price,
          currency: createdEquipment.currency?.id,
          quantity: createdEquipment.quantity,
          category: createdEquipment.category,
        })

        handleCloseCreateEquipmentModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [
      activeEquipmentRow,
      selectedRelocateTo?.value,
      selectedRelocateFrom?.value,
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
        currency: values.currency ? currencyList.find((c) => c.id === values.currency) : undefined,
        owner: values.owner ? customerList.find((c) => c.id === values.owner) : undefined,
        purpose: workTypeList.find((w) => w.id === values.purpose),
        nomenclature: nomenclature
          ? {
              id: nomenclature.id,
              title: nomenclature.title,
              measurementUnit: nomenclature.measurementUnit.title,
            }
          : undefined,
      }

      form.setFieldValue(equipmentPath, updatableEquipmentByFile)
      handleCloseEditEquipmentByFileModal()
    },
    [
      currencyList,
      customerList,
      editableEquipmentByFile,
      editableEquipmentByFileIndex,
      equipmentCategoryList,
      form,
      handleCloseEditEquipmentByFileModal,
      nomenclature,
      workTypeList,
    ],
  )

  const handleChangeCategory = useCallback<EquipmentFormModalProps['onChangeCategory']>(
    (category) => {
      setSelectedCategory(category)
      setSelectedNomenclatureId(undefined)
    },
    [],
  )

  const handleChangeRelocateFrom = useCallback<RelocationTaskFormProps['onChangeRelocateFrom']>(
    (value, option) => {
      const equipments: RelocationEquipmentRow[] = form.getFieldValue('equipments') || []
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

      if (checkRelocationTaskTypeIsWriteOff(value)) {
        const relocateToValue = undefined
        form.setFieldValue('relocateTo', relocateToValue)
        setSelectedRelocateTo(relocateToValue)

        const equipments: RelocationEquipmentRow[] = form.getFieldValue('equipments') || []
        const newEquipments = equipments.map((eqp) => ({
          ...eqp,
          condition: EquipmentConditionEnum.WrittenOff,
        }))
        form.setFieldValue('equipments', newEquipments)
      }
    },
    [form],
  )

  /* Установка значений формы */
  useEffect(() => {
    if (relocationTask) {
      const typeIsWriteOff = checkRelocationTaskTypeIsWriteOff(relocationTask.type)
      setSelectedType(relocationTask.type)

      form.setFieldsValue({
        type: relocationTask.type,
        deadlineAtDate: moment(relocationTask.deadlineAt),
        deadlineAtTime: moment(relocationTask.deadlineAt),
        relocateFrom: relocationTask.relocateFrom?.id,
        relocateTo: typeIsWriteOff ? undefined : relocationTask.relocateTo?.id,
        executor: relocationTask.executor?.id,
        comment: relocationTask?.comment || undefined,
      })
    }
  }, [form, relocationTask])

  /* Установка значения состояния объекта прибытия */
  useEffect(() => {
    if (relocationTask && relocateToLocationList.length) {
      const typeIsWriteOff = checkRelocationTaskTypeIsWriteOff(relocationTask.type)

      if (!typeIsWriteOff) {
        const relocateToListItem = relocateToLocationList.find(
          (l) => l.id === relocationTask.relocateTo?.id,
        )

        if (relocateToListItem) {
          setSelectedRelocateTo({
            label: relocateToListItem.title,
            type: relocateToListItem.type,
            value: relocateToListItem.id,
          })
        }
      }
    }
  }, [relocateToLocationList, relocationTask])

  /* Установка значения состояния объекта выбытия */
  useEffect(() => {
    if (relocationTask && relocateFromLocationList.length) {
      const relocateFromListItem = relocateFromLocationList.find(
        (l) => l.id === relocationTask.relocateFrom?.id,
      )

      if (relocateFromListItem) {
        setSelectedRelocateFrom({
          label: relocateFromListItem.title,
          type: relocateFromListItem.type,
          value: relocateFromListItem.id,
        })
      }
    }
  }, [relocateFromLocationList, relocationTask])

  /* Установка значений перечня оборудования */
  useEffect(() => {
    if (relocationTask && relocationEquipmentList.length) {
      const equipments: RelocationEquipmentRow[] = []
      const editableTableRowKeys: Key[] = []
      const typeIsWriteOff = checkRelocationTaskTypeIsWriteOff(relocationTask.type)

      relocationEquipmentList.forEach((eqp) => {
        editableTableRowKeys.push(eqp.id)
        const balance = relocationEquipmentBalanceList.find((b) => b.equipmentId === eqp.id)

        equipments.push({
          rowId: eqp.id,
          id: eqp.id,
          relocationEquipmentId: eqp.relocationEquipmentId,
          serialNumber: eqp?.serialNumber || undefined,
          purpose: eqp.purpose,
          condition: typeIsWriteOff ? EquipmentConditionEnum.WrittenOff : eqp.condition,
          amount: balance?.amount ?? undefined,
          price: eqp?.price ?? undefined,
          currency: eqp?.currency?.id || undefined,
          quantity: eqp.quantity,
          category: eqp.category,
        })
      })

      form.setFieldValue('equipments', equipments)
      setEditableTableRowKeys(editableTableRowKeys)
    }
  }, [form, relocationEquipmentBalanceList, relocationEquipmentList, relocationTask])

  const createEquipmentDisabled =
    !selectedRelocateFrom ||
    !selectedRelocateTo ||
    !checkLocationTypeIsWarehouse(selectedRelocateTo.type)

  const equipmentImagesFormPath: FormItemProps['name'] =
    addRelocationEquipmentImagesModalOpened && activeEquipmentRow
      ? ['equipments', activeEquipmentRow.rowIndex, 'attachments']
      : undefined

  return (
    <>
      <Form<RelocationTaskFormFields>
        data-testid='edit-relocation-task-page'
        form={form}
        layout='vertical'
        onFinish={updateRelocationTask}
        onValuesChange={pickEquipment}
        initialValues={initialValues}
        preserve={false}
      >
        <Row gutter={[40, 40]}>
          <Col span={24}>
            <RelocationTaskForm
              isLoading={updateRelocationTaskIsLoading || relocationTaskIsFetching}
              userList={userList}
              userListIsLoading={userListIsFetching}
              relocateFromLocationList={relocateFromLocationList}
              relocateFromLocationListIsLoading={relocateFromLocationListIsFetching}
              relocateToLocationList={relocateToLocationList}
              relocateToLocationListIsLoading={relocateToLocationListIsFetching}
              type={selectedType}
              onChangeType={handleChangeType}
              onChangeRelocateFrom={handleChangeRelocateFrom}
              onChangeRelocateTo={setSelectedRelocateTo}
            />
          </Col>

          <Col span={24}>
            <Space direction='vertical'>
              <Row justify='space-between' align='middle'>
                <Col>
                  <Text strong>Перечень оборудования</Text>
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
                        <Button
                          disabled={createEquipmentDisabled}
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
                editableKeys={editableTableRowKeys}
                setEditableKeys={setEditableTableRowKeys}
                isLoading={updateRelocationTaskIsLoading}
                equipmentIsLoading={equipmentIsFetching}
                equipmentListIsLoading={relocationEquipmentListIsFetching}
                currencyList={currencyList}
                currencyListIsLoading={currencyListIsFetching}
                equipmentCatalogList={equipmentCatalogList}
                equipmentCatalogListIsLoading={equipmentCatalogListIsFetching}
                canCreateEquipment={!!permissions?.equipmentsCreate}
                addEquipmentBtnDisabled={createEquipmentDisabled}
                onClickCreateEquipment={handleOpenCreateEquipmentModal}
                onClickAddImage={handleOpenAddRelocationEquipmentImagesModal}
              />
            </Space>
          </Col>

          <Col span={24}>
            <Row justify='end' gutter={8}>
              <Col>
                <Button>
                  <Link to={WarehouseRouteEnum.RelocationTaskList}>Отменить</Link>
                </Button>
              </Col>

              <Col>
                <Button type='primary' htmlType='submit' loading={updateRelocationTaskIsLoading}>
                  Сохранить
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
          toggleConfirmModal()
          form.setFieldValue('relocateFrom', prevSelectedRelocateFrom?.value)
          setSelectedRelocateFrom(prevSelectedRelocateFrom)
        }}
        onOk={() => {
          toggleConfirmModal()
          form.setFieldValue('equipments', [])
        }}
      >
        <Text>Вы действительно хотите сменить объект выбытия?</Text>
      </Modal>

      {createEquipmentModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={createEquipmentModalOpened}
              onCancel={handleCloseCreateEquipmentModal}
            />
          }
        >
          <EquipmentFormModal
            open={createEquipmentModalOpened}
            mode='create'
            title='Добавление оборудования'
            okText='Добавить'
            isLoading={createEquipmentIsLoading}
            categoryList={equipmentCategoryList}
            categoryListIsLoading={equipmentCategoryListIsFetching}
            selectedCategory={selectedCategory}
            onChangeCategory={handleChangeCategory}
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
            onChangeNomenclature={setSelectedNomenclatureId}
            onCancel={handleCloseCreateEquipmentModal}
            onSubmit={createEquipment}
            onUploadImage={handleCreateEquipmentImage}
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
            okText='Сохранить'
            initialValues={getEquipmentFormInitialValues(editableEquipmentByFile)}
            categoryList={equipmentCategoryList}
            categoryListIsLoading={equipmentCategoryListIsFetching}
            selectedCategory={selectedCategory}
            onChangeCategory={handleChangeCategory}
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
            onChangeNomenclature={setSelectedNomenclatureId}
            onCancel={handleCloseEditEquipmentByFileModal}
            onSubmit={editEquipmentByFile}
            onUploadImage={handleCreateEquipmentImage}
            imageIsUploading={createAttachmentIsLoading}
            onDeleteImage={deleteAttachment}
            imageIsDeleting={deleteAttachmentIsLoading}
            defaultImages={
              isNumber(editableEquipmentByFileIndex)
                ? form.getFieldValue(['equipmentsByFile', editableEquipmentByFileIndex, 'images'])
                : undefined
            }
          />
        </React.Suspense>
      )}

      {addRelocationEquipmentImagesModalOpened && activeEquipmentRow && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={handleCloseAddRelocationEquipmentImagesModal}
              tip='Загрузка модалки добавления изображений оборудования'
            />
          }
        >
          <AddAttachmentListModal
            form={form}
            formItemName={equipmentImagesFormPath}
            open={addRelocationEquipmentImagesModalOpened}
            title='Добавить изображения оборудования'
            onCancel={handleCloseAddRelocationEquipmentImagesModal}
            isLoading={relocationEquipmentAttachmentListIsFetching}
            onAdd={handleCreateRelocationEquipmentImage}
            onDelete={deleteAttachment}
            isDeleting={deleteAttachmentIsLoading}
            defaultFileList={
              equipmentImagesFormPath
                ? concat(
                    form.getFieldValue(equipmentImagesFormPath) || [],
                    attachmentsToFiles(relocationEquipmentAttachmentList),
                  )
                : undefined
            }
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
            onEdit={handleOpenEditEquipmentByFileModal}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default EditRelocationTaskPage
