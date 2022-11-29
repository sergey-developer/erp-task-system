export enum TaskEndpointsEnum {
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
  GetSubTaskTemplateList = '/catalogs/templates',
}

export enum TaskEndpointsTagsEnum {
  Task = 'Task',
  TaskList = 'TaskList',
}
