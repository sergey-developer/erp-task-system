import { Spin } from 'antd'

import styled, { css } from 'styled-components'

import { SpinnerProps } from './index'

const areaStyles: Record<
  NonNullable<SpinnerProps['area']>,
  ReturnType<typeof css>
> = {
  block: css<SpinnerStyledProps>`
    width: 100%;
  `,
  parent: css<SpinnerStyledProps>`
    height: 100%;
  `,
}

type SpinnerStyledProps = {
  $area?: SpinnerProps['area']
  $centered?: SpinnerProps['centered']
}

export const SpinnerStyled = styled(Spin)<SpinnerStyledProps>`
  display: flex;

  ${({ $area }) =>
    $area
      ? `
        flex-direction: column;
        ${areaStyles[$area]}`
      : ''}

  ${({ $centered }) =>
    $centered ? 'justify-content: center; align-items: center;' : ''}
`
