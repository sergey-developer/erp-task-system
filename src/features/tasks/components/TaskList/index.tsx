import { Col, List, Row, Typography } from 'antd'
import isEqual from 'lodash/isEqual'
import { FC } from 'react'

import { TaskTypeEnum } from 'features/tasks/api/constants'

import { formatDate } from 'shared/utils/date'

import { AvatarStyled, ListStyled } from './styles'
import { TaskListProps } from './types'

export const taskTypeText: Record<TaskTypeEnum, string> = {
  [TaskTypeEnum.Incident]: 'ИНЦ',
  [TaskTypeEnum.IncidentTask]: 'ЗДН',
  [TaskTypeEnum.Request]: 'ЗНО',
  [TaskTypeEnum.RequestTask]: 'ЗДН',
}

const { Text } = Typography

const TaskList: FC<TaskListProps> = ({ tasks, selectedTaskId, onClickTask }) => {
  return (
    <ListStyled
      data-testid='task-list'
      itemLayout='horizontal'
      bordered
      dataSource={tasks}
      renderItem={(item) => (
        <List.Item
          data-testid={`task-list-item-${item.id}`}
          className={isEqual(item.id, selectedTaskId) ? 'list-item-selected' : ''}
          onClick={() => onClickTask(item.id)}
        >
          <List.Item.Meta
            avatar={
              <AvatarStyled size='large' $type={item.type}>
                {taskTypeText[item.type]}
              </AvatarStyled>
            }
            title={
              <Row gutter={16} justify='space-between'>
                <Col>{item.name}</Col>

                {item.olaNextBreachTime && (
                  <Col>
                    <Text>{formatDate(item.olaNextBreachTime)}</Text>
                  </Col>
                )}
              </Row>
            }
            description={item.title}
          />
        </List.Item>
      )}
    />
  )
}

export default TaskList
