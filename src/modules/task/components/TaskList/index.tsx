import { Col, List, Row, Typography } from 'antd'
import isEqual from 'lodash/isEqual'
import { FC } from 'react'

import { TaskTypeEnum } from 'modules/task/constants'

import { formatDate } from 'shared/utils/date'

import { TaskListProps } from './interfaces'
import { AvatarStyled, ListStyled } from './styles'

export const taskTypeText: Record<TaskTypeEnum, string> = {
  [TaskTypeEnum.Incident]: 'ИНЦ',
  [TaskTypeEnum.IncidentTask]: 'ЗДН',
  [TaskTypeEnum.Request]: 'ЗНО',
  [TaskTypeEnum.RequestTask]: 'ЗДН',
}

const TaskList: FC<TaskListProps> = ({
  tasks,
  selectedTaskId,
  onClickTask,
}) => {
  return (
    <ListStyled
      data-testid='task-list'
      itemLayout='horizontal'
      bordered
      dataSource={tasks}
      renderItem={(item) => (
        <List.Item
          data-testid={`task-list-item-${item.id}`}
          className={
            isEqual(item.id, selectedTaskId) ? 'list-item-selected' : ''
          }
          onClick={() => onClickTask(item.id)}
        >
          <List.Item.Meta
            avatar={
              <AvatarStyled size='large' $type={item.type}>
                {taskTypeText[item.type]}
              </AvatarStyled>
            }
            title={
              <Row gutter={16}>
                <Col span={14}>{item.name}</Col>

                {item.olaNextBreachTime && (
                  <Col span={10}>
                    <Typography.Text>
                      {formatDate(item.olaNextBreachTime)}
                    </Typography.Text>
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
