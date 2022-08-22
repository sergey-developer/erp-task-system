import { DownloadOutlined } from '@ant-design/icons'
import { Col, Divider, Row, Space } from 'antd'
import React, { FC } from 'react'

import JournalItem from './JournalItem'

type JournalProps = {}

const Journal: FC<JournalProps> = () => {
  return (
    <Space direction='vertical'>
      <Row justify='end'>
        <DownloadOutlined />
      </Row>

      <Row>
        {[1, 1, 1].map((_, index, array) => (
          <Col key={index} span={24}>
            <JournalItem />

            {index !== array.length - 1 && <Divider />}
          </Col>
        ))}
      </Row>
    </Space>
  )
}

export default Journal
