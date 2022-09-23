import { Button, Row, Typography } from 'antd'
import React, { FC, useState } from 'react'

import LabeledData from 'components/LabeledData'
import Permissions from 'components/Permissions'
import Space from 'components/Space'
import useAuthenticatedUser from 'modules/auth/hooks/useAuthenticatedUser'
import useCheckUserAuthenticated from 'modules/auth/hooks/useCheckUserAuthenticated'
import { ASSIGNEE_WORD } from 'modules/task/constants/words'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { taskAssigneePermissions } from 'modules/task/features/TaskView/permissions/taskAssignee.permissions'
import useTaskExtendedStatus from 'modules/task/hooks/useTaskExtendedStatus'
import useTaskStatus from 'modules/task/hooks/useTaskStatus'
import { TaskAssigneeModel } from 'modules/task/models'
import getFullUserName from 'modules/user/utils/getFullUserName'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'
import { isEqual } from 'shared/utils/common/isEqual'

import Assignee from './Assignee'
import { SelectStyled } from './styles'

const { Text } = Typography

const ASSIGNEE_NOT_SET_TEXT: string = 'Не назначен'

export type TaskAssigneeProps = Pick<
  TaskDetailsModel,
  'status' | 'extendedStatus'
> & {
  workGroup?: WorkGroupListItemModel
  workGroupListIsLoading: boolean

  assignee?: TaskDetailsModel['assignee']
  updateAssignee: (assignee: TaskAssigneeModel['id']) => Promise<void>
  updateAssigneeIsLoading: boolean

  takeTask: () => Promise<void>
  takeTaskIsLoading: boolean

  hasReclassificationRequest: boolean
}

const TaskAssignee: FC<TaskAssigneeProps> = ({
  assignee,

  status,
  extendedStatus,

  workGroup,
  workGroupListIsLoading,

  updateAssignee,
  updateAssigneeIsLoading,

  takeTask,
  takeTaskIsLoading,

  hasReclassificationRequest,
}) => {
  const currentAssignee = assignee?.id
  const [selectedAssignee, setSelectedAssignee] = useState(currentAssignee)
  const taskStatus = useTaskStatus(status)
  const extendedTaskStatus = useTaskExtendedStatus(extendedStatus)
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
    !hasReclassificationRequest &&
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
      data-testid='btn-takeTask'
      type='primary'
      ghost
      loading={takeTaskIsLoading}
      disabled={
        !(
          taskStatus.isNew &&
          (currentAssigneeIsAuthenticatedUser || !currentAssignee) &&
          !extendedTaskStatus.isInReclassification
        )
      }
      onClick={takeTask}
    >
      В работу
    </Button>
  )

  return (
    <Space direction='vertical' $block>
      <LabeledData label={ASSIGNEE_WORD} size='large' direction='horizontal'>
        <Button
          type='link'
          loading={updateAssigneeIsLoading}
          disabled={
            taskStatus.isClosed ||
            taskStatus.isCompleted ||
            hasReclassificationRequest
          }
          onClick={
            currentAssigneeIsAuthenticatedUser ? undefined : handleAssignOnMe
          }
        >
          {currentAssigneeIsAuthenticatedUser
            ? 'Отказаться от заявки'
            : 'Назначить на себя'}
        </Button>
      </LabeledData>

      <Permissions
        config={taskAssigneePermissions.select}
        hideWhenViewForbidden={false}
      >
        {({ canView, canEdit }) =>
          canView && !canEdit ? (
            <Space direction='vertical' size='middle' $block>
              {assignee ? (
                <Assignee
                  name={getFullUserName(assignee)}
                  status={status}
                  assignee={assignee}
                />
              ) : (
                <Text>{ASSIGNEE_NOT_SET_TEXT}</Text>
              )}

              <Row justify='end'>{takeTaskButton}</Row>
            </Space>
          ) : canView && canEdit && canSelectAssignee ? (
            <Space direction='vertical' size='middle' $block>
              <SelectStyled
                defaultValue={selectedAssignee}
                loading={workGroupListIsLoading}
                disabled={updateAssigneeIsLoading}
                bordered={false}
                placeholder={assignee ? null : ASSIGNEE_NOT_SET_TEXT}
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
                      <Assignee
                        name={fullName}
                        status={status}
                        assignee={assignee}
                      />
                    </SelectStyled.Option>
                  )
                })}
              </SelectStyled>

              <Row justify='space-between'>
                {takeTaskButton}

                <Button
                  type='primary'
                  ghost
                  onClick={handleClickAssigneeButton}
                  loading={updateAssigneeIsLoading}
                  disabled={
                    !selectedAssignee ||
                    selectedAssigneeIsAuthenticatedUser ||
                    selectedAssigneeIsCurrentAssignee ||
                    hasReclassificationRequest
                  }
                >
                  Назначить
                </Button>
              </Row>
            </Space>
          ) : (
            <Text>{ASSIGNEE_NOT_SET_TEXT}</Text>
          )
        }
      </Permissions>
    </Space>
  )
}

export default TaskAssignee
