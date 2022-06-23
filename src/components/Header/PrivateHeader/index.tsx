import { LogoutOutlined } from '@ant-design/icons'
import { Col, Layout, Row, Space } from 'antd'
import React, { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

import UserAvatar from 'components/Avatars/UserAvatar'
import Logo from 'components/Logo'
import NavMenu, { NavMenuProps } from 'components/NavMenu'
import NotificationCounter from 'components/NotificationCounter'
import { getNavMenuConfig } from 'configs/navMenu/utils'
import useUserRole from 'modules/user/hooks/useUserRole'
import useMatchedRoute from 'shared/hooks/useMatchedRoute'

import { BadgeStyled } from './styles'

const { Header } = Layout

const PrivateHeader: FC = () => {
  const { role } = useUserRole()

  const navMenu = useMemo(() => {
    const items: NavMenuProps['items'] = role
      ? getNavMenuConfig(role).map(({ key, icon: Icon, link, text }) => ({
          key,
          label: <Link to={link}>{text}</Link>,
          icon: <Icon className='font-s-18' />,
        }))
      : []

    const itemsKeys = items.map(({ key }) => key)

    return { items, itemsKeys }
  }, [role])

  const matchedRoute = useMatchedRoute(navMenu.itemsKeys)
  const activeNavKey = matchedRoute?.pathnameBase
  const navMenuSelectedKeys = activeNavKey ? [activeNavKey] : undefined

  return (
    <Header>
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

              <BadgeStyled dot color='orange'>
                <UserAvatar size='large' />
              </BadgeStyled>

              <LogoutOutlined className='font-s-18' />
            </Space>
          </Row>
        </Col>
      </Row>
    </Header>
  )
}

export default PrivateHeader
