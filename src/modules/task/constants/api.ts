export enum TaskApiEnum {
  GetTask = '/tasks/:id/',
  ResolveTask = '/tasks/:id/resolution/',
  TakeTask = '/tasks/:id/execution/',
  GetWorkPerformedAct = '/tasks/:id/completion_certificate/',

  GetTaskList = '/tasks/',
  GetTaskListMap = '/tasks/map/',

  GetFiscalAccumulatorTaskList = '/fiscal-accumulator/',

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

export enum TaskApiTagEnum {
  Task = 'Task',
  TaskList = 'TaskList',
}

export enum TaskApiTriggerEnum {
  GetTaskList = 'getTaskList',
  GetTaskListMap = 'getTaskListMap',
  GetTaskCounters = 'getTaskCounters',
  GetFiscalAccumulatorTaskList = 'getFiscalAccumulatorTaskList',
  GetTask = 'getTask',
  GetWorkPerformedAct = 'getTaskWorkPerformedAct',
  ResolveTask = 'resolveTask',
  TakeTask = 'takeTask',
}

export enum TaskCommentApiTriggerEnum {
  CreateTaskComment = 'createTaskComment',
  GetTaskCommentList = 'getTaskCommentList',
}
