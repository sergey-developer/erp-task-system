import { Card, Divider } from 'antd'
import styled, { css } from 'styled-components'

import { StyledBreakpointsProps } from 'shared/types/breakpoints'

export const taskCardContainerBaseCss = css<StyledBreakpointsProps>`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: ${({ $breakpoints }) => ($breakpoints.xxl ? '20' : '30')}px;
  padding-right: ${({ $breakpoints }) => ($breakpoints.xxl ? '20' : '30')}px;
`

export const taskCardContainerStretchCss = css<StyledBreakpointsProps>`
  margin-left: ${({ $breakpoints }) => ($breakpoints.xxl ? '-20' : '-30')}px;
  margin-right: ${({ $breakpoints }) => ($breakpoints.xxl ? '-20' : '-30')}px;
`

export const RootWrapperStyled = styled.div`
  padding: 0 0 8px 8px;
  height: 100%;
`

export const CardStyled = styled(Card)<StyledBreakpointsProps>`
  height: 100%;
  display: flex;
  flex-direction: column;

  && {
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.chineseWhite};
  }

  .ant-card-head {
    padding: 0;
    background-color: ${({ theme }) => theme.colors.aliceBlue};
  }

  .ant-card-head-title {
    padding: 12px 20px 12px
      ${({ $breakpoints }) => ($breakpoints.xxl ? '30px' : '20px')};
  }

  .ant-card-body {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    ${taskCardContainerBaseCss};
    padding-bottom: 0;
  }
`

export const DividerStyled = styled(Divider)`
  && {
    border-top: 1px solid ${({ theme }) => theme.colors.chineseWhite};
  }
`

export type TaskCardContainerStyledProps = {
  $stretch?: boolean
}

export const TaskCardContainerStyled = styled.div<
  StyledBreakpointsProps & TaskCardContainerStyledProps
>`
  ${taskCardContainerBaseCss}
  ${({ $stretch }) => ($stretch ? taskCardContainerStretchCss : '')}
`
