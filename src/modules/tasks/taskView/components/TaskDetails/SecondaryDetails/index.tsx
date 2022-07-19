import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC, useMemo } from 'react'

import Space from 'components/Space'
import useIsAuthenticatedUser from 'modules/auth/hooks/useIsAuthenticatedUser'
import useTaskStatus from 'modules/tasks/hooks/useTaskStatus'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import useUserRole from 'modules/user/hooks/useUserRole'
import getFullUserName from 'modules/user/utils/getFullUserName'
import { WorkGroupListItemModel } from 'modules/workGroups/workGroupList/models'
import { AssigneeModel } from 'shared/interfaces/models'

import TaskSecondLineModal from '../../TaskSecondLineModal'
import { DetailContainerStyled } from '../styles'
import TaskAssignee from '../TaskAssignee'
import { SelectStyled } from './styles'

const { Text } = Typography

const ASSIGNEE_NOT_SET_TEXT: string = 'Не назначен'

type SecondaryDetailsProps = Pick<
  TaskDetailsModel,
  'id' | 'workGroup' | 'assignee' | 'status'
> & {
  workGroupList: Array<WorkGroupListItemModel>
  workGroupListIsLoading: boolean

  transferTask: (
    workGroup: WorkGroupListItemModel['id'],
    closeTaskSecondLineModal: () => void,
  ) => Promise<void>
  transferTaskIsLoading: boolean

  setTaskAssignee: (assignee: AssigneeModel['id']) => Promise<void>
  setTaskAssigneeIsLoading: boolean
}

const SecondaryDetails: FC<SecondaryDetailsProps> = ({
  id,
  status,
  assignee,

  workGroup,
  workGroupList,
  workGroupListIsLoading,

  transferTask,
  transferTaskIsLoading,

  setTaskAssignee,
  setTaskAssigneeIsLoading,
}) => {
  const [
    isTaskSecondLineModalOpened,
    { setTrue: openTaskSecondLineModal, setFalse: closeTaskSecondLineModal },
  ] = useBoolean(false)

  const assigneeIsAuthenticatedUser = useIsAuthenticatedUser(assignee?.id)

  const taskStatus = useTaskStatus(status)

  const {
    isFirstLineSupportRole,
    isEngineerRole,
    isSeniorEngineerRole,
    isHeadOfDepartmentRole,
  } = useUserRole()

  const hasWorkGroup: boolean = !!workGroup

  const firstLineSupportNotHasWorkGroup: boolean =
    !hasWorkGroup && isFirstLineSupportRole

  const seniorEngineerHasWorkGroup: boolean =
    hasWorkGroup && isSeniorEngineerRole

  const headOfDepartmentHasWorkGroup: boolean =
    hasWorkGroup && isHeadOfDepartmentRole

  const workGroupMembers = useMemo(() => {
    const workGroupFromList = workGroupList.find(
      ({ id }) => id === workGroup?.id,
    )
    return workGroupFromList ? workGroupFromList.members : []
  }, [workGroup?.id, workGroupList])

  const changeTaskLineButton = firstLineSupportNotHasWorkGroup ? (
    <Button
      type='link'
      onClick={openTaskSecondLineModal}
      loading={transferTaskIsLoading}
      disabled={
        taskStatus.isAppointed ||
        taskStatus.isClosed ||
        taskStatus.isCompleted ||
        taskStatus.isInReclassification ||
        taskStatus.isReclassified
      }
    >
      Перевести на II линию
    </Button>
  ) : seniorEngineerHasWorkGroup || headOfDepartmentHasWorkGroup ? (
    <Button type='link'>Вернуть на I линию</Button>
  ) : null

  const handleTransferTask = async (
    workGroup: WorkGroupListItemModel['id'],
  ): Promise<void> => {
    await transferTask(workGroup, closeTaskSecondLineModal)
  }

  const assignTaskOnMe = async () => {
    if (assigneeIsAuthenticatedUser) {
      await setTaskAssignee(assignee!.id)
    }
  }

  return (
    <DetailContainerStyled>
      <Row justify='space-between'>
        <Col span={12}>
          <Space direction='vertical'>
            <Space size='large'>
              <Text type='secondary'>Рабочая группа</Text>

              {changeTaskLineButton}
            </Space>

            {isEngineerRole || isFirstLineSupportRole ? (
              <Text>{workGroup?.name || 'I линия поддержки'}</Text>
            ) : (
              (seniorEngineerHasWorkGroup || headOfDepartmentHasWorkGroup) && (
                <SelectStyled
                  defaultValue={workGroup?.id}
                  loading={workGroupListIsLoading}
                  bordered={false}
                >
                  {workGroupList.map(({ id, name }) => (
                    <SelectStyled.Option
                      key={id}
                      value={id}
                      disabled={id === workGroup?.id}
                    >
                      <Text className='break-text'>{name}</Text>
                    </SelectStyled.Option>
                  ))}
                </SelectStyled>
              )
            )}
          </Space>
        </Col>

        <Col span={10}>
          <Space direction='vertical' $fullWidth>
            <Space size='large'>
              <Text type='secondary'>Исполнитель</Text>

              <Button
                type='link'
                loading={setTaskAssigneeIsLoading}
                onClick={
                  assigneeIsAuthenticatedUser ? assignTaskOnMe : undefined
                }
              >
                {assigneeIsAuthenticatedUser
                  ? 'Отказаться от заявки'
                  : 'Назначить на себя'}
              </Button>
            </Space>

            {isEngineerRole || isFirstLineSupportRole ? (
              assignee ? (
                <TaskAssignee
                  name={getFullUserName(assignee)}
                  status={status}
                  assignee={assignee}
                />
              ) : (
                <Text>{ASSIGNEE_NOT_SET_TEXT}</Text>
              )
            ) : (
              (seniorEngineerHasWorkGroup || headOfDepartmentHasWorkGroup) && (
                <SelectStyled
                  defaultValue={assignee?.id}
                  loading={workGroupListIsLoading}
                  disabled={setTaskAssigneeIsLoading}
                  bordered={false}
                  placeholder={assignee ? null : ASSIGNEE_NOT_SET_TEXT}
                >
                  {workGroupMembers.map(({ id, fullName }) => (
                    <SelectStyled.Option
                      key={id}
                      value={id}
                      disabled={id === assignee?.id}
                    >
                      <TaskAssignee
                        name={fullName}
                        status={status}
                        assignee={assignee}
                      />
                    </SelectStyled.Option>
                  ))}
                </SelectStyled>
              )
            )}
          </Space>
        </Col>
      </Row>

      <TaskSecondLineModal
        id={id}
        visible={isTaskSecondLineModalOpened}
        onCancel={closeTaskSecondLineModal}
        workGroupList={workGroupList}
        workGroupListIsLoading={workGroupListIsLoading}
        onTransfer={handleTransferTask}
        transferTaskIsLoading={transferTaskIsLoading}
      />
    </DetailContainerStyled>
  )
}

export default SecondaryDetails
