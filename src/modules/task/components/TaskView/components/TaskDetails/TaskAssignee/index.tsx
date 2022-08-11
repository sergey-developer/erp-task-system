import { Button, Row, Typography } from 'antd'
import React, { FC, useState } from 'react'

import Permissions from 'components/Permissions'
import Space from 'components/Space'
import useAuthenticatedUser from 'modules/auth/hooks/useAuthenticatedUser'
import useCheckUserAuthenticated from 'modules/auth/hooks/useCheckUserAuthenticated'
import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import { taskAssigneePermissions } from 'modules/task/components/TaskView/permissions/taskAssignee.permissions'
import { ASSIGNEE_WORD } from 'modules/task/constants/words'
import useTaskStatus from 'modules/task/hooks/useTaskStatus'
import getFullUserName from 'modules/user/utils/getFullUserName'
import { WorkGroupListItemModel } from 'modules/workGroup/components/WorkGroupList/models'
import { AssigneeModel } from 'shared/interfaces/models'

import Assignee from './Assignee'
import { SelectStyled } from './styles'

const { Text } = Typography

const ASSIGNEE_NOT_SET_TEXT: string = 'Не назначен'

type TaskAssigneeProps = Pick<TaskDetailsModel, 'assignee' | 'status'> & {
  workGroup?: WorkGroupListItemModel
  workGroupListIsLoading: boolean

  updateTaskAssignee: (assignee: AssigneeModel['id']) => Promise<void>
  updateTaskAssigneeIsLoading: boolean
}

const TaskAssignee: FC<TaskAssigneeProps> = ({
  status,
  assignee,

  workGroup,
  workGroupListIsLoading,

  updateTaskAssignee,
  updateTaskAssigneeIsLoading,
}) => {
  const currentAssignee = assignee?.id
  const [selectedAssignee, setSelectedAssignee] = useState(currentAssignee)
  const taskStatus = useTaskStatus(status)
  const authenticatedUser = useAuthenticatedUser()

  const selectedAssigneeIsCurrentAssignee = selectedAssignee === currentAssignee

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

  const handleAssignTaskOnMe = async () => {
    await updateTaskAssignee(authenticatedUser!.id)
    setSelectedAssignee(authenticatedUser!.id)
  }

  const handleClickAssignee = async () => {
    await updateTaskAssignee(selectedAssignee!)
  }

  return (
    <Space direction='vertical' $block>
      <Space size='large'>
        <Text type='secondary'>{ASSIGNEE_WORD}</Text>

        <Button
          type='link'
          loading={updateTaskAssigneeIsLoading}
          disabled={taskStatus.isClosed || taskStatus.isCompleted}
          onClick={
            currentAssigneeIsAuthenticatedUser
              ? undefined
              : handleAssignTaskOnMe
          }
        >
          {currentAssigneeIsAuthenticatedUser
            ? 'Отказаться от заявки'
            : 'Назначить на себя'}
        </Button>
      </Space>

      <Permissions
        config={taskAssigneePermissions.select}
        hideWhenViewForbidden={false}
      >
        {({ canView, canEdit }) =>
          canView && !canEdit ? (
            assignee ? (
              <Assignee
                name={getFullUserName(assignee)}
                status={status}
                assignee={assignee}
              />
            ) : (
              <Text>{ASSIGNEE_NOT_SET_TEXT}</Text>
            )
          ) : canView && canEdit && canSelectAssignee ? (
            <Space direction='vertical' $block>
              <SelectStyled
                defaultValue={selectedAssignee}
                loading={workGroupListIsLoading}
                disabled={updateTaskAssigneeIsLoading}
                bordered={false}
                placeholder={assignee ? null : ASSIGNEE_NOT_SET_TEXT}
                onSelect={setSelectedAssignee}
              >
                {workGroupMembers.map(({ id, fullName }) => {
                  const currentAssigneeInWorkGroup: boolean =
                    id === currentAssignee

                  const authenticatedUserInWorkGroup: boolean =
                    id === authenticatedUser!.id

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

              <Row justify='end'>
                <Button
                  type='primary'
                  ghost
                  onClick={handleClickAssignee}
                  loading={updateTaskAssigneeIsLoading}
                  disabled={
                    !selectedAssignee ||
                    selectedAssigneeIsAuthenticatedUser ||
                    selectedAssigneeIsCurrentAssignee
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
