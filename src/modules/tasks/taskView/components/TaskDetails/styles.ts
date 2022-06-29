import { Card, Divider, Image } from 'antd'

import styled from 'styled-components'

export const RootWrapperStyled = styled.div`
  padding: 0 0 8px 8px;
  height: 100%;
`

type CardStyledProps = { $isLoading: boolean }

export const CardStyled = styled(Card)<CardStyledProps>`
  height: 100%;
  display: flex;
  flex-direction: column;

  && {
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray5};
  }

  .ant-card-head {
    padding: 0;
    background-color: ${({ theme }) => theme.colors.lightBlue};
  }

  .ant-card-head-title {
    padding: 12px 20px 12px 30px;
  }

  .ant-card-body {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    padding: ${({ $isLoading }) => ($isLoading ? '20px' : 0)};
  }
`

export const DividerStyled = styled(Divider)`
  && {
    border-top: 1px solid ${({ theme }) => theme.colors.gray5};
    margin: 0;
  }
`

export const DetailContainerStyled = styled.div`
  padding: 20px 30px;
`

export const ImageStyled = styled(Image)`
  && {
    border-radius: 4px;
    width: 58px;
  }
  ~ .ant-image-mask {
    border-radius: 4px;
  }
`
