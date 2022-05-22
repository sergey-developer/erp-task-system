import React, { FC } from 'react'

import TaskDetail from '../TaskDetail'

type TaskDetailContainerProps = {
  onClose: () => void
}

const TaskDetailContainer: FC<TaskDetailContainerProps> = ({ onClose }) => {
  return <TaskDetail onClose={onClose} />
}

export default TaskDetailContainer
