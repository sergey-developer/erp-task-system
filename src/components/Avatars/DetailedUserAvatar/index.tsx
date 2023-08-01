import { Divider, Popover, PopoverProps, Space, Typography } from 'antd'
import pick from 'lodash/pick'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import { userRoleDict } from 'modules/user/constants'
import { UserModel } from 'modules/user/models'
import { getFullUserName, getUserAbbr } from 'modules/user/utils'

import { UserAvatarStyled, overlayInnerStyle } from './styles'

const { Text } = Typography

export type DetailedUserAvatarProps = Pick<PopoverProps, 'placement'> & {
  profile: Pick<
    UserModel,
    'firstName' | 'lastName' | 'middleName' | 'email' | 'role' | 'avatar'
  >
}

const DetailedUserAvatar: FC<DetailedUserAvatarProps> = ({
  placement = 'bottomRight',
  profile,
}) => {
  return (
    <Popover
      overlayInnerStyle={overlayInnerStyle}
      // trigger={['click']}
      placement={placement}
      title={getFullUserName(
        pick(profile, 'firstName', 'lastName', 'middleName'),
      )}
      content={
        <Space
          data-testid='detailed-user-avatar-popover-content'
          direction='vertical'
        >
          <Space>
            <Text type='secondary'>Email:</Text>
            <Text>{profile.email}</Text>
          </Space>

          <Space>
            <Text type='secondary'>Роль:</Text>
            <Text>{userRoleDict[profile.role]}</Text>
          </Space>

          <Divider />

          <Link to={RouteEnum.ChangePassword}>Сменить пароль</Link>
        </Space>
      }
    >
      <UserAvatarStyled
        data-testid='detailed-user-avatar'
        size='large'
        abbr={getUserAbbr(pick(profile, 'firstName', 'lastName'))}
        src={profile.avatar}
      />
    </Popover>
  )
}

export default DetailedUserAvatar
