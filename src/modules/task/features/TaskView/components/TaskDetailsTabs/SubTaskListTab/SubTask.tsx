import { Col, Row, Typography } from 'antd'
import { FC } from 'react'

import LabeledData from 'components/LabeledData'
import Space from 'components/Space'
import SeparatedText from 'components/Texts/SeparatedText'
import { taskStatusDict } from 'modules/task/constants/dictionary'
import TaskStatus from 'modules/task/features/TaskStatus'
import {
  badgeByTaskStatus,
  iconByTaskStatus,
} from 'modules/task/features/TaskStatus/constants'
import { SubTaskModel } from 'modules/task/features/TaskView/models'
import getFullUserName from 'modules/user/utils/getFullUserName'

import Assignee from '../../TaskDetails/TaskAssignee/Assignee'

const { Text, Title } = Typography

type SubTaskProps = Pick<
  SubTaskModel,
  | 'olaNextBreachTime'
  | 'recordId'
  | 'title'
  | 'status'
  | 'createdAt'
  | 'assignee'
  | 'contactPhone'
> & {
  workGroup: string
}

const SubTask: FC<SubTaskProps> = ({
  title,
  status,
  recordId,
  olaNextBreachTime,
  createdAt,
  workGroup,
  assignee,
  contactPhone,
}) => {
  return (
    <Space $block direction='vertical' size='middle'>
      <Row justify='space-between' align='middle'>
        <Col>
          <SeparatedText>
            <Text type='secondary'>{recordId}</Text>

            {olaNextBreachTime && (
              <Text type='secondary'>до {olaNextBreachTime}</Text>
            )}
          </SeparatedText>
        </Col>
      </Row>

      <Space $block direction='vertical'>
        <Title level={5}>{title}</Title>

        <Row align='middle' gutter={10}>
          <Col span={12}>
            <TaskStatus
              status={status}
              badge={badgeByTaskStatus[status]}
              icon={iconByTaskStatus[status]}
              text={taskStatusDict[status]}
            />
          </Col>

          <Col span={12}>
            <LabeledData direction='horizontal' label='Дата создания:'>
              {createdAt}
            </LabeledData>
          </Col>
        </Row>
      </Space>

      <Space $block direction='vertical'>
        <Row gutter={10}>
          <Col span={12}>
            <LabeledData label='Рабочая группа'>{workGroup}</LabeledData>
          </Col>

          {assignee && (
            <Col span={12}>
              <LabeledData label='Исполнитель'>
                <Assignee
                  name={getFullUserName(assignee)}
                  assignee={assignee}
                  contactPhone={contactPhone}
                />
              </LabeledData>
            </Col>
          )}
        </Row>
      </Space>
    </Space>
  )
}

export default SubTask
