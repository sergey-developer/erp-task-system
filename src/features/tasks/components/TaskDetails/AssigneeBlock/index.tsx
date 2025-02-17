import { Button, Col, Row, Typography } from 'antd'
import { useAuthUser, useIdBelongAuthUser } from 'features/auth/hooks'
import { TaskAssigneeDTO, TaskDetailDTO, TaskWorkGroupDTO } from 'features/tasks/api/dto'
import TaskAssignee from 'features/tasks/components/TaskAssignee'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { UserActionsDTO } from 'features/users/api/dto'
import { useUserPermissions } from 'features/users/hooks'
import isEqual from 'lodash/isEqual'
import pick from 'lodash/pick'
import React, { FC, useMemo, useState } from 'react'

import Space from 'components/Space'

import { NO_ASSIGNEE_TEXT } from 'shared/constants/common'

import { DropdownSelectWrapperStyled, SelectStyled } from './styles'

const { Text } = Typography

export type AssigneeBlockProps = Pick<TaskDetailDTO, 'id' | 'assignee' | 'workGroup'> & {
  updateAssignee: (taskAssignee: TaskAssigneeDTO['id']) => Promise<void>
  updateAssigneeIsLoading: boolean

  takeTask: () => Promise<void>
  takeTaskIsLoading: boolean

  userActions: UserActionsDTO
}

const AssigneeBlock: FC<AssigneeBlockProps> = ({
  id,

  assignee,

  workGroup,

  updateAssignee,
  updateAssigneeIsLoading,

  takeTask,
  takeTaskIsLoading,

  userActions,
}) => {
  const [selectedAssigneeId, setSelectedAssigneeId] = useState(assignee?.id)

  const authUser = useAuthUser()

  const permissions = useUserPermissions([
    UserPermissionsEnum.AnyAssigneeTasksUpdate,
    UserPermissionsEnum.SelfAssigneeTasksUpdate,
  ])

  const currentAssigneeIsCurrentUser = useIdBelongAuthUser(assignee?.id)

  const canSelectAssignee =
    permissions.anyAssigneeTasksUpdate && userActions.tasks.CAN_ASSIGNEE?.includes(id)
  const showAssigneeSelect = canSelectAssignee
  const showAssigneeButton = canSelectAssignee

  const workGroupMembers: TaskWorkGroupDTO['members'] = useMemo(() => {
    const members = workGroup?.members || []

    return canSelectAssignee
      ? assignee && !members.find((m) => m.id === assignee.id)
        ? [...members, pick(assignee, 'id', 'firstName', 'lastName', 'middleName', 'phone')]
        : members
      : []
  }, [assignee, canSelectAssignee, workGroup?.members])

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
    <Space data-testid='task-taskAssignee-block' direction='vertical' $block>
      <Row justify='space-between'>
        <Col>
          <Text type='secondary'>Исполнитель</Text>
        </Col>

        <Col>
          {currentAssigneeIsCurrentUser ? (
            <Button type='link' disabled={!userActions.tasks.CAN_SELF_ASSIGNEE?.includes(id)}>
              Отказаться от заявки
            </Button>
          ) : (
            <Button
              type='link'
              loading={updateAssigneeIsLoading}
              disabled={
                !(
                  (permissions.selfAssigneeTasksUpdate || permissions.anyAssigneeTasksUpdate) &&
                  userActions.tasks.CAN_SELF_ASSIGNEE?.includes(id)
                )
              }
              onClick={onAssignOnMe}
            >
              Назначить на себя
            </Button>
          )}
        </Col>
      </Row>

      <Space direction='vertical' size='middle' $block>
        {showAssigneeSelect ? (
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
            disabled={!userActions.tasks.CAN_EXECUTE?.includes(id)}
            onClick={takeTask}
          >
            В работу
          </Button>

          {showAssigneeButton && (
            <Button
              type='primary'
              ghost
              onClick={onClickAssigneeButton}
              loading={updateAssigneeIsLoading}
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
