import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import { FC } from 'react'

import Expandable from 'components/Expandable'
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
import { useTaskStatus } from 'modules/task/hooks'
import getFullUserName from 'modules/user/utils/getFullUserName'

import Assignee from '../../TaskDetails/TaskAssignee/Assignee'

const { Text, Title, Paragraph } = Typography

type SubTaskProps = Pick<
  SubTaskModel,
  | 'id'
  | 'olaNextBreachTime'
  | 'recordId'
  | 'title'
  | 'description'
  | 'status'
  | 'createdAt'
  | 'assignee'
  | 'contactPhone'
  | 'techResolution'
> & {
  workGroup: string
  onClickCancel: (id: SubTaskModel['id']) => void
  showReworkBtn: boolean
  onClickRework?: (id: SubTaskModel['id']) => void
}

const SubTask: FC<SubTaskProps> = ({
  id,
  title,
  description,
  status,
  recordId,
  olaNextBreachTime,
  createdAt,
  workGroup,
  assignee,
  contactPhone,
  techResolution,
  onClickCancel,
  showReworkBtn,
  onClickRework,
}) => {
  const [showDescription, { toggle: toggleShowDescription }] = useBoolean(false)
  const subTaskStatus = useTaskStatus(status)

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

        {subTaskStatus.isNew && (
          <Col>
            <Button onClick={() => onClickCancel(id)}>Отменить</Button>
          </Col>
        )}

        {showReworkBtn && (
          <Col>
            <Button
              onClick={onClickRework ? () => onClickRework(id) : undefined}
            >
              Вернуть на доработку
            </Button>
          </Col>
        )}
      </Row>

      <Space $block direction='vertical'>
        <Space $block direction='vertical'>
          <Title level={5}>{title}</Title>

          <Row gutter={10}>
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

        {techResolution &&
          (subTaskStatus.isCompleted || subTaskStatus.isClosed) && (
            <Paragraph type='success'>{techResolution}</Paragraph>
          )}
      </Space>

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

      {description && (
        <Space $block direction='vertical'>
          <Expandable
            buttonText='Подробное описание'
            expanded={showDescription}
            onExpand={toggleShowDescription}
          >
            <Paragraph>{description}</Paragraph>
          </Expandable>
        </Space>
      )}
    </Space>
  )
}

export default SubTask
