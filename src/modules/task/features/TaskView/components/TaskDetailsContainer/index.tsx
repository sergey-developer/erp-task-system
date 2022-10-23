import React, { FC } from 'react'

import { TaskListItemModel } from 'modules/task/features/TaskList/models'
import useCreateTaskReclassificationRequest from 'modules/task/features/TaskView/hooks/useCreateTaskReclassificationRequest'
import useDeleteTaskWorkGroup from 'modules/task/features/TaskView/hooks/useDeleteTaskWorkGroup'
import useGetTask from 'modules/task/features/TaskView/hooks/useGetTask'
import useGetTaskReclassificationRequest from 'modules/task/features/TaskView/hooks/useGetTaskReclassificationRequest'
import useResolveTask from 'modules/task/features/TaskView/hooks/useResolveTask'
import useTakeTask from 'modules/task/features/TaskView/hooks/useTakeTask'
import useUpdateTaskAssignee from 'modules/task/features/TaskView/hooks/useUpdateTaskAssignee'
import useUpdateTaskWorkGroup from 'modules/task/features/TaskView/hooks/useUpdateTaskWorkGroup'
import useTaskExtendedStatus from 'modules/task/hooks/useTaskExtendedStatus'
import useGetWorkGroupList from 'modules/workGroup/features/WorkGroupList/hooks/useGetWorkGroupList'

import TaskDetails from '../TaskDetails'

type TaskDetailsContainerProps = {
  taskId: TaskListItemModel['id']

  additionalInfoExpanded: boolean
  onExpandAdditionalInfo: () => void

  closeTaskDetails: () => void
}

const TaskDetailsContainer: FC<TaskDetailsContainerProps> = ({
  taskId,

  additionalInfoExpanded,
  onExpandAdditionalInfo,

  closeTaskDetails,
}) => {
  const {
    data: task = null,
    isFetching: taskIsFetching,
    isError: isGetTaskError,
  } = useGetTask(taskId)

  const taskExtendedStatus = useTaskExtendedStatus(task?.extendedStatus)

  const { currentData: reclassificationRequest = null } =
    useGetTaskReclassificationRequest(taskId, {
      skip: !taskExtendedStatus.isInReclassification,
    })

  const {
    fn: createReclassificationRequest,
    state: { isLoading: createReclassificationRequestIsLoading },
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
    fn: deleteWorkGroup,
    state: { isLoading: deleteWorkGroupIsLoading },
  } = useDeleteTaskWorkGroup()

  const {
    fn: updateAssignee,
    state: { isLoading: updateAssigneeIsLoading },
  } = useUpdateTaskAssignee()

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
      createReclassificationRequestIsLoading={
        createReclassificationRequestIsLoading
      }
      workGroupList={workGroupList}
      workGroupListIsLoading={workGroupListIsFetching}
      updateWorkGroup={updateWorkGroup}
      updateWorkGroupIsLoading={updateWorkGroupIsLoading}
      deleteWorkGroup={deleteWorkGroup}
      deleteWorkGroupIsLoading={deleteWorkGroupIsLoading}
      additionalInfoExpanded={additionalInfoExpanded}
      onExpandAdditionalInfo={onExpandAdditionalInfo}
      closeTaskDetails={closeTaskDetails}
      isGetTaskError={isGetTaskError}
    />
  )
}

export default TaskDetailsContainer
