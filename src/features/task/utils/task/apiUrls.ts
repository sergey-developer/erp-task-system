import { TaskApiEnum } from 'features/task/constants/task'
import { TaskRequestArgs } from 'features/task/types'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const getTaskUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetTask, { id: String(taskId) })

export const takeTaskUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.TakeTask, { id: String(taskId) })

export const updateTaskDescriptionUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.UpdateTaskDescription, { id: String(taskId) })

export const updateTaskDeadlineUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.UpdateTaskDeadline, { id: String(taskId) })

export const resolveTaskUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.ResolveTask, { id: String(taskId) })

export const getTaskWorkPerformedActUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetWorkPerformedAct, { id: String(taskId) })

export const getSubTaskListUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetSubTaskList, { id: String(taskId) })

export const createSubTaskUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.CreateSubTask, { id: String(taskId) })

export const getTaskCompletionDocumentsUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetTaskCompletionDocuments, { id: String(taskId) })

export const createTaskCompletionDocumentsUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.CreateTaskCompletionDocuments, { id: String(taskId) })

export const createInitiationReasonUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.CreateInitiationReason, { id: String(taskId) })

export const deleteInitiationReasonUrl = (id: IdType): string =>
  generateApiPath(TaskApiEnum.DeleteInitiationReason, { id: String(id) })

export const deleteCompletedWorkUrl = (id: IdType): string =>
  generateApiPath(TaskApiEnum.DeleteCompletedWork, { id: String(id) })

export const createCompletedWorkUrl = (id: IdType): string =>
  generateApiPath(TaskApiEnum.CreateCompletedWork, { id: String(id) })

export const createTaskRegistrationFNRequestUrl = (id: IdType): string =>
  generateApiPath(TaskApiEnum.CreateTaskRegistrationFNRequest, { id: String(id) })

export const getTaskRegistrationRequestRecipientsFNUrl = (id: IdType): string =>
  generateApiPath(TaskApiEnum.GetTaskRegistrationRequestRecipientsFN, { id: String(id) })

export const createTaskAttachmentUrl = (id: IdType): string =>
  generateApiPath(TaskApiEnum.CreateTaskAttachment, { id: String(id) })

export const makeClassifyTaskWorkTypeUrl = ({ taskId }: TaskRequestArgs): string =>
  generateApiPath(TaskApiEnum.ClassifyTaskWorkType, { id: String(taskId) })
