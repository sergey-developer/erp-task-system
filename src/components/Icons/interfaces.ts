import { Keys } from 'shared/interfaces/utils'
import { DefaultTheme } from 'styled-components'

export type IconProps = Partial<{
  $size: 'small' | 'middle' | 'large'
  $color: Keys<DefaultTheme['colors']>
}>
