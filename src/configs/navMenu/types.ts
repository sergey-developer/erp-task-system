import { JSXElementConstructor } from 'react'

import { UserPermissions } from 'modules/user/models'

export type NavMenuItem = {
  text: string
  key: string
  link?: string
  icon?: JSXElementConstructor<any>
  children?: NavMenuItem[]
  shouldDisable?: (permissions: UserPermissions[]) => boolean
}
