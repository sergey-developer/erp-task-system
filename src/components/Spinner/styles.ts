import { Spin } from 'antd'

import styled, { FlattenSimpleInterpolation, css } from 'styled-components'

export type SpinnerArea = 'self' | 'parent' | 'default'

const areaStyles: Record<SpinnerArea, FlattenSimpleInterpolation | string> = {
  self: css`
    display: flex;
    width: max-content;
  `,
  parent: css`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  default: '',
}

export const SpinnerStyled = styled(Spin)<{
  $area: SpinnerArea
}>`
  ${({ $area }) => areaStyles[$area]}
`
