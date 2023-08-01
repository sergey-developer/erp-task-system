import { Button } from 'antd'
import React, { FC } from 'react'

import { useLogout } from 'modules/auth/hooks'

import { LogoutIcon } from 'components/Icons'

const LogoutButton: FC = () => {
  const {
    fn: logout,
    state: { isLoading },
  } = useLogout()

  return (
    <Button
      data-testid='btn-logout'
      ghost
      icon={<LogoutIcon $size='large' />}
      onClick={logout}
      loading={isLoading}
    />
  )
}

export default LogoutButton
