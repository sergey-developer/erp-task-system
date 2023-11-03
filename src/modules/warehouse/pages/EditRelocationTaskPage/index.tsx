import { useBoolean, usePrevious } from 'ahooks'
import { Button, Col, Form, FormProps, Modal, Row, Typography } from 'antd'
import { RcFile } from 'antd/es/upload'
import moment from 'moment-timezone'
import React, { FC, Key, useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { AttachmentTypeEnum } from 'modules/attachment/constants'
import { useCreateAttachment, useDeleteAttachment } from 'modules/attachment/hooks'
import { useGetUserList, useMatchUserPermissions } from 'modules/user/hooks'
import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'
import RelocationEquipmentEditableTable from 'modules/warehouse/components/RelocationEquipmentEditableTable'
import { RelocationEquipmentRowFields } from 'modules/warehouse/components/RelocationEquipmentEditableTable/types'
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
import { updateRelocationTaskMessages } from 'modules/warehouse/constants/relocationTask'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { useLazyGetCustomerList } from 'modules/warehouse/hooks/customer'
import {
  useCheckEquipmentCategory,
  useGetEquipmentCatalogList,
  useGetEquipmentCategoryList,
  useLazyGetEquipment,
} from 'modules/warehouse/hooks/equipment'
import { useGetNomenclature, useGetNomenclatureList } from 'modules/warehouse/hooks/nomenclature'
import {
  useGetRelocationEquipmentBalanceList,
  useGetRelocationEquipmentList,
  useGetRelocationTask,
} from 'modules/warehouse/hooks/relocationTask'
import { useGetWorkTypeList } from 'modules/warehouse/hooks/workType'
import { EquipmentCategoryListItemModel } from 'modules/warehouse/models'
import { useCreateEquipmentMutation } from 'modules/warehouse/services/equipmentApi.service'
import { useUpdateRelocationTaskMutation } from 'modules/warehouse/services/relocationTaskApi.service'
import { RelocationTaskFormFields } from 'modules/warehouse/types'
import {
  checkRelocationTaskTypeIsWriteOff,
  getRelocationTaskListPageLink,
} from 'modules/warehouse/utils/relocationTask'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { useLazyGetLocationList } from 'shared/hooks/catalogs/location'
import { useGetCurrencyList } from 'shared/hooks/currency'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import {
  getErrorDetailStr,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { checkLocationTypeIsWarehouse } from 'shared/utils/catalogs/location/checkLocationType'
import { mergeDateTime } from 'shared/utils/date'
import { extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'
import { extractPaginationResults } from 'shared/utils/pagination'

import {
  getConditionsByRelocationTaskType,
  getRelocateFromLocationListParams,
  getRelocateToLocationListParams,
} from '../CreateRelocationTaskPage/utils'

const EquipmentFormModal = React.lazy(
  () => import('modules/warehouse/components/EquipmentFormModal'),
)

const { Text } = Typography

const initialValues: Pick<RelocationTaskFormFields, 'equipments'> = {
  equipments: [],
}

const EditRelocationTaskPage: FC = () => {
  const navigate = useNavigate()

  // todo: создать хук который будет возвращать распарсеные значения
  const params = useParams<'id'>()
  const relocationTaskId = Number(params?.id) || undefined

  const userPermissions = useMatchUserPermissions(['EQUIPMENTS_CREATE'])

  const [form] = Form.useForm<RelocationTaskFormFields>()

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<IdType>()

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  const equipmentCategory = useCheckEquipmentCategory(selectedCategory?.code)

  const [
    addEquipmentModalOpened,
    { setTrue: openAddEquipmentModal, setFalse: closeAddEquipmentModal },
  ] = useBoolean(false)

  const handleOpenAddEquipmentModal = useDebounceFn(openAddEquipmentModal)

  const handleCloseAddEquipmentModal = useDebounceFn(() => {
    closeAddEquipmentModal()
    setSelectedNomenclatureId(undefined)
    setSelectedCategory(undefined)
  }, [closeAddEquipmentModal])

  const [confirmModalOpened, { toggle: toggleConfirmModal }] = useBoolean(false)

  const [editableTableRowKeys, setEditableTableRowKeys] = useState<Key[]>([])

  const [selectedType, setSelectedType] = useState<RelocationTaskFormFields['type']>()
  const typeIsWriteOff = checkRelocationTaskTypeIsWriteOff(selectedType)

  const [selectedRelocateTo, setSelectedRelocateTo] = useState<LocationOption>()
  const [selectedRelocateFrom, setSelectedRelocateFrom] = useState<LocationOption>()
  const prevSelectedRelocateFrom = usePrevious(selectedRelocateFrom)

  const [createAttachmentMutation] = useCreateAttachment()
  const [deleteAttachmentMutation, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

  const { currentData: relocationTask, isFetching: relocationTaskIsFetching } =
    useGetRelocationTask({ relocationTaskId: relocationTaskId! })

  const {
    currentData: relocationEquipmentList = [],
    isFetching: relocationEquipmentListIsFetching,
  } = useGetRelocationEquipmentList({ relocationTaskId: relocationTaskId! })

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
        conditions: getConditionsByRelocationTaskType(selectedType!),
      },
      { skip: !selectedRelocateFrom?.value || !selectedType },
    )

  const [getEquipment] = useLazyGetEquipment()

  const { currentData: equipmentCategoryList = [], isFetching: equipmentCategoryListIsFetching } =
    useGetEquipmentCategoryList(undefined, { skip: !addEquipmentModalOpened })

  const { currentData: workTypeList = [], isFetching: workTypeListIsFetching } = useGetWorkTypeList(
    undefined,
    { skip: !addEquipmentModalOpened || !selectedCategory || !selectedNomenclatureId },
  )

  const { currentData: nomenclatureList, isFetching: nomenclatureListIsFetching } =
    useGetNomenclatureList(
      equipmentCategory.isConsumable
        ? { ...defaultGetNomenclatureListParams, equipmentHasSerialNumber: false }
        : defaultGetNomenclatureListParams,
      { skip: !addEquipmentModalOpened || !selectedCategory },
    )

  const { currentData: nomenclature } = useGetNomenclature(selectedNomenclatureId!, {
    skip: !selectedNomenclatureId || !addEquipmentModalOpened,
  })

  const [getCustomerList, { data: customerList = [], isFetching: customerListIsFetching }] =
    useLazyGetCustomerList()

  useEffect(() => {
    if (
      addEquipmentModalOpened &&
      !!selectedCategory &&
      !equipmentCategory.isConsumable &&
      !!selectedNomenclatureId
    ) {
      getCustomerList()
    }
  }, [
    addEquipmentModalOpened,
    equipmentCategory.isConsumable,
    getCustomerList,
    selectedCategory,
    selectedNomenclatureId,
  ])

  const [updateRelocationTaskMutation, { isLoading: updateRelocationTaskIsLoading }] =
    useUpdateRelocationTaskMutation()

  const [createEquipmentMutation, { isLoading: createEquipmentIsLoading }] =
    useCreateEquipmentMutation()

  const handleCreateAttachment = useCallback<EquipmentFormModalProps['onUploadImage']>(
    async ({ file, onSuccess, onError }) => {
      try {
        const createdAttachment = await createAttachmentMutation({
          file: file as RcFile,
          type: AttachmentTypeEnum.EquipmentImage,
        }).unwrap()

        onSuccess && onSuccess({ id: createdAttachment.id })
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            onError && onError({ name: '', message: getErrorDetailStr(error) || '' })
          }
        }
      }
    },
    [createAttachmentMutation],
  )

  const handleDeleteAttachment: EquipmentFormModalProps['onDeleteImage'] = useCallback(
    async (file) => {
      /* поле response это то что передаётся в колбэк onSuccess при создании */
      await deleteAttachmentMutation({ attachmentId: file.response.id }).unwrap()
    },
    [deleteAttachmentMutation],
  )

  const handleUpdateRelocationTask = async (values: RelocationTaskFormFields) => {
    if (!relocationTaskId) return

    try {
      const updatedTask = await updateRelocationTaskMutation({
        relocationTaskId,
        type: values.type,
        deadlineAt: mergeDateTime(values.deadlineAtDate, values.deadlineAtTime).toISOString(),
        equipments: values.equipments.map((e) => ({
          id: e.id,
          quantity: e.quantity,
          condition: e.condition,
          currency: e.currency,
          price: e.price,
        })),
        relocateToId: values.relocateTo,
        relocateFromId: values.relocateFrom,
        executor: values.executor,
        comment: values.comment,
      }).unwrap()

      navigate(getRelocationTaskListPageLink(updatedTask.id))
    } catch (error) {
      if (isErrorResponse(error)) {
        if (isBadRequestError(error)) {
          form.setFields(getFieldsErrors(error.data))

          if (error.data.detail) {
            showErrorNotification(error.data.detail)
          }
        } else if (isForbiddenError(error) && error.data.detail) {
          showErrorNotification(error.data.detail)
        } else if (isNotFoundError(error) && error.data.detail) {
          showErrorNotification(error.data.detail)
        } else {
          showErrorNotification(updateRelocationTaskMessages.commonError)
        }
      }
    }
  }

  const handlePickEquipmentFromSelect: FormProps<RelocationTaskFormFields>['onValuesChange'] =
    async (changedValues, values) => {
      if (changedValues.equipments && !Array.isArray(changedValues.equipments)) {
        const [index, changes] = Object.entries(changedValues.equipments)[0] as [
          string,
          Partial<Omit<RelocationEquipmentRowFields, 'rowId'>>,
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

  const handleFormChange: FormProps<RelocationTaskFormFields>['onValuesChange'] = async (
    changedValues,
    values,
  ) => {
    await handlePickEquipmentFromSelect(changedValues, values)
  }

  const handleAddEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
    async ({ images, ...values }, setFields) => {
      if (!selectedRelocateTo?.value || !selectedRelocateFrom?.value) return

      try {
        const createdEquipment = await createEquipmentMutation({
          ...values,
          images: images?.length ? extractIdsFromFilesResponse(images) : undefined,
          location: selectedRelocateFrom.value,
          warehouse: selectedRelocateTo.value,
        }).unwrap()

        const newEquipmentIndex = (form.getFieldValue('equipments') || []).length

        form.setFieldValue(['equipments', newEquipmentIndex], {
          rowId: createdEquipment.id,
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

        setEditableTableRowKeys((prevState) => [...prevState, newEquipmentIndex])

        handleCloseAddEquipmentModal()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            setFields(getFieldsErrors(error.data))

            if (error.data.detail) {
              showErrorNotification(error.data.detail)
            }
          } else if (isForbiddenError(error) && error.data.detail) {
            showErrorNotification(error.data.detail)
          }
        }
      }
    },
    [
      selectedRelocateTo?.value,
      selectedRelocateFrom?.value,
      createEquipmentMutation,
      form,
      typeIsWriteOff,
      handleCloseAddEquipmentModal,
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
      const equipments: RelocationEquipmentRowFields[] = form.getFieldValue('equipments') || []
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

        const equipments: RelocationEquipmentRowFields[] = form.getFieldValue('equipments') || []
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

  /* Установка значения состояния объекта выбытия */
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

  /* Установка значения состояния объекта прибытия */
  useEffect(() => {
    if (relocationTask && relocateFromLocationList.length) {
      const relocateFromListItem = relocateFromLocationList.find(
        (l) => l.id === relocationTask.relocateFrom?.id,
      )

      if (relocateFromListItem) {
        setSelectedRelocateFrom({ type: relocateFromListItem.type, value: relocateFromListItem.id })
      }
    }
  }, [relocateFromLocationList, relocationTask])

  /* Установка значений перечня оборудования */
  useEffect(() => {
    if (relocationTask && relocationEquipmentList.length) {
      const equipments: RelocationEquipmentRowFields[] = []
      const editableTableRowKeys: Key[] = []
      const typeIsWriteOff = checkRelocationTaskTypeIsWriteOff(relocationTask.type)

      relocationEquipmentList.forEach((eqp) => {
        editableTableRowKeys.push(eqp.id)
        const balance = relocationEquipmentBalanceList.find((b) => b.equipmentId === eqp.id)

        equipments.push({
          rowId: eqp.id,
          id: eqp.id,
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

  const addEquipmentBtnDisabled =
    !selectedRelocateFrom ||
    !selectedRelocateTo ||
    !checkLocationTypeIsWarehouse(selectedRelocateTo.type)

  return (
    <>
      <Form<RelocationTaskFormFields>
        data-testid='edit-relocation-task-page'
        form={form}
        layout='vertical'
        onFinish={handleUpdateRelocationTask}
        onValuesChange={handleFormChange}
        initialValues={initialValues}
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
              <Text strong>Перечень оборудования</Text>

              <RelocationEquipmentEditableTable
                editableKeys={editableTableRowKeys}
                setEditableKeys={setEditableTableRowKeys}
                isLoading={updateRelocationTaskIsLoading}
                equipmentListIsLoading={relocationEquipmentListIsFetching}
                currencyList={currencyList}
                currencyListIsLoading={currencyListIsFetching}
                equipmentCatalogList={equipmentCatalogList}
                equipmentCatalogListIsLoading={equipmentCatalogListIsFetching}
                canAddEquipment={userPermissions?.equipmentsCreate}
                addEquipmentBtnDisabled={addEquipmentBtnDisabled}
                onClickAddEquipment={handleOpenAddEquipmentModal}
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

      {addEquipmentModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback open={addEquipmentModalOpened} onCancel={handleCloseAddEquipmentModal} />
          }
        >
          <EquipmentFormModal
            open={addEquipmentModalOpened}
            mode='create'
            title='Добавление оборудования'
            okText='Добавить'
            isLoading={createEquipmentIsLoading}
            categoryList={equipmentCategoryList}
            categoryListIsLoading={equipmentCategoryListIsFetching}
            selectedCategory={selectedCategory}
            onChangeCategory={handleChangeCategory}
            currencyList={currencyList}
            currencyListIsFetching={currencyListIsFetching}
            ownerList={customerList}
            ownerListIsFetching={customerListIsFetching}
            workTypeList={workTypeList}
            workTypeListIsFetching={workTypeListIsFetching}
            nomenclature={nomenclature}
            nomenclatureList={extractPaginationResults(nomenclatureList)}
            nomenclatureListIsLoading={nomenclatureListIsFetching}
            onChangeNomenclature={setSelectedNomenclatureId}
            onCancel={handleCloseAddEquipmentModal}
            onSubmit={handleAddEquipment}
            onUploadImage={handleCreateAttachment}
            onDeleteImage={handleDeleteAttachment}
            deleteImageIsLoading={deleteAttachmentIsLoading}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default EditRelocationTaskPage
