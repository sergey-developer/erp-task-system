import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Breadcrumbs from 'components/Breadcrumbs'
import Space from 'components/Space'

const ManageWarehousesLayout: FC = () => {
  return (
    <Space $block direction='vertical' size='large'>
      <Breadcrumbs />
      <Outlet />
    </Space>
  )
}

export default ManageWarehousesLayout
