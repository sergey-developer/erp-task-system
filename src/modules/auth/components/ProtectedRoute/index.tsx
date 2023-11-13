import { FC, ReactElement } from 'react'
import { Navigate, useInRouterContext, useLocation } from 'react-router-dom'

import { AuthRouteEnum } from 'modules/auth/constants/routes'
import { useIsLoggedIn } from 'modules/auth/hooks'
import { useUserMeState } from 'modules/user/hooks'
import { UserModel } from 'modules/user/models'

import { CommonLocationState } from 'shared/types/common'

type ProtectedRouteProps = {
  component: ReactElement
  permitted?: (user: UserModel) => boolean
  reverseLoggedIn?: boolean
  redirectPath?: string
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  component,
  permitted,
  reverseLoggedIn = false,
  redirectPath = AuthRouteEnum.Login,
}) => {
  const inRouterContext = useInRouterContext()
  if (!inRouterContext) throw new Error('ProtectedRoute should be used in Router context')

  const location = useLocation()
  const navigationState: CommonLocationState = { from: location.pathname }

  const isLoggedIn = useIsLoggedIn()
  const { data: user } = useUserMeState()

  if (reverseLoggedIn) {
    if (isLoggedIn) {
      return <Navigate to={location.state?.from || redirectPath} replace state={navigationState} />
    } else {
      return component
    }
  } else {
    if (isLoggedIn) {
      if (!permitted || (user && permitted(user))) return component
      else return <Navigate to={redirectPath} replace state={navigationState} />
    } else {
      return <Navigate to={redirectPath} replace state={navigationState} />
    }
  }
}

export default ProtectedRoute
