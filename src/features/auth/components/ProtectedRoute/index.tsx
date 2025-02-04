import { useIsLoggedIn } from 'features/auth/hooks'
import { AuthRoutesEnum } from 'features/auth/routes/routes'
import { useUserMeState } from 'features/user/hooks'
import { UserModel } from 'features/user/models'
import { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { CommonRoutesEnum } from 'configs/routes'

import { CommonLocationState } from 'shared/types/common'
import { extractLocationState, ExtractLocationStateResult } from 'shared/utils/common'
import { getPathByLocation } from 'shared/utils/url'

type ProtectedRouteProps<LocationState> = {
  component: ReactElement
  permitted?: (currentUser: UserModel, locationState: LocationState) => boolean
  onlyGuest?: boolean
  redirectPath?: string
}

function ProtectedRoute<LocationState>({
  component,
  permitted,
  onlyGuest = false,
  redirectPath,
}: ProtectedRouteProps<ExtractLocationStateResult<LocationState>>) {
  const location = useLocation()
  const locationState = extractLocationState<LocationState>(location)
  const navigationState: CommonLocationState = { from: getPathByLocation(location) }

  const isLoggedIn = useIsLoggedIn()
  const { data: user } = useUserMeState()

  if (onlyGuest) {
    if (isLoggedIn) {
      const to = locationState?.from || redirectPath || CommonRoutesEnum.Home
      return <Navigate to={to} replace state={navigationState} />
    } else {
      return component
    }
  } else {
    if (isLoggedIn) {
      if (!permitted || (user && permitted(user, locationState))) {
        return component
      } else {
        const to = redirectPath || CommonRoutesEnum.Home
        return <Navigate to={to} replace state={navigationState} />
      }
    } else {
      const to = redirectPath || AuthRoutesEnum.Login
      return <Navigate to={to} replace state={navigationState} />
    }
  }
}

export default ProtectedRoute
