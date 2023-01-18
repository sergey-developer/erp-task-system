import React, { FC, useMemo } from 'react'

import { PauseCircleIcon } from 'components/Icons'
import { SuspendRequestStatusEnum } from 'modules/task/constants/common'
import { useTaskSuspendRequestStatus } from 'modules/task/hooks'

import TaskRequest, { TaskRequestProps } from '../TaskRequest'

export type TaskSuspendRequestProps = Omit<
  TaskRequestProps,
  'icon' | 'title' | 'actions'
> & {
  status: SuspendRequestStatusEnum
  onCancel: () => void
  cancelBtnDisabled: boolean
}

const TaskSuspendRequest: FC<TaskSuspendRequestProps> = ({
  comment,
  date,
  user,
  status,
  onCancel,
  cancelBtnDisabled,
}) => {
  const statusMap = useTaskSuspendRequestStatus(status)

  const actions: TaskRequestProps['actions'] = useMemo(() => {
    const arr = []

    if (statusMap.isNew) {
      arr.push({
        text: 'Отменить запрос',
        onClick: onCancel,
        disabled: cancelBtnDisabled,
      })
    } else if (statusMap.isApproved) {
      arr.push({ text: 'Вернуть в работу', disabled: true })
    }

    return arr
  }, [cancelBtnDisabled, onCancel, statusMap.isApproved, statusMap.isNew])

  return (
    <TaskRequest
      data-testid='task-card-suspend-request'
      icon={<PauseCircleIcon $size='large' />}
      title={
        statusMap.isNew
          ? 'Запрошено ожидание'
          : statusMap.isApproved
          ? 'Заявка находится в ожидании'
          : ''
      }
      comment={comment}
      user={user}
      date={date}
      actions={actions}
    />
  )
}

export default TaskSuspendRequest
