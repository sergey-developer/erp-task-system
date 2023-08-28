import { css } from 'styled-components'

import { IconProps } from './types'

const fontSizes: Record<NonNullable<IconProps['$size']>, number> = {
  small: 10,
  middle: 14,
  large: 18,
}

export const fontSizeStyles = css<Pick<IconProps, '$size'>>`
  font-size: ${({ $size = 'middle' }) => fontSizes[$size]}px !important;
`

export const colorStyles = css<Pick<IconProps, '$color'>>`
  ${({ theme, $color }) => ($color ? `color: ${theme.colors[$color]};` : '')}
`

export const cursorStyles = css<Pick<IconProps, '$cursor'>>`
  ${({ $cursor }) => ($cursor ? `cursor: ${$cursor};` : '')}
`
