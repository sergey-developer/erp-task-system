import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC } from 'react'

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
import { makeUserNameObject } from 'modules/user/utils'
import { renderStringWithLineBreak } from 'shared/utils/string'

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
  const subTaskStatus = useTaskStatus(status)

  const [showDescription, { toggle: toggleShowDescription }] = useBoolean(false)

  const [showTechResolution, { toggle: toggleShowTechResolution }] =
    useBoolean(false)

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
            <Expandable
              onClick={toggleShowTechResolution}
              expanded={showTechResolution}
              btnText='Решение'
              btnTextType='success'
              arrowColor='crayola'
            >
              <Paragraph type='success'>
                {renderStringWithLineBreak(techResolution)}
              </Paragraph>
            </Expandable>
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
                assignee={makeUserNameObject(externalAssigneeName)}
              />
            </LabeledData>
          </Col>
        )}
      </Row>

      {description && (
        <Space $block direction='vertical'>
          <Expandable
            btnText='Подробное описание'
            btnTextType='secondary'
            btnTextUnderline
            expanded={showDescription}
            onClick={toggleShowDescription}
          >
            <Paragraph>{renderStringWithLineBreak(description)}</Paragraph>
          </Expandable>
        </Space>
      )}
    </Space>
  )
}

export default SubTask
