import { css } from 'styled-components'

import { IconProps } from './interfaces'

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

const colorStyles = css<Pick<IconProps, '$color'>>`
  ${({ theme, $color }) => ($color ? `color: ${theme.colors[$color]};` : '')}
`
