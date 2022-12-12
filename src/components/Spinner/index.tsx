import { SpinProps } from 'antd'
import React, { FC } from 'react'

import { SpinnerStyled } from './styles'

export type SpinnerProps = SpinProps & {
  dimension?: 'block' | 'parent'
  centered?: boolean
}

const Spinner: FC<SpinnerProps> = ({ dimension, centered, ...props }) => {
  return (
    <SpinnerStyled $dimension={dimension} $centered={centered} {...props} />
  )
}

Spinner.defaultProps = {
  centered: true,
}

export default Spinner
