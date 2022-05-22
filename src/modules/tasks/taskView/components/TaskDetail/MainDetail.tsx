import { Col, Row, Space, Typography } from 'antd'
import React, { FC } from 'react'

import { DetailContainerStyled } from './styles'

const MainDetail: FC = () => {
  return (
    <DetailContainerStyled>
      <Space direction='vertical' size='middle'>
        <Space
          size={4}
          split={<Typography.Text type='secondary'>•</Typography.Text>}
        >
          <Typography.Text type='secondary'>ИНЦ-000345456</Typography.Text>

          <Typography.Text type='danger'>
            до 17.11.2021, 18:00 (2ч)
          </Typography.Text>
        </Space>

        <Space direction='vertical' size={4}>
          <Typography.Title level={4} className='margin-b-0'>
            Плохо печатает принтер, шумит/застревает, заминается бумага
          </Typography.Title>

          <Typography.Text>06.12.2021, 16:00</Typography.Text>
        </Space>

        <Row justify='space-between'>
          <Col span={12}>
            <Space direction='vertical'>
              <Typography.Text type='secondary'>Адрес</Typography.Text>

              <Typography.Text strong>
                1298-Пятерочка (гп.Воскресенск)
              </Typography.Text>

              <Typography.Text>
                Московская область, гп.Воскресенск, ул.Центральная, д.16
              </Typography.Text>
            </Space>
          </Col>

          <Col span={10}>
            <Space direction='vertical'>
              <Typography.Text type='secondary'>Заявитель</Typography.Text>

              <Typography.Text strong>
                Константинопольский Константин Константинович
              </Typography.Text>

              <Typography.Text>+7 (900) 345-34-54</Typography.Text>
            </Space>
          </Col>
        </Row>
      </Space>
    </DetailContainerStyled>
  )
}

export default MainDetail
