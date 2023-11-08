import { Col, Divider, Row, Typography } from 'antd'
import React, { FC } from 'react'

import AttachmentList from 'modules/task/components/AttachmentList'
import TaskAssignee from 'modules/task/components/TaskAssignee'
import { makeUserByFullName } from 'modules/user/utils'
import { getRelocationTaskTitle } from 'modules/warehouse/components/RelocationTaskDetails/utils'
import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'
import { RelocationTaskListItemModel } from 'modules/warehouse/models'

import LabeledData from 'components/LabeledData'
import Space from 'components/Space'

import { checkLastItem } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

const { Text } = Typography

type RelocationListProps = {
  data: RelocationTaskListItemModel[]
}

const RelocationList: FC<RelocationListProps> = ({ data }) => {
  return (
    <Space $block direction='vertical'>
      {data.length ? (
        data.map((item, index, array) => (
          <Space $block direction='vertical' key={item.id}>
            <Space $block direction='vertical'>
              <Text type='secondary'>до {formatDate(item.deadlineAt)}</Text>

              <Text strong>{getRelocationTaskTitle(item)}</Text>

              <Row>
                <Col span={12}>
                  <Space $block direction='vertical'>
                    <LabeledData label='Статус:' direction='horizontal'>
                      <Text>{relocationTaskStatusDict[item.status]}</Text>
                    </LabeledData>

                    <LabeledData label='Документы:'>
                      {!!item.documents?.length && <AttachmentList data={item.documents} />}
                    </LabeledData>
                  </Space>
                </Col>

                <Col span={12}>
                  <Space $block direction='vertical'>
                    <LabeledData label='Дата создания:' direction='horizontal'>
                      {formatDate(item.createdAt)}
                    </LabeledData>

                    <LabeledData label='Исполнитель:'>
                      {item.executor && (
                        <TaskAssignee
                          {...makeUserByFullName(item.executor.fullName)}
                          phone={item.executor.phone}
                        />
                      )}
                    </LabeledData>
                  </Space>
                </Col>
              </Row>
            </Space>

            {!checkLastItem(index, array) && <Divider />}
          </Space>
        ))
      ) : (
        <Text>Перемещений нет</Text>
      )}
    </Space>
  )
}

export default RelocationList
