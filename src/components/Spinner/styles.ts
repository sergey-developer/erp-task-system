import { Spin } from 'antd'

import styled, { FlattenSimpleInterpolation, css } from 'styled-components'

import { SpinnerProps } from './index'

const areaStyles: Record<
  NonNullable<SpinnerProps['area']>,
  FlattenSimpleInterpolation | string
> = {
  block: css`
    width: 100%;
    display: flex;
    justify-content: center;
  `,
  parent: css`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
}

export const SpinnerStyled = styled(Spin)<{
  $area?: SpinnerProps['area']
  $offsetTop?: SpinnerProps['offsetTop']
}>`
  ${({ $area }) => ($area ? areaStyles[$area] : '')}
  ${({ $offsetTop }) => ($offsetTop ? `margin-top: ${$offsetTop}px` : '')}
`
