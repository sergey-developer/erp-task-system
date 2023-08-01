import { Badge, Col, Row, Select, Space, Typography } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import moment from 'moment-timezone'
import { DefaultOptionType } from 'rc-select/lib/Select'
import React, { FC, useMemo } from 'react'
import { Link, useMatches } from 'react-router-dom'

import { getNavMenuConfig } from 'configs/navMenu/utils'
import { RouteEnum } from 'configs/routes'

import LogoutButton from 'modules/auth/components/LogoutButton'
import {
  updateUserStatusMessages,
  updateUserTimeZoneMessages,
} from 'modules/user/constants/messages'
import {
  useUserMeCodeState,
  useUserMeState,
  useUserStatusListState,
} from 'modules/user/hooks'
import { UserModel } from 'modules/user/models'
import {
  useUpdateUserStatusMutation,
  useUpdateUserTimeZoneMutation,
} from 'modules/user/services/userApi.service'
import { getUserRoleMap } from 'modules/user/utils'

import DetailedUserAvatar from 'components/Avatars/DetailedUserAvatar'
import UserAvatar from 'components/Avatars/UserAvatar'
import { MonitoringIcon } from 'components/Icons'
import Logo from 'components/Logo'
import NavMenu, { NavMenuProps } from 'components/NavMenu'
import NotificationCounter from 'components/NotificationCounter'

import {
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
  isUnauthorizedError,
} from 'shared/services/api'
import { useTimeZoneListState } from 'shared/services/api/hooks'
import { showErrorNotification } from 'shared/utils/notifications'

import { HeaderStyled, timeZoneDropdownStyles } from './styles'

const { Text } = Typography

const PrivateHeader: FC = () => {
  const breakpoints = useBreakpoint()
  const matches = useMatches()

  const { data: userMeCode } = useUserMeCodeState()
  const { data: userMe } = useUserMeState()
  const { isFirstLineSupportRole } = getUserRoleMap(userMe?.role)

  const { data: timeZoneList, isFetching: timeZoneListIsFetching } =
    useTimeZoneListState()

  const { data: userStatusList, isFetching: userStatusListIsFetching } =
    useUserStatusListState()

  const [
    updateUserTimeZoneMutation,
    { isLoading: updateUserTimeZoneIsLoading },
  ] = useUpdateUserTimeZoneMutation()

  const [updateUserStatusMutation, { isLoading: updateUserStatusIsLoading }] =
    useUpdateUserStatusMutation()

  const navMenuItems = useMemo<NavMenuProps['items']>(
    () =>
      userMe?.role
        ? getNavMenuConfig(userMe.role).map(
            ({ key, icon: Icon, link, text }) => ({
              key,
              label: link ? <Link to={link}>{text}</Link> : text,
              icon: Icon && <Icon $size='large' />,
            }),
          )
        : [],
    [userMe?.role],
  )

  const navMenuSelectedKeys = matches.map(({ pathname }) => pathname)

  const userStatusOptions = useMemo<Array<DefaultOptionType>>(
    () =>
      userStatusList?.length
        ? userStatusList.map((status) => ({
            value: status.id,
            label: (
              <Space size={4}>
                <Badge color={status.color} />
                <Text>{status.title}</Text>
              </Space>
            ),
          }))
        : [],
    [userStatusList],
  )

  const handleUpdateTimeZone = async (timezone: UserModel['timezone']) => {
    if (!userMe) return

    try {
      await updateUserTimeZoneMutation({ userId: userMe.id, timezone }).unwrap()
      moment.tz.setDefault(timezone)
    } catch (error) {
      if (isErrorResponse(error)) {
        showErrorNotification(updateUserTimeZoneMessages.commonError)
      }
    }
  }

  const handleSelectUserStatus = async (status: number) => {
    if (!userMe) return

    try {
      await updateUserStatusMutation({ userId: userMe.id, status }).unwrap()
    } catch (error) {
      if (isErrorResponse(error)) {
        if (
          (isNotFoundError(error) ||
            isUnauthorizedError(error) ||
            isBadRequestError(error)) &&
          error.data.detail
        ) {
          showErrorNotification(error.data.detail)
        } else {
          showErrorNotification(updateUserStatusMessages.commonError)
        }
      }
    }
  }

  return (
    <HeaderStyled data-testid='private-header' $breakpoints={breakpoints}>
      <Row justify='space-between' align='middle'>
        <Col xxl={12} xl={8}>
          <Row align='middle'>
            <Col xxl={7} xl={10}>
              <Logo />
            </Col>

            <Col xxl={17} xl={14}>
              <NavMenu
                selectedKeys={navMenuSelectedKeys}
                items={navMenuItems}
              />
            </Col>
          </Row>
        </Col>

        <Col>
          <Space size='large'>
            <Select
              data-testid='timezone-select'
              aria-label='Временная зона'
              placeholder='Выберите временную зону'
              loading={timeZoneListIsFetching || updateUserTimeZoneIsLoading}
              disabled={timeZoneListIsFetching || updateUserTimeZoneIsLoading}
              options={timeZoneList}
              value={userMe?.timezone || null}
              onChange={(value) => handleUpdateTimeZone(value as string)}
              dropdownStyle={timeZoneDropdownStyles}
            />

            {isFirstLineSupportRole && (
              <Select
                data-testid='user-status-select'
                aria-label='Статус пользователя'
                options={userStatusOptions}
                loading={userStatusListIsFetching}
                disabled={updateUserStatusIsLoading}
                value={userMe?.status.id}
                onSelect={handleSelectUserStatus}
              />
            )}

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

            {userMe ? (
              <DetailedUserAvatar profile={userMe} />
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
