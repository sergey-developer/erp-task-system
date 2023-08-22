import { Button, Col, Input, Row, Space } from 'antd'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import FilterButton from 'components/Buttons/FilterButton'

const { Search } = Input

const ReservesListLayout: FC = () => {
  return (
    <Row data-testid='reserves-list-layout' gutter={[16, 16]}>
      <Col span={24}>
        <Row justify='space-between'>
          <Col>
            <Space size='middle'>
              <FilterButton />

              <Button>+ Добавить оборудование</Button>
            </Space>
          </Col>

          <Col>
            <Search placeholder='Поиск оборудования' />
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <Outlet />
      </Col>
    </Row>
  )
}

export default ReservesListLayout
