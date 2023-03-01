import { SpinProps } from 'antd'
import React, { FC } from 'react'

import { SpinnerStyled } from './styles'

export type SpinnerProps = SpinProps & {
  area?: 'block' | 'parent'
  centered?: boolean
}

const Spinner: FC<SpinnerProps> = ({ area, centered, ...props }) => {
  return <SpinnerStyled $area={area} $centered={centered} {...props} />
}

Spinner.defaultProps = {
  centered: true,
}

export default Spinner
