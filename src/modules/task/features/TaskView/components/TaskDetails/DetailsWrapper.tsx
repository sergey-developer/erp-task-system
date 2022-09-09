import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React from 'react'

import { FCWithChildren } from 'shared/interfaces/utils'

import { DetailsContainerStyled } from './styles'

const DetailsWrapper: FCWithChildren = ({ children }) => {
  const breakpoints = useBreakpoint()

  return (
    <DetailsContainerStyled $breakpoints={breakpoints}>
      {children}
    </DetailsContainerStyled>
  )
}

export default DetailsWrapper
