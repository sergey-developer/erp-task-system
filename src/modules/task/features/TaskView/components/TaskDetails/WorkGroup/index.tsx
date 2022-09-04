import { useBoolean } from 'ahooks'
import { Button, Space, Typography } from 'antd'
import React, { FC } from 'react'

import LabeledData from 'components/LabeledData'
import Permissions from 'components/Permissions'
import TaskSecondLineModal from 'modules/task/features/TaskView/components/TaskSecondLineModal'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { taskWorkGroupPermissions } from 'modules/task/features/TaskView/permissions/taskWorkGroup.permissions'
import useTaskStatus from 'modules/task/hooks/useTaskStatus'
import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'
import useDebounceFn from 'shared/hooks/useDebounceFn'

const { Text } = Typography

type WorkGroupProps = Pick<TaskDetailsModel, 'id' | 'workGroup' | 'status'> & {
  workGroupList: Array<WorkGroupListItemModel>
  workGroupListIsLoading: boolean

  transferTask: (
    workGroup: WorkGroupListItemModel['id'],
    closeTaskSecondLineModal: () => void,
  ) => Promise<void>
  transferTaskIsLoading: boolean

  hasReclassificationRequest: boolean
}

const WorkGroup: FC<WorkGroupProps> = ({
  id,
  workGroup,
  status,

  workGroupList,
  workGroupListIsLoading,

  transferTask,
  transferTaskIsLoading,

  hasReclassificationRequest,
}) => {
  const [
    isTaskSecondLineModalOpened,
    { setTrue: openTaskSecondLineModal, setFalse: closeTaskSecondLineModal },
  ] = useBoolean(false)

  const taskStatus = useTaskStatus(status)

  const hasWorkGroup: boolean = !!workGroup

  const debouncedOpenTaskSecondLineModal = useDebounceFn(
    openTaskSecondLineModal,
  )

  const handleTransferTask = async (
    workGroup: WorkGroupListItemModel['id'],
  ): Promise<void> => {
    await transferTask(workGroup, closeTaskSecondLineModal)
  }

  return (
    <>
      <Space direction='vertical'>
        <LabeledData label='Рабочая группа' size='large' direction='horizontal'>
          <Permissions config={taskWorkGroupPermissions.transferFirstLineBtn}>
            {() =>
              hasWorkGroup ? (
                <Button type='link' disabled={hasReclassificationRequest}>
                  Вернуть на I линию
                </Button>
              ) : null
            }
          </Permissions>

          <Permissions config={taskWorkGroupPermissions.transferSecondLineBtn}>
            {() =>
              hasWorkGroup ? null : (
                <Button
                  type='link'
                  onClick={debouncedOpenTaskSecondLineModal}
                  loading={transferTaskIsLoading}
                  disabled={
                    !(
                      taskStatus.isNew ||
                      taskStatus.isInProgress ||
                      taskStatus.isAwaiting
                    ) || hasReclassificationRequest
                  }
                >
                  Перевести на II линию
                </Button>
              )
            }
          </Permissions>
        </LabeledData>

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
