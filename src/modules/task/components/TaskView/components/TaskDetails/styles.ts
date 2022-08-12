import { Card, Divider } from 'antd'

import { StyledBreakpointsProps } from 'shared/interfaces/breakpoints'
import styled from 'styled-components'

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
    padding: ${({ loading }) => (loading ? '20px' : 0)};
  }
`

export const DividerStyled = styled(Divider)`
  && {
    border-top: 1px solid ${({ theme }) => theme.colors.chineseWhite};
    margin: 0;
  }
`

export const DetailContainerStyled = styled.div<StyledBreakpointsProps>`
  padding: 20px ${({ $breakpoints }) => ($breakpoints.xxl ? '30px' : '')};
`
