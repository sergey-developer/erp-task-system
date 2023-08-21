import { FC } from 'react'

import { RouteEnum } from 'configs/routes'

import CatalogList, {
  CatalogListProps,
} from 'modules/warehouse/components/CatalogList'

const items: CatalogListProps['items'] = [
  {
    link: RouteEnum.WarehouseList,
    text: 'Склады',
  },
  {
    link: RouteEnum.NomenclatureList,
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
