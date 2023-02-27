import { Col, Row, Space } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import React, { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { getNavMenuConfig } from 'configs/navMenu/utils'
import { RouteEnum } from 'configs/routes'

import LogoutButton from 'modules/auth/features/Logout/LogoutButton'
import { useUserProfileState } from 'modules/user/hooks'

import UserAvatar from 'components/Avatars/UserAvatar'
import { MonitoringIcon } from 'components/Icons'
import Logo from 'components/Logo'
import NavMenu, { NavMenuProps } from 'components/NavMenu'
import NotificationCounter from 'components/NotificationCounter'

import { useMatchedRoute } from 'shared/hooks'

import { HeaderStyled } from './styles'

const PrivateHeader: FC = () => {
  const breakpoints = useBreakpoint()
  const { data: userProfile } = useUserProfileState()

  const navMenu = useMemo(() => {
    const userRole = userProfile?.role

    const items: NavMenuProps['items'] = userRole
      ? getNavMenuConfig(userRole).map(({ key, icon: Icon, link, text }) => ({
          key,
          label: <Link to={link}>{text}</Link>,
          icon: <Icon $size='large' />,
        }))
      : []

    const itemsKeys = items.map(({ key }) => key)

    return { items, itemsKeys }
  }, [userProfile?.role])

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

              {userProfile?.isStaff && (
                <Link to={RouteEnum.TaskMonitoring}>
                  <MonitoringIcon
                    $color='black'
                    $size='large'
                    $cursor='pointer'
                  />
                </Link>
              )}

              <UserAvatar size='large' dot abbr='' />

              <LogoutButton />
            </Space>
          </Row>
        </Col>
      </Row>
    </HeaderStyled>
  )
}

export default PrivateHeader
