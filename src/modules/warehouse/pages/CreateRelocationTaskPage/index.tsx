import { useBoolean, usePrevious } from 'ahooks'
import { Button, Col, Form, FormProps, Modal, Row, Typography } from 'antd'
import React, { FC, Key, useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
import {
  createRelocationTaskMessages,
  relocateFromLocationTypes,
  relocateFromWarehouseTypes,
  relocateToLocationTypes,
  relocateToWarehouseTypes,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { useLazyGetCustomerList } from 'modules/warehouse/hooks/customer'
import {
  useCheckEquipmentCategory,
  useGetEquipmentCatalogList,
  useGetEquipmentCategoryList,
  useLazyGetEquipment,
} from 'modules/warehouse/hooks/equipment'
import { useGetNomenclature, useGetNomenclatureList } from 'modules/warehouse/hooks/nomenclature'
import { useGetWorkTypeList } from 'modules/warehouse/hooks/workType'
import { EquipmentCategoryListItemModel } from 'modules/warehouse/models'
import { useCreateEquipmentMutation } from 'modules/warehouse/services/equipmentApi.service'
import { useCreateRelocationTaskMutation } from 'modules/warehouse/services/relocationTaskApi.service'
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

const CreateRelocationTaskPage: FC = () => {
  const navigate = useNavigate()

  const userPermissions = useMatchUserPermissions(['EQUIPMENTS_CREATE'])

  const [form] = Form.useForm<RelocationTaskFormFields>()

  const [newEquipmentRow, setNewEquipmentRow] =
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
      setNewEquipmentRow(row)
      openAddEquipmentModal()
    },
    [openAddEquipmentModal],
  )

  const handleCloseAddEquipmentModal = useDebounceFn(() => {
    closeAddEquipmentModal()
    setSelectedNomenclatureId(undefined)
    setSelectedCategory(undefined)
    setNewEquipmentRow(undefined)
  }, [closeAddEquipmentModal])

  const [confirmModalOpened, { toggle: toggleConfirmModal }] = useBoolean(false)

  const [editableTableRowKeys, setEditableTableRowKeys] = useState<Key[]>([])

  const [selectedType, setSelectedType] = useState<RelocationTaskTypeEnum>(
    RelocationTaskTypeEnum.Relocation,
  )
  const [selectedRelocateTo, setSelectedRelocateTo] = useState<LocationOption>()
  const [selectedRelocateFrom, setSelectedRelocateFrom] = useState<LocationOption>()
  const prevSelectedRelocateFrom = usePrevious(selectedRelocateFrom)

  const { currentData: userList = [], isFetching: userListIsFetching } = useGetUserList({
    isManager: false,
  })

  const {
    currentData: relocateFromLocationList = [],
    isFetching: relocateFromLocationListIsFetching,
  } = useGetLocationList({
    locationTypes: relocateFromLocationTypes[selectedType],
    warehouseTypes: relocateFromWarehouseTypes[selectedType],
  })

  const { currentData: relocateToLocationList = [], isFetching: relocateToLocationListIsFetching } =
    useGetLocationList({
      locationTypes: relocateToLocationTypes[selectedType],
      warehouseTypes: relocateToWarehouseTypes[selectedType],
    })

  const { currentData: currencyList = [], isFetching: currencyListIsFetching } =
    useGetCurrencyList()

  const { currentData: equipmentCatalogList = [], isFetching: equipmentCatalogListIsFetching } =
    useGetEquipmentCatalogList(
      { locationId: selectedRelocateFrom?.value },
      { skip: !selectedRelocateFrom?.value },
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

  const [createRelocationTaskMutation, { isLoading: createRelocationTaskIsLoading }] =
    useCreateRelocationTaskMutation()

  const [createEquipmentMutation, { isLoading: createEquipmentIsLoading }] =
    useCreateEquipmentMutation()

  const handleCreateRelocationTask = async (values: RelocationTaskFormFields) => {
    try {
      const createdTask = await createRelocationTaskMutation({
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

      navigate(getRelocationTaskListPageLink(createdTask.id))
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
          showErrorNotification(createRelocationTaskMessages.commonError)
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

      if (changes.id) {
        const { data: equipment } = await getEquipment({ equipmentId: changes.id })

        if (equipment) {
          const currentEquipment = values.equipments[Number(index)]
          const isConsumable = equipment.category.code === EquipmentCategoryEnum.Consumable

          form.setFieldValue(['equipments', index], {
            ...currentEquipment,
            serialNumber: equipment.serialNumber,
            purpose: equipment.purpose.title,
            condition: equipment.condition,
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

  const handleChangeCategory: EquipmentFormModalProps['onChangeCategory'] = (category) => {
    setSelectedCategory(category)
    setSelectedNomenclatureId(undefined)
  }

  const getEquipmentFormValue = useCallback<() => RelocationEquipmentRowFields[]>(
    () => form.getFieldValue('equipments') || [],
    [form],
  )

  const handleAddEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
    async (values, setFields) => {
      if (!newEquipmentRow || !selectedRelocateTo?.value || !selectedRelocateFrom?.value) return

      try {
        const createdEquipment = await createEquipmentMutation({
          ...values,
          location: selectedRelocateFrom.value,
          warehouse: selectedRelocateTo.value,
        }).unwrap()

        form.setFieldValue(['equipments', newEquipmentRow.rowIndex], {
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
          const index = prevState.indexOf(newEquipmentRow.rowId)
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
      newEquipmentRow,
      selectedRelocateTo?.value,
      selectedRelocateFrom?.value,
      createEquipmentMutation,
      form,
      handleCloseAddEquipmentModal,
    ],
  )

  const handleChangeRelocateFrom: RelocationTaskFormProps['onChangeRelocateFrom'] = (
    value,
    option,
  ) => {
    const equipments = getEquipmentFormValue()
    const relocateFrom = form.getFieldValue('relocateFrom')
    const isShowConfirmation = !!equipments.length && !!relocateFrom
    form.setFieldValue('relocateFrom', value)
    setSelectedRelocateFrom(option)
    if (isShowConfirmation) toggleConfirmModal()
  }

  const addEquipmentBtnDisabled =
    !selectedRelocateFrom ||
    !selectedRelocateTo ||
    selectedRelocateTo.type !== LocationTypeEnum.Warehouse

  return (
    <>
      <Form<RelocationTaskFormFields>
        data-testid='create-relocation-task-page'
        form={form}
        layout='vertical'
        onFinish={handleCreateRelocationTask}
        onValuesChange={handleFormChange}
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
              onChangeType={setSelectedType}
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
                isLoading={createRelocationTaskIsLoading}
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

export default CreateRelocationTaskPage
