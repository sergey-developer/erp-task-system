import { generatePath } from 'react-router-dom'

import { TaskEndpointEnum } from 'modules/task/constants/api'

//todo: поправить названия
export const getTaskUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.Task, { id: String(taskId) })

export const getResolveTaskUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.ResolveTask, { id: String(taskId) })

export const getTakeTaskUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.TakeTask, { id: String(taskId) })

export const getTaskWorkGroupUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.TaskWorkGroup, { id: String(taskId) })

export const getTaskAssigneeUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.TaskAssignee, { id: String(taskId) })

export const getTaskCommentUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.TaskComment, { id: String(taskId) })

export const getCreateTaskReclassificationRequestUrl = (
  taskId: number,
): string =>
  generatePath(TaskEndpointEnum.CreateReclassificationRequest, {
    id: String(taskId),
  })

export const getTaskReclassificationRequestUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.GetReclassificationRequest, {
    id: String(taskId),
  })

export const getTaskJournalUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.TaskJournal, { id: String(taskId) })

export const getTaskJournalCsvUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.TaskJournalCsv, { id: String(taskId) })
