import * as STYLED from 'styled-components'

declare module 'styled-components' {
  interface DefaultTheme {
    white: string
    offWhite: string
    lightGray: string
    gray: string
    darkGray: string
    black: string
    primaryColor: string
    accentColor: string
  }
}
