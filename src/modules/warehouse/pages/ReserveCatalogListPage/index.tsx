import { FC } from 'react'

import { UserPermissionsEnum } from 'modules/user/constants'
import CatalogList, { CatalogListProps } from 'modules/warehouse/components/CatalogList'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

const items: CatalogListProps['items'] = [
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
]

const ReserveCatalogListPage: FC = () => {
  return (
    <div data-testid='reserve-catalog-list-page'>
      <CatalogList data-testid='reserve-catalog-list' items={items} />
    </div>
  )
}

export default ReserveCatalogListPage
