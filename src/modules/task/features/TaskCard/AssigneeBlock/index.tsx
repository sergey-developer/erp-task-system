import { Button, Col, Row, Typography } from 'antd'
import React, { FC, useState } from 'react'

import Permissions from 'components/Permissions'
import Space from 'components/Space'
import {
  useAuthenticatedUser,
  useCheckUserAuthenticated,
} from 'modules/auth/hooks'
import { SuspendRequestStatusEnum } from 'modules/task/constants/common'
import TaskAssignee from 'modules/task/features/TaskAssignee'
import {
  useTaskExtendedStatus,
  useTaskStatus,
  useTaskSuspendRequestStatus,
} from 'modules/task/hooks'
import { TaskAssigneeModel, TaskModel } from 'modules/task/models'
import { taskAssigneePermissions } from 'modules/task/permissions'
import { getFullUserName } from 'modules/user/utils'
import { WorkGroupListItemModel } from 'modules/workGroup/models'
import { isEqual } from 'shared/utils/common/isEqual'

import { SelectStyled } from './styles'

const { Text } = Typography

const NOT_ASSIGNED_TEXT = 'Не назначен'

export type AssigneeBlockProps = Pick<
  TaskModel,
  'status' | 'extendedStatus' | 'assignee'
> & {
  workGroup?: WorkGroupListItemModel
  workGroupListIsLoading: boolean

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
  workGroupListIsLoading,

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
  const taskSuspendRequestStatus = useTaskSuspendRequestStatus(
    rawTaskSuspendRequestStatus,
  )
  const authenticatedUser = useAuthenticatedUser()

  const selectedAssigneeIsCurrentAssignee = isEqual(
    selectedAssignee,
    currentAssignee,
  )

  const currentAssigneeIsCurrentUser =
    useCheckUserAuthenticated(currentAssignee)

  const selectedAssigneeIsCurrentUser =
    useCheckUserAuthenticated(selectedAssignee)

  const seniorEngineerFromWorkGroupIsCurrentUser = useCheckUserAuthenticated(
    workGroup?.seniorEngineer.id,
  )

  const headOfDepartmentFromWorkGroupIsCurrentUser = useCheckUserAuthenticated(
    workGroup?.groupLead.id,
  )

  const workGroupMembers = workGroup?.members || []

  const canSelectAssignee: boolean =
    !taskStatus.isClosed &&
    !taskStatus.isCompleted &&
    (seniorEngineerFromWorkGroupIsCurrentUser ||
      headOfDepartmentFromWorkGroupIsCurrentUser)

  const handleAssignOnMe = async () => {
    if (authenticatedUser) {
      await updateAssignee(authenticatedUser.id)
      setSelectedAssignee(authenticatedUser.id)
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
            onClick={
              currentAssigneeIsCurrentUser ? undefined : handleAssignOnMe
            }
          >
            {currentAssigneeIsCurrentUser
              ? 'Отказаться от заявки'
              : 'Назначить на себя'}
          </Button>
        </Col>
      </Row>

      <Permissions
        config={taskAssigneePermissions.select}
        hideWhenViewForbidden={false}
      >
        {({ canView, canEdit }) =>
          canView && !canEdit ? (
            <Space direction='vertical' size='middle' $block>
              {assignee ? (
                <TaskAssignee
                  name={getFullUserName(assignee)}
                  status={status}
                  assignee={assignee}
                />
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
                  loading={workGroupListIsLoading}
                  disabled={updateAssigneeIsLoading}
                  bordered={false}
                  placeholder={assignee ? null : NOT_ASSIGNED_TEXT}
                  onSelect={setSelectedAssignee}
                >
                  {workGroupMembers.map(({ id, fullName }) => {
                    const currentAssigneeInWorkGroup: boolean = isEqual(
                      id,
                      currentAssignee,
                    )

                    const authenticatedUserInWorkGroup: boolean = isEqual(
                      id,
                      authenticatedUser!.id,
                    )

                    const disabled =
                      currentAssigneeInWorkGroup || authenticatedUserInWorkGroup

                    return (
                      <SelectStyled.Option
                        data-testid={`select-option-${id}`}
                        key={id}
                        value={id}
                        disabled={disabled}
                      >
                        <TaskAssignee
                          name={fullName}
                          status={status}
                          assignee={assignee}
                        />
                      </SelectStyled.Option>
                    )
                  })}
                </SelectStyled>
              ) : assignee ? (
                <TaskAssignee
                  name={getFullUserName(assignee)}
                  status={status}
                  assignee={assignee}
                />
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
