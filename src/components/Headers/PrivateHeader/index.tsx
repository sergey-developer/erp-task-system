import { Badge, Col, Layout, Row, Select, Space, Typography } from 'antd'
import moment from 'moment-timezone'
import { DefaultOptionType } from 'rc-select/lib/Select'
import React, { FC, useCallback, useMemo } from 'react'
import { Link, useMatches } from 'react-router-dom'

import { navMenuConfig } from 'configs/navMenu'
import { mapNavMenuConfig } from 'configs/navMenu/utils'

import LogoutButton from 'modules/auth/components/LogoutButton'
import { MonitoringRouteEnum } from 'modules/monitoring/constants'
import { taskLocalStorageService } from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'
import { updateUserStatusMessages, updateUserTimeZoneMessages } from 'modules/user/constants'
import {
  useOnChangeUserStatus,
  UseOnChangeUserStatusFn,
  useUserMeCodeState,
  useUserMeState,
} from 'modules/user/hooks'
import { UserModel } from 'modules/user/models'
import {
  useUpdateUserStatusMutation,
  useUpdateUserTimeZoneMutation,
} from 'modules/user/services/userApi.service'
import { checkUserStatusOffline, getUserRoleMap } from 'modules/user/utils'

import DetailedUserAvatar from 'components/Avatars/DetailedUserAvatar'
import UserAvatar from 'components/Avatars/UserAvatar'
import { MonitoringIcon } from 'components/Icons'
import Logo from 'components/Logo'
import NavMenu, { NavMenuProps } from 'components/NavMenu'
import NotificationCounter from 'components/NotificationCounter'

import { useTimeZoneListState } from 'shared/hooks/catalogs/timeZone'
import { useUserStatusListState } from 'shared/hooks/catalogs/userStatus'
import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
  isUnauthorizedError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { timeZoneDropdownStyles } from './styles'

const { Header } = Layout
const { Text } = Typography

const PrivateHeader: FC = () => {
  const matches = useMatches()

  const { data: userMeCode } = useUserMeCodeState()
  const { data: userMe } = useUserMeState()
  const { isFirstLineSupportRole } = getUserRoleMap(userMe?.role)

  const { data: timeZoneList, isFetching: timeZoneListIsFetching } = useTimeZoneListState()

  const { data: userStatusList = [], isFetching: userStatusListIsFetching } =
    useUserStatusListState()

  const [updateUserTimeZoneMutation, { isLoading: updateUserTimeZoneIsLoading }] =
    useUpdateUserTimeZoneMutation()

  const [updateUserStatusMutation, { isLoading: updateUserStatusIsLoading }] =
    useUpdateUserStatusMutation()

  const navMenuItems = useMemo<NavMenuProps['items']>(
    () => (userMe ? mapNavMenuConfig(navMenuConfig, userMe.permissions, userMe.role) : []),
    [userMe],
  )

  const navMenuSelectedKeys = matches.map(({ pathname }) => pathname)

  const userStatusOptions = useMemo<DefaultOptionType[]>(
    () =>
      userStatusList.length
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

  const handleUpdateUserStatus = async (statusId: number) => {
    if (!userMe) return

    try {
      await updateUserStatusMutation({ userId: userMe.id, status: statusId }).unwrap()
    } catch (error) {
      if (isErrorResponse(error)) {
        if (isNotFoundError(error) || isUnauthorizedError(error) || isBadRequestError(error)) {
          showErrorNotification(getErrorDetail(error))
        } else {
          showErrorNotification(updateUserStatusMessages.commonError)
        }
      }
    }
  }

  const onChangeUserStatus = useCallback<UseOnChangeUserStatusFn>((status) => {
    if (checkUserStatusOffline(status)) {
      taskLocalStorageService.clearTasksFilters()
    }
  }, [])

  useOnChangeUserStatus(onChangeUserStatus)

  return (
    <Header data-testid='private-header'>
      <Row justify='space-between' align='middle'>
        <Col xxl={12} xl={8}>
          <Row align='middle'>
            <Col xxl={7} xl={10}>
              <Logo />
            </Col>

            <Col xxl={17} xl={14}>
              <NavMenu selectedKeys={navMenuSelectedKeys} items={navMenuItems} />
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
                onSelect={handleUpdateUserStatus}
              />
            )}

            {userMeCode && <Text title='user code'>{userMeCode.code}</Text>}

            <NotificationCounter />

            {userMe?.isStaff && (
              <Link to={MonitoringRouteEnum.TaskMonitoring}>
                <MonitoringIcon $color='black' $size='large' $cursor='pointer' />
              </Link>
            )}

            {userMe ? <DetailedUserAvatar profile={userMe} /> : <UserAvatar size='large' />}

            <LogoutButton />
          </Space>
        </Col>
      </Row>
    </Header>
  )
}

export default PrivateHeader
