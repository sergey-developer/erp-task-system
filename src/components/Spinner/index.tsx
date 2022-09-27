import { SpinProps } from 'antd'
import React, { FC } from 'react'

import { SpinnerStyled } from './styles'

export type SpinnerProps = SpinProps & {
  area?: 'block' | 'parent'
  offset?: ['top', number]
}

const Spinner: FC<SpinnerProps> = ({ area, offset, ...props }) => {
  return <SpinnerStyled $area={area} $offset={offset} {...props} />
}

export default Spinner
