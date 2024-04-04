import { Divider, Popover, PopoverProps, Space, Typography } from 'antd'
import pick from 'lodash/pick'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { AuthRouteEnum } from 'modules/auth/constants/routes'
import { UserModel } from 'modules/user/models'
import { getFullUserName, getUserAbbr } from 'modules/user/utils'

import { valueOrHyphen } from 'shared/utils/common'

import { overlayInnerStyle, UserAvatarStyled } from './styles'

const { Text } = Typography

export type DetailedUserAvatarProps = Pick<PopoverProps, 'placement'> & {
  profile: Pick<
    UserModel,
    'firstName' | 'lastName' | 'middleName' | 'email' | 'position' | 'avatar'
  >
}

const DetailedUserAvatar: FC<DetailedUserAvatarProps> = ({
  placement = 'bottomRight',
  profile,
}) => {
  return (
    <Popover
      overlayInnerStyle={overlayInnerStyle}
      placement={placement}
      title={getFullUserName(pick(profile, 'firstName', 'lastName', 'middleName'))}
      content={
        <Space data-testid='detailed-user-avatar-popover-content' direction='vertical'>
          <Space>
            <Text type='secondary'>Email:</Text>
            <Text>{profile.email}</Text>
          </Space>

          <Space>
            <Text type='secondary'>Должность:</Text>
            <Text>{valueOrHyphen(profile.position?.title)}</Text>
          </Space>

          <Divider />

          <Link to={AuthRouteEnum.ChangePassword}>Сменить пароль</Link>
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
