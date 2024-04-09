import { FC } from 'react'

import MatchUserPermissions from 'modules/user/components/MatchUserPermissions'
import { UserPermissionsEnum, UserRoleEnum } from 'modules/user/constants'
import { useUserRole } from 'modules/user/hooks'
import { checkEveryPermissionAllowed } from 'modules/user/utils'

import Catalog, { CatalogProps } from './Catalog'

type CatalogItem = CatalogProps & {
  permissions?: UserPermissionsEnum[]
  // временно добавлены роли
  roles?: UserRoleEnum[]
}

export type CatalogsProps = {
  items: CatalogItem[]
}

const Catalogs: FC<CatalogsProps> = ({ items, ...props }) => {
  const { role } = useUserRole()

  return (
    <div {...props}>
      {items.map(({ link, text, permissions, roles }, index) => {
        return role && !!roles?.length ? (
          roles.includes(role) ? (
            <Catalog key={index} link={link} text={text} />
          ) : null
        ) : !!permissions?.length ? (
          <MatchUserPermissions key={index} expectedPermissions={permissions}>
            {({ permissions }) =>
              checkEveryPermissionAllowed(permissions) ? <Catalog link={link} text={text} /> : null
            }
          </MatchUserPermissions>
        ) : (
          <Catalog key={index} link={link} text={text} />
        )
      })}
    </div>
  )
}

export default Catalogs
