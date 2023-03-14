import { CSSProperties } from 'react'

import styled from 'styled-components'

import UserAvatar from '../UserAvatar'

export const overlayInnerStyle: CSSProperties = { maxWidth: '350px' }

export const UserAvatarStyled = styled(UserAvatar)`
  cursor: pointer;
`
