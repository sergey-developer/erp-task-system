import { useBoolean } from 'ahooks'
import { Button, Col, Input, Row, Space } from 'antd'
import { SearchProps } from 'antd/es/input'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import EquipmentFilter from 'modules/warehouse/components/EquipmentFilter'
import { EquipmentFilterFormFields } from 'modules/warehouse/components/EquipmentFilter/types'
import EquipmentModal from 'modules/warehouse/components/EquipmentModal'
import { EquipmentModalProps } from 'modules/warehouse/components/EquipmentModal/types'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { useGetCustomerList } from 'modules/warehouse/hooks/customer'
import { useLazyGetEquipment, useGetEquipmentCategoryList } from 'modules/warehouse/hooks/equipment'
import { useGetNomenclature, useGetNomenclatureList } from 'modules/warehouse/hooks/nomenclature'
import { useGetWarehouseList } from 'modules/warehouse/hooks/warehouse'
import { useGetWorkTypeList } from 'modules/warehouse/hooks/workType'
import { EquipmentCategoryListItemModel } from 'modules/warehouse/models'
import {
  useCreateEquipmentMutation,
  useUpdateEquipmentMutation,
} from 'modules/warehouse/services/equipmentApi.service'

import FilterButton from 'components/Buttons/FilterButton'

