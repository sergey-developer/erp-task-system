import React, { FC } from 'react'

import { Task } from 'modules/tasks/taskList/models'
import { useGetOneTaskQuery } from 'modules/tasks/tasks.service'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import TaskDetails from '../TaskDetails'

type TaskDetailsContainerProps = {
  taskId: Task['id']
  onClose: () => void
}

const TaskDetailsContainer: FC<TaskDetailsContainerProps> = ({
  taskId,
  onClose,
}) => {
  const { data: task, isLoading, isFetching } = useGetOneTaskQuery(taskId)

  const { id, recordId, title, createdAt, name, address, contactService } =
    task || {}

  return (
    <TaskDetails
      onClose={onClose}
      isLoading={isLoading || isFetching}
      id={id}
      recordId={recordId}
      title={title}
      createdAt={createdAt ? formatDate(createdAt, DATE_TIME_FORMAT) : ''}
      name={name}
      address={address}
      contactService={contactService}
    />
  )
}

export default TaskDetailsContainer
