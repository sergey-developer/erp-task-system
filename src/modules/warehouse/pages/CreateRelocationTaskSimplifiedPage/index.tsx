import { useBoolean } from 'ahooks'
import { Button, Col, Form, FormProps, Input, Row, Select, Typography } from 'antd'
import get from 'lodash/get'
import React, { FC, Key, useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useGetUserList, useMatchUserPermissions } from 'modules/user/hooks'
import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'
import { ActiveEquipmentRow } from 'modules/warehouse/components/RelocationEquipmentEditableTable/types'
import RelocationEquipmentSimplifiedEditableTable from 'modules/warehouse/components/RelocationEquipmentSimplifiedEditableTable'
import { defaultGetNomenclatureListParams } from 'modules/warehouse/constants/nomenclature'
import { useLazyGetCustomerList } from 'modules/warehouse/hooks/customer'
import {
  useCreateEquipment,
  useGetEquipmentCatalogList,
  useGetEquipmentCategoryList,
  useLazyGetEquipment,
} from 'modules/warehouse/hooks/equipment'
import { useGetNomenclature, useGetNomenclatureList } from 'modules/warehouse/hooks/nomenclature'
import { useCreateRelocationTask } from 'modules/warehouse/hooks/relocationTask'
import { useGetWorkTypeList } from 'modules/warehouse/hooks/workType'
import { EquipmentCategoryListItemModel } from 'modules/warehouse/models'
import { SimplifiedRelocationTaskFormFields } from 'modules/warehouse/types'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { CANCEL_TEXT, CREATE_TEXT } from 'shared/constants/common'
import { useGetCurrencyList } from 'shared/hooks/currency'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { getFieldsErrors } from 'shared/utils/form'
import { extractPaginationResults } from 'shared/utils/pagination'

import { idAndFullNameSelectFieldNames } from '../../../../shared/constants/selectField'
import { useGetWarehouseMy } from '../../hooks/warehouse/useGetWarehouseMy'

const EquipmentFormModal = React.lazy(
  () => import('modules/warehouse/components/EquipmentFormModal'),
)

const { Text } = Typography
const { TextArea } = Input

