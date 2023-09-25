import React, { FC } from 'react'

import { PauseCircleIcon } from 'components/Icons'

import { ArrayFirst } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

import TaskRequest, { TaskRequestProps } from '../TaskRequest'

export type TaskSuspendRequestProps = Pick<
  TaskRequestProps,
  'comment' | 'user' | 'date' | 'title'
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
