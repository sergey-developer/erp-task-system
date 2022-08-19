import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { FC } from 'react'

import useLogout from 'modules/auth/hooks/useLogout'

const LogoutButton: FC = () => {
  const {
    fn: logout,
    state: { isLoading },
  } = useLogout()

  return (
    <Button
      data-testid='btn-logout'
      ghost
      icon={<LogoutOutlined className='fs-18' />}
      onClick={logout}
      loading={isLoading}
    />
  )
}

export default LogoutButton
