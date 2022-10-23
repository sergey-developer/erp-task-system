import React from 'react'

import Spinner, { SpinnerProps } from 'components/Spinner'
import { FCWithChildren } from 'shared/interfaces/utils'

type LoadableDataProps = SpinnerProps & {
  isLoading: boolean
}

const LoadableData: FCWithChildren<LoadableDataProps> = ({
  children,
  isLoading,
  ...props
}) => {
  return isLoading ? <Spinner {...props} /> : <>{children}</>
}

export default LoadableData
