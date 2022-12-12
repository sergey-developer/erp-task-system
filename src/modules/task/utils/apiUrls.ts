import { generatePath } from 'react-router-dom'

import { TaskEndpointsEnum } from 'modules/task/constants/api'

export const getTaskUrl = (taskId: number): string =>
  generatePath(TaskEndpointsEnum.Task, { id: String(taskId) })

export const getResolveTaskUrl = (taskId: number): string =>
  generatePath(TaskEndpointsEnum.ResolveTask, { id: String(taskId) })

export const getTakeTaskUrl = (taskId: number): string =>
  generatePath(TaskEndpointsEnum.TakeTask, { id: String(taskId) })

export const getTaskWorkGroupUrl = (taskId: number): string =>
  generatePath(TaskEndpointsEnum.TaskWorkGroup, { id: String(taskId) })

export const getTaskAssigneeUrl = (taskId: number): string =>
  generatePath(TaskEndpointsEnum.TaskAssignee, { id: String(taskId) })

export const getTaskCommentUrl = (taskId: number): string =>
  generatePath(TaskEndpointsEnum.TaskComment, { id: String(taskId) })

export const getCreateTaskReclassificationRequestUrl = (
  taskId: number,
): string =>
  generatePath(TaskEndpointsEnum.CreateReclassificationRequest, {
    id: String(taskId),
  })

export const getTaskReclassificationRequestUrl = (taskId: number): string =>
  generatePath(TaskEndpointsEnum.GetReclassificationRequest, {
    id: String(taskId),
  })

export const getTaskJournalUrl = (taskId: number): string =>
  generatePath(TaskEndpointsEnum.TaskJournal, { id: String(taskId) })

export const getTaskJournalCsvUrl = (taskId: number): string =>
  generatePath(TaskEndpointsEnum.TaskJournalCsv, { id: String(taskId) })

export const getCreateSubTaskUrl = (taskId: number): string =>
  generatePath(TaskEndpointsEnum.CreateSubTask, { id: String(taskId) })

export const getSubTaskListUrl = (taskId: number): string =>
  generatePath(TaskEndpointsEnum.GetSubTaskList, { id: String(taskId) })

export const deleteSubTaskUrl = (taskId: number): string =>
  generatePath(TaskEndpointsEnum.DeleteSubTask, { id: String(taskId) })
