import { UserPermissionsEnum } from 'features/users/api/constants'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import { FC } from 'react'

import Catalogs, { CatalogsProps } from 'components/Catalogs'

const items: CatalogsProps['items'] = [
  {
    link: WarehousesRoutesEnum.EquipmentNomenclatures,
    text: 'Оборудование',
    permissions: [UserPermissionsEnum.EquipmentsRead],
  },
  {
    link: WarehousesRoutesEnum.RelocationTasks,
    text: 'Заявки на перемещение оборудования',
    permissions: [UserPermissionsEnum.RelocationTasksRead],
  },
  {
    link: WarehousesRoutesEnum.Inventorizations,
    text: 'Инвентаризация',
    permissions: [UserPermissionsEnum.InventorizationRead],
  },
]

const ReservesCatalogPage: FC = () => {
  return (
    <div data-testid='reserves-catalog-page'>
      <Catalogs data-testid='reserves-catalog' items={items} />
    </div>
  )
}

export default ReservesCatalogPage
