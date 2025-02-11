import { UserPermissionsEnum } from 'features/users/api/constants'
import MatchUserPermissions from 'features/users/components/MatchUserPermissions'
import { checkEveryPermissionAllowed } from 'features/users/helpers'
import { FC } from 'react'

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
