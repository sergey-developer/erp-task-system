import { Spin } from 'antd'
import styled, { css } from 'styled-components'

import { SpinnerProps } from './index'

// todo: fix styles
const areaStyles: Record<NonNullable<SpinnerProps['area']>, ReturnType<typeof css>> = {
  block: css`
    width: 100%;
  `,
  parent: css`
    height: 100%;
  `,
  global: css`
    position: absolute;
    height: 100%;
    width: 100%;
  `,
}

type SpinnerStyledProps = {
  $area?: SpinnerProps['area']
  $centered?: SpinnerProps['centered']
}

export const SpinnerStyled = styled(Spin)<SpinnerStyledProps>`
  ${({ $area }) =>
    $area
      ? `
        display: flex;
        flex-direction: column;
        ${areaStyles[$area]}`
      : ''}

  ${({ $centered }) =>
    $centered ? 'display: flex; justify-content: center; align-items: center;' : ''}
`
