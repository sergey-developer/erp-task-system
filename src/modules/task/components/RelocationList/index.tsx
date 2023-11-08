import { Col, Divider, Row, Typography } from 'antd'
import React, { FC } from 'react'

import AttachmentList from 'modules/task/components/AttachmentList'
import TaskAssignee from 'modules/task/components/TaskAssignee'
import { makeUserByFullName } from 'modules/user/utils'
import { getRelocationTaskTitle } from 'modules/warehouse/components/RelocationTaskDetails/utils'
import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'

import LabeledData from 'components/LabeledData'
import Space from 'components/Space'

import { formatDate } from 'shared/utils/date'

const { Text } = Typography

type RelocationListProps = {
  data: any[]
}

const RelocationList: FC<RelocationListProps> = ({ data }) => {
  return data.length ? (
    <Space $block direction='vertical'>
      {data.map((item, index, array) => (
        <>
          <Space $block direction='vertical'>
            <Text type='secondary'>до {formatDate(item.deadlineAt)}</Text>

            <Text strong>{getRelocationTaskTitle(item)}</Text>

            <Row>
              <Col span={12}>
                <Space $block direction='vertical' size='large'>
                  <Text type='secondary'>
                    {relocationTaskStatusDict[item.status as keyof typeof relocationTaskStatusDict]}
                  </Text>

                  <LabeledData label='Документы:'>
                    <AttachmentList data={item.documents} />
                  </LabeledData>
                </Space>
              </Col>

              <Col span={12}>
                <Space $block direction='vertical' size='large'>
                  <LabeledData label='Дата создания:' direction='horizontal'>
                    {formatDate(item.createdAt)}
                  </LabeledData>

                  <LabeledData label='Исполнитель:'>
                    <TaskAssignee
                      {...makeUserByFullName(item.executor.fullName)}
                      phone={item.executor.phone}
                    />
                  </LabeledData>
                </Space>
              </Col>
            </Row>
          </Space>

          {index !== array.length - 1 && <Divider />}
        </>
      ))}
    </Space>
  ) : (
    <Text>Перемещений нет</Text>
  )
}

export default RelocationList
