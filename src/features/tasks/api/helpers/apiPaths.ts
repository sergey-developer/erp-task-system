import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

import { SubTasksApiPathsEnum, TasksApiPathsEnum } from '../constants'
import { RequestWithTask } from '../types'

export const makeGetTaskApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.GetTask, { id: String(taskId) })

export const makeTakeTaskApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.TakeTask, { id: String(taskId) })

export const makeUpdateTaskDescriptionApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.UpdateTaskDescription, { id: String(taskId) })

export const makeUpdateTaskDeadlineApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.UpdateTaskDeadline, { id: String(taskId) })

export const makeResolveTaskApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.ResolveTask, { id: String(taskId) })

export const makeGetTaskWorkPerformedActApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.GetWorkPerformedAct, { id: String(taskId) })

export const makeGetSubTasksApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.GetSubTasks, { id: String(taskId) })

export const makeCreateSubTaskApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.CreateSubTask, { id: String(taskId) })

export const makeGetTaskCompletionDocumentsApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.GetTaskCompletionDocuments, { id: String(taskId) })

export const makeCreateTaskCompletionDocumentsApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.CreateTaskCompletionDocuments, { id: String(taskId) })

export const makeCreateTaskInitiationReasonApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.CreateInitiationReason, { id: String(taskId) })

export const makeDeleteTaskInitiationReasonApiPath = (id: IdType): string =>
  generateApiPath(TasksApiPathsEnum.DeleteInitiationReason, { id: String(id) })

export const makeDeleteTaskCompletedWorkApiPath = (id: IdType): string =>
  generateApiPath(TasksApiPathsEnum.DeleteCompletedWork, { id: String(id) })

export const makeCreateTaskCompletedWorkApiPath = (id: IdType): string =>
  generateApiPath(TasksApiPathsEnum.CreateCompletedWork, { id: String(id) })

export const makeCreateTaskRegistrationFNRequestApiPath = (id: IdType): string =>
  generateApiPath(TasksApiPathsEnum.CreateTaskRegistrationFNRequest, { id: String(id) })

export const makeGetTaskRegistrationRequestRecipientsFNApiPath = (id: IdType): string =>
  generateApiPath(TasksApiPathsEnum.GetTaskRegistrationRequestRecipientsFN, { id: String(id) })

export const makeCreateTaskAttachmentApiPath = (id: IdType): string =>
  generateApiPath(TasksApiPathsEnum.CreateTaskAttachment, { id: String(id) })

export const makeClassifyTaskWorkTypeApiPath = ({ taskId }: RequestWithTask): string =>
  generateApiPath(TasksApiPathsEnum.ClassifyTaskWorkType, { id: String(taskId) })

export const makeUpdateTaskAssigneeApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.UpdateTaskAssignee, { id: String(taskId) })

export const makeCreateTaskCommentApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.CreateTaskComment, { id: String(taskId) })

export const makeGetTaskCommentListApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.GetTaskCommentList, { id: String(taskId) })

export const makeGetTaskJournalApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.GetTaskJournal, { id: String(taskId) })

export const makeGetTaskJournalCsvApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.GetTaskJournalCsv, { id: String(taskId) })

export const makeCreateTaskReclassificationRequestApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.CreateReclassificationRequest, { id: String(taskId) })

export const makeGetTaskReclassificationRequestApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.GetReclassificationRequest, { id: String(taskId) })

export const makeCreateTaskSuspendRequestApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.CreateTaskSuspendRequest, { id: String(taskId) })

export const makeDeleteTaskSuspendRequestApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.DeleteTaskSuspendRequest, { id: String(taskId) })

export const makeUpdateTaskWorkGroupApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.UpdateTaskWorkGroup, { id: String(taskId) })

export const makeDeleteTaskWorkGroupApiPath = (taskId: IdType): string =>
  generateApiPath(TasksApiPathsEnum.DeleteTaskWorkGroup, { id: String(taskId) })

export const makeCancelSubTaskApiPath = (subTaskId: IdType): string =>
  generateApiPath(SubTasksApiPathsEnum.CancelSubTask, { id: String(subTaskId) })

export const makeReworkSubTaskApiPath = (subTaskId: IdType): string =>
  generateApiPath(SubTasksApiPathsEnum.ReworkSubTask, { id: String(subTaskId) })
