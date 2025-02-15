import { Badge, Col, Layout, Row, Select, Space, Typography } from 'antd'
import LogoutButton from 'features/auth/components/LogoutButton'
import { MonitoringRoutesEnum } from 'features/monitoring/constants'
import { taskLocalStorageService } from 'features/tasks/services/taskLocalStorageService/taskLocalStorage.service'
import { updateUserStatusMessages, updateUserTimeZoneMessages } from 'features/users/api/constants'
import { UserDetailDTO } from 'features/users/api/dto'
import {
  useUpdateUserStatusMutation,
  useUpdateUserTimeZoneMutation,
} from 'features/users/api/endpoints/users.endpoints'
import { checkUserStatusOffline } from 'features/users/helpers'
import {
  useOnChangeUserStatus,
  UseOnChangeUserStatusFn,
  useUserMeCodeState,
  useUserMeState,
} from 'features/users/hooks'
import moment from 'moment-timezone'
import { DefaultOptionType } from 'rc-select/lib/Select'
import React, { FC, useCallback, useMemo } from 'react'
import { Link, useMatches } from 'react-router-dom'

import { navMenuConfig } from 'configs/navMenu'
import { mapNavMenuConfig } from 'configs/navMenu/utils'

import DetailedUserAvatar from 'components/Avatars/DetailedUserAvatar'
import UserAvatar from 'components/Avatars/UserAvatar'
import { MonitoringIcon } from 'components/Icons'
import Logo from 'components/Logo'
import NavMenu, { NavMenuProps } from 'components/NavMenu'
import NotificationCounter from 'components/NotificationCounter'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
  isUnauthorizedError,
} from 'shared/api/baseApi'
import { useTimeZonesCatalogState } from 'shared/catalogs/timeZones/hooks'
import { useUserStatusesCatalogState } from 'shared/catalogs/userStatuses/hooks'
import { showErrorNotification } from 'shared/utils/notifications'

import { timeZoneDropdownStyles } from './styles'

const { Header } = Layout
const { Text } = Typography

const PrivateHeader: FC = () => {
  const matches = useMatches()

  const { data: userMeCode } = useUserMeCodeState()
  const { data: userMe } = useUserMeState()

  const { data: timeZones, isFetching: timeZonesIsFetching } = useTimeZonesCatalogState()

  const { data: userStatuses = [], isFetching: userStatusesIsFetching } =
    useUserStatusesCatalogState()

  const [updateUserTimeZoneMutation, { isLoading: updateUserTimeZoneIsLoading }] =
    useUpdateUserTimeZoneMutation()

  const [updateUserStatusMutation, { isLoading: updateUserStatusIsLoading }] =
    useUpdateUserStatusMutation()

  const navMenuItems = useMemo<NavMenuProps['items']>(
    () => (userMe ? mapNavMenuConfig(navMenuConfig, userMe.permissions) : []),
    [userMe],
  )

  const navMenuSelectedKeys = matches.map(({ pathname }) => pathname)

  const userStatusOptions = useMemo<DefaultOptionType[]>(
    () =>
      userStatuses.length
        ? userStatuses.map((status) => ({
            value: status.id,
            label: (
              <Space size={4}>
                <Badge color={status.color} />
                <Text>{status.title}</Text>
              </Space>
            ),
          }))
        : [],
    [userStatuses],
  )

  const onUpdateTimeZone = async (timezone: UserDetailDTO['timezone']) => {
    if (!userMe) return

    try {
      await updateUserTimeZoneMutation({ userId: userMe.id, timezone }).unwrap()
      moment.tz.setDefault(timezone)
    } catch (error) {
      if (isErrorResponse(error)) {
        showErrorNotification(updateUserTimeZoneMessages)
      }
    }
  }

  const onUpdateUserStatus = async (statusId: number) => {
    if (!userMe) return

    try {
      await updateUserStatusMutation({ userId: userMe.id, status: statusId }).unwrap()
    } catch (error) {
      if (isErrorResponse(error)) {
        if (isNotFoundError(error) || isUnauthorizedError(error) || isBadRequestError(error)) {
          showErrorNotification(getErrorDetail(error))
        } else {
          showErrorNotification(updateUserStatusMessages)
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
              loading={timeZonesIsFetching || updateUserTimeZoneIsLoading}
              disabled={timeZonesIsFetching || updateUserTimeZoneIsLoading}
              options={timeZones}
              value={userMe?.timezone || null}
              onChange={(value) => onUpdateTimeZone(value as string)}
              dropdownStyle={timeZoneDropdownStyles}
            />

            <Select
              data-testid='user-status-select'
              aria-label='Статус пользователя'
              options={userStatusOptions}
              loading={userStatusesIsFetching}
              disabled={updateUserStatusIsLoading}
              value={userMe?.status.id}
              onSelect={onUpdateUserStatus}
            />

            {userMeCode && <Text title='user code'>{userMeCode.code}</Text>}

            <NotificationCounter />

            {userMe?.isStaff && (
              <Link to={MonitoringRoutesEnum.TaskMonitoring}>
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
