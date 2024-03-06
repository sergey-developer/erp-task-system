export enum TaskApiEnum {
  GetTask = '/tasks/:id/',
  ResolveTask = '/tasks/:id/resolution/',
  TakeTask = '/tasks/:id/execution/',
  GetWorkPerformedAct = '/tasks/:id/completion_certificate/',

  GetTaskCompletionDocuments = '/tasks/:id/completion-documents',

  GetTaskList = '/tasks/',
  GetTaskListMap = '/tasks/map/',

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

  GetSubTaskList = '/tasks/:id/subtasks/',
  CreateSubTask = '/tasks/:id/subtasks/',

  CreateInitiationReason = '/tasks/:id/initiation-reasons',
  DeleteInitiationReason = '/initiation-reasons/:id',

  CreateCompletedWork = '/tasks/:id/completed-works',
  DeleteCompletedWork = '/completed-works/:id',
}

export enum TaskApiTagEnum {
  Task = 'Task',
  TaskList = 'TaskList',
  TaskCounters = 'TaskCounters',
}

export enum TaskApiTriggerEnum {
  GetTaskList = 'getTaskList',
  GetTaskListMap = 'getTaskListMap',
  GetTaskCounters = 'getTaskCounters',
  GetTask = 'getTask',
  GetWorkPerformedAct = 'getTaskWorkPerformedAct',
  ResolveTask = 'resolveTask',
  TakeTask = 'takeTask',
  CreateTaskComment = 'createTaskComment',
  GetTaskCommentList = 'getTaskCommentList',
  GetSubTaskList = 'getSubTaskList',
  CreateSubTask = 'createSubTask',
}
