import { AvatarProps, BadgeProps } from 'antd'
import React, { FC } from 'react'

import { MaybeNull } from 'shared/interfaces/utils'

import { AvatarStyled, BadgeStyled } from './styles'

type UserAvatarProps = Omit<AvatarProps, 'src' | 'alt'> &
  Pick<BadgeProps, 'dot'> &
  Partial<{
    abbr: string
    src: MaybeNull<string>
    className: string
  }>

const UserAvatar: FC<UserAvatarProps> = React.forwardRef<
  HTMLElement,
  UserAvatarProps
>(({ dot, src, abbr, ...props }, ref) => {
  const avatar = (
    <AvatarStyled ref={ref} src={src} alt='user-avatar' {...props}>
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
})

export default UserAvatar
