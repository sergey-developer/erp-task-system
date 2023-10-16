import { FC } from 'react'

import { RouteEnum } from 'configs/routes'

import MatchUserPermissions from 'modules/user/components/MatchUserPermissions'
import { UserPermissions } from 'modules/user/models'

import CatalogListItem from './CatalogListItem'

export type CatalogItem = {
  link: RouteEnum
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
          <MatchUserPermissions key={index} expected={permissions}>
            {({ permissions }) =>
              Object.values(permissions).every(Boolean) ? (
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