import { useGetCurrencyList } from 'shared/hooks/currency'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import {
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'

import { EquipmentPageContextType } from './context'

const { Search } = Input

const EquipmentPageLayout: FC = () => {
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState<string>()

  const [filterOpened, { toggle: toggleFilterOpened }] = useBoolean(false)
  const [filterValues, setFilterValues] = useState<EquipmentFilterFormFields>()

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<IdType>()

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()

  const [
    addEquipmentModalOpened,
    { toggle: toggleAddEquipmentModal, setFalse: closeAddEquipmentModal },
  ] = useBoolean(false)

  const debouncedToggleAddEquipmentModal = useDebounceFn(toggleAddEquipmentModal)

  const handleCloseAddEquipmentModal = useCallback(() => {
    closeAddEquipmentModal()
    setSelectedNomenclatureId(undefined)
    setSelectedCategory(undefined)
  }, [closeAddEquipmentModal])

  const debouncedHandleCloseAddEquipmentModal = useDebounceFn(handleCloseAddEquipmentModal)

  const [
    editEquipmentModalOpened,
    { toggle: toggleEditEquipmentModal, setFalse: closeEditEquipmentModal },
  ] = useBoolean(false)

  const debouncedToggleEditEquipmentModal = useDebounceFn(toggleEditEquipmentModal)

  const handleCloseEditEquipmentModal = useCallback(() => {
    closeEditEquipmentModal()
    setSelectedNomenclatureId(undefined)
    setSelectedCategory(undefined)
  }, [closeEditEquipmentModal])

  const debouncedHandleCloseEditEquipmentModal = useDebounceFn(handleCloseEditEquipmentModal)

  const { currentData: warehouseList = [], isFetching: warehouseListIsFetching } =
    useGetWarehouseList(
      { ordering: 'title' },
      { skip: !filterOpened && !addEquipmentModalOpened && !editEquipmentModalOpened },
    )

  const { currentData: equipmentCategoryList = [], isFetching: equipmentCategoryListIsFetching } =
    useGetEquipmentCategoryList(undefined, {
      skip: !filterOpened && !addEquipmentModalOpened && !editEquipmentModalOpened,
    })

  const { currentData: customerList = [], isFetching: customerListIsFetching } = useGetCustomerList(
    undefined,
    {
      skip: !filterOpened && !addEquipmentModalOpened && !editEquipmentModalOpened,
    },
  )

  const { currentData: currencyList = [], isFetching: currencyListIsFetching } = useGetCurrencyList(
    undefined,
    { skip: !addEquipmentModalOpened && !editEquipmentModalOpened },
  )

  const { currentData: workTypeList = [], isFetching: workTypeListIsFetching } = useGetWorkTypeList(
    undefined,
    { skip: !addEquipmentModalOpened && !editEquipmentModalOpened },
  )

  const { currentData: nomenclatureList, isFetching: nomenclatureListIsFetching } =
    useGetNomenclatureList(undefined, {
      skip: !addEquipmentModalOpened && !editEquipmentModalOpened,
    })

  const [getEquipment, { currentData: equipment, isFetching: equipmentIsFetching }] =
    useLazyGetEquipment()

  const { currentData: nomenclature } = useGetNomenclature(
    selectedNomenclatureId! || equipment?.nomenclature.id!,
    {
      skip: !selectedNomenclatureId && !editEquipmentModalOpened,
    },
  )

  const [createEquipmentMutation, { isLoading: createEquipmentIsLoading }] =
    useCreateEquipmentMutation()

  const [updateEquipmentMutation, { isLoading: updateEquipmentIsLoading }] =
    useUpdateEquipmentMutation()

  useEffect(() => {
    if (equipment?.category.id) {
      setSelectedCategory(equipment.category)
    }
  }, [equipment?.category])

  const handleApplyFilter = (values: EquipmentFilterFormFields) => {
    navigate(WarehouseRouteEnum.EquipmentNomenclatureList)
    setFilterValues(values)
    toggleFilterOpened()
  }

  const handleSearch: SearchProps['onSearch'] = (value) => {
    navigate(WarehouseRouteEnum.EquipmentNomenclatureList)
    setSearchValue(value)
  }

  const handleAddEquipment: EquipmentModalProps['onSubmit'] = useCallback(
    async (values, setFields) => {
      try {
        await createEquipmentMutation(values).unwrap()
        toggleAddEquipmentModal()
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
    [createEquipmentMutation, toggleAddEquipmentModal],
  )

  const handleEditEquipment: EquipmentModalProps['onSubmit'] = useCallback(
    async (values, setFields) => {
      if (!equipment) return

      try {
        await updateEquipmentMutation({ ...values, equipmentId: equipment.id }).unwrap()
        toggleEditEquipmentModal()
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
    [equipment, toggleEditEquipmentModal, updateEquipmentMutation],
  )

  const initialFilterValues: EquipmentFilterFormFields = useMemo(
    () => ({
      conditions: [
        EquipmentConditionEnum.Working,
        EquipmentConditionEnum.Broken,
        EquipmentConditionEnum.NonRepairable,
      ],
      categories: equipmentCategoryList.map((c) => c.id),
      warehouses: warehouseList.map((w) => w.id),
      owners: undefined,
      priceTo: undefined,
      priceFrom: undefined,
      createdAt: undefined,
      isNew: undefined,
      isRepaired: undefined,
      isWarranty: undefined,
    }),
    [equipmentCategoryList, warehouseList],
  )

  const equipmentInitialValues: EquipmentModalProps['initialValues'] = equipment
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

  const routeContext = useMemo<EquipmentPageContextType>(
    () => ({
      filter: filterValues,
      search: searchValue,
      equipment,
      equipmentIsLoading: equipmentIsFetching,
      getEquipment: (id) => getEquipment({ equipmentId: id }).unwrap(),
      onClickEditEquipment: debouncedToggleEditEquipmentModal,
    }),
    [
      debouncedToggleEditEquipmentModal,
      equipment,
      equipmentIsFetching,
      filterValues,
      getEquipment,
      searchValue,
    ],
  )

  return (
    <>
      <Row data-testid='equipment-page-layout' gutter={[16, 16]}>
        <Col span={24}>
          <Row justify='space-between'>
            <Col>
              <Space size='middle'>
                <FilterButton onClick={toggleFilterOpened} />

                <Button onClick={debouncedToggleAddEquipmentModal}>+ Добавить оборудование</Button>
              </Space>
            </Col>

            <Col>
              <Search allowClear placeholder='Поиск оборудования' onSearch={handleSearch} />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Outlet context={routeContext} />
        </Col>
      </Row>

      {filterOpened && (
        <EquipmentFilter
          visible={filterOpened}
          values={filterValues}
          initialValues={initialFilterValues}
          warehouseList={warehouseList}
          warehouseListIsLoading={warehouseListIsFetching}
          categoryList={equipmentCategoryList}
          categoryListIsLoading={equipmentCategoryListIsFetching}
          ownerList={customerList}
          ownerListIsLoading={customerListIsFetching}
          onClose={toggleFilterOpened}
          onApply={handleApplyFilter}
        />
      )}

      {addEquipmentModalOpened && (
        <EquipmentModal
          open={addEquipmentModalOpened}
          title='Добавление оборудования'
          okText='Добавить'
          isLoading={createEquipmentIsLoading}
          categoryList={equipmentCategoryList}
          categoryListIsLoading={equipmentCategoryListIsFetching}
          selectedCategory={selectedCategory}
          onChangeCategory={setSelectedCategory}
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
          onCancel={debouncedHandleCloseAddEquipmentModal}
          onSubmit={handleAddEquipment}
        />
      )}

      {editEquipmentModalOpened && (
        <EquipmentModal
          open={editEquipmentModalOpened}
          title='Редактирование оборудования'
          okText='Сохранить'
          isLoading={updateEquipmentIsLoading}
          initialValues={equipmentInitialValues}
          categoryList={equipmentCategoryList}
          categoryListIsLoading={equipmentCategoryListIsFetching}
          selectedCategory={selectedCategory}
          onChangeCategory={setSelectedCategory}
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
      )}
    </>
  )
}

export default EquipmentPageLayout
