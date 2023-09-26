import styled from 'styled-components'

import { StyledBreakpointsProps } from 'shared/types/breakpoints'

// const wrapperBreakpointStyles: StyledBreakpointStyles = {
//   xxl: css`
//     padding: 30px 40px;
//   `,
//   xl: css`
//     padding: 30px 15px;
//   `,
// }

export const WrapperStyled = styled.div<StyledBreakpointsProps>`
  &:not(:last-child) {
    border-bottom: ${({ theme }) => theme.colors.chineseWhite};
  }
`
