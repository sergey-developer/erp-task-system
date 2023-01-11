import { DefaultTheme } from 'styled-components'

export type IconProps = Partial<{
  $size: 'small' | 'middle' | 'large'
  $color: keyof DefaultTheme['colors']
  $cursor: 'pointer'
}>
