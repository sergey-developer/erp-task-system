import { Layout } from 'antd'
import { CSSProperties } from 'react'
import styled from 'styled-components'

import { StyledBreakpointsProps } from 'shared/types/breakpoints'

const { Header } = Layout

// const headerBreakpointStyles: StyledBreakpointStyles = {
//   xxl: css`
//     padding: 0 40px;
//   `,
//   xl: css`
//     padding: 0 15px;
//   `,
// }

export const HeaderStyled = styled(Header)<StyledBreakpointsProps>``

export const timeZoneDropdownStyles: Pick<CSSProperties, 'minWidth'> = {
  minWidth: 'max-content',
}
