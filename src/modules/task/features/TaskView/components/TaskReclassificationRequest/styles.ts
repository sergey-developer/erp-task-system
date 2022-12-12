import styled from 'styled-components'

import { TaskDetailsContainerStyled } from '../TaskDetails/styles'

export const WrapperStyled = styled(TaskDetailsContainerStyled)`
  margin-top: -20px;
  background-color: ${({ theme }) => theme.colors.cosmicLatte};
  border-bottom: 1px solid ${({ theme }) => theme.colors.chineseWhite};
`
