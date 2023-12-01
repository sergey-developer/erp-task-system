import { FC, ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { CommonRouteEnum } from 'configs/routes'

import { AuthRouteEnum } from 'modules/auth/constants/routes'
import { useIsLoggedIn } from 'modules/auth/hooks'
import { useUserMeState } from 'modules/user/hooks'
import { UserModel } from 'modules/user/models'

import { CommonLocationState } from 'shared/types/common'

type ProtectedRouteProps = {
  component: ReactElement
  permitted?: (user: UserModel, locationState?: any) => boolean
  onlyGuest?: boolean
  redirectPath?: string
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  component,
  permitted,
  onlyGuest = false,
  redirectPath,
}) => {
  const location = useLocation()
  const navigationState: CommonLocationState = { from: location.pathname }

  const isLoggedIn = useIsLoggedIn()
  const { data: user } = useUserMeState()

  if (onlyGuest) {
    if (isLoggedIn) {
      const to = location.state?.from || redirectPath || CommonRouteEnum.Home
      return <Navigate to={to} replace state={navigationState} />
    } else {
      return component
    }
  } else {
    if (isLoggedIn) {
      if (!permitted || (user && permitted(user, location.state))) {
        return component
      } else {
        const to = redirectPath || CommonRouteEnum.Home
        return <Navigate to={to} replace state={navigationState} />
      }
    } else {
      const to = redirectPath || AuthRouteEnum.Login
      return <Navigate to={to} replace state={navigationState} />
    }
  }
}

export default ProtectedRoute
