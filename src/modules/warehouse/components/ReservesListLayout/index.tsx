import { useBoolean } from 'ahooks'
import { Button, Col, Input, Row, Space } from 'antd'
import { FC, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { EquipmentConditionEnum } from 'modules/warehouse/constants'
import { WarehouseListModel } from 'modules/warehouse/models'

import FilterButton from 'components/Buttons/FilterButton'

import EquipmentNomenclatureListFilter from '../EquipmentNomenclatureListFilter'
import { EquipmentNomenclatureListFilterFormFields } from '../EquipmentNomenclatureListFilter/types'

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

const ReservesListLayout: FC = () => {
  const [filterOpened, { toggle: toggleFilterOpened }] = useBoolean(false)

  const [filterValues, setFilterValues] =
    useState<EquipmentNomenclatureListFilterFormFields>()

  const initialFilterValues: EquipmentNomenclatureListFilterFormFields =
    useMemo(
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

  const handleApplyFilter = (
    values: EquipmentNomenclatureListFilterFormFields,
  ) => {
    setFilterValues(values)
    toggleFilterOpened()
  }

  const routeContext = useMemo(() => ({ filter: filterValues }), [filterValues])

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
              <Search placeholder='Поиск оборудования' />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Outlet context={routeContext} />
        </Col>
      </Row>

      {filterOpened && (
        <EquipmentNomenclatureListFilter
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

export default ReservesListLayout
