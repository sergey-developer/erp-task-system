import { Button, Row, Typography } from 'antd'
import React, { FC, useState } from 'react'

import Space from 'components/Space'
import useAuthenticatedUser from 'modules/auth/hooks/useAuthenticatedUser'
import useCheckUserAuthenticated from 'modules/auth/hooks/useCheckUserAuthenticated'
import useTaskStatus from 'modules/tasks/hooks/useTaskStatus'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import useUserRole from 'modules/user/hooks/useUserRole'
import getFullUserName from 'modules/user/utils/getFullUserName'
import { AssigneeModel } from 'shared/interfaces/models'

import { SelectStyled } from '../SecondaryDetails/styles'
import Assignee from './Assignee'

const { Text } = Typography

const ASSIGNEE_NOT_SET_TEXT: string = 'Не назначен'

type TaskAssigneeProps = Pick<
  TaskDetailsModel,
  'assignee' | 'status' | 'workGroup'
> & {
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
  const [selectedAssignee, setSelectedAssignee] = useState(assignee?.id)
  const taskStatus = useTaskStatus(status)
  const authenticatedUser = useAuthenticatedUser()
  const { isFirstLineSupportRole, isEngineerRole } = useUserRole()

  const assigneeIsAuthenticatedUser =
    useCheckUserAuthenticated(selectedAssignee)

  const seniorEngineerFromWorkGroupIsAuthenticatedUser =
    useCheckUserAuthenticated(workGroup?.seniorEngineer?.id)

  const headOfDepartmentFromWorkGroupIsAuthenticatedUser =
    useCheckUserAuthenticated(workGroup?.groupLead?.id)

  const hasWorkGroup: boolean = !!workGroup
  const workGroupMembers = workGroup?.members || []

  const canSelectAssignee: boolean =
    hasWorkGroup &&
    !taskStatus.isClosed &&
    !taskStatus.isCompleted &&
    (seniorEngineerFromWorkGroupIsAuthenticatedUser ||
      headOfDepartmentFromWorkGroupIsAuthenticatedUser)

  const canOnlyViewAssignee: boolean = isEngineerRole || isFirstLineSupportRole

  const handleAssignTaskOnMe = async () => {
    setSelectedAssignee(authenticatedUser!.id)
    await updateTaskAssignee(authenticatedUser!.id)
  }

  const handleClickAssignee = async () => {
    await updateTaskAssignee(selectedAssignee!)
  }

  return (
    <Space direction='vertical' $fullWidth>
      <Space size='large'>
        <Text type='secondary'>Исполнитель</Text>

        <Button
          type='link'
          loading={updateTaskAssigneeIsLoading}
          disabled={!hasWorkGroup}
          onClick={
            assigneeIsAuthenticatedUser ? undefined : handleAssignTaskOnMe
          }
        >
          {assigneeIsAuthenticatedUser
            ? 'Отказаться от заявки'
            : 'Назначить на себя'}
        </Button>
      </Space>

      {canOnlyViewAssignee ? (
        assignee ? (
          <Assignee
            name={getFullUserName(assignee)}
            status={status}
            assignee={assignee}
          />
        ) : (
          <Text>{ASSIGNEE_NOT_SET_TEXT}</Text>
        )
      ) : (
        canSelectAssignee && (
          <Space direction='vertical'>
            <SelectStyled
              defaultValue={selectedAssignee}
              loading={workGroupListIsLoading}
              disabled={updateTaskAssigneeIsLoading}
              bordered={false}
              placeholder={assignee ? null : ASSIGNEE_NOT_SET_TEXT}
              onSelect={setSelectedAssignee}
            >
              {workGroupMembers.map(({ id, fullName }) => {
                const assigneeInWorkGroup: boolean = id === assignee?.id

                const authenticatedUserInWorkGroup: boolean =
                  id === authenticatedUser!.id

                return (
                  <SelectStyled.Option
                    key={id}
                    value={id}
                    disabled={
                      assigneeInWorkGroup || authenticatedUserInWorkGroup
                    }
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
                disabled={!selectedAssignee}
              >
                Назначить
              </Button>
            </Row>
          </Space>
        )
      )}
    </Space>
  )
}

export default TaskAssignee
