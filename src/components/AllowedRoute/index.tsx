import React, { FC, ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

import { CommonRouteEnum } from 'configs/routes'

import { useUserMeState } from 'modules/user/hooks'
import { UserModel } from 'modules/user/models'

type AllowedRouteProps = {
  component: ReactElement
  allowed: (user: UserModel) => boolean

  redirectPath?: string
}

const AllowedRoute: FC<AllowedRouteProps> = ({
  component,
  allowed,
  redirectPath = CommonRouteEnum.Home,
}) => {
  const { data: userMe } = useUserMeState()
  return allowed(userMe!) ? component : <Navigate to={redirectPath} replace />
}

export default AllowedRoute
