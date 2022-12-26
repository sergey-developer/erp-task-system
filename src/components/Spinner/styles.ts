import { Spin } from 'antd'

import styled, { css } from 'styled-components'

import { SpinnerProps } from './index'

const dimensionStyles: Record<
  NonNullable<SpinnerProps['dimension']>,
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
  $dimension?: SpinnerProps['dimension']
  $centered?: SpinnerProps['centered']
}

export const SpinnerStyled = styled(Spin)<SpinnerStyledProps>`
  display: flex;

  ${({ $dimension }) =>
    $dimension
      ? `
        flex-direction: column;
        ${dimensionStyles[$dimension]}`
      : ''}

  ${({ $centered }) =>
    $centered ? 'justify-content: center; align-items: center;' : ''}
`
