import { TaskEndpointsEnum } from '../constants/api'

export const getTaskUrl = (taskId: number): string =>
  TaskEndpointsEnum.Task.replace(':id', String(taskId))

export const getResolveTaskUrl = (taskId: number): string =>
  TaskEndpointsEnum.ResolveTask.replace(':id', String(taskId))

export const getTaskWorkGroupUrl = (taskId: number): string =>
  TaskEndpointsEnum.TaskWorkGroup.replace(':id', String(taskId))

export const getTaskAssigneeUrl = (taskId: number): string =>
  TaskEndpointsEnum.TaskAssignee.replace(':id', String(taskId))

export const getTaskCommentListUrl = (taskId: number): string =>
  TaskEndpointsEnum.TaskCommentList.replace(':id', String(taskId))

export const getCreateTaskReclassificationRequestUrl = (
  taskId: number,
): string =>
  TaskEndpointsEnum.CreateReclassificationRequest.replace(':id', String(taskId))

export const getTaskReclassificationRequestUrl = (taskId: number): string =>
  TaskEndpointsEnum.GetReclassificationRequest.replace(':id', String(taskId))

export const getTaskJournalUrl = (taskId: number): string =>
  TaskEndpointsEnum.TaskJournal.replace(':id', String(taskId))
