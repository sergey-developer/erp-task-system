import { useBoolean } from 'ahooks'
import { Button, Typography } from 'antd'
import _debounce from 'lodash/debounce'
import React, { FC } from 'react'

import Space from 'components/Space'
import TaskSecondLineModal from 'modules/task/components/TaskView/components/TaskSecondLineModal'
import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import useTaskStatus from 'modules/task/hooks/useTaskStatus'
import useUserRole from 'modules/user/hooks/useUserRole'
import { WorkGroupListItemModel } from 'modules/workGroup/components/WorkGroupList/models'
import { DOUBLE_CLICK_DEBOUNCE_TIME } from 'shared/constants/common'
import { ErrorResponse } from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

const { Text } = Typography

type WorkGroupProps = Pick<TaskDetailsModel, 'id' | 'workGroup' | 'status'> & {
  workGroupList: Array<WorkGroupListItemModel>
  workGroupListIsLoading: boolean

  transferTask: (
    workGroup: WorkGroupListItemModel['id'],
    closeTaskSecondLineModal: () => void,
  ) => Promise<void>
  transferTaskIsLoading: boolean

  getWorkGroupListError?: ErrorResponse
}

const WorkGroup: FC<WorkGroupProps> = ({
  id,
  workGroup,
  status,

  workGroupList,
  workGroupListIsLoading,
  getWorkGroupListError,

  transferTask,
  transferTaskIsLoading,
}) => {
  const [
    isTaskSecondLineModalOpened,
    { setTrue: openTaskSecondLineModal, setFalse: closeTaskSecondLineModal },
  ] = useBoolean(false)

  const {
    isFirstLineSupportRole,
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

  const handleOpenTaskSecondLineModal = _debounce(() => {
    openTaskSecondLineModal()

    if (getWorkGroupListError) {
      showErrorNotification(
        'Возникла ошибка при получении списка рабочих групп',
      )
    }
  }, DOUBLE_CLICK_DEBOUNCE_TIME)

  const changeTaskLineButton = firstLineSupportNotHasWorkGroup ? (
    <Button
      type='link'
      onClick={handleOpenTaskSecondLineModal}
      loading={transferTaskIsLoading}
      disabled={
        !(taskStatus.isNew || taskStatus.isInProgress || taskStatus.isAwaiting)
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

        <Text>{workGroup?.name || 'I линия поддержки'}</Text>
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
