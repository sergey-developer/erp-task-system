import styled from 'styled-components'

export const ContainerStyled = styled.div<{ $hasMarginBottom?: boolean }>`
  ${({ $hasMarginBottom }) => ($hasMarginBottom ? 'margin-bottom: 16px' : '')}
`
