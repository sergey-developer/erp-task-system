import { AvatarProps, BadgeProps } from 'antd'
import React, { FC } from 'react'

import { BaseUserModel } from 'modules/user/models'
import getUserAbbr from 'modules/user/utils/getUserAbbr'

import { AvatarStyled, BadgeStyled } from './styles'

// todo: сделать поле user обязательным когда с апи будут приходить данные для этого поля

type UserAvatarProps = Omit<AvatarProps, 'src' | 'alt'> &
  Pick<BadgeProps, 'dot'> & {
    user?: Pick<BaseUserModel, 'firstName' | 'lastName' | 'avatar'>
  }

const UserAvatar: FC<UserAvatarProps> = ({ dot, user, ...props }) => {
  const avatar = (
    <AvatarStyled src={user?.avatar} alt='Avatar' {...props}>
      {user && !user.avatar ? getUserAbbr(user) : null}
    </AvatarStyled>
  )

  return dot ? (
    <BadgeStyled dot color='orange'>
      {avatar}
    </BadgeStyled>
  ) : (
    avatar
  )
}

export default UserAvatar
