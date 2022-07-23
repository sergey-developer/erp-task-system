import { useBoolean } from 'ahooks'
import { Button, Typography } from 'antd'
import React, { FC } from 'react'

import Space from 'components/Space'
import useTaskStatus from 'modules/tasks/hooks/useTaskStatus'
import TaskSecondLineModal from 'modules/tasks/taskView/components/TaskSecondLineModal'
import { TaskDetailsModel } from 'modules/tasks/taskView/models'
import useUserRole from 'modules/user/hooks/useUserRole'
import { WorkGroupListItemModel } from 'modules/workGroups/workGroupList/models'

import { SelectStyled } from '../SecondaryDetails/styles'

const { Text } = Typography

type WorkGroupProps = Pick<TaskDetailsModel, 'id' | 'workGroup' | 'status'> & {
  workGroupList: Array<WorkGroupListItemModel>
  workGroupListIsLoading: boolean

  transferTask: (
    workGroup: WorkGroupListItemModel['id'],
    closeTaskSecondLineModal: () => void,
  ) => Promise<void>
  transferTaskIsLoading: boolean
}

const WorkGroup: FC<WorkGroupProps> = ({
  id,
  workGroup,
  status,

  workGroupList,
  workGroupListIsLoading,

  transferTask,
  transferTaskIsLoading,
}) => {
  const [
    isTaskSecondLineModalOpened,
    { setTrue: openTaskSecondLineModal, setFalse: closeTaskSecondLineModal },
  ] = useBoolean(false)

  const {
    isFirstLineSupportRole,
    isEngineerRole,
    isSeniorEngineerRole,
    isHeadOfDepartmentRole,
  } = useUserRole()

  const taskStatus = useTaskStatus(status)

  const hasWorkGroup: boolean = !!workGroup

  const firstLineSupportNotHasWorkGroup: boolean =
    !hasWorkGroup && isFirstLineSupportRole

  const seniorEngineerHasWorkGroup: boolean =
    hasWorkGroup && isSeniorEngineerRole

  const headOfDepartmentHasWorkGroup: boolean =
    hasWorkGroup && isHeadOfDepartmentRole

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
    <>
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

      <TaskSecondLineModal
        id={id}
        visible={isTaskSecondLineModalOpened}
        onCancel={closeTaskSecondLineModal}
        workGroupList={workGroupList}
        workGroupListIsLoading={workGroupListIsLoading}
        onTransfer={handleTransferTask}
        transferTaskIsLoading={transferTaskIsLoading}
      />
    </>
  )
}

export default WorkGroup
