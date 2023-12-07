import { useBoolean, usePrevious } from 'ahooks'
import { Button, Col, Form, FormProps, Modal, Row, Typography, Upload, UploadProps } from 'antd'
import isNumber from 'lodash/isNumber'
import stubFalse from 'lodash/stubFalse'
import React, { FC, Key, useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { AttachmentTypeEnum } from 'modules/attachment/constants'
import { useCreateAttachment, useDeleteAttachment } from 'modules/attachment/hooks'
import { useGetUserList, useMatchUserPermissions } from 'modules/user/hooks'
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
} from 'modules/warehouse/components/RelocationTaskForm/types'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { defaultGetNomenclatureListParams } from 'modules/warehouse/constants/nomenclature'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'
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
import { useCreateRelocationTask } from 'modules/warehouse/hooks/relocationTask'
import { useGetWorkTypeList } from 'modules/warehouse/hooks/workType'
import {
  CreateEquipmentsBadRequestErrorResponse,
  EquipmentCategoryListItemModel,
} from 'modules/warehouse/models'
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

import { getEquipmentFormInitialValues } from '../../components/EquipmentDetails/utils'
import {
  getEquipmentCatalogListParams,
  getRelocateFromLocationListParams,
  getRelocateToLocationListParams,
} from './utils'

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

const initialValues: Pick<RelocationTaskFormFields, 'equipments' | 'type'> = {
  type: RelocationTaskTypeEnum.Relocation,
  equipments: [],
}

