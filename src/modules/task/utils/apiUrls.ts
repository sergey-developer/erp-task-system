import { generatePath } from 'react-router-dom'

import { TaskApiEnum } from 'modules/task/services/taskApiService'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const getTaskUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.GetTask, { id: String(taskId) }))

export const resolveTaskUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.ResolveTask, { id: String(taskId) }))

export const getTaskWorkPerformedActUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.GetWorkPerformedAct, { id: String(taskId) }))

export const takeTaskUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.TakeTask, { id: String(taskId) }))

export const updateTaskWorkGroupUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.UpdateTaskWorkGroup, { id: String(taskId) }))

export const deleteTaskWorkGroupUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.DeleteTaskWorkGroup, { id: String(taskId) }))

export const updateTaskAssigneeUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.UpdateTaskAssignee, { id: String(taskId) }))

export const createTaskCommentUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.CreateTaskComment, { id: String(taskId) }))

export const getTaskCommentListUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.GetTaskCommentList, { id: String(taskId) }))

export const createTaskReclassificationRequestUrl = (taskId: IdType): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.CreateReclassificationRequest, {
      id: String(taskId),
    }),
  )

export const getTaskReclassificationRequestUrl = (taskId: IdType): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.GetReclassificationRequest, {
      id: String(taskId),
    }),
  )

export const createTaskSuspendRequestUrl = (taskId: IdType): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.CreateTaskSuspendRequest, {
      id: String(taskId),
    }),
  )

export const deleteTaskSuspendRequestUrl = (taskId: IdType): string =>
  appendSlashAtEnd(
    generatePath(TaskApiEnum.DeleteTaskSuspendRequest, {
      id: String(taskId),
    }),
  )

export const getTaskJournalUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.GetTaskJournal, { id: String(taskId) }))

export const getTaskJournalCsvUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.GetTaskJournalCsv, { id: String(taskId) }))
