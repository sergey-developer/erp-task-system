import { FC } from 'react'

import CatalogList, { CatalogListProps } from 'modules/warehouse/components/CatalogList'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

const items: CatalogListProps['items'] = [
  {
    link: WarehouseRouteEnum.Warehouses,
    text: 'Склады',
  },
  {
    link: WarehouseRouteEnum.Nomenclatures,
    text: 'Номенклатура',
    permissions: ['NOMENCLATURES_READ'],
  },
]

const WarehouseCatalogListPage: FC = () => {
  return (
    <div data-testid='warehouse-catalog-list-page'>
      <CatalogList data-testid='warehouse-catalog-list' items={items} />
    </div>
  )
}

export default WarehouseCatalogListPage
