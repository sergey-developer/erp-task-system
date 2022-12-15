import { Button, Col, Row, Typography } from 'antd'
import React, { FC, useState } from 'react'

import Permissions from 'components/Permissions'
import Space from 'components/Space'
import {
  useAuthenticatedUser,
  useCheckUserAuthenticated,
} from 'modules/auth/hooks'
import TaskAssignee from 'modules/task/features/TaskAssignee'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { taskAssigneePermissions } from 'modules/task/features/TaskView/permissions'
import { useTaskExtendedStatus, useTaskStatus } from 'modules/task/hooks'
import { TaskAssigneeModel } from 'modules/task/models'
import { getFullUserName } from 'modules/user/utils'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'
import { isEqual } from 'shared/utils/common/isEqual'

import { SelectStyled } from './styles'

const { Text } = Typography

const NOT_ASSIGNED_TEXT: string = 'Не назначен'

export type AssigneeBlockProps = Pick<
  TaskDetailsModel,
  'status' | 'extendedStatus' | 'assignee'
> & {
  workGroup?: WorkGroupListItemModel
  workGroupListIsLoading: boolean

  updateAssignee: (assignee: TaskAssigneeModel['id']) => Promise<void>
  updateAssigneeIsLoading: boolean

  takeTask: () => Promise<void>
  takeTaskIsLoading: boolean
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
}) => {
  const currentAssignee = assignee?.id
  const [selectedAssignee, setSelectedAssignee] = useState(currentAssignee)
  const taskStatus = useTaskStatus(status)
  const taskExtendedStatus = useTaskExtendedStatus(extendedStatus)
  const authenticatedUser = useAuthenticatedUser()

  const selectedAssigneeIsCurrentAssignee = isEqual(
    selectedAssignee,
    currentAssignee,
  )

  const currentAssigneeIsAuthenticatedUser =
    useCheckUserAuthenticated(currentAssignee)

  const selectedAssigneeIsAuthenticatedUser =
    useCheckUserAuthenticated(selectedAssignee)

  const seniorEngineerFromWorkGroupIsAuthenticatedUser =
    useCheckUserAuthenticated(workGroup?.seniorEngineer.id)

  const headOfDepartmentFromWorkGroupIsAuthenticatedUser =
    useCheckUserAuthenticated(workGroup?.groupLead.id)

  const workGroupMembers = workGroup?.members || []

  const canSelectAssignee: boolean =
    !taskStatus.isClosed &&
    !taskStatus.isCompleted &&
    (seniorEngineerFromWorkGroupIsAuthenticatedUser ||
      headOfDepartmentFromWorkGroupIsAuthenticatedUser)

  const handleAssignOnMe = async () => {
    await updateAssignee(authenticatedUser!.id)
    setSelectedAssignee(authenticatedUser!.id)
  }

  const handleClickAssigneeButton = async () => {
    await updateAssignee(selectedAssignee!)
  }

  const takeTaskButton = (
    <Button
      type='primary'
      ghost
      loading={takeTaskIsLoading}
      disabled={
        !(
          taskStatus.isNew &&
          (currentAssigneeIsAuthenticatedUser || !currentAssignee) &&
          !taskExtendedStatus.isInReclassification
        )
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
              taskStatus.isClosed ||
              taskStatus.isCompleted ||
              taskStatus.isAwaiting ||
              taskExtendedStatus.isInReclassification
            }
            onClick={
              currentAssigneeIsAuthenticatedUser ? undefined : handleAssignOnMe
            }
          >
            {currentAssigneeIsAuthenticatedUser
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
                      taskStatus.isAwaiting ||
                      !selectedAssignee ||
                      selectedAssigneeIsAuthenticatedUser ||
                      selectedAssigneeIsCurrentAssignee ||
                      taskExtendedStatus.isInReclassification
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
