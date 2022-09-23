import { SpinProps } from 'antd'
import React, { FC } from 'react'

import { SpinnerStyled } from './styles'

export type SpinnerProps = SpinProps & {
  area?: 'block' | 'parent'
  offsetTop?: number
}

const Spinner: FC<SpinnerProps> = ({ area, offsetTop, ...props }) => {
  return <SpinnerStyled $area={area} $offsetTop={offsetTop} {...props} />
}

export default Spinner
