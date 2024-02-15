import { FC } from 'react'

import MatchUserPermissions from 'modules/user/components/MatchUserPermissions'
import { UserPermissions } from 'modules/user/models'
import { checkEveryPermissionAllowed } from 'modules/user/utils'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import CatalogListItem from './CatalogListItem'

export type CatalogItem = {
  link: WarehouseRouteEnum
  text: string
  permissions?: UserPermissions[]
}

export type CatalogListProps = {
  items: CatalogItem[]
}

const CatalogList: FC<CatalogListProps> = ({ items, ...props }) => {
  return (
    <div {...props}>
      {items.map(({ link, text, permissions }, index) =>
        !!permissions?.length ? (
          <MatchUserPermissions key={index} expectedPermissions={permissions}>
            {({ permissions }) =>
              checkEveryPermissionAllowed(permissions) ? (
                <CatalogListItem link={link} text={text} />
              ) : null
            }
          </MatchUserPermissions>
        ) : (
          <CatalogListItem key={index} link={link} text={text} />
        ),
      )}
    </div>
  )
}

export default CatalogList
