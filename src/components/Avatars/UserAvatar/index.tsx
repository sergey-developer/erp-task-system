import { AvatarProps, BadgeProps } from 'antd'
import React, { FC } from 'react'

import { AvatarStyled, BadgeStyled } from './styles'

type UserAvatarProps = Omit<AvatarProps, 'src' | 'alt'> &
  Pick<BadgeProps, 'dot'> & {
    abbr: string
    src?: string
  }

const UserAvatar: FC<UserAvatarProps> = ({ dot, src, abbr, ...props }) => {
  const avatar = (
    <AvatarStyled src={src} alt='user-avatar' {...props}>
      {!src ? abbr : null}
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
