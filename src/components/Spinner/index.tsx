import { SpinProps } from 'antd'
import React, { FC } from 'react'

import { env } from 'configs/env'

import { SpinnerStyled } from './styles'

export type SpinnerProps = SpinProps & {
  area?: 'block' | 'parent'
  centered?: boolean
}

const Spinner: FC<SpinnerProps> = ({ area, centered, tip, ...props }) => {
  return !env.isTest && Boolean(tip) ? (
    <SpinnerStyled $area={area} $centered={centered} tip={tip} {...props}>
      {/**
       - div as children for preventing warning "tip only work in nest pattern"
       - setting height to prevent zero height of spinner container
       */}
      <div style={{ minHeight: 50 }}></div>
    </SpinnerStyled>
  ) : (
    <SpinnerStyled $area={area} $centered={centered} {...props} />
  )
}

Spinner.defaultProps = {
  centered: true,
}

export default Spinner
