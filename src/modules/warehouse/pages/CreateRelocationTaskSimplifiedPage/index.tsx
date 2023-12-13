import { useBoolean } from 'ahooks'
import { Button, Col, Form, FormProps, Input, Row, Select, Typography } from 'antd'
import get from 'lodash/get'
import React, { FC, Key, useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { getCompleteAt } from 'modules/task/components/TaskDetails/MainDetails/utils'
import { TaskModel } from 'modules/task/models'
import { getOlaStatusTextType } from 'modules/task/utils/task'
import { useGetUserList, useMatchUserPermissions } from 'modules/user/hooks'
import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'
import RelocationEquipmentSimplifiedEditableTable from 'modules/warehouse/components/RelocationEquipmentSimplifiedEditableTable'
import {
  ActiveEquipmentRow,
  RelocationEquipmentRow,
} from 'modules/warehouse/components/RelocationEquipmentSimplifiedEditableTable/types'
import { defaultGetNomenclatureListParams } from 'modules/warehouse/constants/nomenclature'
import { useLazyGetCustomerList } from 'modules/warehouse/hooks/customer'
import {
  useCreateEquipment,
  useGetEquipmentCatalogList,
  useGetEquipmentCategoryList,
  useGetEquipmentListTemplate,
  useLazyGetEquipment,
} from 'modules/warehouse/hooks/equipment'
import { useGetNomenclature, useGetNomenclatureList } from 'modules/warehouse/hooks/nomenclature'
import { useCreateRelocationTaskITSM } from 'modules/warehouse/hooks/relocationTask'
import { useGetWarehouseMy } from 'modules/warehouse/hooks/warehouse'
import { useGetWorkTypeList } from 'modules/warehouse/hooks/workType'
import { EquipmentCategoryListItemModel } from 'modules/warehouse/models'
import { SimplifiedRelocationTaskFormFields } from 'modules/warehouse/types'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'

import ModalFallback from 'components/Modals/ModalFallback'
import SeparatedText from 'components/SeparatedText'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import { CANCEL_TEXT, CREATE_TEXT } from 'shared/constants/common'
import { idAndFullNameSelectFieldNames } from 'shared/constants/selectField'
import { onlyRequiredRules } from 'shared/constants/validation'
import { useGetCurrencyList } from 'shared/hooks/currency'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'
import { filterOptionBy, valueOrHyphen } from 'shared/utils/common'
import { extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { extractPaginationResults } from 'shared/utils/pagination'

const EquipmentFormModal = React.lazy(
  () => import('modules/warehouse/components/EquipmentFormModal'),
)

const { Text } = Typography
const { TextArea } = Input

const CreateRelocationTaskSimplifiedPage: FC = () => {
  const location = useLocation()
  const fromPath = get(location, 'state.from', '')
  const task: MaybeUndefined<
    Pick<
      TaskModel,
      'id' | 'shop' | 'recordId' | 'olaStatus' | 'olaNextBreachTime' | 'olaEstimatedTime'
    >
  > = get(location, 'state.task')
  const taskShop = task?.shop

  const navigate = useNavigate()

  const permissions = useMatchUserPermissions(['EQUIPMENTS_CREATE'])

  const [form] = Form.useForm<SimplifiedRelocationTaskFormFields>()
  const equipmentsToShopFormValue: SimplifiedRelocationTaskFormFields['equipmentsToShop'] =
    Form.useWatch('equipmentsToShop', form)
  const equipmentsToWarehouseFormValue: SimplifiedRelocationTaskFormFields['equipmentsToWarehouse'] =
    Form.useWatch('equipmentsToWarehouse', form)

  const [activeEquipmentRow, setActiveEquipmentRow] = useState<ActiveEquipmentRow>()

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<IdType>()

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  const categoryIsConsumable = checkEquipmentCategoryIsConsumable(selectedCategory?.code)

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
  } = useGetEquipmentCatalogList({ locationId: warehouseMy?.id! }, { skip: !taskShop?.id })

  const {
    currentData: equipmentCatalogListToWarehouse = [],
    isFetching: equipmentCatalogListToWarehouseIsFetching,
  } = useGetEquipmentCatalogList({ locationId: taskShop?.id! }, { skip: !warehouseMy?.id })

  const [getEquipment, { isFetching: equipmentIsFetching }] = useLazyGetEquipment()

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

  const { currentData: nomenclature, isFetching: nomenclatureIsFetching } = useGetNomenclature(
    selectedNomenclatureId!,
    {
      skip: !selectedNomenclatureId || !createEquipmentModalOpened,
    },
  )

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

  const [createTaskMutation, { isLoading: createTaskIsLoading }] = useCreateRelocationTaskITSM()

  const [createEquipmentMutation, { isLoading: createEquipmentIsLoading }] = useCreateEquipment()

  const [getEquipmentListTemplate, { isFetching: getEquipmentListTemplateIsFetching }] =
    useGetEquipmentListTemplate()

  const handleCreateTask = async (values: SimplifiedRelocationTaskFormFields) => {
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
        })),
        equipmentsToWarehouse: values.equipmentsToWarehouse?.map((eqp) => ({
          id: eqp.id,
          quantity: eqp.quantity,
          condition: eqp.condition,
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
          const { data: equipment } = await getEquipment({ equipmentId: changes.id })

          if (equipment) {
            const currentEquipment = values.equipmentsToWarehouse?.[Number(index)]

            if (currentEquipment) {
              const isConsumable = checkEquipmentCategoryIsConsumable(equipment.category.code)

              form.setFieldValue(['equipmentsToWarehouse', index], {
                ...currentEquipment,
                serialNumber: equipment.serialNumber,
                purpose: equipment.purpose.title,
                condition: equipment.condition,
                amount: equipment.amount,
                quantity: isConsumable ? currentEquipment.quantity : 1,
                category: equipment.category,
              })
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
          const { data: equipment } = await getEquipment({ equipmentId: changes.id })

          if (equipment) {
            const currentEquipment = values.equipmentsToShop?.[Number(index)]

            if (currentEquipment) {
              const isConsumable = checkEquipmentCategoryIsConsumable(equipment.category.code)

              form.setFieldValue(['equipmentsToShop', index], {
                ...currentEquipment,
                serialNumber: equipment.serialNumber,
                purpose: equipment.purpose.title,
                condition: equipment.condition,
                amount: equipment.amount,
                quantity: isConsumable ? currentEquipment.quantity : 1,
                category: equipment.category,
              })
            }
          }
        }
      }
    }

  const handleFormChange: FormProps<SimplifiedRelocationTaskFormFields>['onValuesChange'] = async (
    changedValues,
    values,
  ) => {
    await pickEquipmentToWarehouse(changedValues, values)
    await pickEquipmentToShop(changedValues, values)
  }

  const createEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
    async ({ images, ...values }, setFields) => {
      if (!activeEquipmentRow || !warehouseMy || !taskShop?.id) return

      try {
        const createdEquipment = await createEquipmentMutation({
          ...values,
          images: images?.length ? extractIdsFromFilesResponse(images) : undefined,
          location: taskShop.id,
          warehouse: warehouseMy.id,
        }).unwrap()

        const rowPath = [activeEquipmentRow.tableName, activeEquipmentRow.rowIndex]

        form.setFieldValue(rowPath, {
          ...form.getFieldValue(rowPath),
          id: createdEquipment.id,
          serialNumber: createdEquipment.serialNumber,
          purpose: createdEquipment.purpose.title,
          condition: createdEquipment.condition,
          amount: createdEquipment.availableQuantity,
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
      createEquipmentMutation,
      form,
      handleCloseCreateEquipmentModal,
      taskShop?.id,
      warehouseMy,
    ],
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
        onFinish={handleCreateTask}
        onValuesChange={handleFormChange}
      >
        <Row gutter={[40, 40]}>
          <Col span={24}>
            <SeparatedText>
              <Text strong>
                Перемещение оборудования для заявки {valueOrHyphen(task?.recordId)}
              </Text>

              {task?.olaStatus && task?.olaEstimatedTime && task?.olaNextBreachTime ? (
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

                {warehouseMyIsFetching ? (
                  <Spinner centered={false} />
                ) : (
                  <Text strong>"{valueOrHyphen(warehouseMy?.title)}"</Text>
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
              />
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

                    {warehouseMyIsFetching ? (
                      <Spinner centered={false} />
                    ) : (
                      <Text strong>"{valueOrHyphen(warehouseMy?.title)}"</Text>
                    )}
                  </Space>
                </Col>

                {permissions?.equipmentsCreate && (
                  <Col>
                    <Button
                      onClick={getEquipmentListTemplate}
                      loading={getEquipmentListTemplateIsFetching}
                    >
                      Скачать шаблон
                    </Button>
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
                <Button type='primary' htmlType='submit' loading={createTaskIsLoading}>
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
            onUploadImage={() => {}}
            imageIsUploading={false}
            onDeleteImage={() => {}}
            imageIsDeleting={false}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default CreateRelocationTaskSimplifiedPage
