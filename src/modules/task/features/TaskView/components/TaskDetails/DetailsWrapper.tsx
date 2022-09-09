import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React from 'react'

import { FCWithChildren } from 'shared/interfaces/utils'

import { DetailsContainerStyled, DetailsContainerStyledProps } from './styles'

export type DetailsWrapperProps = {
  bgColor?: DetailsContainerStyledProps['$bgColor']
  disablePadding?: DetailsContainerStyledProps['$disablePadding']
}

const DetailsWrapper: FCWithChildren<DetailsWrapperProps> = ({
  children,
  bgColor,
  disablePadding,
}) => {
  const breakpoints = useBreakpoint()

  return (
    <DetailsContainerStyled
      $breakpoints={breakpoints}
      $bgColor={bgColor}
      $disablePadding={disablePadding}
    >
      {children}
    </DetailsContainerStyled>
  )
}

export default DetailsWrapper
