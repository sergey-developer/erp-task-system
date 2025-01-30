import { FC } from 'react'

import { UserPermissionsEnum } from 'features/user/constants'
import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'

import Catalogs, { CatalogsProps } from 'components/Catalogs'

const items: CatalogsProps['items'] = [
  {
    link: WarehouseRouteEnum.Warehouses,
    text: 'Склады',
  },
  {
    link: WarehouseRouteEnum.Nomenclatures,
    text: 'Номенклатура',
    permissions: [UserPermissionsEnum.NomenclaturesRead],
  },
]

const WarehouseCatalogListPage: FC = () => {
  return (
    <div data-testid='warehouse-catalog-list-page'>
      <Catalogs data-testid='warehouse-catalog-list' items={items} />
    </div>
  )
}

export default WarehouseCatalogListPage
