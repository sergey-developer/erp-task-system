import { useBoolean, usePrevious } from 'ahooks'
import { Button, Col, Form, FormProps, Modal, Row, Typography } from 'antd'
import moment from 'moment-timezone'
import React, { FC, Key, useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useGetUserList, useMatchUserPermissions } from 'modules/user/hooks'
import EquipmentFormModal from 'modules/warehouse/components/EquipmentFormModal'
import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'
import RelocationEquipmentEditableTable from 'modules/warehouse/components/RelocationEquipmentEditableTable'
import {
  RelocationEquipmentEditableTableProps,
  RelocationEquipmentRowFields,
} from 'modules/warehouse/components/RelocationEquipmentEditableTable/types'
import RelocationTaskForm from 'modules/warehouse/components/RelocationTaskForm'
import {
  LocationOption,
  RelocationTaskFormProps,
} from 'modules/warehouse/components/RelocationTaskForm/types'
import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'
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
import { getRelocationTaskListPageLink } from 'modules/warehouse/utils/relocationTask'

import Space from 'components/Space'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { useGetLocationList } from 'shared/hooks/catalogs/location'
import { useGetCurrencyList } from 'shared/hooks/currency'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import {
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { ArrayFirst } from 'shared/types/utils'
import { mergeDateTime } from 'shared/utils/date'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'

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

  const [currentEquipmentRow, setCurrentEquipmentRow] =
    useState<
      ArrayFirst<
        Parameters<NonNullable<RelocationEquipmentEditableTableProps['onClickAddEquipment']>>
      >
    >()

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<IdType>()

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  const equipmentCategory = useCheckEquipmentCategory(selectedCategory?.code)

  const [
    addEquipmentModalOpened,
    { setTrue: openAddEquipmentModal, setFalse: closeAddEquipmentModal },
  ] = useBoolean(false)

  const handleOpenAddEquipmentModal = useDebounceFn<
    NonNullable<RelocationEquipmentEditableTableProps['onClickAddEquipment']>
  >(
    (row) => {
      setCurrentEquipmentRow(row)
      openAddEquipmentModal()
    },
    [openAddEquipmentModal],
  )

  const handleCloseAddEquipmentModal = useDebounceFn(() => {
    closeAddEquipmentModal()
    setSelectedNomenclatureId(undefined)
    setSelectedCategory(undefined)
    setCurrentEquipmentRow(undefined)
  }, [closeAddEquipmentModal])

  const [confirmModalOpened, { toggle: toggleConfirmModal }] = useBoolean(false)

  const [editableTableRowKeys, setEditableTableRowKeys] = useState<Key[]>([])

  const [selectedRelocateTo, setSelectedRelocateTo] = useState<LocationOption>()
  const [selectedRelocateFrom, setSelectedRelocateFrom] = useState<LocationOption>()
  const prevSelectedRelocateFrom = usePrevious(selectedRelocateFrom)

  const { currentData: relocationTask, isFetching: relocationTaskIsFetching } =
    useGetRelocationTask({ relocationTaskId: relocationTaskId! })

  const {
    currentData: relocationEquipmentList = [],
    isFetching: relocationEquipmentListIsFetching,
  } = useGetRelocationEquipmentList({ relocationTaskId: relocationTaskId! })

  const { currentData: userList = [], isFetching: userListIsFetching } = useGetUserList({
    isManager: false,
  })

  const { currentData: locationList = [], isFetching: locationListIsFetching } =
    useGetLocationList()

  const { currentData: currencyList = [], isFetching: currencyListIsFetching } =
    useGetCurrencyList()

  const { currentData: relocationEquipmentBalanceList = [] } = useGetRelocationEquipmentBalanceList(
    { relocationTaskId: relocationTaskId! },
  )

  const { currentData: equipmentCatalogList = [], isFetching: equipmentCatalogListIsFetching } =
    useGetEquipmentCatalogList(
      {
        locationId: selectedRelocateFrom?.value,
        locationType: selectedRelocateFrom?.type,
      },
      { skip: !selectedRelocateFrom?.value || !selectedRelocateFrom?.type },
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

  const handleUpdateRelocationTask = async (values: RelocationTaskFormFields) => {
    const relocateLocations = locationList.filter(
      (l) => l.id === values.relocateTo || l.id === values.relocateFrom,
    )
    const relocateTo = relocateLocations.find((l) => l.id === values.relocateTo)
    const relocateFrom = relocateLocations.find((l) => l.id === values.relocateFrom)

    if (!relocationTaskId || !relocateTo || !relocateFrom) return

    try {
      const updatedTask = await updateRelocationTaskMutation({
        relocationTaskId,
        deadlineAt: mergeDateTime(values.deadlineAtDate, values.deadlineAtTime).toISOString(),
        equipments: values.equipments.map((e) => ({
          id: e.id,
          quantity: e.quantity,
          condition: e.condition,
          currency: e.currency,
          price: e.price,
        })),
        relocateToId: values.relocateTo,
        relocateToType: relocateTo.type,
        relocateFromId: values.relocateFrom,
        relocateFromType: relocateFrom.type,
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

  const handleFormChange: FormProps<RelocationTaskFormFields>['onValuesChange'] = async (
    changedValues,
    values,
  ) => {
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
            condition: equipment.condition,
            amount: equipment.amount,
            price: equipment.price,
            currency: equipment.currency?.id,
            category: equipment.category,
          })
        }
      }
    }
  }

  const handleChangeRelocateFrom: RelocationTaskFormProps['onChangeRelocateFrom'] = (
    value,
    option,
  ) => {
    const equipments: RelocationEquipmentRowFields[] = form.getFieldValue('equipments') || []
    const relocateFrom = form.getFieldValue('relocateFrom')
    const isShowConfirmation = !!equipments.length && !!relocateFrom
    form.setFieldValue('relocateFrom', value)
    setSelectedRelocateFrom(option)
    if (isShowConfirmation) toggleConfirmModal()
  }

  const handleChangeCategory: EquipmentFormModalProps['onChangeCategory'] = (category) => {
    setSelectedCategory(category)
    setSelectedNomenclatureId(undefined)
  }

  const handleAddEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
    async (values, setFields) => {
      if (!currentEquipmentRow || !selectedRelocateTo?.value || !selectedRelocateFrom?.value) return

      try {
        const createdEquipment = await createEquipmentMutation({
          ...values,
          location: selectedRelocateFrom.value,
          warehouse: selectedRelocateTo.value,
        }).unwrap()

        form.setFieldValue(['equipments', currentEquipmentRow.rowIndex], {
          rowId: createdEquipment.id,
          id: createdEquipment.id,
          serialNumber: createdEquipment.serialNumber,
          purpose: createdEquipment.purpose.title,
          condition: createdEquipment.condition,
          amount: createdEquipment.availableQuantity,
          price: createdEquipment.price,
          currency: createdEquipment.currency?.id,
          quantity: createdEquipment.quantity,
          category: createdEquipment.category,
        })

        setEditableTableRowKeys((prevState) => {
          const index = prevState.indexOf(currentEquipmentRow.rowId)
          const newArr = [...prevState]
          if (index !== -1) {
            newArr[index] = createdEquipment.id
          }
          return newArr
        })

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
      currentEquipmentRow,
      selectedRelocateTo?.value,
      selectedRelocateFrom?.value,
      createEquipmentMutation,
      form,
      handleCloseAddEquipmentModal,
    ],
  )

  useEffect(() => {
    if (relocationTask) {
      form.setFieldsValue({
        deadlineAtDate: moment(relocationTask.deadlineAt),
        deadlineAtTime: moment(relocationTask.deadlineAt),
        relocateFrom: relocationTask.relocateFrom?.id,
        relocateTo: relocationTask.relocateTo?.id,
        executor: relocationTask.executor?.id,
        comment: relocationTask?.comment || undefined,
      })
    }
  }, [form, relocationTask])

  useEffect(() => {
    if (relocationEquipmentList.length && !relocationEquipmentListIsFetching) {
      const equipments: RelocationTaskFormFields['equipments'] = []
      const editableTableRowKeys: Key[] = []

      relocationEquipmentList.forEach((eqp) => {
        editableTableRowKeys.push(eqp.id)
        const balance = relocationEquipmentBalanceList.find((b) => b.equipmentId === eqp.id)

        equipments.push({
          rowId: eqp.id,
          id: eqp.id,
          serialNumber: eqp?.serialNumber || undefined,
          purpose: eqp.purpose,
          condition: eqp.condition,
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
  }, [
    form,
    relocationEquipmentBalanceList,
    relocationEquipmentList,
    relocationEquipmentListIsFetching,
  ])

  useEffect(() => {
    if (relocationTask && locationList.length) {
      const relocateToListItem = locationList.find((l) => l.id === relocationTask.relocateTo?.id)

      if (relocateToListItem) {
        setSelectedRelocateTo({
          label: relocateToListItem.title,
          type: relocateToListItem.type,
          value: relocateToListItem.id,
        })
      }
    }
  }, [locationList, relocationTask])

  useEffect(() => {
    if (relocationTask && locationList.length) {
      const relocateFromListItem = locationList.find(
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
  }, [locationList, locationListIsFetching, relocationTask])

  const addEquipmentBtnDisabled =
    !selectedRelocateFrom ||
    !selectedRelocateTo ||
    selectedRelocateTo.type !== LocationTypeEnum.Warehouse

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
              locationList={locationList}
              locationListIsLoading={locationListIsFetching}
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
                canAddEquipment={!!userPermissions?.equipmentsCreate}
                addEquipmentBtnDisabled={addEquipmentBtnDisabled}
                onClickAddEquipment={handleOpenAddEquipmentModal}
                onClickAddImage={() => {}}
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
          nomenclatureList={nomenclatureList?.results || []}
          nomenclatureListIsLoading={nomenclatureListIsFetching}
          onChangeNomenclature={setSelectedNomenclatureId}
          onCancel={handleCloseAddEquipmentModal}
          onSubmit={handleAddEquipment}
        />
      )}
    </>
  )
}

export default EditRelocationTaskPage
