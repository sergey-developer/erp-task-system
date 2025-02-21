import React, { FC } from 'react'

import { QuestionCircleIcon } from 'components/Icons'

import { EmptyFn } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

import TaskRequest, { TaskRequestProps } from '../TaskRequest'

export type TaskReclassificationRequestProps = Pick<TaskRequestProps, 'comment' | 'date'> & {
  user: NonNullable<TaskRequestProps['user']>
  onCancel: EmptyFn
  cancelBtnDisabled: boolean
}

const TaskReclassificationRequest: FC<TaskReclassificationRequestProps> = ({
  comment,
  date,
  user,
  onCancel,
  cancelBtnDisabled,
}) => {
  return (
    <TaskRequest
      data-testid='task-reclassification-request'
      icon={<QuestionCircleIcon $size='large' />}
      title='Запрошена переклассификация:'
      comment={comment}
      user={user}
      date={formatDate(date)}
      actions={[
        {
          text: 'Отменить запрос',
          onClick: onCancel,
          disabled: cancelBtnDisabled,
        },
      ]}
    />
  )
}

export default TaskReclassificationRequest
