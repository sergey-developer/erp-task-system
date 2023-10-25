import { FC } from 'react'

import CatalogList, { CatalogListProps } from 'modules/warehouse/components/CatalogList'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

const items: CatalogListProps['items'] = [
  {
    link: WarehouseRouteEnum.EquipmentNomenclatureList,
    text: 'Оборудование',
    permissions: ['EQUIPMENTS_READ'],
  },
  {
    link: WarehouseRouteEnum.RelocationTaskList,
    text: 'Заявки на перемещение оборудования',
    permissions: ['RELOCATION_TASKS_READ'],
  },
]

const ReserveCatalogListPage: FC = () => {
  return (
    <div data-testid='reserve-catalog-list-page'>
      <CatalogList data-testid='reserve-catalog-list' items={items} />
    </div>
  )
}

export default ReserveCatalogListPage
