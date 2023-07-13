import React from 'react'
import { Link } from 'react-router-dom'

import { NavMenuProps } from 'components/NavMenu'

import { NavMenuItem } from '../interfaces'

export const mapNavMenuConfig = (
  items: Array<NavMenuItem>,
): NavMenuProps['items'] =>
  items.map(({ key, icon: Icon, link, text, children }) => ({
    key,
    label: link ? <Link to={link}>{text}</Link> : text,
    icon: Icon && <Icon $size='large' />,
    children: children && mapNavMenuConfig(children),
  }))
