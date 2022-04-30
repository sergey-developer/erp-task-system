import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      gray2: string
      gray6: string
      white: string
      blue1: string
      red1: string
    }
    shadows: {
      shadow1: string
    }
  }
}
