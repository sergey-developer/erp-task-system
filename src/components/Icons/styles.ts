import { css } from 'styled-components'

import { IconProps } from './types'

export const fontSizeStyles = css<Pick<IconProps, '$size'>>`
  font-size: ${({ $size = 'middle' }) =>
    $size === 'small'
      ? '10'
      : $size === 'middle'
      ? '14'
      : $size === 'large'
      ? '18'
      : ''}px !important;
`

export const colorStyles = css<Pick<IconProps, '$color'>>`
  ${({ theme, $color }) => ($color ? `color: ${theme.colors[$color]};` : '')}
`

export const cursorStyles = css<Pick<IconProps, '$cursor'>>`
  ${({ $cursor }) => ($cursor ? `cursor: ${$cursor};` : '')}
`
