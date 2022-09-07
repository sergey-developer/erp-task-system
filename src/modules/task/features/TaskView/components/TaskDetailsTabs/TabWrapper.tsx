import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React from 'react'

import Spinner from 'components/Spinner'
import { FCWithChildren } from 'shared/interfaces/utils'

import { DetailsContainerStyled } from '../TaskDetails/styles'

const TabWrapper: FCWithChildren = ({ children }) => {
  const breakpoints = useBreakpoint()

  return (
    <DetailsContainerStyled $breakpoints={breakpoints}>
      <React.Suspense fallback={<Spinner />}>{children}</React.Suspense>
    </DetailsContainerStyled>
  )
}

export default TabWrapper
