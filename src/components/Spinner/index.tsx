import { SpinProps } from 'antd'
import React, { FC } from 'react'

import { SpinnerArea, SpinnerStyled } from './styles'

type SpinnerProps = SpinProps & {
  area?: SpinnerArea
}

const Spinner: FC<SpinnerProps> = ({ area, ...props }) => {
  return <SpinnerStyled $area={area!} {...props} />
}

Spinner.defaultProps = {
  area: 'self',
}

export default Spinner
