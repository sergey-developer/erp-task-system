import { Button, Col, Row, Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'

const { Title } = Typography

type RelocationListTabProps = {}

const RelocationListTab: FC<RelocationListTabProps> = () => {
  return (
    <Space data-testid='relocation-list-tab' size='middle' direction='vertical' $block>
      <Row justify='space-between' align='middle'>
        <Col>
          <Title level={5}>Перемещения</Title>
        </Col>

        <Col>
          <Button type='link'>Создать новое перемещение</Button>
        </Col>
      </Row>
    </Space>
  )
}

export default RelocationListTab
