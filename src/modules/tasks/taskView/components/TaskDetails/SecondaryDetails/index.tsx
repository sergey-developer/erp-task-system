import { useBoolean } from 'ahooks'
import { Button, Col, Row, Typography } from 'antd'
import React, { FC, useMemo } from 'react'

import Space from 'components/Space'
import useTaskStatus from 'modules/tasks/hooks/useTaskStatus'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import useUserRole from 'modules/user/hooks/useUserRole'
import { WorkGroupListItemModel } from 'modules/workGroups/workGroupList/models'
import { AssigneeModel } from 'shared/interfaces/models'

import TaskSecondLineModal from '../../TaskSecondLineModal'
import { DetailContainerStyled } from '../styles'
import TaskAssignee from '../TaskAssignee'
import { SelectStyled } from './styles'

const { Text } = Typography

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

  updateTaskAssignee: (assignee: AssigneeModel['id']) => Promise<void>
  updateTaskAssigneeIsLoading: boolean
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

  updateTaskAssignee,
  updateTaskAssigneeIsLoading,
}) => {
  const [
    isTaskSecondLineModalOpened,
    { setTrue: openTaskSecondLineModal, setFalse: closeTaskSecondLineModal },
  ] = useBoolean(false)

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
    // todo: как поправят бэк, возможно брать это значение из "workGroup.members"
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
          <TaskAssignee
            status={status}
            assignee={assignee}
            hasWorkGroup={hasWorkGroup}
            workGroupListIsLoading={workGroupListIsLoading}
            workGroupMembers={workGroupMembers}
            updateTaskAssignee={updateTaskAssignee}
            updateTaskAssigneeIsLoading={updateTaskAssigneeIsLoading}
          />
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
