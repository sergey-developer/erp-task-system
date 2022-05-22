import React, { FC } from 'react'

import { Task } from 'modules/tasks/taskList/models'
import { useGetOneTaskQuery } from 'modules/tasks/tasks.service'

import TaskDetail from '../TaskDetail'

type TaskDetailContainerProps = {
  taskId: Task['id']
  onClose: () => void
}

const TaskDetailContainer: FC<TaskDetailContainerProps> = ({
  taskId,
  onClose,
}) => {
  const result = useGetOneTaskQuery(taskId)
  console.log(result)
  return <TaskDetail onClose={onClose} />
}

export default TaskDetailContainer
