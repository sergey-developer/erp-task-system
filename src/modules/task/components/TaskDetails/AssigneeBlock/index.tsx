import { Button, Col, Row, Typography } from 'antd'
import isEqual from 'lodash/isEqual'
import React, { FC, useState } from 'react'

import { useAuthUser, useIdBelongAuthUser } from 'modules/auth/hooks'
import TaskAssignee from 'modules/task/components/TaskAssignee'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'
import { useTaskExtendedStatus, useTaskStatus } from 'modules/task/hooks/task'
import { useTaskSuspendRequestStatus } from 'modules/task/hooks/taskSuspendRequest'
import { TaskAssigneeModel, TaskModel } from 'modules/task/models'
import { UserPermissionsEnum } from 'modules/user/constants'
import { useMatchUserPermissions } from 'modules/user/hooks'
import { UserActionsModel } from 'modules/user/models'

import Space from 'components/Space'

import { SelectStyled } from './styles'

const { Text } = Typography

const NOT_ASSIGNED_TEXT = 'Не назначен'

export type AssigneeBlockProps = Pick<
  TaskModel,
  'id' | 'status' | 'extendedStatus' | 'assignee' | 'workGroup'
> & {
  updateAssignee: (assignee: TaskAssigneeModel['id']) => Promise<void>
  updateAssigneeIsLoading: boolean

  takeTask: () => Promise<void>
  takeTaskIsLoading: boolean

  taskSuspendRequestStatus?: SuspendRequestStatusEnum

  userActions: UserActionsModel
}

const AssigneeBlock: FC<AssigneeBlockProps> = ({
  id,

  assignee,

  status,
  extendedStatus,

  workGroup,

  updateAssignee,
  updateAssigneeIsLoading,

  takeTask,
  takeTaskIsLoading,

  taskSuspendRequestStatus: rawTaskSuspendRequestStatus,

  userActions,
}) => {
  const currentAssignee = assignee?.id

  const [selectedAssignee, setSelectedAssignee] = useState(currentAssignee)

  const taskStatus = useTaskStatus(status)
  const taskExtendedStatus = useTaskExtendedStatus(extendedStatus)
  const taskSuspendRequestStatus = useTaskSuspendRequestStatus(rawTaskSuspendRequestStatus)
  const authUser = useAuthUser()
  const permissions = useMatchUserPermissions([UserPermissionsEnum.AnyAssigneeTasksUpdate])

  const selectedAssigneeIsCurrentAssignee = isEqual(selectedAssignee, currentAssignee)
  const currentAssigneeIsCurrentUser = useIdBelongAuthUser(currentAssignee)
  const selectedAssigneeIsCurrentUser = useIdBelongAuthUser(selectedAssignee)

  const workGroupMembers = workGroup?.members || []

  const canSelectAssignee =
    !!workGroup &&
    !taskStatus.isClosed &&
    !taskStatus.isCompleted &&
    permissions.anyAssigneeTasksUpdate

  const onAssignOnMe = async () => {
    if (authUser) {
      await updateAssignee(authUser.id)
      setSelectedAssignee(authUser.id)
    }
  }

  const onClickAssigneeButton = async () => {
    if (selectedAssignee) await updateAssignee(selectedAssignee)
  }

  return (
    <Space data-testid='task-assignee-block' direction='vertical' $block>
      <Row justify='space-between'>
        <Col>
          <Text type='secondary'>Исполнитель</Text>
        </Col>

        <Col>
          <Button
            type='link'
            loading={updateAssigneeIsLoading}
            disabled={
              taskSuspendRequestStatus.isApproved
                ? false
                : taskStatus.isClosed ||
                  taskStatus.isCompleted ||
                  taskStatus.isAwaiting ||
                  taskExtendedStatus.isInReclassification ||
                  taskSuspendRequestStatus.isNew ||
                  taskSuspendRequestStatus.isInProgress
            }
            onClick={currentAssigneeIsCurrentUser ? undefined : onAssignOnMe}
          >
            {currentAssigneeIsCurrentUser ? 'Отказаться от заявки' : 'Назначить на себя'}
          </Button>
        </Col>
      </Row>

      <Space direction='vertical' size='middle' $block>
        {canSelectAssignee ? (
          <SelectStyled
            defaultValue={selectedAssignee}
            variant='borderless'
            placeholder={assignee ? null : NOT_ASSIGNED_TEXT}
            onSelect={setSelectedAssignee}
          >
            {workGroupMembers.map((member) => {
              const currentAssigneeInWorkGroup = isEqual(member.id, currentAssignee)
              const authUserInWorkGroup = isEqual(member.id, authUser!.id)
              const disabled = currentAssigneeInWorkGroup || authUserInWorkGroup

              return (
                <SelectStyled.Option
                  data-testid={`select-option-${member.id}`}
                  key={member.id}
                  value={member.id}
                  disabled={disabled}
                >
                  <TaskAssignee {...member} />
                </SelectStyled.Option>
              )
            })}
          </SelectStyled>
        ) : assignee ? (
          <TaskAssignee {...assignee} hasPopover />
        ) : (
          <Text>{NOT_ASSIGNED_TEXT}</Text>
        )}

        <Row justify={canSelectAssignee ? 'space-between' : 'end'}>
          <Button
            type='primary'
            ghost
            loading={takeTaskIsLoading}
            disabled={
              taskSuspendRequestStatus.isApproved
                ? false
                : !(
                    taskStatus.isNew &&
                    (currentAssigneeIsCurrentUser || !currentAssignee) &&
                    !taskExtendedStatus.isInReclassification &&
                    userActions.tasks.CAN_EXECUTE.includes(id)
                  ) ||
                  taskSuspendRequestStatus.isNew ||
                  taskSuspendRequestStatus.isInProgress
            }
            onClick={takeTask}
          >
            В работу
          </Button>

          {canSelectAssignee && (
            <Button
              type='primary'
              ghost
              onClick={onClickAssigneeButton}
              loading={updateAssigneeIsLoading}
              disabled={
                taskSuspendRequestStatus.isApproved
                  ? false
                  : taskStatus.isAwaiting ||
                    !selectedAssignee ||
                    selectedAssigneeIsCurrentUser ||
                    selectedAssigneeIsCurrentAssignee ||
                    taskExtendedStatus.isInReclassification ||
                    taskSuspendRequestStatus.isNew ||
                    taskSuspendRequestStatus.isInProgress
              }
            >
              Назначить
            </Button>
          )}
        </Row>
      </Space>
    </Space>
  )
}

export default AssigneeBlock
