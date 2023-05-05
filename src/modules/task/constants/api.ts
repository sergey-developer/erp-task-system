export enum TaskEndpointEnum {
  GetTask = '/tasks/:id',
  ResolveTask = '/tasks/:id/resolution/',
  TakeTask = '/tasks/:id/execution/',

  GetTaskList = '/tasks/',

  GetTaskCounters = '/tasks/counters/',

  UpdateTaskWorkGroup = '/tasks/:id/work-group/',
  DeleteTaskWorkGroup = '/tasks/:id/work-group/',

  UpdateTaskAssignee = '/tasks/:id/assignee/',

  CreateTaskComment = '/tasks/:id/comments/',
  GetTaskCommentList = '/tasks/:id/comments/',

  CreateReclassificationRequest = '/tasks/:id/reclassification-requests/',
  GetReclassificationRequest = '/tasks/:id/reclassification-request/',

  CreateTaskSuspendRequest = '/tasks/:id/suspend_request/',
  DeleteTaskSuspendRequest = '/tasks/:id/suspend-request/',

  GetTaskJournal = '/tasks/:id/journal/',
  GetTaskJournalCsv = '/tasks/:id/journal/csv/',
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
