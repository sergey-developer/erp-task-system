import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import { FC } from 'react'

import Expandable from 'components/Expandable'
import LabeledData from 'components/LabeledData'
import Space from 'components/Space'
import SeparatedText from 'components/Texts/SeparatedText'
import { SubTaskModel } from 'modules/subTask/models'
import { taskStatusDict } from 'modules/task/constants/dictionary'
import TaskAssignee from 'modules/task/features/TaskAssignee'
import TaskStatus from 'modules/task/features/TaskStatus'
import {
  badgeByTaskStatus,
  iconByTaskStatus,
} from 'modules/task/features/TaskStatus/constants'
import { useTaskStatus } from 'modules/task/hooks'

const { Text, Title, Paragraph } = Typography

export type SubTaskProps = Omit<SubTaskModel, 'workGroup'> & {
  workGroupName: string
  showCancelBtn: boolean
  onClickCancel: (id: number) => void
  showReworkBtn: boolean
  onClickRework: (id: number) => void
}

const SubTask: FC<SubTaskProps> = ({
  id,
  title,
  description,
  status,
  recordId,
  olaNextBreachTime,
  createdAt,
  workGroupName,
  externalAssigneeName,
  externalAssigneePhone,
  techResolution,
  showCancelBtn,
  onClickCancel,
  showReworkBtn,
  onClickRework,
}) => {
  const [showDescription, { toggle: toggleShowDescription }] = useBoolean(false)
  const subTaskStatus = useTaskStatus(status)

  return (
    <Space
      data-testid='sub-task-list-item'
      $block
      direction='vertical'
      size='middle'
    >
      <Row justify='space-between' align='middle'>
        {(recordId || olaNextBreachTime) && (
          <Col>
            <SeparatedText>
              {recordId && <Text type='secondary'>{recordId}</Text>}

              {olaNextBreachTime && (
                <Text type='secondary'>до {olaNextBreachTime}</Text>
              )}
            </SeparatedText>
          </Col>
        )}

        {showCancelBtn && (
          <Col>
            <Button onClick={() => onClickCancel(id)}>Отменить</Button>
          </Col>
        )}

        {showReworkBtn && (
          <Col>
            <Button onClick={() => onClickRework(id)}>
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
          <LabeledData label='Рабочая группа'>{workGroupName}</LabeledData>
        </Col>

        {externalAssigneeName && (
          <Col span={12}>
            <LabeledData label='Исполнитель'>
              <TaskAssignee
                name={externalAssigneeName}
                phone={externalAssigneePhone}
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
            onClickExpand={toggleShowDescription}
          >
            <Paragraph>{description}</Paragraph>
          </Expandable>
        </Space>
      )}
    </Space>
  )
}

export default SubTask
