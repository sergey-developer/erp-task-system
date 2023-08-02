import React from 'react'

import Spinner, { SpinnerProps } from 'components/Spinner'

import { FCWithChildren } from 'shared/types/utils'

type LoadingAreaProps = SpinnerProps & {
  isLoading: boolean
}

const LoadingArea: FCWithChildren<LoadingAreaProps> = ({
  children,
  isLoading,
  ...props
}) => {
  return isLoading ? <Spinner {...props} /> : <>{children}</>
}

export default LoadingArea
