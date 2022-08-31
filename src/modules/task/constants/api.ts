export enum TaskEndpointsEnum {
  TaskList = '/tasks',
  TaskCounters = '/tasks/counters',
  Task = '/tasks/:id',
  ResolveTask = '/tasks/:id/resolution/',
  TaskWorkGroup = '/tasks/:id/work-group/',
  TaskAssignee = '/tasks/:id/assignee/',
  TaskCommentList = '/tasks/:id/comments',
  CreateReclassificationRequest = '/tasks/:id/reclassification-requests/',
  GetReclassificationRequest = '/tasks/:id/reclassification-request/',
  TaskJournal = '/tasks/:id/journal/',
}

export enum TaskEndpointsTagsEnum {
  Task = 'Task',
  TaskList = 'TaskList',
  TaskReclassificationRequest = 'TaskReclassificationRequest',
}
