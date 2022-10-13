import styled from 'styled-components'

import { DetailsContainerStyled } from '../TaskDetails/styles'

export const WrapperStyled = styled(DetailsContainerStyled)`
  background-color: ${({ theme }) => theme.colors.cosmicLatte};
`
