import { Spin } from 'antd'

import styled, { css } from 'styled-components'

import { SpinnerProps } from './index'

const dimensionStyles: Record<
  NonNullable<SpinnerProps['dimension']>,
  ReturnType<typeof css>
> = {
  block: css<SpinnerStyledProps>`
    width: 100%;
    display: flex;

    ${({ $centered }) => ($centered ? 'justify-content: center;' : '')}
  `,
  parent: css<SpinnerStyledProps>`
    height: 100%;
    display: flex;

    ${({ $centered }) =>
      $centered ? 'justify-content: center; align-items: center;' : ''}
  `,
}

type SpinnerStyledProps = {
  $dimension?: SpinnerProps['dimension']
  $offset?: SpinnerProps['offset']
  $centered?: SpinnerProps['centered']
}

export const SpinnerStyled = styled(Spin)<SpinnerStyledProps>`
  ${({ $dimension }) => ($dimension ? dimensionStyles[$dimension] : '')}

  ${({ $offset }) => {
    if (!$offset) return ''

    const [direction, value] = $offset
    return `margin-${direction}: ${value}px;`
  }}
`
