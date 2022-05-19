import { Card, Divider } from 'antd'

import styled, { css } from 'styled-components'

export const RootWrapperStyled = styled.div`
  padding: 0 0 8px 8px;
  height: 100%;
`

export const CardStyled = styled(Card)`
  height: 100%;
  overflow-y: auto;

  && {
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray5};
  }

  .ant-card-head {
    padding: 0;
    background-color: ${({ theme }) => theme.colors.lightBlue};
  }

  .ant-card-head-title {
    padding: 12px 20px 12px 40px;
  }

  .ant-card-body {
    padding: 0;
  }
`

export const DividerStyled = styled(Divider)`
  && {
    border-top: 1px solid ${({ theme }) => theme.colors.gray5};
    margin: 0;
  }
`

const detailContainerCss = css`
  padding: 20px 40px;
`

export const MainDetailContainerStyled = styled.div`
  ${detailContainerCss}
`