const CreateRelocationTaskPage: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

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
    setCreateEquipmentsErrors(undefined)
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
    editEquipmentModalOpened,
    { setTrue: openEditEquipmentModal, setFalse: closeEditEquipmentModal },
  ] = useBoolean(false)

  const handleOpenEditEquipmentModal = useDebounceFn<CreateEquipmentsByFileModalProps['onEdit']>(
    (row: EquipmentByFileTableRow, index) => {
      setEditableEquipmentByFile(row)
      setEditableEquipmentByFileIndex(index)
      openEditEquipmentModal()
    },
  )

  const handleCloseEditEquipmentModal = useDebounceFn(() => {
    closeEditEquipmentModal()
    setSelectedNomenclatureId(undefined)
    setSelectedCategory(undefined)
    setEditableEquipmentByFile(undefined)
    setEditableEquipmentByFileIndex(undefined)
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

  const [createEquipmentsErrors, setCreateEquipmentsErrors] =
    useState<CreateEquipmentsBadRequestErrorResponse>()

  const [editableEquipmentByFile, setEditableEquipmentByFile] = useState<EquipmentByFileTableRow>()
  const [editableEquipmentByFileIndex, setEditableEquipmentByFileIndex] = useState<number>()

  const [editableTableRowKeys, setEditableTableRowKeys] = useState<Key[]>([])

  const [selectedType, setSelectedType] = useState<RelocationTaskFormFields['type']>(
    RelocationTaskTypeEnum.Relocation,
  )
  const typeIsWriteOff = checkRelocationTaskTypeIsWriteOff(selectedType)

  const [selectedRelocateTo, setSelectedRelocateTo] = useState<LocationOption>()
  const [selectedRelocateFrom, setSelectedRelocateFrom] = useState<LocationOption>()
  const prevSelectedRelocateFrom = usePrevious(selectedRelocateFrom)

  const [createAttachment] = useCreateAttachment()
  const [deleteAttachment, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

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
    getRelocateFromLocationList(getRelocateFromLocationListParams(selectedType))
  }, [getRelocateFromLocationList, selectedType])

  useEffect(() => {
    if (!typeIsWriteOff) {
      getRelocateToLocationList(getRelocateToLocationListParams(selectedType))
    }
  }, [getRelocateToLocationList, selectedType, typeIsWriteOff])

  const { currentData: currencyList = [], isFetching: currencyListIsFetching } =
    useGetCurrencyList()

  const { currentData: equipmentCatalogList = [], isFetching: equipmentCatalogListIsFetching } =
    useGetEquipmentCatalogList(
      {
        locationId: selectedRelocateFrom?.value,
        ...getEquipmentCatalogListParams(selectedType),
      },
      { skip: !selectedRelocateFrom?.value },
    )

  const [getEquipment, { isFetching: equipmentIsFetching }] = useLazyGetEquipment()

  const { currentData: equipmentCategoryList = [], isFetching: equipmentCategoryListIsFetching } =
    useGetEquipmentCategoryList(undefined, {
      skip: !createEquipmentModalOpened && !editEquipmentModalOpened,
    })

  const { currentData: workTypeList = [], isFetching: workTypeListIsFetching } = useGetWorkTypeList(
    undefined,
    {
      skip:
        (!createEquipmentModalOpened && !editEquipmentModalOpened) ||
        !selectedCategory ||
        !selectedNomenclatureId,
    },
  )

  const { currentData: nomenclatureList, isFetching: nomenclatureListIsFetching } =
    useGetNomenclatureList(
      categoryIsConsumable
        ? { ...defaultGetNomenclatureListParams, equipmentHasSerialNumber: false }
        : defaultGetNomenclatureListParams,
      { skip: (!createEquipmentModalOpened && !editEquipmentModalOpened) || !selectedCategory },
    )

  const { currentData: nomenclature, isFetching: nomenclatureIsFetching } = useGetNomenclature(
    selectedNomenclatureId!,
    { skip: !selectedNomenclatureId || (!createEquipmentModalOpened && !editEquipmentModalOpened) },
  )

  const [getCustomerList, { data: customerList = [], isFetching: customerListIsFetching }] =
    useLazyGetCustomerList()

  useEffect(() => {
    if (
      (createEquipmentModalOpened || editEquipmentModalOpened) &&
      !!selectedCategory &&
      !categoryIsConsumable &&
      !!selectedNomenclatureId
    ) {
      getCustomerList()
    }
  }, [
    createEquipmentModalOpened,
    editEquipmentModalOpened,
    categoryIsConsumable,
    getCustomerList,
    selectedCategory,
    selectedNomenclatureId,
  ])

  const [createRelocationTaskMutation, { isLoading: createRelocationTaskIsLoading }] =
    useCreateRelocationTask()

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

  const createRelocationTask = async (values: RelocationTaskFormFields) => {
    try {
      const createdTask = await createRelocationTaskMutation({
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

      const fromPath = location.state?.from
      fromPath ? navigate(fromPath) : navigate(getRelocationTaskListPageLink(createdTask.id))
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
    if (changedValues.equipments && !Array.isArray(changedValues.equipments)) {
      const [index, changes] = Object.entries(changedValues.equipments)[0] as [
        string,
        Partial<RelocationEquipmentRow>,
      ]

      if (changes.id) {
        const { data: equipment } = await getEquipment({ equipmentId: changes.id })

        if (equipment) {
          const currentEquipment = values.equipments[Number(index)]
          const isConsumable = checkEquipmentCategoryIsConsumable(equipment.category.code)

          form.setFieldValue(['equipments', index], {
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
        }
      }
    }
  }

  const importEquipmentsByFile: NonNullable<UploadProps['onChange']> = async ({ file }) => {
    try {
      const equipments = await importEquipmentsByFileMutation({
        file: file as FileToSend,
      }).unwrap()

      const equipmentsByFile: EquipmentByFileTableRow[] = equipments.map((eqp) => ({
        ...eqp,
        nomenclature: eqp.nomenclature?.id,
        category: eqp.category?.id,
        purpose: eqp.purpose?.id,
        currency: eqp.currency?.id,
        owner: eqp.owner?.id,
        title: eqp.title || undefined,
        condition: eqp.condition || undefined,
        isNew: eqp.isNew || undefined,
        isWarranty: eqp.isWarranty || undefined,
        isRepaired: eqp.isRepaired || undefined,
        customerInventoryNumber: eqp.customerInventoryNumber || undefined,
        serialNumber: eqp.serialNumber || undefined,
        quantity: eqp.quantity || undefined,
        price: eqp.price || undefined,
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
        equipmentsByFile.map((eqp) => ({
          ...eqp,
          location: selectedRelocateFrom.value,
          warehouse: selectedRelocateTo.value,
          nomenclature: eqp.nomenclature,
          category: eqp.category,
          currency: eqp.currency,
          owner: eqp.owner,
          purpose: eqp.purpose,
          title: eqp.title,
          condition: eqp.condition,
          comment: eqp.comment,
          price: eqp.price,
          isNew: eqp.isNew,
          isWarranty: eqp.isWarranty,
          isRepaired: eqp.isRepaired,
          quantity: eqp.quantity,
          customerInventoryNumber: eqp.customerInventoryNumber,
          serialNumber: eqp.serialNumber,
          usageCounter: eqp.usageCounter,
          images: eqp.images?.map((imgId) => ({ id: imgId })),
        })),
      ).unwrap()

      if (createdEquipments) {
        const equipmentsPath = 'equipments'
        const currentEquipments: RelocationEquipmentRow[] = form.getFieldValue(equipmentsPath)
        const newEquipments: RelocationEquipmentRow[] = createdEquipments.map((eqp) => ({
          rowId: eqp.id,
          id: eqp.id,
          serialNumber: eqp.serialNumber || undefined,
          price: eqp.price || undefined,
          quantity: eqp.quantity,
          condition: eqp.condition,
          purpose: eqp.purpose.title,
          currency: eqp.currency?.id,
          category: eqp.category,
        }))

        form.setFieldValue(equipmentsPath, [...currentEquipments, ...newEquipments])
      }
    } catch (error) {
      if (isErrorResponse(error) && isBadRequestError(error) && error.data.errorList) {
        const errors = error.data.errorList as CreateEquipmentsBadRequestErrorResponse
        setCreateEquipmentsErrors(errors)
      }
    }
  }, [createEquipmentsMutation, selectedRelocateFrom, selectedRelocateTo])

  const createEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
    async ({ images, ...values }, setFields) => {
      if (!activeEquipmentRow || !selectedRelocateTo || !selectedRelocateFrom) return

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
      selectedRelocateTo,
      selectedRelocateFrom,
      createEquipmentMutation,
      form,
      typeIsWriteOff,
      handleCloseCreateEquipmentModal,
    ],
  )

  const editEquipmentFromFile: EquipmentFormModalProps['onSubmit'] = useCallback(
    async ({ images, ...values }) => {
      if (!editableEquipmentByFile || !isNumber(editableEquipmentByFileIndex)) return

      const equipmentPath = ['equipmentsByFile', editableEquipmentByFileIndex]
      const newEquipment: EquipmentByFileTableRow = {
        rowId: editableEquipmentByFile.rowId,
        title: values.title,
        customerInventoryNumber: values.customerInventoryNumber,
        serialNumber: values.serialNumber,
        comment: values.comment,
        condition: values.condition,
        quantity: values.quantity,
        price: values.price,
        usageCounter: values.usageCounter,
        isNew: values.isNew,
        isWarranty: values.isWarranty,
        isRepaired: values.isRepaired,
        category: values.category,
        currency: values.currency,
        owner: values.owner,
        purpose: values.purpose,
        nomenclature: values.nomenclature,
        images: images?.length ? extractIdsFromFilesResponse(images) : undefined,
      }

      form.setFieldValue(equipmentPath, newEquipment)
      handleCloseEditEquipmentModal()
    },
    [editableEquipmentByFile, editableEquipmentByFileIndex, form, handleCloseEditEquipmentModal],
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

  const createEquipmentDisabled =
    !selectedRelocateFrom ||
    !selectedRelocateTo ||
    !checkLocationTypeIsWarehouse(selectedRelocateTo.type)

  const equipmentImagesFormPath =
    addRelocationEquipmentImagesModalOpened && activeEquipmentRow
      ? ['equipments', activeEquipmentRow.rowIndex, 'attachments']
      : undefined

  // const defaultEquipmentImages = useMemo(
  //   () =>
  //     editEquipmentModalOpened && totalEquipmentAttachmentList?.results.length
  //       ? attachmentsToFiles(totalEquipmentAttachmentList.results)
  //       : undefined,
  //   [editEquipmentModalOpened, totalEquipmentAttachmentList?.results],
  // )

  return (
    <>
      <Form<RelocationTaskFormFields>
        data-testid='create-relocation-task-page'
        form={form}
        layout='vertical'
        onFinish={createRelocationTask}
        onValuesChange={pickEquipment}
        initialValues={initialValues}
      >
        <Row gutter={[40, 40]}>
          <Col span={24}>
            <RelocationTaskForm
              isLoading={createRelocationTaskIsLoading}
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
            <Space direction='vertical' size='middle'>
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
                isLoading={createRelocationTaskIsLoading}
                equipmentIsLoading={equipmentIsFetching}
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
                <Button type='primary' htmlType='submit' loading={createRelocationTaskIsLoading}>
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
          form.setFieldValue('equipments', [])
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
            onDeleteImage={deleteAttachment}
            imageIsDeleting={deleteAttachmentIsLoading}
          />
        </React.Suspense>
      )}

      {editEquipmentModalOpened && (
        <React.Suspense fallback={<ModalFallback open onCancel={handleCloseEditEquipmentModal} />}>
          <EquipmentFormModal
            open={editEquipmentModalOpened}
            mode='create'
            title='Изменить добавляемое оборудование'
            okText='Сохранить'
            initialValues={getEquipmentFormInitialValues(editableEquipmentByFile, nomenclature)}
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
            onCancel={handleCloseEditEquipmentModal}
            onSubmit={editEquipmentFromFile}
            onUploadImage={handleCreateEquipmentImage}
            onDeleteImage={deleteAttachment}
            imageIsDeleting={deleteAttachmentIsLoading}
            // defaultImages={defaultEquipmentImages}
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
            onAdd={handleCreateRelocationEquipmentImage}
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
            data={importedEquipmentsByFile}
            errors={createEquipmentsErrors}
            onEdit={handleOpenEditEquipmentModal}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default CreateRelocationTaskPage
