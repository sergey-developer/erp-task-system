import React, { FC } from 'react'

import { PauseCircleIcon } from 'components/Icons'

import { ArrayFirst } from 'shared/interfaces/utils'
import { formatDate } from 'shared/utils/date'

import TaskRequest, { TaskRequestProps } from '../TaskRequest'

export type TaskSuspendRequestProps = Omit<
  TaskRequestProps,
  'icon' | 'actions'
> & {
  action?: ArrayFirst<TaskRequestProps['actions']>
}

const TaskSuspendRequest: FC<TaskSuspendRequestProps> = ({
  title,
  comment,
  date,
  user,
  action,
}) => {
  return (
    <TaskRequest
      data-testid='task-card-suspend-request'
      icon={<PauseCircleIcon $size='large' />}
      title={title}
      comment={comment}
      user={user}
      date={`до ${formatDate(date)}`}
      actions={action ? [action] : []}
    />
  )
}

export default TaskSuspendRequest
