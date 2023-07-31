import { Col, List, Row, Typography } from 'antd'
import isEqual from 'lodash/isEqual'
import { FC, useState } from 'react'

import { TaskTypeEnum } from 'modules/task/constants'

import { formatDate } from 'shared/utils/date'

import { AvatarStyled, ListStyled } from './styles'

const taskTypeText: Record<TaskTypeEnum, string> = {
  [TaskTypeEnum.Incident]: 'ИНЦ',
  [TaskTypeEnum.IncidentTask]: 'ЗДН',
  [TaskTypeEnum.Request]: 'ЗНО',
  [TaskTypeEnum.RequestTask]: 'ЗДН',
}

const fakeData = [
  {
    id: 1,
    type: TaskTypeEnum.Incident,
    name: '1298-Пятерочкаааааааааааааааа (гп.Воскресенск)',
    title: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    olaNextBreachTime: new Date().toISOString(),
  },
  {
    id: 2,
    type: TaskTypeEnum.Request,
    name: '1298-Пятерочка (гп.Воскресенск)',
    title: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    olaNextBreachTime: new Date().toISOString(),
  },
  {
    id: 3,
    type: TaskTypeEnum.IncidentTask,
    name: '1298-Пятерочка (гп.Воскресенск)',
    title: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    olaNextBreachTime: new Date().toISOString(),
  },
  {
    id: 4,
    type: TaskTypeEnum.RequestTask,
    name: '1298-Пятерочка (гп.Воскресенск)',
    title: 'Плохо печатает принтер, шумит/застревает, заминается бумага',
    olaNextBreachTime: new Date().toISOString(),
  },
]

const TaskList: FC = () => {
  const [selectedTask, setSelectedTask] = useState<any>()

  return (
    <ListStyled
      itemLayout='horizontal'
      bordered
      dataSource={fakeData}
      renderItem={(item) => (
        <List.Item
          className={
            isEqual(item.id, selectedTask?.id) ? 'list-item-selected' : ''
          }
          onClick={() => setSelectedTask(item)}
        >
          <List.Item.Meta
            avatar={
              <AvatarStyled size='large' $type={item.type}>
                {taskTypeText[item.type]}
              </AvatarStyled>
            }
            title={
              <Row gutter={16}>
                <Col span={15}>{item.name}</Col>

                <Col span={9}>
                  <Typography.Text>
                    {formatDate(item.olaNextBreachTime)}
                  </Typography.Text>
                </Col>
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
