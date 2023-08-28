import { useBoolean } from 'ahooks'
import { Button, Col, Input, Row, Space } from 'antd'
import { SearchProps } from 'antd/es/input'
import { FC, useMemo, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import { EquipmentConditionEnum } from 'modules/warehouse/constants'
import { useGetWarehouseList } from 'modules/warehouse/hooks'

import FilterButton from 'components/Buttons/FilterButton'

import EquipmentFilter from '../EquipmentFilter'
import { EquipmentFilterFormFields } from '../EquipmentFilter/types'
import { EquipmentPageContextType } from './context'

const { Search } = Input

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

const EquipmentPageLayout: FC = () => {
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState<string>()

  const [filterOpened, { toggle: toggleFilterOpened }] = useBoolean(false)

  const [filterValues, setFilterValues] = useState<EquipmentFilterFormFields>()

  const {
    currentData: warehouseList = [],
    isFetching: warehouseListIsFetching,
  } = useGetWarehouseList({ ordering: 'title' }, { skip: !filterOpened })

  const initialFilterValues: EquipmentFilterFormFields = useMemo(
    () => ({
      conditions: [
        EquipmentConditionEnum.Working,
        EquipmentConditionEnum.Broken,
        EquipmentConditionEnum.NonRepairable,
      ],
      categories: fakeCategories.map((c) => c.id),
      warehouses: warehouseList.map((w) => w.id),
    }),
    [warehouseList],
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
          warehouseList={warehouseList}
          warehouseListIsLoading={warehouseListIsFetching}
          categoryList={[]}
          categoryListIsLoading={false}
          ownerList={[]}
          ownerListIsLoading={false}
          onClose={toggleFilterOpened}
          onApply={handleApplyFilter}
        />
      )}
    </>
  )
}

export default EquipmentPageLayout
