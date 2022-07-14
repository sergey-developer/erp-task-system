import { AvatarProps, BadgeProps } from 'antd'
import React from 'react'

import { FCWithChildren } from 'shared/interfaces/utils'

import { AvatarStyled, BadgeStyled } from './styles'

type UserAvatarProps = AvatarProps & Pick<BadgeProps, 'dot'>

const UserAvatar: FCWithChildren<UserAvatarProps> = ({
  dot,
  children,
  ...props
}) => {
  const avatar = <AvatarStyled {...props}>{children}</AvatarStyled>

  return dot ? (
    <BadgeStyled dot color='orange'>
      {avatar}
    </BadgeStyled>
  ) : (
    avatar
  )
}

export default UserAvatar
