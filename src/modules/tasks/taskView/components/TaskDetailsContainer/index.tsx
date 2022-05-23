// import moment from 'moment'
import React, { FC } from 'react'

import { Task } from 'modules/tasks/taskList/models'
import { useGetOneTaskByIdQuery } from 'modules/tasks/tasks.service'
import { useGetWorkGroupListQuery } from 'modules/workGroups/workGroups.service'
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
  const {
    data: task,
    isLoading: taskLoading,
    isFetching: taskFetching,
  } = useGetOneTaskByIdQuery(taskId)

  const {
    data: workGroupList,
    isLoading: workGroupListLoading,
    isFetching: workGroupListFetching,
  } = useGetWorkGroupListQuery(null)

  const isLoading: boolean =
    taskLoading || taskFetching || workGroupListLoading || workGroupListFetching

  const olaNextBreachTime = '2022-05-19T14:25:01.006257+03:00'

  const taskDetails = task
    ? {
        id: task.id,
        recordId: task.recordId,
        title: task.title,
        name: task.name,
        address: task.address,
        contactService: task.contactService,
        workGroup: task.workGroup,
        createdAt: formatDate(task.createdAt, DATE_TIME_FORMAT),
        olaNextBreachTime: formatDate(olaNextBreachTime, DATE_TIME_FORMAT),
        // olaNextBreachTime: formatDate(task.olaNextBreachTime, DATE_TIME_FORMAT),
      }
    : null

  // TODO:
  //  const olaNextBreachTimeDiff = olaNextBreachTime
  //   ? moment(olaNextBreachTime).diff(moment(), 'hours')
  //   : ''
  //  console.log(olaNextBreachTimeDiff)

  return (
    <TaskDetails
      onClose={onClose}
      isLoading={isLoading}
      workGroupList={workGroupList?.results || []}
      details={taskDetails}
    />
  )
}

export default TaskDetailsContainer
