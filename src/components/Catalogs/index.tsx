import { FC } from 'react'

import MatchUserPermissions from 'features/user/components/MatchUserPermissions'
import { UserPermissionsEnum } from 'features/user/api/constants'
import { checkEveryPermissionAllowed } from 'features/user/utils'

import Catalog, { CatalogProps } from './Catalog'

type CatalogItem = CatalogProps & {
  permissions?: UserPermissionsEnum[]
}

export type CatalogsProps = {
  items: CatalogItem[]
}

const Catalogs: FC<CatalogsProps> = ({ items, ...props }) => {
  return (
    <div {...props}>
      {items.map(({ link, text, permissions }, index) =>
        !!permissions?.length ? (
          <MatchUserPermissions key={index} expectedPermissions={permissions}>
            {({ permissions }) =>
              checkEveryPermissionAllowed(permissions) ? <Catalog link={link} text={text} /> : null
            }
          </MatchUserPermissions>
        ) : (
          <Catalog key={index} link={link} text={text} />
        ),
      )}
    </div>
  )
}

export default Catalogs
