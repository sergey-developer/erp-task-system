import { DownloadOutlined } from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'

import JournalItem from './JournalItem'

type JournalProps = {
  data: Array<{}>
}

const Journal: FC<JournalProps> = ({ data }) => {
  return (
    <Space direction='vertical' $block>
      {!!data.length ? (
        <>
          <Row justify='end'>
            <DownloadOutlined />
          </Row>

          <Row>
            {data.map((_, index, array) => (
              <Col key={index} span={24}>
                <JournalItem />

                {index !== array.length - 1 && <Divider />}
              </Col>
            ))}
          </Row>
        </>
      ) : (
        'Записей пока нет'
      )}
    </Space>
  )
}

export default Journal
