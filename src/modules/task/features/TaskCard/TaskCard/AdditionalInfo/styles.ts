import styled from 'styled-components'

import {
  taskCardContainerBaseCss,
  taskCardContainerStretchCss,
} from '../styles'

export const ContentWrapperStyled = styled.div`
  ${taskCardContainerBaseCss}
  ${taskCardContainerStretchCss}
  ${({ theme }) => `background-color: ${theme.colors.lotion};`}
`
