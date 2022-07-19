import { Button, Row, Typography } from 'antd'
import React, { FC, useState } from 'react'

import Space from 'components/Space'
import useAuthenticatedUser from 'modules/auth/hooks/useAuthenticatedUser'
import useIsAuthenticatedUser from 'modules/auth/hooks/useIsAuthenticatedUser'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import useUserRole from 'modules/user/hooks/useUserRole'
import getFullUserName from 'modules/user/utils/getFullUserName'
import { WorkGroupListMemberModel } from 'modules/workGroups/workGroupList/models'
import { AssigneeModel } from 'shared/interfaces/models'

import { SelectStyled } from '../SecondaryDetails/styles'
import Assignee from './Assignee'

const { Text } = Typography

const ASSIGNEE_NOT_SET_TEXT: string = 'Не назначен'

type TaskAssigneeProps = Pick<TaskDetailsModel, 'assignee' | 'status'> & {
  hasWorkGroup: boolean
  workGroupMembers: Array<WorkGroupListMemberModel>
  workGroupListIsLoading: boolean
  updateTaskAssignee: (assignee: AssigneeModel['id']) => Promise<void>
  updateTaskAssigneeIsLoading: boolean
}

const TaskAssignee: FC<TaskAssigneeProps> = ({
  status,
  assignee,
  hasWorkGroup,
  workGroupMembers,
  updateTaskAssignee,
  updateTaskAssigneeIsLoading,
  workGroupListIsLoading,
}) => {
  const [selectedAssignee, setSelectedAssignee] = useState(assignee?.id)

  const authenticatedUser = useAuthenticatedUser()
  const assigneeIsAuthenticatedUser = useIsAuthenticatedUser(selectedAssignee)

  const {
    isFirstLineSupportRole,
    isEngineerRole,
    isSeniorEngineerRole,
    isHeadOfDepartmentRole,
  } = useUserRole()

  const seniorEngineerHasWorkGroup: boolean =
    hasWorkGroup && isSeniorEngineerRole

  const headOfDepartmentHasWorkGroup: boolean =
    hasWorkGroup && isHeadOfDepartmentRole

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

      {isEngineerRole || isFirstLineSupportRole ? (
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
        (seniorEngineerHasWorkGroup || headOfDepartmentHasWorkGroup) && (
          <Space direction='vertical'>
            <SelectStyled
              defaultValue={selectedAssignee}
              loading={workGroupListIsLoading}
              disabled={updateTaskAssigneeIsLoading}
              bordered={false}
              placeholder={assignee ? null : ASSIGNEE_NOT_SET_TEXT}
              onSelect={setSelectedAssignee}
            >
              {workGroupMembers.map(({ id, fullName }) => (
                <SelectStyled.Option
                  key={id}
                  value={id}
                  disabled={id === assignee?.id}
                >
                  <Assignee
                    name={fullName}
                    status={status}
                    assignee={assignee}
                  />
                </SelectStyled.Option>
              ))}
            </SelectStyled>

            <Row justify='end'>
              <Button
                type='primary'
                ghost
                onClick={handleClickAssignee}
                loading={updateTaskAssigneeIsLoading}
                disabled={!selectedAssignee || assigneeIsAuthenticatedUser}
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
