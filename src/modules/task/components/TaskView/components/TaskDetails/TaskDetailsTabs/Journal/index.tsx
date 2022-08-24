import { DownloadOutlined } from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import { TaskJournalModel } from 'modules/task/components/TaskView/models/taskJournal.model'

import { NO_DATA_MSG } from './constants'
import JournalItem from './JournalItem'

type JournalProps = {
  data: TaskJournalModel
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
            {data.map((item, index, array) => {
              const isLastItem: boolean = index === array.length - 1

              return (
                <Col key={item.id} span={24}>
                  <JournalItem
                    createdAt={item.createdAt}
                    type={item.type}
                    author={item.author}
                    description={item.description}
                    sourceSystem={item.sourceSystem}
                  />

                  {!isLastItem && <Divider />}
                </Col>
              )
            })}
          </Row>
        </>
      ) : (
        NO_DATA_MSG
      )}
    </Space>
  )
}

export default Journal
