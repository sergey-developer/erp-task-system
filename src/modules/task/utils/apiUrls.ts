import { generatePath } from 'react-router-dom'

import { TaskEndpointEnum } from 'modules/task/constants'

import { appendSlashAtEnd } from 'shared/utils/string'

export const getTaskUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskEndpointEnum.GetTask, { id: String(taskId) }),
  )

export const resolveTaskUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskEndpointEnum.ResolveTask, { id: String(taskId) }),
  )

export const getTaskWorkPerformedActUrl = (taskId: number): string =>
  generatePath(TaskEndpointEnum.GetWorkPerformedAct, { id: String(taskId) })

export const takeTaskUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskEndpointEnum.TakeTask, { id: String(taskId) }),
  )

export const updateTaskWorkGroupUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskEndpointEnum.UpdateTaskWorkGroup, { id: String(taskId) }),
  )

export const deleteTaskWorkGroupUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskEndpointEnum.DeleteTaskWorkGroup, { id: String(taskId) }),
  )

export const updateTaskAssigneeUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskEndpointEnum.UpdateTaskAssignee, { id: String(taskId) }),
  )

export const createTaskCommentUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskEndpointEnum.CreateTaskComment, { id: String(taskId) }),
  )

export const getTaskCommentListUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskEndpointEnum.GetTaskCommentList, { id: String(taskId) }),
  )

export const createTaskReclassificationRequestUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskEndpointEnum.CreateReclassificationRequest, {
      id: String(taskId),
    }),
  )

export const getTaskReclassificationRequestUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskEndpointEnum.GetReclassificationRequest, {
      id: String(taskId),
    }),
  )

export const createTaskSuspendRequestUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskEndpointEnum.CreateTaskSuspendRequest, {
      id: String(taskId),
    }),
  )

export const deleteTaskSuspendRequestUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskEndpointEnum.DeleteTaskSuspendRequest, {
      id: String(taskId),
    }),
  )

export const getTaskJournalUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskEndpointEnum.GetTaskJournal, { id: String(taskId) }),
  )

export const getTaskJournalCsvUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskEndpointEnum.GetTaskJournalCsv, { id: String(taskId) }),
  )
