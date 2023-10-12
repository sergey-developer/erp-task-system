import { useBoolean } from 'ahooks'
import { Button, Col, Input, Row, Space } from 'antd'
import { SearchProps } from 'antd/es/input'
import { FC, useCallback, useMemo, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import EquipmentFilter from 'modules/warehouse/components/EquipmentFilter'
import { EquipmentFilterFormFields } from 'modules/warehouse/components/EquipmentFilter/types'
import EquipmentFormModal from 'modules/warehouse/components/EquipmentFormModal'
import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { useGetCustomerList } from 'modules/warehouse/hooks/customer'
import { useGetEquipmentCategoryList } from 'modules/warehouse/hooks/equipment'
import { useGetNomenclature, useGetNomenclatureList } from 'modules/warehouse/hooks/nomenclature'
import { useGetWarehouseList } from 'modules/warehouse/hooks/warehouse'
import { useGetWorkTypeList } from 'modules/warehouse/hooks/workType'
import { EquipmentCategoryListItemModel } from 'modules/warehouse/models'
import { useCreateEquipmentMutation } from 'modules/warehouse/services/equipmentApi.service'

import FilterButton from 'components/Buttons/FilterButton'

import { useGetCurrencyList } from 'shared/hooks/currency'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
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

  const { currentData: warehouseList = [], isFetching: warehouseListIsFetching } =
    useGetWarehouseList({ ordering: 'title' }, { skip: !filterOpened && !addEquipmentModalOpened })

  const { currentData: equipmentCategoryList = [], isFetching: equipmentCategoryListIsFetching } =
    useGetEquipmentCategoryList(undefined, { skip: !filterOpened && !addEquipmentModalOpened })

  const { currentData: customerList = [], isFetching: customerListIsFetching } = useGetCustomerList(
    undefined,
    { skip: !filterOpened && !addEquipmentModalOpened },
  )

  const { currentData: currencyList = [], isFetching: currencyListIsFetching } = useGetCurrencyList(
    undefined,
    { skip: !addEquipmentModalOpened },
  )

  const { currentData: workTypeList = [], isFetching: workTypeListIsFetching } = useGetWorkTypeList(
    undefined,
    { skip: !addEquipmentModalOpened },
  )

  const { currentData: nomenclatureList, isFetching: nomenclatureListIsFetching } =
    useGetNomenclatureList(undefined, { skip: !addEquipmentModalOpened })

  const { currentData: nomenclature } = useGetNomenclature(selectedNomenclatureId!, {
    skip: !selectedNomenclatureId,
  })

  const [createEquipmentMutation, { isLoading: createEquipmentIsLoading }] =
    useCreateEquipmentMutation()

  const handleApplyFilter = (values: EquipmentFilterFormFields) => {
    setFilterValues(values)
    toggleFilterOpened()
    navigate(WarehouseRouteEnum.EquipmentNomenclatureList)
  }

  const handleSearch: SearchProps['onSearch'] = (value) => {
    setSearchValue(value)
    navigate(WarehouseRouteEnum.EquipmentNomenclatureList)
  }

  const handleAddEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
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

  const routeContext = useMemo<EquipmentPageContextType>(
    () => ({ filter: filterValues, search: searchValue }),
    [filterValues, searchValue],
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
        <EquipmentFormModal
          open={addEquipmentModalOpened}
          mode='create'
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
    </>
  )
}

export default EquipmentPageLayout
