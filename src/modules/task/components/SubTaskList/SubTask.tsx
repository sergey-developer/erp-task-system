import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC } from 'react'

import TaskAssignee from 'modules/task/components/TaskAssignee'
import TaskStatus from 'modules/task/components/TaskStatus'
import { badgeByTaskStatus, iconByTaskStatus } from 'modules/task/components/TaskStatus/constants'
import { TaskExtendedStatusEnum, taskStatusDict, TaskStatusEnum } from 'modules/task/constants/task'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'
import { useTaskExtendedStatus, useTaskStatus } from 'modules/task/hooks/task'
import { useTaskSuspendRequestStatus } from 'modules/task/hooks/taskSuspendRequest'
import { SubTaskModel } from 'modules/task/models'
import { makeUserByFullName } from 'modules/user/utils'

import Expandable from 'components/Expandable'
import LabeledData from 'components/LabeledData'
import SeparatedText from 'components/SeparatedText'
import Space from 'components/Space'

import { renderStringWithLineBreak } from 'shared/utils/string'

const { Text, Title, Paragraph } = Typography

export type SubTaskProps = Omit<SubTaskModel, 'id'> & {
  taskStatus: TaskStatusEnum
  taskExtendedStatus: TaskExtendedStatusEnum
  currentUserIsTaskAssignee: boolean
  onClickCancel: () => void
  onClickRework: () => void
  taskSuspendRequestStatus?: SuspendRequestStatusEnum
}

const SubTask: FC<SubTaskProps> = ({
  title,
  description,
  status,
  recordId,
  olaNextBreachTime,
  createdAt,
  supportGroup,
  externalAssigneeName,
  externalAssigneePhone,
  techResolution,
  onClickCancel,
  onClickRework,
  taskStatus: rawTaskStatus,
  taskExtendedStatus: rawTaskExtendedStatus,
  currentUserIsTaskAssignee,
  returnReason,
  cancelReason,
  taskSuspendRequestStatus: rawTaskSuspendRequestStatus,
}) => {
  const taskStatus = useTaskStatus(rawTaskStatus)
  const taskExtendedStatus = useTaskExtendedStatus(rawTaskExtendedStatus)
  const taskSuspendRequestStatus = useTaskSuspendRequestStatus(rawTaskSuspendRequestStatus)
  const subTaskStatus = useTaskStatus(status)

  const [showDescription, { toggle: toggleShowDescription }] = useBoolean(false)

  const [showTechResolution, { toggle: toggleShowTechResolution }] = useBoolean(false)

  const [showReturnReason, { toggle: toggleShowReturnReason }] = useBoolean(false)

  const [showCancelReason, { toggle: toggleShowCancelReason }] = useBoolean(false)

  const isShowCancelBtn =
    currentUserIsTaskAssignee &&
    subTaskStatus.isNew &&
    !taskStatus.isCompleted &&
    !taskStatus.isClosed

  const isShowReworkBtn =
    currentUserIsTaskAssignee &&
    subTaskStatus.isCompleted &&
    !taskStatus.isCompleted &&
    !taskStatus.isClosed

  return (
    <Space data-testid='sub-task-list-item' $block direction='vertical' size='middle'>
      <Row justify='space-between' align='middle'>
        {(recordId || olaNextBreachTime) && (
          <Col>
            <SeparatedText>
              {recordId && <Text type='secondary'>{recordId}</Text>}

              {olaNextBreachTime && <Text type='secondary'>до {olaNextBreachTime}</Text>}
            </SeparatedText>
          </Col>
        )}

        {isShowCancelBtn && (
          <Col>
            <Button
              onClick={onClickCancel}
              disabled={
                taskSuspendRequestStatus.isApproved
                  ? false
                  : taskExtendedStatus.isInReclassification ||
                    taskSuspendRequestStatus.isNew ||
                    taskSuspendRequestStatus.isInProgress
              }
            >
              Отменить
            </Button>
          </Col>
        )}

        {isShowReworkBtn && (
          <Col>
            <Button
              onClick={onClickRework}
              disabled={
                taskSuspendRequestStatus.isApproved
                  ? false
                  : taskExtendedStatus.isInReclassification ||
                    taskSuspendRequestStatus.isNew ||
                    taskSuspendRequestStatus.isInProgress
              }
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

        {techResolution && (subTaskStatus.isCompleted || subTaskStatus.isClosed) && (
          <Expandable
            onClick={toggleShowTechResolution}
            expanded={showTechResolution}
            btnText='Решение'
            btnTextType='success'
            arrowColor='crayola'
          >
            <Paragraph type='success'>{renderStringWithLineBreak(techResolution)}</Paragraph>
          </Expandable>
        )}

        {returnReason && (
          <Expandable
            onClick={toggleShowReturnReason}
            expanded={showReturnReason}
            btnText='Причина возврата'
            btnTextType='secondary'
            btnTextUnderline
          >
            <Paragraph>{renderStringWithLineBreak(returnReason)}</Paragraph>
          </Expandable>
        )}

        {cancelReason && (
          <Expandable
            onClick={toggleShowCancelReason}
            expanded={showCancelReason}
            btnText='Причина отмены'
            btnTextType='secondary'
            btnTextUnderline
          >
            <Paragraph>{renderStringWithLineBreak(cancelReason)}</Paragraph>
          </Expandable>
        )}
      </Space>

      <Row gutter={10}>
        <Col span={12}>
          <LabeledData label='Группа поддержки'>{supportGroup?.name}</LabeledData>
        </Col>

        {externalAssigneeName && (
          <Col span={12}>
            <LabeledData label='Исполнитель'>
              <TaskAssignee
                {...makeUserByFullName(externalAssigneeName)}
                phone={externalAssigneePhone}
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
