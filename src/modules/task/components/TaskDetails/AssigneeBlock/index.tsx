import { Button, Col, Row, Typography } from 'antd'
import isEqual from 'lodash/isEqual'
import React, { FC, useState } from 'react'

import { useAuthUser, useIdBelongAuthUser } from 'modules/auth/hooks'
import TaskAssignee from 'modules/task/components/TaskAssignee'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'
import { useTaskExtendedStatus, useTaskStatus } from 'modules/task/hooks/task'
import { useTaskSuspendRequestStatus } from 'modules/task/hooks/taskSuspendRequest'
import { TaskAssigneeModel, TaskModel } from 'modules/task/models'
import { taskAssigneePermissions } from 'modules/task/permissions'

import Permissions from 'components/Permissions'
import Space from 'components/Space'

import { SelectStyled } from './styles'

const { Text } = Typography

const NOT_ASSIGNED_TEXT = 'Не назначен'

export type AssigneeBlockProps = Pick<
  TaskModel,
  'status' | 'extendedStatus' | 'assignee' | 'workGroup'
> & {
  updateAssignee: (assignee: TaskAssigneeModel['id']) => Promise<void>
  updateAssigneeIsLoading: boolean

  takeTask: () => Promise<void>
  takeTaskIsLoading: boolean

  taskSuspendRequestStatus?: SuspendRequestStatusEnum
}

const AssigneeBlock: FC<AssigneeBlockProps> = ({
  assignee,

  status,
  extendedStatus,

  workGroup,

  updateAssignee,
  updateAssigneeIsLoading,

  takeTask,
  takeTaskIsLoading,

  taskSuspendRequestStatus: rawTaskSuspendRequestStatus,
}) => {
  const currentAssignee = assignee?.id

  const [selectedAssignee, setSelectedAssignee] = useState(currentAssignee)

  const taskStatus = useTaskStatus(status)
  const taskExtendedStatus = useTaskExtendedStatus(extendedStatus)
  const taskSuspendRequestStatus = useTaskSuspendRequestStatus(rawTaskSuspendRequestStatus)
  const authUser = useAuthUser()

  const selectedAssigneeIsCurrentAssignee = isEqual(selectedAssignee, currentAssignee)
  const currentAssigneeIsCurrentUser = useIdBelongAuthUser(currentAssignee)
  const selectedAssigneeIsCurrentUser = useIdBelongAuthUser(selectedAssignee)
  const seniorEngineerFromWorkGroupIsCurrentUser = useIdBelongAuthUser(workGroup?.seniorEngineer.id)
  const headOfDepartmentFromWorkGroupIsCurrentUser = useIdBelongAuthUser(workGroup?.groupLead.id)

  const workGroupMembers = workGroup?.members || []

  const canSelectAssignee: boolean =
    !taskStatus.isClosed &&
    !taskStatus.isCompleted &&
    (seniorEngineerFromWorkGroupIsCurrentUser || headOfDepartmentFromWorkGroupIsCurrentUser)

  const handleAssignOnMe = async () => {
    if (authUser) {
      await updateAssignee(authUser.id)
      setSelectedAssignee(authUser.id)
    }
  }

  const handleClickAssigneeButton = async () => {
    if (selectedAssignee) {
      await updateAssignee(selectedAssignee)
    }
  }

  const takeTaskButton = (
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
              !taskExtendedStatus.isInReclassification
            ) ||
            taskSuspendRequestStatus.isNew ||
            taskSuspendRequestStatus.isInProgress
      }
      onClick={takeTask}
    >
      В работу
    </Button>
  )

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
            onClick={currentAssigneeIsCurrentUser ? undefined : handleAssignOnMe}
          >
            {currentAssigneeIsCurrentUser ? 'Отказаться от заявки' : 'Назначить на себя'}
          </Button>
        </Col>
      </Row>

      <Permissions config={taskAssigneePermissions.select} hideWhenViewForbidden={false}>
        {({ canView, canEdit }) =>
          canView && !canEdit ? (
            <Space direction='vertical' size='middle' $block>
              {assignee ? (
                <TaskAssignee {...assignee} hasPopover />
              ) : (
                <Text>{NOT_ASSIGNED_TEXT}</Text>
              )}

              <Row justify='end'>{takeTaskButton}</Row>
            </Space>
          ) : canView && canEdit ? (
            <Space direction='vertical' size='middle' $block>
              {canSelectAssignee ? (
                <SelectStyled
                  defaultValue={selectedAssignee}
                  bordered={false}
                  placeholder={assignee ? null : NOT_ASSIGNED_TEXT}
                  onSelect={setSelectedAssignee}
                >
                  {workGroupMembers.map((member) => {
                    const currentAssigneeInWorkGroup: boolean = isEqual(member.id, currentAssignee)
                    const authenticatedUserInWorkGroup: boolean = isEqual(member.id, authUser!.id)
                    const disabled = currentAssigneeInWorkGroup || authenticatedUserInWorkGroup

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
                {takeTaskButton}

                {canSelectAssignee && (
                  <Button
                    type='primary'
                    ghost
                    onClick={handleClickAssigneeButton}
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
          ) : (
            <Text>{NOT_ASSIGNED_TEXT}</Text>
          )
        }
      </Permissions>
    </Space>
  )
}

export default AssigneeBlock
