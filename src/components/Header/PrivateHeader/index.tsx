import { Col, Row, Space } from 'antd'
import React, { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import UserAvatar from 'components/Avatars/UserAvatar'
import Logo from 'components/Logo'
import NavMenu, { NavMenuProps } from 'components/NavMenu'
import NotificationCounter from 'components/NotificationCounter'
import { getNavMenuConfig } from 'configs/navMenu/utils'
import LogoutButton from 'modules/auth/components/LogoutButton'
import useAuthenticatedUser from 'modules/auth/hooks/useAuthenticatedUser'
import useMatchedRoute from 'shared/hooks/useMatchedRoute'

import { HeaderStyled } from './styles'

const PrivateHeader: FC = () => {
  const breakpoints = useBreakpoint()
  const user = useAuthenticatedUser()

  const navMenu = useMemo(() => {
    const userRole = user?.role

    const items: NavMenuProps['items'] = userRole
      ? getNavMenuConfig(userRole).map(({ key, icon: Icon, link, text }) => ({
          key,
          label: <Link to={link}>{text}</Link>,
          icon: <Icon className='fs-18' />,
        }))
      : []

    const itemsKeys = items.map(({ key }) => key)

    return { items, itemsKeys }
  }, [user?.role])

  const matchedRoute = useMatchedRoute(navMenu.itemsKeys)
  const activeNavKey = matchedRoute?.pathnameBase
  const navMenuSelectedKeys = activeNavKey ? [activeNavKey] : undefined

  return (
    <HeaderStyled $breakpoints={breakpoints}>
      <Row justify='space-between' align='middle'>
        <Col span={4}>
          <Logo />
        </Col>

        <Col span={18}>
          <NavMenu selectedKeys={navMenuSelectedKeys} items={navMenu.items} />
        </Col>

        <Col span={2}>
          <Row justify='end'>
            <Space size='large'>
              <NotificationCounter />
              <UserAvatar size='large' dot />
              <LogoutButton />
            </Space>
          </Row>
        </Col>
      </Row>
    </HeaderStyled>
  )
}

export default PrivateHeader
