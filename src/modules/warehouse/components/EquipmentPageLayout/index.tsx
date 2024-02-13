import { useBoolean, useSetState } from 'ahooks'
import { Button, Col, Input, Row, Space } from 'antd'
import { SearchProps } from 'antd/es/input'
import omit from 'lodash/omit'
import React, { FC, useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { EquipmentFilterFormFields } from 'modules/warehouse/components/EquipmentFilter/types'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { useGetCustomerList } from 'modules/warehouse/hooks/customer'
import {
  useGetEquipmentCategoryList,
  useLazyGetEquipmentsXlsx,
} from 'modules/warehouse/hooks/equipment'
import { useGetWarehouseList } from 'modules/warehouse/hooks/warehouse'
import { GetEquipmentsXlsxQueryArgs } from 'modules/warehouse/models'
import { equipmentFilterToParams } from 'modules/warehouse/utils/equipment'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { downloadFile } from 'shared/utils/file'

import { EquipmentPageContextType } from './context'

const EquipmentFilter = React.lazy(() => import('modules/warehouse/components/EquipmentFilter'))

const { Search } = Input

const getEquipmentsXlsxParamsByLocation = (
  location: ReturnType<typeof useLocation>,
  params: GetEquipmentsXlsxQueryArgs,
): GetEquipmentsXlsxQueryArgs => {
  switch (location.pathname) {
    case WarehouseRouteEnum.Equipments:
      return params
    case WarehouseRouteEnum.EquipmentNomenclatures:
      return omit(params, 'nomenclature', 'ordering')
    default:
      return params
  }
}

const initialFilterValues: EquipmentFilterFormFields = {
  conditions: undefined,
  categories: undefined,
  warehouses: undefined,
  owners: undefined,
  priceTo: undefined,
  priceFrom: undefined,
  createdAt: undefined,
  isNew: undefined,
  isRepaired: undefined,
  isWarranty: undefined,
  zeroQuantity: undefined,
}

const EquipmentPageLayout: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [searchValue, setSearchValue] = useState<string>()

  const [filterOpened, { toggle: toggleFilterOpened }] = useBoolean(false)
  const [filterValues, setFilterValues] = useState<EquipmentFilterFormFields>()

  const { currentData: warehouseList = [], isFetching: warehouseListIsFetching } =
    useGetWarehouseList({ ordering: 'title' }, { skip: !filterOpened })

  const { currentData: equipmentCategoryList = [], isFetching: equipmentCategoryListIsFetching } =
    useGetEquipmentCategoryList(undefined, { skip: !filterOpened })

  const { currentData: customerList = [], isFetching: customerListIsFetching } = useGetCustomerList(
    undefined,
    { skip: !filterOpened },
  )

  const [equipmentsXlsxParams, setEquipmentsXlsxParams] = useSetState<GetEquipmentsXlsxQueryArgs>({
    locationTypes: [LocationTypeEnum.Warehouse, LocationTypeEnum.ServiceCenter],
  })

  const [getEquipmentsXlsx, { isFetching: getEquipmentsXlsxIsFetching }] =
    useLazyGetEquipmentsXlsx()

  const onApplyFilter = (values: EquipmentFilterFormFields) => {
    setFilterValues(values)
    toggleFilterOpened()
    setEquipmentsXlsxParams(equipmentFilterToParams(values))
    navigate(WarehouseRouteEnum.EquipmentNomenclatures)
  }

  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearchValue(value)
    setEquipmentsXlsxParams({ search: value })
    navigate(WarehouseRouteEnum.EquipmentNomenclatures)
  }

  const onExportExcel = async () => {
    try {
      const equipments = await getEquipmentsXlsx(
        getEquipmentsXlsxParamsByLocation(location, equipmentsXlsxParams),
      ).unwrap()

      downloadFile(equipments, MimetypeEnum.Xlsx, 'Оборудование')
    } catch {}
  }

  const routeContext = useMemo<EquipmentPageContextType>(
    () => ({ filter: filterValues, search: searchValue, setEquipmentsXlsxParams }),
    [filterValues, searchValue, setEquipmentsXlsxParams],
  )

  return (
    <>
      <Row data-testid='equipment-page-layout' gutter={[16, 16]}>
        <Col span={24}>
          <Row justify='space-between'>
            <Col>
              <Space size='middle'>
                <FilterButton onClick={toggleFilterOpened} />

                <Button onClick={onExportExcel} loading={getEquipmentsXlsxIsFetching}>
                  Экспорт в Excel
                </Button>
              </Space>
            </Col>

            <Col>
              <Search allowClear placeholder='Поиск оборудования' onSearch={onSearch} />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Outlet context={routeContext} />
        </Col>
      </Row>

      {filterOpened && (
        <React.Suspense fallback={<ModalFallback open onCancel={toggleFilterOpened} />}>
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
            onApply={onApplyFilter}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default EquipmentPageLayout
