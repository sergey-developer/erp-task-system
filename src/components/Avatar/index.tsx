import { Avatar as BaseAvatar } from 'antd'
import React, { FC } from 'react'

import { BadgeStyled } from './styles'

type AvatarProps = {
  className?: string
}

const Avatar: FC<AvatarProps> = ({ className }) => {
  return (
    <BadgeStyled className={className} dot color='orange'>
      <BaseAvatar size='large' />
    </BadgeStyled>
  )
}

export default Avatar
