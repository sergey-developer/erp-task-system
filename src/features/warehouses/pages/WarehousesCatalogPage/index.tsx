import { UserPermissionsEnum } from 'features/users/api/constants'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import { FC } from 'react'

import Catalogs, { CatalogsProps } from 'components/Catalogs'

const items: CatalogsProps['items'] = [
  {
    link: WarehousesRoutesEnum.Warehouses,
    text: 'Склады',
  },
  {
    link: WarehousesRoutesEnum.Nomenclatures,
    text: 'Номенклатура',
    permissions: [UserPermissionsEnum.NomenclaturesRead],
  },
]

const WarehousesCatalogPage: FC = () => {
  return (
    <div data-testid='warehouses-catalog-page'>
      <Catalogs data-testid='warehouses-catalog' items={items} />
    </div>
  )
}

export default WarehousesCatalogPage
