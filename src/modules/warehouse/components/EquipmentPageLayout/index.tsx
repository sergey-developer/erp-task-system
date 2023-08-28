import { useBoolean } from 'ahooks'
import { Button, Col, Input, Row, Space } from 'antd'
import { SearchProps } from 'antd/es/input'
import { FC, useMemo, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import { EquipmentConditionEnum } from 'modules/warehouse/constants'
import { WarehouseListModel } from 'modules/warehouse/models'

import FilterButton from 'components/Buttons/FilterButton'

import EquipmentFilter from '../EquipmentFilter'
import { EquipmentFilterFormFields } from '../EquipmentFilter/types'
import { EquipmentPageContextType } from './context'

const { Search } = Input

export const fakeWarehouses: WarehouseListModel = [
  {
    id: 1,
    title: 'warehouse 1',
    address: 'address 1',
    legalEntity: {
      id: 1,
      title: 'legalEntity 1',
    },
    parent: {
      id: 1,
      title: 'parent 1',
    },
  },
  {
    id: 2,
    title: 'warehouse 2',
    address: 'address 2',
    legalEntity: {
      id: 2,
      title: 'legalEntity 2',
    },
    parent: {
      id: 2,
      title: 'parent 2',
    },
  },
]

export const fakeCategories = [
  {
    id: 1,
    title: 'category 1',
  },
  {
    id: 2,
    title: 'category 2',
  },
]

export const fakeOwners = [
  {
    id: 1,
    title: 'owner 1',
  },
  {
    id: 2,
    title: 'owner 2',
  },
]

const EquipmentPageLayout: FC = () => {
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState<string>()

  const [filterOpened, { toggle: toggleFilterOpened }] = useBoolean(false)

  const [filterValues, setFilterValues] = useState<EquipmentFilterFormFields>()

  const initialFilterValues: EquipmentFilterFormFields = useMemo(
    () => ({
      conditions: [
        EquipmentConditionEnum.Working,
        EquipmentConditionEnum.Broken,
        EquipmentConditionEnum.NonRepairable,
      ],
      categories: fakeCategories.map((c) => c.id),
      warehouses: fakeWarehouses.map((w) => w.id),
    }),
    [],
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

                <Button>+ Добавить оборудование</Button>
              </Space>
            </Col>

            <Col>
              <Search
                allowClear
                placeholder='Поиск оборудования'
                onSearch={handleSearch}
              />
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
          warehouseList={fakeWarehouses}
          categoryList={fakeCategories}
          ownerList={fakeOwners}
          onClose={toggleFilterOpened}
          onApply={handleApplyFilter}
        />
      )}
    </>
  )
}

export default EquipmentPageLayout
