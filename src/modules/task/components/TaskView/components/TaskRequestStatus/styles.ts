import styled from 'styled-components'

import { DetailContainerStyled } from '../TaskDetails/styles'

export const WrapperStyled = styled(DetailContainerStyled)`
  background-color: ${({ theme }) => theme.colors.cosmicLatte};
`
