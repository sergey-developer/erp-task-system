import { Button, Col, Row, Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'

const { Title } = Typography

export type SubTaskListTabProps = {}

const SubTaskListTab: FC<SubTaskListTabProps> = () => {
  return (
    <Space data-testid='subtask-list-tab' direction='vertical' $block>
      <Row justify='space-between' align='middle'>
        <Col>
          <Title level={5}>Задания</Title>
        </Col>

        <Col>
          <Button type='link'>+ Создать новое задание</Button>
        </Col>
      </Row>
    </Space>
  )
}

export default SubTaskListTab
