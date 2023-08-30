import { useBoolean } from 'ahooks'
import { Button, Col, Input, Row, Space } from 'antd'
import { SearchProps } from 'antd/es/input'
import { FC, useMemo, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import { EquipmentConditionEnum } from 'modules/warehouse/constants'
import {
  useGetCustomerList,
  useGetEquipmentCategoryList,
  useGetWarehouseList,
} from 'modules/warehouse/hooks'

import FilterButton from 'components/Buttons/FilterButton'

import { useDebounceFn } from 'shared/hooks'

import EquipmentFilter from '../EquipmentFilter'
import { EquipmentFilterFormFields } from '../EquipmentFilter/types'
import { EquipmentPageContextType } from './context'

const { Search } = Input

const EquipmentPageLayout: FC = () => {
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState<string>()

  const [filterOpened, { toggle: toggleFilterOpened }] = useBoolean(false)
  const [filterValues, setFilterValues] = useState<EquipmentFilterFormFields>()

  const [equipmentModalOpened, { toggle: toggleEquipmentModalOpened }] = useBoolean(false)
  const debouncedToggleEquipmentModalOpened = useDebounceFn(toggleEquipmentModalOpened)

  const { currentData: warehouseList = [], isFetching: warehouseListIsFetching } =
    useGetWarehouseList({ ordering: 'title' }, { skip: !filterOpened })

  const { currentData: equipmentCategoryList = [], isFetching: equipmentCategoryListIsFetching } =
    useGetEquipmentCategoryList(undefined, { skip: !filterOpened })

  const { currentData: customerList = [], isFetching: customerListIsFetching } = useGetCustomerList(
    undefined,
    { skip: !filterOpened },
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

  const handleApplyFilter = (values: EquipmentFilterFormFields) => {
    navigate(RouteEnum.EquipmentNomenclatureList)
    setFilterValues(values)
    toggleFilterOpened()
  }

  const handleSearch: SearchProps['onSearch'] = (value) => {
    navigate(RouteEnum.EquipmentNomenclatureList)
    setSearchValue(value)
  }

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

                <Button onClick={debouncedToggleEquipmentModalOpened}>
                  + Добавить оборудование
                </Button>
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

      {equipmentModalOpened && <div>equipmentModalOpened</div>}
    </>
  )
}

export default EquipmentPageLayout
