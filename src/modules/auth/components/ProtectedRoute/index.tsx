import { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { CommonRouteEnum } from 'configs/routes'

import { AuthRouteEnum } from 'modules/auth/constants/routes'
import { useIsLoggedIn } from 'modules/auth/hooks'
import { useUserMeState } from 'modules/user/hooks'
import { UserModel } from 'modules/user/models'

import { CommonLocationState } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'
import { getPathByLocation } from 'shared/utils/url'

type ProtectedRouteProps<LocationState> = {
  component: ReactElement
  permitted?: (user: UserModel, locationState: LocationState) => boolean
  onlyGuest?: boolean
  redirectPath?: string
}

function ProtectedRoute<LocationState>({
  component,
  permitted,
  onlyGuest = false,
  redirectPath,
}: ProtectedRouteProps<MaybeNull<LocationState>>) {
  const location = useLocation()
  const locationState = location.state as MaybeNull<LocationState>
  const navigationState: CommonLocationState = { from: getPathByLocation(location) }

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
      if (!permitted || (user && permitted(user, locationState))) {
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
