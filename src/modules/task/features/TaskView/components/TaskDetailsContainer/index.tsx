import React, { FC, useEffect } from 'react'

import { TaskListItemModel } from 'modules/task/features/TaskList/models'
import useCreateTaskReclassificationRequest from 'modules/task/features/TaskView/hooks/useCreateTaskReclassificationRequest'
import useGetTask from 'modules/task/features/TaskView/hooks/useGetTask'
import useGetTaskReclassificationRequest from 'modules/task/features/TaskView/hooks/useGetTaskReclassificationRequest'
import useResolveTask from 'modules/task/features/TaskView/hooks/useResolveTask'
import useTakeTask from 'modules/task/features/TaskView/hooks/useTakeTask'
import useUpdateTaskAssignee from 'modules/task/features/TaskView/hooks/useUpdateTaskAssignee'
import useUpdateTaskWorkGroup from 'modules/task/features/TaskView/hooks/useUpdateTaskWorkGroup'
import useGetWorkGroupList from 'modules/workGroup/features/WorkGroupList/hooks/useGetWorkGroupList'

import TaskDetails from '../TaskDetails'

type TaskDetailsContainerProps = {
  taskId: TaskListItemModel['id']
  onClose: () => void
}

const TaskDetailsContainer: FC<TaskDetailsContainerProps> = ({
  onClose,
  taskId,
}) => {
  const {
    data: task = null,
    isFetching: taskIsFetching,
    isError: isGetTaskError,
  } = useGetTask(taskId)

  const { currentData: reclassificationRequest = null } =
    useGetTaskReclassificationRequest(taskId)

  const {
    fn: createReclassificationRequest,
    state: { isLoading: reclassificationRequestIsCreating },
  } = useCreateTaskReclassificationRequest()

  const {
    fn: takeTask,
    state: { isLoading: takeTaskIsLoading },
  } = useTakeTask()

  const { data: workGroupList = [], isFetching: workGroupListIsFetching } =
    useGetWorkGroupList()

  const {
    fn: resolveTask,
    state: { isLoading: isTaskResolving },
  } = useResolveTask()

  const {
    fn: updateWorkGroup,
    state: { isLoading: updateWorkGroupIsLoading },
  } = useUpdateTaskWorkGroup()

  const {
    fn: updateAssignee,
    state: { isLoading: updateAssigneeIsLoading },
  } = useUpdateTaskAssignee()

  useEffect(() => {
    if (isGetTaskError) {
      onClose()
    }
  }, [isGetTaskError, onClose])

  return (
    <TaskDetails
      details={task}
      taskIsLoading={taskIsFetching}
      takeTask={takeTask}
      takeTaskIsLoading={takeTaskIsLoading}
      resolveTask={resolveTask}
      isTaskResolving={isTaskResolving}
      updateAssignee={updateAssignee}
      updateAssigneeIsLoading={updateAssigneeIsLoading}
      reclassificationRequest={reclassificationRequest}
      createReclassificationRequest={createReclassificationRequest}
      reclassificationRequestIsCreating={reclassificationRequestIsCreating}
      workGroupList={workGroupList}
      workGroupListIsLoading={workGroupListIsFetching}
      updateWorkGroup={updateWorkGroup}
      updateWorkGroupIsLoading={updateWorkGroupIsLoading}
      onClose={onClose}
    />
  )
}

export default TaskDetailsContainer
