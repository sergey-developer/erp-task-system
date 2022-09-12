import { DefaultTheme } from 'styled-components'

/**
  Названия цветов взяты с https://www.color-name.com
 */

const colors = {
  white: '#FFFFFF',
  black: '#000000',
  darkLiver: '#4F4F4F',
  chineseWhite: '#E0E0E0',
  oldSilver: '#828282',
  platinum: '#E8E8E8',
  bleuDeFrance: '#2F80ED',
  fireOpal: '#EB5757',
  lotion: '#FAFAFA',
  antiFlashWhite: '#F0F2F5',
  aliceBlue: '#EEF5FE',
  cosmicLatte: '#FFFBE6',
} as const

const shadows = {
  shadow1: 'box-shadow: 0px 2px 8px 0px #00000026;',
} as const

const theme: DefaultTheme = {
  colors,
  shadows,
}

export default theme
