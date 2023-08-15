import { FC } from 'react'
import { Link } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import MatchUserPermissions from 'modules/user/components/MatchUserPermissions'
import { UserPermissions } from 'modules/user/models'

import CatalogListItem from './CatalogListItem'

type CatalogItem = {
  link: RouteEnum
  text: string
  permissions?: UserPermissions[]
}

const catalogList: CatalogItem[] = [
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
      {catalogList.map(({ link, text, permissions }, index) =>
        !!permissions?.length ? (
          <MatchUserPermissions key={index} expected={permissions}>
            {({ permissions }) =>
              Object.values(permissions).every(Boolean) ? (
                <CatalogListItem>
                  <Link to={link}>{text}</Link>
                </CatalogListItem>
              ) : null
            }
          </MatchUserPermissions>
        ) : (
          <CatalogListItem key={index}>
            <Link to={link}>{text}</Link>
          </CatalogListItem>
        ),
      )}
    </div>
  )
}

export default WarehouseCatalogListPage
