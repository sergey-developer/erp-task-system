import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC, useMemo } from 'react'

import Space from 'components/Space'
import useAuthenticatedUser from 'modules/auth/hooks/useAuthenticatedUser'
import useTaskStatus from 'modules/tasks/hooks/useTaskStatus'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import useUserRole from 'modules/user/hooks/useUserRole'
import getFullUserName from 'modules/user/utils/getFullUserName'
import { WorkGroupListItemModel } from 'modules/workGroups/workGroupList/models'

import TaskSecondLineModal from '../../TaskSecondLineModal'
import Performer from '../Performer'
import { DetailContainerStyled } from '../styles'
import { SelectStyled } from './styles'

const { Text } = Typography

type SecondaryDetailsProps = Pick<
  TaskDetailsModel,
  'id' | 'workGroup' | 'assignee' | 'status'
> & {
  workGroupList: Array<WorkGroupListItemModel>
  workGroupListLoading: boolean
  transferTaskIsLoading: boolean
  transferTask: (
    workGroup: WorkGroupListItemModel['id'],
    closeTaskSecondLineModal: () => void,
  ) => Promise<void>
}

const SecondaryDetails: FC<SecondaryDetailsProps> = ({
  id,
  status,
  assignee,
  workGroup,
  workGroupList,
  workGroupListLoading,
  transferTask,
  transferTaskIsLoading,
}) => {
  const [
    isTaskSecondLineModalOpened,
    { setTrue: openTaskSecondLineModal, setFalse: closeTaskSecondLineModal },
  ] = useBoolean(false)

  const authenticatedUser = useAuthenticatedUser()

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
                  loading={workGroupListLoading}
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

              {authenticatedUser && (
                <Button type='link'>
                  {assignee?.id === authenticatedUser.id
                    ? 'Отказаться от заявки'
                    : 'Назначить на себя'}
                </Button>
              )}
            </Space>

            {isEngineerRole || isFirstLineSupportRole ? (
              assignee ? (
                <Performer
                  name={getFullUserName(assignee)}
                  status={status}
                  assignee={assignee}
                />
              ) : (
                <Text>Не назначен</Text>
              )
            ) : (
              (seniorEngineerHasWorkGroup || headOfDepartmentHasWorkGroup) && (
                <SelectStyled
                  defaultValue={assignee?.id}
                  loading={workGroupListLoading}
                  bordered={false}
                  placeholder={assignee ? null : 'Не назначен'}
                >
                  {workGroupMembers.map(({ id, fullName }) => (
                    <SelectStyled.Option
                      key={id}
                      value={id}
                      disabled={id === assignee?.id}
                    >
                      <Performer
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
        workGroupList={workGroupList}
        workGroupListLoading={workGroupListLoading}
        transferTaskIsLoading={transferTaskIsLoading}
        onCancel={closeTaskSecondLineModal}
        onTransfer={handleTransferTask}
      />
    </DetailContainerStyled>
  )
}

export default SecondaryDetails
