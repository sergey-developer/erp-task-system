import { SpinProps } from 'antd'
import React, { FC } from 'react'

import { SpinnerStyled } from './styles'

export type SpinnerProps = SpinProps & {
  dimension?: 'block' | 'parent'
  offset?: ['top', number]
  centered?: boolean
}

const Spinner: FC<SpinnerProps> = ({
  dimension,
  offset,
  centered,
  ...props
}) => {
  return (
    <SpinnerStyled
      $dimension={dimension}
      $offset={offset}
      $centered={centered}
      {...props}
    />
  )
}

Spinner.defaultProps = {
  centered: true,
}

export default Spinner
