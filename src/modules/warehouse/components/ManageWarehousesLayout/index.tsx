import { Flex } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Breadcrumbs from 'components/Breadcrumbs'

import { useBreadcrumbsMatches } from 'shared/hooks/useBreadcrumbsMatches'

const ManageWarehousesLayout: FC = () => {
  const matches = useBreadcrumbsMatches()

  return (
    <Flex vertical gap='middle'>
      {!!matches.length && <Breadcrumbs matches={matches} />}

      <Outlet />
    </Flex>
  )
}

export default ManageWarehousesLayout
