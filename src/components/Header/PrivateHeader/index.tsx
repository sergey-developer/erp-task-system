import { LogoutOutlined } from '@ant-design/icons'
import { Col, Layout, Row, Space } from 'antd'
import React, { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

import UserAvatar from 'components/Avatars/UserAvatar'
import Logo from 'components/Logo'
import NavMenu, { NavMenuProps } from 'components/NavMenu'
import NotificationCounter from 'components/NotificationCounter'
import { getNavMenuConfig } from 'configs/navMenu/utils'
import { useLogoutMutation } from 'modules/auth/auth.service'
import { logout as logoutAction } from 'modules/auth/authSlice'
import useUserRole from 'modules/user/hooks/useUserRole'
import { StorageKeys } from 'shared/constants/storage'
import useDispatch from 'shared/hooks/useDispatch'
import useMatchedRoute from 'shared/hooks/useMatchedRoute'
import localStorageService from 'shared/services/localStorage'

import { BadgeStyled } from './styles'

const { Header } = Layout

const PrivateHeader: FC = () => {
  const dispatch = useDispatch()
  const { role } = useUserRole()

  const [logout] = useLogoutMutation()

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

  const handleLogout = async () => {
    const refreshToken = localStorageService.getItem(StorageKeys.refreshToken)
    if (refreshToken) {
      await logout({ refresh: refreshToken })
    }
    localStorageService.removeItem(StorageKeys.accessToken)
    localStorageService.removeItem(StorageKeys.refreshToken)
    dispatch(logoutAction())
  }

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

              <LogoutOutlined className='font-s-18' onClick={handleLogout} />
            </Space>
          </Row>
        </Col>
      </Row>
    </Header>
  )
}

export default PrivateHeader
