import React from 'react'
import { Link } from 'react-router-dom'

import { UserPermissionsEnum, UserRoleEnum } from 'modules/user/constants'

import { NavMenuProps } from 'components/NavMenu'

import { NavMenuItem } from './types'

export const mapNavMenuConfig = (
  items: NavMenuItem[],
  permissions: UserPermissionsEnum[],
  role: UserRoleEnum,
): NavMenuProps['items'] =>
  items.reduce<NavMenuProps['items']>(
    (acc, { key, icon: Icon, link, text, children, disabled, visible }) => {
      if (!visible || visible(permissions, role)) {
        const isDisabled = disabled?.(permissions)

        acc.push({
          key,
          label: link && !isDisabled ? <Link to={link}>{text}</Link> : text,
          icon: Icon && <Icon $size='large' />,
          children: children && mapNavMenuConfig(children, permissions, role),
          disabled: isDisabled,
        })
      }

      return acc
    },
    [],
  )
