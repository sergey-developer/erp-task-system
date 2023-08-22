import { Col, Row } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Breadcrumbs from 'components/Breadcrumbs'

const ManageWarehousesLayout: FC = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Breadcrumbs />
      </Col>

      <Col span={24}>
        <Outlet />
      </Col>
    </Row>
  )
}

export default ManageWarehousesLayout
