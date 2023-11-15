import { useBoolean } from 'ahooks'
import { Button, Col, Drawer, Row, Typography } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'

import { useMatchUserPermissions } from 'modules/user/hooks'
import { equipmentConditionDict } from 'modules/warehouse/constants/equipment'
import { defaultGetNomenclatureListParams } from 'modules/warehouse/constants/nomenclature'
import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'
import { useLazyGetCustomerList } from 'modules/warehouse/hooks/customer'
import {
  useCheckEquipmentCategory,
  useGetEquipment,
  useGetEquipmentCategoryList,
  useGetEquipmentRelocationHistory,
} from 'modules/warehouse/hooks/equipment'
import { useGetNomenclature, useGetNomenclatureList } from 'modules/warehouse/hooks/nomenclature'
import { useGetWarehouseList } from 'modules/warehouse/hooks/warehouse'
import { useGetWorkTypeList } from 'modules/warehouse/hooks/workType'
import { EquipmentCategoryListItemModel } from 'modules/warehouse/models'
import { useUpdateEquipmentMutation } from 'modules/warehouse/services/equipmentApi.service'

import { EditIcon } from 'components/Icons'
import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { useGetCurrencyList } from 'shared/hooks/currency'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import {
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { getYesNoWord, valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'

import { EquipmentFormModalProps } from '../EquipmentFormModal/types'
import { DrawerExtraStyled } from './style'
import { EquipmentDetailsProps, FieldsMaybeHidden } from './types'
import { getHiddenFieldsByCategory } from './utils'

const EquipmentFormModal = React.lazy(() => import('../EquipmentFormModal'))

const EquipmentRelocationHistoryModal = React.lazy(
  () => import('../EquipmentRelocationHistoryModal'),
)

const { Text } = Typography

const EquipmentDetails: FC<EquipmentDetailsProps> = ({ equipmentId, ...props }) => {
  const permissions = useMatchUserPermissions(['EQUIPMENTS_READ', 'RELOCATION_TASKS_READ'])

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<IdType>()

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  const equipmentCategory = useCheckEquipmentCategory(selectedCategory?.code)

  const [relocationHistoryModalOpened, { toggle: toggleOpenRelocationHistoryModal }] =
    useBoolean(false)

  const debouncedToggleOpenRelocationHistoryModal = useDebounceFn(toggleOpenRelocationHistoryModal)

  const [
    editEquipmentModalOpened,
    { setTrue: openEditEquipmentModal, setFalse: closeEditEquipmentModal },
  ] = useBoolean(false)

  const debouncedOpenEditEquipmentModal = useDebounceFn(openEditEquipmentModal)

  const debouncedHandleCloseEditEquipmentModal = useDebounceFn(() => {
    closeEditEquipmentModal()
    setSelectedNomenclatureId(undefined)
    setSelectedCategory(undefined)
  }, [closeEditEquipmentModal])

  const { currentData: equipment, isFetching: equipmentIsFetching } = useGetEquipment({
    equipmentId,
  })

  const { currentData: warehouseList = [], isFetching: warehouseListIsFetching } =
    useGetWarehouseList({ ordering: 'title' }, { skip: !editEquipmentModalOpened })

  const { currentData: equipmentCategoryList = [], isFetching: equipmentCategoryListIsFetching } =
    useGetEquipmentCategoryList(undefined, { skip: !editEquipmentModalOpened })

  const { currentData: currencyList = [], isFetching: currencyListIsFetching } = useGetCurrencyList(
    undefined,
    { skip: !editEquipmentModalOpened },
  )

  const { currentData: workTypeList = [], isFetching: workTypeListIsFetching } = useGetWorkTypeList(
    undefined,
    { skip: !editEquipmentModalOpened },
  )

  const { currentData: nomenclatureList, isFetching: nomenclatureListIsFetching } =
    useGetNomenclatureList(
      equipmentCategory.isConsumable
        ? { ...defaultGetNomenclatureListParams, equipmentHasSerialNumber: false }
        : defaultGetNomenclatureListParams,
      { skip: !editEquipmentModalOpened || !selectedCategory },
    )

  const { currentData: nomenclature } = useGetNomenclature(selectedNomenclatureId!, {
    skip: !selectedNomenclatureId || !editEquipmentModalOpened,
  })

  const [updateEquipmentMutation, { isLoading: updateEquipmentIsLoading }] =
    useUpdateEquipmentMutation()

  useEffect(() => {
    if (equipment?.category && editEquipmentModalOpened) {
      setSelectedCategory(equipment.category)
    }
  }, [editEquipmentModalOpened, equipment?.category])

  useEffect(() => {
    if (equipment?.nomenclature.id && editEquipmentModalOpened) {
      setSelectedNomenclatureId(equipment.nomenclature.id)
    }
  }, [editEquipmentModalOpened, equipment?.nomenclature.id])

  const [getCustomerList, { data: customerList = [], isFetching: customerListIsFetching }] =
    useLazyGetCustomerList()

  useEffect(() => {
    if (editEquipmentModalOpened && Boolean(selectedCategory) && !equipmentCategory.isConsumable) {
      getCustomerList()
    }
  }, [editEquipmentModalOpened, equipmentCategory.isConsumable, getCustomerList, selectedCategory])

  const { currentData: relocationHistory = [], isFetching: relocationHistoryIsFetching } =
    useGetEquipmentRelocationHistory(
      {
        equipmentId,
        statuses: [
          RelocationTaskStatusEnum.New,
          RelocationTaskStatusEnum.Completed,
          RelocationTaskStatusEnum.Returned,
          RelocationTaskStatusEnum.Closed,
        ],
      },
      { skip: !relocationHistoryModalOpened },
    )

  const handleChangeCategory: EquipmentFormModalProps['onChangeCategory'] = (category) => {
    setSelectedCategory(category)
    setSelectedNomenclatureId(undefined)
  }

  const handleEditEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
    async (values, setFields) => {
      try {
        await updateEquipmentMutation({ ...values, equipmentId }).unwrap()
        debouncedHandleCloseEditEquipmentModal()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            setFields(getFieldsErrors(error.data))

            if (error.data.detail) {
              showErrorNotification(error.data.detail)
            }
          } else if (isNotFoundError(error) && error.data.detail) {
            showErrorNotification(error.data.detail)
          } else if (isForbiddenError(error) && error.data.detail) {
            showErrorNotification(error.data.detail)
          }
        }
      }
    },
    [debouncedHandleCloseEditEquipmentModal, equipmentId, updateEquipmentMutation],
  )

  const equipmentFormInitialValues: EquipmentFormModalProps['initialValues'] = equipment
    ? {
        nomenclature: equipment.nomenclature.id,
        condition: equipment.condition,
        category: equipment.category.id,
        purpose: equipment.purpose.id,
        isNew: equipment.isNew,
        isWarranty: equipment.isWarranty,
        isRepaired: equipment.isRepaired,
        title: nomenclature?.title,
        warehouse: equipment.warehouse?.id,
        currency: equipment.currency?.id,
        customerInventoryNumber: equipment.customerInventoryNumber || undefined,
        serialNumber: equipment.serialNumber || undefined,
        quantity: equipment.quantity || undefined,
        price: equipment.price || undefined,
        usageCounter: equipment.usageCounter || undefined,
        owner: equipment.owner?.id,
        comment: equipment.comment || undefined,
      }
    : undefined

  const hiddenFields: FieldsMaybeHidden[] = equipment?.category
    ? getHiddenFieldsByCategory(equipment.category)
    : []

  return (
    <>
      <Drawer
        {...props}
        data-testid='equipment-details'
        title={equipment?.title}
        width={500}
        extra={
          <DrawerExtraStyled>
            <EditIcon $size='large' onClick={debouncedOpenEditEquipmentModal} />
          </DrawerExtraStyled>
        }
      >
        <LoadingArea data-testid='equipment-details-loading' isLoading={equipmentIsFetching}>
          {equipment && (
            <Space $block direction='vertical' size='middle'>
              <Row data-testid='title'>
                <Col span={8}>
                  <Text type='secondary'>Наименование:</Text>
                </Col>

                <Col span={16}>{equipment.title}</Col>
              </Row>

              <Row data-testid='category'>
                <Col span={8}>
                  <Text type='secondary'>Категория:</Text>
                </Col>

                <Col span={16}>{equipment.category.title}</Col>
              </Row>

              <Row data-testid='nomenclature'>
                <Col span={8}>
                  <Text type='secondary'>Номенклатура:</Text>
                </Col>

                <Col span={16}>{equipment.nomenclature.title}</Col>
              </Row>

              {!hiddenFields.includes('customerInventoryNumber') && (
                <Row data-testid='customer-inventory-number'>
                  <Col span={8}>
                    <Text type='secondary'>Инвентарный номер заказчика:</Text>
                  </Col>

                  <Col span={16}>{valueOrHyphen(equipment.customerInventoryNumber)}</Col>
                </Row>
              )}

              {!hiddenFields.includes('inventoryNumber') && (
                <Row data-testid='inventory-number'>
                  <Col span={8}>
                    <Text type='secondary'>Инвентарный номер:</Text>
                  </Col>

                  <Col span={16}>{valueOrHyphen(equipment.inventoryNumber)}</Col>
                </Row>
              )}

              {equipment.nomenclature.equipmentHasSerialNumber && (
                <Row data-testid='serial-number'>
                  <Col span={8}>
                    <Text type='secondary'>Серийный номер:</Text>
                  </Col>

                  <Col span={16}>{valueOrHyphen(equipment.serialNumber)}</Col>
                </Row>
              )}

              <Row data-testid='warehouse'>
                <Col span={8}>
                  <Text type='secondary'>Склад:</Text>
                </Col>

                <Col span={16}>{valueOrHyphen(equipment.warehouse?.title)}</Col>
              </Row>

              <Row data-testid='relocation-history'>
                <Col>
                  <Button
                    disabled={!permissions?.equipmentsRead || !permissions.relocationTasksRead}
                    onClick={debouncedToggleOpenRelocationHistoryModal}
                  >
                    История перемещений
                  </Button>
                </Col>
              </Row>

              <Row data-testid='condition'>
                <Col span={8}>
                  <Text type='secondary'>Состояние:</Text>
                </Col>

                <Col span={16}>{equipmentConditionDict[equipment.condition]}</Col>
              </Row>

              <Row data-testid='created-at'>
                <Col span={8}>
                  <Text type='secondary'>Дата оприходования:</Text>
                </Col>

                <Col span={16}>{formatDate(equipment.createdAt, DATE_FORMAT)}</Col>
              </Row>

              <Row data-testid='created-by'>
                <Col span={8}>
                  <Text type='secondary'>Кем оприходовано:</Text>
                </Col>

                <Col span={16}>{equipment.createdBy.fullName}</Col>
              </Row>

              <Row data-testid='quantity'>
                <Col span={8}>
                  <Text type='secondary'>Количество:</Text>
                </Col>

                <Col span={16}>
                  <Row gutter={16}>
                    <Col span={6}>{valueOrHyphen(equipment.quantity)}</Col>

                    <Col span={18}>
                      <Row>
                        <Col span={6}>
                          <Text type='secondary'>Ед. изм:</Text>
                        </Col>

                        <Col span={18}>
                          <Text>{equipment.measurementUnit.title}</Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row data-testid='price'>
                <Col span={8}>
                  <Text type='secondary'>Стоимость:</Text>
                </Col>

                <Col span={16}>
                  <Row gutter={16}>
                    <Col span={6}>{valueOrHyphen(equipment.price)}</Col>

                    <Col span={18}>
                      <Row>
                        <Col span={6}>
                          <Text type='secondary'>Валюта:</Text>
                        </Col>

                        <Col span={18}>
                          <Text>{valueOrHyphen(equipment.currency?.title)}</Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {!hiddenFields.includes('isNew') && (
                <Row data-testid='is-new'>
                  <Col span={8}>
                    <Text type='secondary'>Новое:</Text>
                  </Col>

                  <Col span={16}>{getYesNoWord(equipment.isNew)}</Col>
                </Row>
              )}

              {!hiddenFields.includes('isWarranty') && (
                <Row data-testid='is-warranty'>
                  <Col span={8}>
                    <Text type='secondary'>На гарантии:</Text>
                  </Col>

                  <Col span={16}>{getYesNoWord(equipment.isWarranty)}</Col>
                </Row>
              )}

              {!hiddenFields.includes('isRepaired') && (
                <Row data-testid='is-repaired'>
                  <Col span={8}>
                    <Text type='secondary'>Отремонтированное:</Text>
                  </Col>

                  <Col span={16}>{getYesNoWord(equipment.isRepaired)}</Col>
                </Row>
              )}

              {!hiddenFields.includes('usageCounter') && (
                <Row data-testid='usage-counter'>
                  <Col span={8}>
                    <Text type='secondary'>Счётчик пробега текущий:</Text>
                  </Col>

                  <Col span={16}>{valueOrHyphen(equipment.usageCounter)}</Col>
                </Row>
              )}

              {!hiddenFields.includes('owner') && (
                <Row data-testid='owner'>
                  <Col span={8}>
                    <Text type='secondary'>Владелец оборудования:</Text>
                  </Col>

                  <Col span={16}>{valueOrHyphen(equipment.owner?.title)}</Col>
                </Row>
              )}

              <Row data-testid='purpose'>
                <Col span={8}>
                  <Text type='secondary'>Назначение оборудования:</Text>
                </Col>

                <Col span={16}>{equipment.purpose.title}</Col>
              </Row>

              <Row data-testid='comment'>
                <Col span={8}>
                  <Text type='secondary'>Комментарий:</Text>
                </Col>

                <Col span={16}>{valueOrHyphen(equipment.comment)}</Col>
              </Row>
            </Space>
          )}
        </LoadingArea>
      </Drawer>

      {editEquipmentModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={editEquipmentModalOpened}
              onCancel={debouncedHandleCloseEditEquipmentModal}
            />
          }
        >
          <EquipmentFormModal
            open={editEquipmentModalOpened}
            mode='edit'
            title='Редактирование оборудования'
            okText='Сохранить'
            isLoading={updateEquipmentIsLoading}
            initialValues={equipmentFormInitialValues}
            categoryList={equipmentCategoryList}
            categoryListIsLoading={equipmentCategoryListIsFetching}
            selectedCategory={selectedCategory}
            onChangeCategory={handleChangeCategory}
            warehouseList={warehouseList}
            warehouseListIsLoading={warehouseListIsFetching}
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
            onCancel={debouncedHandleCloseEditEquipmentModal}
            onSubmit={handleEditEquipment}
          />
        </React.Suspense>
      )}

      {relocationHistoryModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={relocationHistoryModalOpened}
              onCancel={debouncedToggleOpenRelocationHistoryModal}
            />
          }
        >
          <EquipmentRelocationHistoryModal
            open={relocationHistoryModalOpened}
            onCancel={debouncedToggleOpenRelocationHistoryModal}
            dataSource={relocationHistory}
            loading={relocationHistoryIsFetching}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default EquipmentDetails
