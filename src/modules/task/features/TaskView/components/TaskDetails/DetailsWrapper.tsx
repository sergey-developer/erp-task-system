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
  ...props
}) => {
  const breakpoints = useBreakpoint()

  return (
    <DetailsContainerStyled
      $breakpoints={breakpoints}
      $bgColor={bgColor}
      $disablePadding={disablePadding}
      {...props}
    >
      {children}
    </DetailsContainerStyled>
  )
}

export default DetailsWrapper
