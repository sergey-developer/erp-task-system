import { generatePath } from 'react-router-dom'

import { TaskApiEnum } from 'modules/task/constants'

import { appendSlashAtEnd } from 'shared/utils/string'

export const getTaskUrl = (taskId: number): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.GetTask, { id: String(taskId) }))

export const resolveTaskUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.ResolveTask, { id: String(taskId) }),
  )

export const getTaskWorkPerformedActUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.GetWorkPerformedAct, { id: String(taskId) }),
  )

export const takeTaskUrl = (taskId: number): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.TakeTask, { id: String(taskId) }))

export const updateTaskWorkGroupUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.UpdateTaskWorkGroup, { id: String(taskId) }),
  )

export const deleteTaskWorkGroupUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.DeleteTaskWorkGroup, { id: String(taskId) }),
  )

export const updateTaskAssigneeUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.UpdateTaskAssignee, { id: String(taskId) }),
  )

export const createTaskCommentUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.CreateTaskComment, { id: String(taskId) }),
  )

export const getTaskCommentListUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.GetTaskCommentList, { id: String(taskId) }),
  )

export const createTaskReclassificationRequestUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.CreateReclassificationRequest, {
      id: String(taskId),
    }),
  )

export const getTaskReclassificationRequestUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.GetReclassificationRequest, {
      id: String(taskId),
    }),
  )

export const createTaskSuspendRequestUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.CreateTaskSuspendRequest, {
      id: String(taskId),
    }),
  )

export const deleteTaskSuspendRequestUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.DeleteTaskSuspendRequest, {
      id: String(taskId),
    }),
  )

export const getTaskJournalUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.GetTaskJournal, { id: String(taskId) }),
  )

export const getTaskJournalCsvUrl = (taskId: number): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.GetTaskJournalCsv, { id: String(taskId) }),
  )
