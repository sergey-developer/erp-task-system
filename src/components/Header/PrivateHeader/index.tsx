import { Col, Row, Space, Typography } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import React, { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { getNavMenuConfig } from 'configs/navMenu/utils'
import { RouteEnum } from 'configs/routes'

import LogoutButton from 'modules/auth/features/Logout/LogoutButton'
import { userApiMessages } from 'modules/user/constants/errorMessages'
import { useUserMeCodeState, useUserMeState } from 'modules/user/hooks'
import { UserModel } from 'modules/user/models'
import { useUpdateUserMutation } from 'modules/user/services/userApi.service'

import ContentfulUserAvatar from 'components/Avatars/ContentfulUserAvatar'
import UserAvatar from 'components/Avatars/UserAvatar'
import { MonitoringIcon } from 'components/Icons'
import Logo from 'components/Logo'
import NavMenu, { NavMenuProps } from 'components/NavMenu'
import NotificationCounter from 'components/NotificationCounter'

import { useMatchedRoute } from 'shared/hooks'
import { isErrorResponse } from 'shared/services/api'
import { useTimeZoneListState } from 'shared/services/api/hooks'
import { showErrorNotification } from 'shared/utils/notifications'

import { HeaderStyled, TimeZoneSelectStyled } from './styles'

const { Text } = Typography

const PrivateHeader: FC = () => {
  const breakpoints = useBreakpoint()

  const { data: userMeCode } = useUserMeCodeState()
  const { data: userMe } = useUserMeState()

  const { data: timeZoneList, isFetching: timeZoneListIsFetching } =
    useTimeZoneListState()

  const [updateUserMutation, { isLoading: updateUserIsLoading }] =
    useUpdateUserMutation()

  const navMenu = useMemo(() => {
    const userRole = userMe?.role

    const items: NavMenuProps['items'] = userRole
      ? getNavMenuConfig(userRole).map(({ key, icon: Icon, link, text }) => ({
          key,
          label: <Link to={link}>{text}</Link>,
          icon: <Icon $size='large' />,
        }))
      : []

    const itemsKeys = items.map(({ key }) => key)

    return { items, itemsKeys }
  }, [userMe?.role])

  const matchedRoute = useMatchedRoute(navMenu.itemsKeys)
  const activeNavKey = matchedRoute?.pathnameBase
  const navMenuSelectedKeys = activeNavKey ? [activeNavKey] : undefined

  const handleUpdateTimeZone = async (timezone: UserModel['timezone']) => {
    if (!userMe) return

    try {
      await updateUserMutation({ userId: userMe.id, timezone }).unwrap()
    } catch (error) {
      if (isErrorResponse(error)) {
        showErrorNotification(userApiMessages.updateUser.commonError)
      }
    }
  }

  return (
    <HeaderStyled data-testid='private-header' $breakpoints={breakpoints}>
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
            {userMeCode && <Text title='user code'>{userMeCode.code}</Text>}

            <NotificationCounter />

            {userMe?.isStaff && (
              <Link to={RouteEnum.TaskMonitoring}>
                <MonitoringIcon
                  $color='black'
                  $size='large'
                  $cursor='pointer'
                />
              </Link>
            )}

            <TimeZoneSelectStyled
              data-testid='timezone-select'
              aria-label='Временная зона'
              placeholder='Выберите временную зону'
              loading={timeZoneListIsFetching || updateUserIsLoading}
              disabled={timeZoneListIsFetching || updateUserIsLoading}
              options={timeZoneList}
              value={userMe?.timezone || null}
              onChange={(value) => handleUpdateTimeZone(value as string)}
            />

            {userMe ? (
              <ContentfulUserAvatar profile={userMe} />
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
