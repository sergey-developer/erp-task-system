import { JSXElementConstructor } from 'react'

import { UserPermissionsEnum } from 'features/user/api/constants'

export type NavMenuItem = {
  text: string
  key: string
  link?: string
  icon?: JSXElementConstructor<any>
  children?: NavMenuItem[]
  disabled?: (permissions: UserPermissionsEnum[]) => boolean
  visible?: (permissions: UserPermissionsEnum[]) => boolean
}
