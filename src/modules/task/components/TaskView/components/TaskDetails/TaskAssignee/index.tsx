import { Button, Row, Typography } from 'antd'
import React, { FC, useState } from 'react'

import Space from 'components/Space'
import useAuthenticatedUser from 'modules/auth/hooks/useAuthenticatedUser'
import useCheckUserAuthenticated from 'modules/auth/hooks/useCheckUserAuthenticated'
import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import { ASSIGNEE_WORD } from 'modules/task/constants/words'
import useTaskStatus from 'modules/task/hooks/useTaskStatus'
import useUserRole from 'modules/user/hooks/useUserRole'
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
  const [selectedAssignee, setSelectedAssignee] = useState(assignee?.id)
  const taskStatus = useTaskStatus(status)
  const authenticatedUser = useAuthenticatedUser()
  const { isFirstLineSupportRole, isEngineerRole } = useUserRole()

  const assigneeIsAuthenticatedUser =
    useCheckUserAuthenticated(selectedAssignee)

  const seniorEngineerFromWorkGroupIsAuthenticatedUser =
    useCheckUserAuthenticated(workGroup?.seniorEngineer.id)

  const headOfDepartmentFromWorkGroupIsAuthenticatedUser =
    useCheckUserAuthenticated(workGroup?.groupLead.id)

  const workGroupMembers = workGroup?.members || []

  const canSelectAssignee: boolean =
    !taskStatus.isCompleted &&
    (seniorEngineerFromWorkGroupIsAuthenticatedUser ||
      headOfDepartmentFromWorkGroupIsAuthenticatedUser)

  const canOnlyViewAssignee: boolean = isEngineerRole || isFirstLineSupportRole

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
      ) : canSelectAssignee ? (
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
              const assigneeInWorkGroup: boolean = id === assignee?.id

              const authenticatedUserInWorkGroup: boolean =
                id === authenticatedUser!.id

              return (
                <SelectStyled.Option
                  key={id}
                  value={id}
                  disabled={assigneeInWorkGroup || authenticatedUserInWorkGroup}
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
      ) : (
        <Text>{ASSIGNEE_NOT_SET_TEXT}</Text>
      )}
    </Space>
  )
}

export default TaskAssignee
