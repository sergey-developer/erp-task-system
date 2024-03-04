import React from 'react'
import { Link } from 'react-router-dom'

import { UserPermissions } from 'modules/user/models'

import { NavMenuProps } from 'components/NavMenu'

import { NavMenuItem } from '../types'

export const mapNavMenuConfig = (
  items: NavMenuItem[],
  permissions: UserPermissions[],
): NavMenuProps['items'] =>
  items.map(({ key, icon: Icon, link, text, children, shouldDisable }) => {
    const disabled = shouldDisable?.(permissions)

    return {
      key,
      label: link && !disabled ? <Link to={link}>{text}</Link> : text,
      icon: Icon && <Icon $size='large' />,
      children: children && mapNavMenuConfig(children, permissions),
      disabled,
    }
  })
