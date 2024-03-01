import { Col, Row } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Breadcrumbs from 'components/Breadcrumbs'

import { useBreadcrumbsMatches } from 'shared/hooks/useBreadcrumbsMatches'

const ManageWarehousesLayout: FC = () => {
  const matches = useBreadcrumbsMatches()

  return (
    <Row gutter={[0, 16]}>
      {!!matches.length && (
        <Col span={24}>
          <Breadcrumbs matches={matches} />
        </Col>
      )}

      <Col span={24}>
        <Outlet />
      </Col>
    </Row>
  )
}

export default ManageWarehousesLayout
