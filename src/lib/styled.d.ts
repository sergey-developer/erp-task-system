import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      gray2: string
      gray3: string
      gray4: string
      gray5: string
      white: string
      blue1: string
    },
    shadows: {
      shadow1: string
    }
  }
}
