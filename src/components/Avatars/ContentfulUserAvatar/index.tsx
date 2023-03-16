import { Popover, PopoverProps, Space, Typography } from 'antd'
import pick from 'lodash/pick'
import React, { FC } from 'react'

import { userRoleDict } from 'modules/user/constants/roles'
import { UserProfileModel } from 'modules/user/models'
import { getFullUserName, getUserAbbr } from 'modules/user/utils'

import { UserAvatarStyled, overlayInnerStyle } from './styles'

const { Text } = Typography

export type ContentfulUserAvatarProps = Pick<
  PopoverProps,
  'trigger' | 'placement'
> & {
  profile: Pick<
    UserProfileModel,
    'firstName' | 'lastName' | 'middleName' | 'email' | 'role' | 'avatar'
  >
}

const ContentfulUserAvatar: FC<ContentfulUserAvatarProps> = ({
  trigger,
  placement,
  profile,
}) => {
  return (
    <Popover
      overlayInnerStyle={overlayInnerStyle}
      trigger={trigger}
      placement={placement}
      title={getFullUserName(
        pick(profile, 'firstName', 'lastName', 'middleName'),
      )}
      content={
        <Space direction='vertical'>
          <Space>
            <Text type='secondary'>Email:</Text>
            <Text>{profile.email}</Text>
          </Space>

          <Space>
            <Text type='secondary'>Роль:</Text>
            <Text>{userRoleDict[profile.role]}</Text>
          </Space>
        </Space>
      }
    >
      <UserAvatarStyled
        size='large'
        abbr={getUserAbbr(pick(profile, 'firstName', 'lastName'))}
        src={profile.avatar}
      />
    </Popover>
  )
}

ContentfulUserAvatar.defaultProps = {
  placement: 'bottomRight',
}

export default ContentfulUserAvatar
