export enum TaskApiEnum {
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
  GetTaskListMap = '/tasks/map/',

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

  GetSubTaskList = '/tasks/:id/subtasks',
  CreateSubTask = '/tasks/:id/subtasks',

  CreateInitiationReason = '/tasks/:id/initiation-reasons',
  DeleteInitiationReason = '/initiation-reasons/:id',

  CreateCompletedWork = '/tasks/:id/completed-works',
  DeleteCompletedWork = '/completed-works/:id',

  CreateTaskRegistrationFNRequest = '/tasks/:id/fa-registrations',
  GetTaskRegistrationRequestRecipientsFN = '/tasks/:id/fa-notice-recipients',

  ClassifyTaskWorkType = '/tasks/:id/work-type',
}

export enum TaskApiTagEnum {
  Task = 'Task',
  Tasks = 'Tasks',
  TaskCounters = 'TaskCounters',
}

export enum TaskApiTriggerEnum {
  GetTasks = 'getTasks',
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
