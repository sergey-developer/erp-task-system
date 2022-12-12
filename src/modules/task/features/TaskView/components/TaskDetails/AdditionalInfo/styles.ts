import styled from 'styled-components'

import {
  taskDetailsContainerBaseCss,
  taskDetailsContainerStretchCss,
} from '../styles'

export const ContentWrapperStyled = styled.div`
  ${taskDetailsContainerBaseCss}
  ${taskDetailsContainerStretchCss}
  ${({ theme }) => `background-color: ${theme.colors.lotion};`}
`
