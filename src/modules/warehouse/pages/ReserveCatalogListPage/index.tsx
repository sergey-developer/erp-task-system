import { FC } from 'react'

import { UserPermissionsEnum } from 'modules/user/constants'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import Catalogs, { CatalogsProps } from 'components/Catalogs'

const items: CatalogsProps['items'] = [
  {
    link: WarehouseRouteEnum.EquipmentNomenclatures,
    text: 'Оборудование',
    permissions: [UserPermissionsEnum.EquipmentsRead],
  },
  {
    link: WarehouseRouteEnum.RelocationTasks,
    text: 'Заявки на перемещение оборудования',
    permissions: [UserPermissionsEnum.RelocationTasksRead],
  },
  {
    link: WarehouseRouteEnum.Inventorizations,
    text: 'Инвентаризация',
    // permissions: [UserPermissionsEnum.InventorizationRead],
  },
]

const ReserveCatalogListPage: FC = () => {
  return (
    <div data-testid='reserve-catalog-list-page'>
      <Catalogs data-testid='reserve-catalog-list' items={items} />
    </div>
  )
}

export default ReserveCatalogListPage
