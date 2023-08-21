import { FC } from 'react'

import { RouteEnum } from 'configs/routes'

import CatalogList, {
  CatalogListProps,
} from 'modules/warehouse/components/CatalogList'

const items: CatalogListProps['items'] = [
  {
    link: RouteEnum.EquipmentList,
    text: 'Оборудование',
    permissions: ['EQUIPMENTS_READ'],
  },
]

const ReserveCatalogListPage: FC = () => {
  return <CatalogList data-testid='reserve-catalog-list' items={items} />
}

export default ReserveCatalogListPage
