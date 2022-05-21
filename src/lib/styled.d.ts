import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      gray2: string
      gray5: string
      gray3: string
      gray6: string
      white: string
      blue1: string
      red1: string
      lightBlue: string
      extraLightGray: string
    }
    shadows: {
      shadow1: string
    }
  }
}