const CreateRelocationTaskSimplifiedPage: FC = () => {
  const location = useLocation()
  // console.log('location state: ', location.state)
  const fromPath = get(location, 'state.from', '')
  const locationStateTask = get(location, 'state.task')

  const navigate = useNavigate()

  const permissions = useMatchUserPermissions(['EQUIPMENTS_CREATE'])

  const [form] = Form.useForm<SimplifiedRelocationTaskFormFields>()
  console.log('form values: ', form.getFieldsValue())

  const [activeEquipmentRow, setActiveEquipmentRow] = useState<ActiveEquipmentRow>()

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<IdType>()

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  const categoryIsConsumable = checkEquipmentCategoryIsConsumable(selectedCategory?.code)

  const [
    createEquipmentModalOpened,
    { setTrue: openCreateEquipmentModal, setFalse: closeCreateEquipmentModal },
  ] = useBoolean(false)

  const handleOpenCreateEquipmentModal = useDebounceFn(
    (row: ActiveEquipmentRow) => {
      setActiveEquipmentRow(row)
      openCreateEquipmentModal()
    },
    [openCreateEquipmentModal],
  )

  const handleCloseCreateEquipmentModal = useDebounceFn(() => {
    closeCreateEquipmentModal()
    setSelectedNomenclatureId(undefined)
    setSelectedCategory(undefined)
    setActiveEquipmentRow(undefined)
  }, [closeCreateEquipmentModal])

  const [toWarehouseEditableTableRowKeys, setToWarehouseEditableTableRowKeys] = useState<Key[]>([])

  const [fromWarehouseEditableTableRowKeys, setFromWarehouseEditableTableRowKeys] = useState<Key[]>(
    [],
  )

  const { currentData: warehouseMy, isFetching: warehouseMyIsFetching } = useGetWarehouseMy()

  const { currentData: userList = [], isFetching: userListIsFetching } = useGetUserList({
    isManager: false,
  })

  const { currentData: currencyList = [], isFetching: currencyListIsFetching } = useGetCurrencyList(
    undefined,
    { skip: !createEquipmentModalOpened },
  )

  const {
    currentData: equipmentCatalogListFromWarehouse = [],
    isFetching: equipmentCatalogListFromWarehouseIsFetching,
  } = useGetEquipmentCatalogList(
    { locationId: get(locationStateTask, 'shop.id') },
    { skip: !get(locationStateTask, 'shop.id') },
  )

  const {
    currentData: equipmentCatalogListToWarehouse = [],
    isFetching: equipmentCatalogListToWarehouseIsFetching,
  } = useGetEquipmentCatalogList({ locationId: warehouseMy?.id! }, { skip: !warehouseMy?.id })

  const [getEquipment] = useLazyGetEquipment()

  const { currentData: equipmentCategoryList = [], isFetching: equipmentCategoryListIsFetching } =
    useGetEquipmentCategoryList(undefined, { skip: !createEquipmentModalOpened })

  const { currentData: workTypeList = [], isFetching: workTypeListIsFetching } = useGetWorkTypeList(
    undefined,
    { skip: !createEquipmentModalOpened || !selectedCategory || !selectedNomenclatureId },
  )

  const { currentData: nomenclatureList, isFetching: nomenclatureListIsFetching } =
    useGetNomenclatureList(
      categoryIsConsumable
        ? { ...defaultGetNomenclatureListParams, equipmentHasSerialNumber: false }
        : defaultGetNomenclatureListParams,
      { skip: !createEquipmentModalOpened || !selectedCategory },
    )

  const { currentData: nomenclature } = useGetNomenclature(selectedNomenclatureId!, {
    skip: !selectedNomenclatureId || !createEquipmentModalOpened,
  })

  const [getCustomerList, { data: customerList = [], isFetching: customerListIsFetching }] =
    useLazyGetCustomerList()

  useEffect(() => {
    if (
      createEquipmentModalOpened &&
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
  ])

  const [createRelocationTaskMutation, { isLoading: createRelocationTaskIsLoading }] =
    useCreateRelocationTask()

  const [createEquipmentMutation, { isLoading: createEquipmentIsLoading }] = useCreateEquipment()

  const handleCreateRelocationTask = async (values: SimplifiedRelocationTaskFormFields) => {
    try {
    } catch (error) {
      if (isErrorResponse(error) && isBadRequestError(error)) {
        form.setFields(getFieldsErrors(error.data))
      }
    }
  }

  const pickEquipmentFromWarehouse: FormProps<SimplifiedRelocationTaskFormFields>['onValuesChange'] =
    async (changedValues, values) => {
      console.log({ changedValues, values })
      // if (changedValues.equipments && !Array.isArray(changedValues.equipments)) {
      //   const [index, changes] = Object.entries(changedValues.equipments)[0] as [
      //     string,
      //     Partial<Omit<RelocationEquipmentRow, 'rowId'>>,
      //   ]
      //
      //   if (changes.id) {
      //     const { data: equipment } = await getEquipment({ equipmentId: changes.id })
      //
      //     if (equipment) {
      //       const currentEquipment = values.equipments[Number(index)]
      //       const isConsumable = checkEquipmentCategoryIsConsumable(equipment.category.code)
      //
      //       form.setFieldValue(['equipments', index], {
      //         ...currentEquipment,
      //         serialNumber: equipment.serialNumber,
      //         purpose: equipment.purpose.title,
      //         condition: equipment.condition,
      //         amount: equipment.amount,
      //         price: equipment.price,
      //         currency: equipment.currency?.id,
      //         quantity: isConsumable ? currentEquipment.quantity : 1,
      //         category: equipment.category,
      //       })
      //     }
      //   }
      // }
    }

  const handleFormChange: FormProps<SimplifiedRelocationTaskFormFields>['onValuesChange'] = async (
    changedValues,
    values,
  ) => {
    await pickEquipmentFromWarehouse(changedValues, values)
  }

  const handleCreateEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
    async (values, setFields) => {
      if (!activeEquipmentRow) return

      try {
        const createdEquipment = await createEquipmentMutation({
          location: 1,
          warehouse: 1,
          ...values,
        }).unwrap()

        form.setFieldValue(['equipments', activeEquipmentRow.rowIndex], {
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

        setToWarehouseEditableTableRowKeys((prevState) => {
          const index = prevState.indexOf(activeEquipmentRow.rowId)
          const newArr = [...prevState]
          if (index !== -1) {
            newArr[index] = createdEquipment.id
          }
          return newArr
        })

        handleCloseCreateEquipmentModal()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [activeEquipmentRow, createEquipmentMutation, form, handleCloseCreateEquipmentModal],
  )

  const handleChangeCategory = useCallback<EquipmentFormModalProps['onChangeCategory']>(
    (category) => {
      setSelectedCategory(category)
      setSelectedNomenclatureId(undefined)
    },
    [],
  )

  return (
    <>
      <Form<SimplifiedRelocationTaskFormFields>
        data-testid='create-relocation-task-simplified-page'
        form={form}
        layout='vertical'
        onFinish={handleCreateRelocationTask}
        onValuesChange={handleFormChange}
      >
        <Row gutter={[40, 40]}>
          <Col span={24}>
            <Row gutter={40}>
              <Col span={8}>
                <Form.Item data-testid='controller-form-item' label='Контролер' name='controller'>
                  <Select
                    placeholder='Выберите значение'
                    options={userList}
                    loading={userListIsFetching}
                    fieldNames={idAndFullNameSelectFieldNames}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item data-testid='comment-form-item' label='Комментарий' name='comment'>
                  <TextArea placeholder='Добавьте комментарий' />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Space direction='vertical'>
              <Text strong>
                Перечень оборудования для перемещения со склада "" на объект "
                {get(locationStateTask, 'shop.title', '')}"
              </Text>

              <RelocationEquipmentSimplifiedEditableTable
                name='equipmentsToShop'
                editableKeys={fromWarehouseEditableTableRowKeys}
                setEditableKeys={setFromWarehouseEditableTableRowKeys}
                isLoading={createRelocationTaskIsLoading}
                equipmentCatalogList={equipmentCatalogListFromWarehouse}
                equipmentCatalogListIsLoading={equipmentCatalogListFromWarehouseIsFetching}
              />
            </Space>
          </Col>

          <Col span={24}>
            <Space direction='vertical'>
              <Text strong>
                Перечень оборудования для перемещения с объекта "
                {get(locationStateTask, 'shop.title', '')}" на склад ""
              </Text>

              <RelocationEquipmentSimplifiedEditableTable
                name='equipmentsToWarehouse'
                editableKeys={toWarehouseEditableTableRowKeys}
                setEditableKeys={setToWarehouseEditableTableRowKeys}
                isLoading={createRelocationTaskIsLoading}
                equipmentCatalogList={equipmentCatalogListToWarehouse}
                equipmentCatalogListIsLoading={equipmentCatalogListToWarehouseIsFetching}
                canCreateEquipment={permissions?.equipmentsCreate}
                onClickCreateEquipment={handleOpenCreateEquipmentModal}
              />
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
                <Button type='primary' htmlType='submit'>
                  {CREATE_TEXT}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

      {createEquipmentModalOpened && (
        <React.Suspense
          fallback={<ModalFallback open onCancel={handleCloseCreateEquipmentModal} />}
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
            currencyListIsFetching={currencyListIsFetching}
            ownerList={customerList}
            ownerListIsFetching={customerListIsFetching}
            workTypeList={workTypeList}
            workTypeListIsFetching={workTypeListIsFetching}
            nomenclature={nomenclature}
            nomenclatureList={extractPaginationResults(nomenclatureList)}
            nomenclatureListIsLoading={nomenclatureListIsFetching}
            onChangeNomenclature={setSelectedNomenclatureId}
            onCancel={handleCloseCreateEquipmentModal}
            onSubmit={handleCreateEquipment}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default CreateRelocationTaskSimplifiedPage
