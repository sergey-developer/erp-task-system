import styled from 'styled-components'

import { TaskCardContainerStyled } from '../TaskCard/styles'

export const WrapperStyled = styled(TaskCardContainerStyled)`
  margin-top: -20px;
  background-color: ${({ theme }) => theme.colors.cosmicLatte};
  border-bottom: 1px solid ${({ theme }) => theme.colors.chineseWhite};
`
