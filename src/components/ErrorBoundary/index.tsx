import { Alert } from 'antd'

import { FCWithChildren } from 'shared/interfaces/utils'

import { WrapperStyled } from './styles'

const ErrorBoundary: FCWithChildren = ({ children }) => {
  return (
    <WrapperStyled>
      <Alert.ErrorBoundary>{children}</Alert.ErrorBoundary>
    </WrapperStyled>
  )
}

export default ErrorBoundary
