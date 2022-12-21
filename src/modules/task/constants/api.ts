//todo: разделить урлы (для создания, получения списка) чтобы они не повторялись
export enum TaskEndpointEnum {
  TaskList = '/tasks',
  TaskCounters = '/tasks/counters',
  Task = '/tasks/:id',
  ResolveTask = '/tasks/:id/resolution/',
  TakeTask = '/tasks/:id/execution/',
  TaskWorkGroup = '/tasks/:id/work-group/',
  TaskAssignee = '/tasks/:id/assignee/',
  TaskComment = '/tasks/:id/comments/',
  CreateReclassificationRequest = '/tasks/:id/reclassification-requests/',
  GetReclassificationRequest = '/tasks/:id/reclassification-request/',
  TaskJournal = '/tasks/:id/journal/',
  TaskJournalCsv = '/tasks/:id/journal/csv/',
}

export enum TaskEndpointTagEnum {
  Task = 'Task',
  TaskList = 'TaskList',
}

export enum TaskEndpointNameEnum {
  GetTaskList = 'getTaskList',
  GetTaskCounters = 'getTaskCounters',
  GetTask = 'getTask',
  ResolveTask = 'resolveTask',
  TakeTask = 'takeTask',
}

export enum TaskCommentEndpointNameEnum {
  CreateTaskComment = 'createTaskComment',
  GetTaskCommentList = 'getTaskCommentList',
}
