import { Col, Layout, Row } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import UserAvatar from 'components/Avatars/UserAvatar'
import Logo from 'components/Logo'
import NavMenu, { NavMenuProps } from 'components/NavMenu'
import NotificationCounter from 'components/NotificationCounter'
import { getNavMenuConfig } from 'configs/navMenu/utils'
import UserRolesEnum from 'shared/constants/roles'
import useMatchedRoute from 'shared/hooks/useMatchedRoute'

import { BadgeStyled } from './styles'

const { Header } = Layout

const mockedRole = UserRolesEnum.FirstLineSupport

const menuItems: NavMenuProps['items'] = getNavMenuConfig(mockedRole).map(
  ({ key, icon: Icon, link, text }) => ({
    key,
    label: <Link to={link}>{text}</Link>,
    icon: <Icon className='font-s-18' />,
  }),
)
const menuItemsKeys = menuItems.map(({ key }) => key)

const PrivateHeader: FC = () => {
  const matchedRoute = useMatchedRoute(menuItemsKeys)
  const activeNavKey = matchedRoute?.pathnameBase
  const navMenuSelectedKeys = activeNavKey ? [activeNavKey] : undefined

  return (
    <Header>
      <Row justify='space-between' align='middle'>
        <Col span={4}>
          <Logo />
        </Col>

        <Col span={18}>
          <NavMenu selectedKeys={navMenuSelectedKeys} items={menuItems} />
        </Col>

        <Col span={2}>
          <Row justify='end' align='middle'>
            <NotificationCounter />

            <BadgeStyled dot color='orange'>
              <UserAvatar size='large' />
            </BadgeStyled>
          </Row>
        </Col>
      </Row>
    </Header>
  )
}

export default PrivateHeader
