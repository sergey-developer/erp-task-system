import { useBoolean } from 'ahooks'
import { Button, Col, Input, Row, Space } from 'antd'
import { SearchProps } from 'antd/es/input'
import { FC, useCallback, useMemo, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import EquipmentFilter from 'modules/warehouse/components/EquipmentFilter'
import { EquipmentFilterFormFields } from 'modules/warehouse/components/EquipmentFilter/types'
import EquipmentModal from 'modules/warehouse/components/EquipmentModal'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { useGetCustomerList } from 'modules/warehouse/hooks/customer'
import {
  useCheckEquipmentCategory,
  useGetEquipmentCategoryList,
} from 'modules/warehouse/hooks/equipment'
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

import { EquipmentModalProps } from '../EquipmentModal/types'
import { EquipmentPageContextType } from './context'

const { Search } = Input

const EquipmentPageLayout: FC = () => {
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState<string>()

  const [filterOpened, { toggle: toggleFilterOpened }] = useBoolean(false)
  const [filterValues, setFilterValues] = useState<EquipmentFilterFormFields>()

  const [equipmentModalOpened, { toggle: toggleEquipmentModal, setFalse: closeEquipmentModal }] =
    useBoolean(false)

  const debouncedToggleEquipmentModal = useDebounceFn(toggleEquipmentModal)

  const handleCloseEquipmentModal = useCallback(() => {
    closeEquipmentModal()
    setSelectedNomenclatureId(undefined)
  }, [closeEquipmentModal])

  const debouncedHandleCloseEquipmentModal = useDebounceFn(handleCloseEquipmentModal)

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<IdType>()

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  const equipmentCategoryBooleans = useCheckEquipmentCategory(selectedCategory?.code)

  const { currentData: warehouseList = [], isFetching: warehouseListIsFetching } =
    useGetWarehouseList({ ordering: 'title' }, { skip: !filterOpened && !equipmentModalOpened })

  const { currentData: equipmentCategoryList = [], isFetching: equipmentCategoryListIsFetching } =
    useGetEquipmentCategoryList(undefined, { skip: !filterOpened && !equipmentModalOpened })

  const { currentData: customerList = [], isFetching: customerListIsFetching } = useGetCustomerList(
    undefined,
    { skip: !filterOpened && (!equipmentModalOpened || equipmentCategoryBooleans.isConsumable) },
  )

  const { currentData: currencyList = [], isFetching: currencyListIsFetching } = useGetCurrencyList(
    undefined,
    { skip: !equipmentModalOpened },
  )

  const { currentData: workTypeList = [], isFetching: workTypeListIsFetching } = useGetWorkTypeList(
    undefined,
    { skip: !equipmentModalOpened },
  )

  const { currentData: nomenclature } = useGetNomenclature(selectedNomenclatureId!, {
    skip: !selectedNomenclatureId,
  })

  const { currentData: nomenclatureList, isFetching: nomenclatureListIsFetching } =
    useGetNomenclatureList(undefined, { skip: !equipmentModalOpened })

  const [createEquipmentMutation, { isLoading: createEquipmentIsLoading }] =
    useCreateEquipmentMutation()

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

  const handleApplyFilter = (values: EquipmentFilterFormFields) => {
    navigate(RouteEnum.EquipmentNomenclatureList)
    setFilterValues(values)
    toggleFilterOpened()
  }

  const handleSearch: SearchProps['onSearch'] = (value) => {
    navigate(RouteEnum.EquipmentNomenclatureList)
    setSearchValue(value)
  }

  const handleAddEquipment: EquipmentModalProps['onSubmit'] = useCallback(
    async (values, setFields) => {
      try {
        await createEquipmentMutation(values).unwrap()
        toggleEquipmentModal()
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
    [createEquipmentMutation, toggleEquipmentModal],
  )

  const routeContext = useMemo<EquipmentPageContextType>(
    () => ({ filter: filterValues, search: searchValue }),
    [filterValues, searchValue],
  )

  return (
    <>
      <Row data-testid='reserves-list-layout' gutter={[16, 16]}>
        <Col span={24}>
          <Row justify='space-between'>
            <Col>
              <Space size='middle'>
                <FilterButton onClick={toggleFilterOpened} />

                <Button onClick={debouncedToggleEquipmentModal}>+ Добавить оборудование</Button>
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

      {equipmentModalOpened && (
        <EquipmentModal
          visible={equipmentModalOpened}
          title='Добавление оборудования'
          okText='Добавить'
          isLoading={createEquipmentIsLoading}
          categoryList={equipmentCategoryList}
          categoryListIsLoading={equipmentCategoryListIsFetching}
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
          onCancel={debouncedHandleCloseEquipmentModal}
          onSubmit={handleAddEquipment}
        />
      )}
    </>
  )
}

export default EquipmentPageLayout
