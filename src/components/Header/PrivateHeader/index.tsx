import { Col, Row, Space, Typography } from 'antd'
import React, { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import ContentfulUserAvatar from 'components/Avatars/ContentfulUserAvatar'
import UserAvatar from 'components/Avatars/UserAvatar'
import { MonitoringIcon } from 'components/Icons'
import Logo from 'components/Logo'
import NavMenu, { NavMenuProps } from 'components/NavMenu'
import NotificationCounter from 'components/NotificationCounter'
import { getNavMenuConfig } from 'configs/navMenu/utils'
import { RoutesEnum } from 'configs/routes'
import LogoutButton from 'modules/auth/features/Logout/LogoutButton'
import { useUserProfileState } from 'modules/user/hooks'
import { useGetUserCodeQuery } from 'modules/user/services/userApi.service'
import { useMatchedRoute } from 'shared/hooks'

import { HeaderStyled } from './styles'

const { Text } = Typography

const PrivateHeader: FC = () => {
  const breakpoints = useBreakpoint()
  const { data: userCode } = useGetUserCodeQuery()
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
        <Col span={12}>
          <Row align='middle'>
            <Col span={7}>
              <Logo />
            </Col>

            <Col span={17}>
              <NavMenu
                selectedKeys={navMenuSelectedKeys}
                items={navMenu.items}
              />
            </Col>
          </Row>
        </Col>

        <Col>
          <Space size='large'>
            {userCode && <Text title='user code'>{userCode.code}</Text>}

            <NotificationCounter />

            {userProfile?.isStaff && (
              <Link to={RoutesEnum.TaskMonitoring}>
                <MonitoringIcon
                  $color='black'
                  $size='large'
                  $cursor='pointer'
                />
              </Link>
            )}

            {userProfile ? (
              <ContentfulUserAvatar profile={userProfile} />
            ) : (
              <UserAvatar size='large' />
            )}

            <LogoutButton />
          </Space>
        </Col>
      </Row>
    </HeaderStyled>
  )
}

export default PrivateHeader
