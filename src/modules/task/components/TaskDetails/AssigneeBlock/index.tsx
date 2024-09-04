import { Button, Col, Row, Typography } from 'antd'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import React, { FC, useMemo, useState } from 'react'

import { useAuthUser, useIdBelongAuthUser } from 'modules/auth/hooks'
import TaskAssignee from 'modules/task/components/TaskAssignee'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'
import { useTaskExtendedStatus, useTaskStatus } from 'modules/task/hooks/task'
import { useTaskSuspendRequestStatus } from 'modules/task/hooks/taskSuspendRequest'
import { TaskAssigneeModel, TaskModel, TaskWorkGroupModel } from 'modules/task/models'
import { UserPermissionsEnum } from 'modules/user/constants'
import { useUserPermissions } from 'modules/user/hooks'
import { UserActionsModel } from 'modules/user/models'

import Space from 'components/Space'

import { NO_ASSIGNEE_TEXT } from 'shared/constants/common'

import { DropdownSelectWrapperStyled, SelectStyled } from './styles'

const { Text } = Typography

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
  const [selectedAssigneeId, setSelectedAssigneeId] = useState(assignee?.id)

  const taskStatus = useTaskStatus(status)
  const taskExtendedStatus = useTaskExtendedStatus(extendedStatus)
  const taskSuspendRequestStatus = useTaskSuspendRequestStatus(rawTaskSuspendRequestStatus)
  const authUser = useAuthUser()

  const permissions = useUserPermissions([
    UserPermissionsEnum.AnyAssigneeTasksUpdate,
    UserPermissionsEnum.SelfAssigneeTasksUpdate,
  ])

  const selectedAssigneeIsCurrentAssignee = isEqual(selectedAssigneeId, assignee?.id)
  const currentAssigneeIsCurrentUser = useIdBelongAuthUser(assignee?.id)
  const selectedAssigneeIsCurrentUser = useIdBelongAuthUser(selectedAssigneeId)

  const canSelectAssignee =
    !!workGroup &&
    !taskStatus.isClosed &&
    !taskStatus.isCompleted &&
    permissions.anyAssigneeTasksUpdate

  const workGroupMembers: TaskWorkGroupModel['members'] = useMemo(
    () =>
      canSelectAssignee
        ? assignee && !workGroup?.members.find((m) => m.id === assignee.id)
          ? [
              ...workGroup.members,
              pick(assignee, 'id', 'firstName', 'lastName', 'middleName', 'phone'),
            ]
          : workGroup.members
        : [],
    [assignee, canSelectAssignee, workGroup?.members],
  )

  const onAssignOnMe = async () => {
    if (authUser) {
      await updateAssignee(authUser.id)
      setSelectedAssigneeId(authUser.id)
    }
  }

  const onClickAssigneeButton = async () => {
    if (selectedAssigneeId) await updateAssignee(selectedAssigneeId)
  }

  return (
    <Space data-testid='task-assignee-block' direction='vertical' $block>
      <Row justify='space-between'>
        <Col>
          <Text type='secondary'>Исполнитель</Text>
        </Col>

        <Col>
          {currentAssigneeIsCurrentUser ? (
            <Button type='link' disabled={!userActions.tasks.CAN_ASSIGNEE.includes(id)}>
              Отказаться от заявки
            </Button>
          ) : (
            <Button
              type='link'
              loading={updateAssigneeIsLoading}
              disabled={
                taskSuspendRequestStatus.isApproved
                  ? false
                  : (!permissions.selfAssigneeTasksUpdate && !permissions.anyAssigneeTasksUpdate) ||
                    taskStatus.isClosed ||
                    taskStatus.isCompleted ||
                    taskStatus.isAwaiting ||
                    taskExtendedStatus.isInReclassification ||
                    taskSuspendRequestStatus.isNew ||
                    taskSuspendRequestStatus.isInProgress
              }
              onClick={onAssignOnMe}
            >
              Назначить на себя
            </Button>
          )}
        </Col>
      </Row>

      <Space direction='vertical' size='middle' $block>
        {canSelectAssignee ? (
          <SelectStyled
            defaultValue={selectedAssigneeId}
            variant='borderless'
            dropdownRender={(menu) => (
              <DropdownSelectWrapperStyled>{menu}</DropdownSelectWrapperStyled>
            )}
            placeholder={assignee ? null : NO_ASSIGNEE_TEXT}
            onSelect={setSelectedAssigneeId}
          >
            {workGroupMembers.map((member) => {
              const currentAssigneeIsMember = isEqual(member.id, assignee?.id)
              const authUserIsMember = isEqual(member.id, authUser!.id)
              const disabled = currentAssigneeIsMember || authUserIsMember

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
          <Text>{NO_ASSIGNEE_TEXT}</Text>
        )}

        <Row justify={canSelectAssignee ? 'space-between' : 'end'}>
          <Button
            type='primary'
            ghost
            loading={takeTaskIsLoading}
            disabled={!userActions.tasks.CAN_EXECUTE.includes(id)}
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
                    !selectedAssigneeId ||
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
