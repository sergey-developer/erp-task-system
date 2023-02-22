import React, { FC } from 'react'

import { PauseCircleIcon } from 'components/Icons'

import { ArrayItem } from 'shared/interfaces/utils'

import TaskRequest, { TaskRequestProps } from '../TaskRequest'

export type TaskSuspendRequestProps = Omit<
  TaskRequestProps,
  'icon' | 'actions'
> & {
  action?: ArrayItem<TaskRequestProps['actions']>
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
      date={date}
      actions={action ? [action] : []}
    />
  )
}

export default TaskSuspendRequest
