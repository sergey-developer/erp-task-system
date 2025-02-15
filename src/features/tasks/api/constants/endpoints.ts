// tasks
export enum TasksApiPathsEnum {
  GetTask = '/tasks/:id',
  ResolveTask = '/tasks/:id/resolution',
  TakeTask = '/tasks/:id/execution',
  UpdateTaskDescription = '/tasks/:id/description',
  UpdateTaskDeadline = '/tasks/:id/internal-deadline',
  GetWorkPerformedAct = '/tasks/:id/completion_certificate',

  CreateTaskCompletionDocuments = '/tasks/:id/completion-documents',
  GetTaskCompletionDocuments = '/tasks/:id/completion-documents',

  CreateTask = '/tasks/',
  GetTasks = '/tasks/',
  GetTasksMap = '/tasks/map/',

  GetTaskCounters = '/tasks/counters/',

  UpdateTaskWorkGroup = '/tasks/:id/work-group',
  DeleteTaskWorkGroup = '/tasks/:id/work-group',

  UpdateTaskAssignee = '/tasks/:id/assignee',

  CreateTaskAttachment = '/tasks/:id/attachments',

  CreateTaskComment = '/tasks/:id/comments',
  GetTaskCommentList = '/tasks/:id/comments',

  CreateReclassificationRequest = '/tasks/:id/reclassification-requests',
  GetReclassificationRequest = '/tasks/:id/reclassification-request',

  CreateTaskSuspendRequest = '/tasks/:id/suspend-request',
  DeleteTaskSuspendRequest = '/tasks/:id/suspend-request',

  GetTaskJournal = '/tasks/:id/journal',
  GetTaskJournalCsv = '/tasks/:id/journal/csv',

  GetSubTasks = '/tasks/:id/subtasks',
  CreateSubTask = '/tasks/:id/subtasks',

  CreateInitiationReason = '/tasks/:id/initiation-reasons',
  DeleteInitiationReason = '/initiation-reasons/:id',

  CreateCompletedWork = '/tasks/:id/completed-works',
  DeleteCompletedWork = '/completed-works/:id',

  CreateTaskRegistrationFNRequest = '/tasks/:id/fa-registrations',
  GetTaskRegistrationRequestRecipientsFN = '/tasks/:id/fa-notice-recipients',

  ClassifyTaskWorkType = '/tasks/:id/work-type',
}

export enum TasksEndpointsTagsEnum {
  Task = 'Task',
  Tasks = 'Tasks',
  TaskCounters = 'TaskCounters',
}

export enum TasksEndpointsNamesEnum {
  GetTasks = 'getTasks',
  GetTasksMap = 'getTasksMap',
  GetTaskCounters = 'getTaskCounters',
  GetTask = 'getTask',
  GetWorkPerformedAct = 'getTaskWorkPerformedAct',
  ResolveTask = 'resolveTask',
  TakeTask = 'takeTask',
  CreateTaskComment = 'createTaskComment',
  GetTaskCommentList = 'getTaskComments',
  GetSubTasks = 'getSubTasks',
  CreateSubTask = 'createSubTask',
}

// sub tasks
export enum SubTasksApiPathsEnum {
  CancelSubTask = '/subtasks/:id/cancel',
  ReworkSubTask = '/subtasks/:id/rework',
}

export enum SubTasksEndpointsNamesEnum {
  CancelSubTask = 'cancelSubTask',
  ReworkSubTask = 'reworkSubTask',
}
