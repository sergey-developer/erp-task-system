import { LogoutOutlined } from '@ant-design/icons'
import React, { FC } from 'react'

import useLogout from 'modules/auth/hooks/useLogout'

const LogoutButton: FC = () => {
  const logout = useLogout()
  return <LogoutOutlined className='fs-18' onClick={logout} />
}

export default LogoutButton
