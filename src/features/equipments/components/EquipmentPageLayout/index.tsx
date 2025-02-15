import { useBoolean, useSetState } from 'ahooks'
import { Button, Col, Input, Row, Space } from 'antd'
import { SearchProps } from 'antd/es/input'
import { EquipmentsFilterFormFields } from 'features/equipments/components/EquipmentFilter/types'
import { useGetEquipmentCategories, useLazyGetEquipmentsXlsx } from 'features/equipments/hooks'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import omit from 'lodash/omit'
import React, { FC, useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'

import { useGetCustomersCatalog } from 'shared/catalogs/customers/hooks'
import { LocationTypeEnum } from 'shared/catalogs/locations/api/constants'
import { useGetLocationsCatalog } from 'shared/catalogs/locations/hooks'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { base64ToBytes } from 'shared/utils/common'
import { downloadFile } from 'shared/utils/file'

import { equipmentsFilterToRequestParams } from '../../api/helpers'
import { GetEquipmentsXlsxRequest } from '../../api/schemas'
import { EquipmentPageContextType } from './context'

const EquipmentFilter = React.lazy(() => import('features/equipments/components/EquipmentFilter'))

const { Search } = Input

const getEquipmentsXlsxParamsByLocation = (
  location: ReturnType<typeof useLocation>,
  params: GetEquipmentsXlsxRequest,
): GetEquipmentsXlsxRequest => {
  switch (location.pathname) {
    case WarehousesRoutesEnum.Equipments:
      return params
    case WarehousesRoutesEnum.EquipmentNomenclatures:
      return omit(params, 'nomenclature', 'ordering')
    default:
      return params
  }
}

const initialFilterValues: EquipmentsFilterFormFields = {
  conditions: undefined,
  categories: undefined,
  locations: undefined,
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
  const [filterValues, setFilterValues] = useState<EquipmentsFilterFormFields>({})

  const { currentData: locations = [], isFetching: locationsIsFetching } = useGetLocationsCatalog(
    { ordering: 'title' },
    { skip: !filterOpened },
  )

  const { currentData: equipmentCategories = [], isFetching: equipmentCategoriesIsFetching } =
    useGetEquipmentCategories(undefined, { skip: !filterOpened })

  const { currentData: customers = [], isFetching: customersIsFetching } = useGetCustomersCatalog(
    undefined,
    { skip: !filterOpened },
  )

  const [equipmentsXlsxParams, setEquipmentsXlsxParams] = useSetState<GetEquipmentsXlsxRequest>({
    locationTypes: [LocationTypeEnum.Warehouse, LocationTypeEnum.ServiceCenter],
  })

  const [getEquipmentsXlsx, { isFetching: getEquipmentsXlsxIsFetching }] =
    useLazyGetEquipmentsXlsx()

  const onApplyFilter = (values: EquipmentsFilterFormFields) => {
    setFilterValues(values)
    toggleFilterOpened()
    setEquipmentsXlsxParams(equipmentsFilterToRequestParams(values))
    navigate(WarehousesRoutesEnum.EquipmentNomenclatures)
  }

  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearchValue(value)
    setEquipmentsXlsxParams({ search: value })
    navigate(WarehousesRoutesEnum.EquipmentNomenclatures)
  }

  const onExportExcel = async () => {
    try {
      const equipments = await getEquipmentsXlsx(
        getEquipmentsXlsxParamsByLocation(location, equipmentsXlsxParams),
      ).unwrap()

      downloadFile(base64ToBytes(equipments), MimetypeEnum.Xlsx, 'Оборудование')
    } catch (error) {
      console.error(error)
    }
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
            locations={locations}
            locationsIsLoading={locationsIsFetching}
            categories={equipmentCategories}
            categoriesIsLoading={equipmentCategoriesIsFetching}
            owners={customers}
            ownersIsLoading={customersIsFetching}
            onClose={toggleFilterOpened}
            onApply={onApplyFilter}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default EquipmentPageLayout
