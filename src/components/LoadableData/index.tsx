import React, { ReactNode } from 'react'

import Spinner from 'components/Spinner'
import { FCWithChildren } from 'shared/interfaces/utils'

type LoadableDataProps = {
  isLoading: boolean
  noContent?: ReactNode
}

const LoadableData: FCWithChildren<LoadableDataProps> = ({
  children,
  noContent,
  isLoading,
  ...props
}) => {
  return isLoading ? (
    <Spinner {...props} />
  ) : !isLoading && noContent ? (
    <>{noContent}</>
  ) : (
    <>{children}</>
  )
}

export default LoadableData
