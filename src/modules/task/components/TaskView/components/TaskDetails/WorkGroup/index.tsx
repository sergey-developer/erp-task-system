import { useBoolean } from 'ahooks'
import { Button, Space, Typography } from 'antd'
import _debounce from 'lodash/debounce'
import React, { FC } from 'react'

import Permissions from 'components/Permissions'
import TaskSecondLineModal from 'modules/task/components/TaskView/components/TaskSecondLineModal'
import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import { taskWorkGroupPermissions } from 'modules/task/components/TaskView/permissions/taskWorkGroup.permissions'
import useTaskStatus from 'modules/task/hooks/useTaskStatus'
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

  const taskStatus = useTaskStatus(status)

  const hasWorkGroup: boolean = !!workGroup

  const handleOpenTaskSecondLineModal = _debounce(() => {
    openTaskSecondLineModal()

    if (getWorkGroupListError) {
      showErrorNotification(
        'Возникла ошибка при получении списка рабочих групп',
      )
    }
  }, DOUBLE_CLICK_DEBOUNCE_TIME)

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

          <Permissions config={taskWorkGroupPermissions.transferFirstLineBtn}>
            {() =>
              hasWorkGroup ? (
                <Button type='link'>Вернуть на I линию</Button>
              ) : null
            }
          </Permissions>

          <Permissions config={taskWorkGroupPermissions.transferSecondLineBtn}>
            {() =>
              hasWorkGroup ? null : (
                <Button
                  type='link'
                  onClick={handleOpenTaskSecondLineModal}
                  loading={transferTaskIsLoading}
                  disabled={
                    !(
                      taskStatus.isNew ||
                      taskStatus.isInProgress ||
                      taskStatus.isAwaiting
                    )
                  }
                >
                  Перевести на II линию
                </Button>
              )
            }
          </Permissions>
        </Space>

        <Text>{workGroup?.name || 'I линия поддержки'}</Text>
      </Space>

      {isTaskSecondLineModalOpened && (
        <TaskSecondLineModal
          visible
          id={id}
          onCancel={closeTaskSecondLineModal}
          workGroupList={workGroupList}
          workGroupListIsLoading={workGroupListIsLoading}
          onTransfer={handleTransferTask}
          transferTaskIsLoading={transferTaskIsLoading}
        />
      )}
    </>
  )
}

export default WorkGroup
