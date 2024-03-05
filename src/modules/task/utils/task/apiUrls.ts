import { generatePath } from 'react-router-dom'

import { TaskApiEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'
import { appendSlashAtEnd } from 'shared/utils/string'

export const getTaskUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.GetTask, { id: String(taskId) }))

export const takeTaskUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.TakeTask, { id: String(taskId) }))

export const resolveTaskUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.ResolveTask, { id: String(taskId) }))

export const getTaskWorkPerformedActUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.GetWorkPerformedAct, { id: String(taskId) }))

export const getSubTaskListUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.GetSubTaskList, { id: String(taskId) }))

export const createSubTaskUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.CreateSubTask, { id: String(taskId) }))

export const getTaskCompletionDocumentsUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetTaskCompletionDocuments, { id: String(taskId) })

export const createInitiationReasonUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.CreateInitiationReason, { id: String(taskId) })

export const deleteInitiationReasonUrl = (id: IdType): string =>
  generateApiPath(TaskApiEnum.DeleteInitiationReason, { id: String(id) })

export const deleteCompletedWorkUrl = (id: IdType): string =>
  generateApiPath(TaskApiEnum.DeleteCompletedWork, { id: String(id) })
