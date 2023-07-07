import { generatePath } from 'react-router-dom'

import { TaskEndpointEnum } from 'modules/task/constants/api'

export const getTaskUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.GetTask, { id: String(taskId) })

export const resolveTaskUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.ResolveTask, { id: String(taskId) })

export const getTaskWorkPerformedActUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.GetWorkPerformedAct, { id: String(taskId) })

export const takeTaskUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.TakeTask, { id: String(taskId) })

export const updateTaskWorkGroupUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.UpdateTaskWorkGroup, { id: String(taskId) })

export const deleteTaskWorkGroupUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.DeleteTaskWorkGroup, { id: String(taskId) })

export const updateTaskAssigneeUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.UpdateTaskAssignee, { id: String(taskId) })

export const createTaskCommentUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.CreateTaskComment, { id: String(taskId) })

export const getTaskCommentListUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.GetTaskCommentList, { id: String(taskId) })

export const createTaskReclassificationRequestUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.CreateReclassificationRequest, {
    id: String(taskId),
  })

export const getTaskReclassificationRequestUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.GetReclassificationRequest, {
    id: String(taskId),
  })

export const createTaskSuspendRequestUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.CreateTaskSuspendRequest, {
    id: String(taskId),
  })

export const deleteTaskSuspendRequestUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.DeleteTaskSuspendRequest, {
    id: String(taskId),
  })

export const getTaskJournalUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.GetTaskJournal, { id: String(taskId) })

export const getTaskJournalCsvUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.GetTaskJournalCsv, { id: String(taskId) })
