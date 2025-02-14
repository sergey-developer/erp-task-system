import { TaskApiEnum } from 'features/task/constants/task'
import { RequestWithTask } from 'features/task/types'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const getTaskApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetTask, { id: String(taskId) })

export const takeTaskApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.TakeTask, { id: String(taskId) })

export const updateTaskDescriptionApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.UpdateTaskDescription, { id: String(taskId) })

export const updateTaskDeadlineApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.UpdateTaskDeadline, { id: String(taskId) })

export const resolveTaskApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.ResolveTask, { id: String(taskId) })

export const getTaskWorkPerformedActApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetWorkPerformedAct, { id: String(taskId) })

export const getSubTaskListApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetSubTaskList, { id: String(taskId) })

export const createSubTaskApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.CreateSubTask, { id: String(taskId) })

export const getTaskCompletionDocumentsApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetTaskCompletionDocuments, { id: String(taskId) })

export const createTaskCompletionDocumentsApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.CreateTaskCompletionDocuments, { id: String(taskId) })

export const createInitiationReasonApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.CreateInitiationReason, { id: String(taskId) })

export const deleteInitiationReasonApiPath = (id: IdType): string =>
  generateApiPath(TaskApiEnum.DeleteInitiationReason, { id: String(id) })

export const deleteCompletedWorkApiPath = (id: IdType): string =>
  generateApiPath(TaskApiEnum.DeleteCompletedWork, { id: String(id) })

export const createCompletedWorkApiPath = (id: IdType): string =>
  generateApiPath(TaskApiEnum.CreateCompletedWork, { id: String(id) })

export const createTaskRegistrationFNRequestApiPath = (id: IdType): string =>
  generateApiPath(TaskApiEnum.CreateTaskRegistrationFNRequest, { id: String(id) })

export const getTaskRegistrationRequestRecipientsFNApiPath = (id: IdType): string =>
  generateApiPath(TaskApiEnum.GetTaskRegistrationRequestRecipientsFN, { id: String(id) })

export const createTaskAttachmentApiPath = (id: IdType): string =>
  generateApiPath(TaskApiEnum.CreateTaskAttachment, { id: String(id) })

export const makeClassifyTaskWorkTypeApiPath = ({ taskId }: RequestWithTask): string =>
  generateApiPath(TaskApiEnum.ClassifyTaskWorkType, { id: String(taskId) })
