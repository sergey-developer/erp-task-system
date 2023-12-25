export enum FastFilterEnum {
  All = 'ALL',
  Free = 'FREE',
  Mine = 'MINE',
  Overdue = 'OVERDUE',
  FirstLine = 'FIRST_LINE',
  SecondLine = 'SECOND_LINE',
  LessOneHour = 'LESS_1_HOUR',
  LessThreeHours = 'LESS_3_HOURS',
  Returned = 'RETURNED',
  ReclassificationDenied = 'RECLASSIFICATION_DENIED',
}

export enum FilterTypeEnum {
  Fast = 'Fast',
  Extended = 'Extended',
  Search = 'Search',
}

export enum TaskStatusEnum {
  New = 'NEW',
  InProgress = 'IN_PROGRESS',
  Awaiting = 'AWAITING',
  Completed = 'COMPLETED',
  Closed = 'CLOSED',
}

export enum TaskExtendedStatusEnum {
  New = 'NEW',
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
  Awaiting = 'AWAITING',
  InReclassification = 'IN_RECLASSIFICATION',
  Returned = 'RETURNED',
  Closed = 'CLOSED',
  FirstLineReturned = 'FIRST_LINE_RETURNED',
}

export enum TaskOlaStatusEnum {
  Expired = 'EXPIRED',
  HalfExpired = 'HALF_EXPIRED',
  NotExpired = 'NOT_EXPIRED',
}

export enum TaskTypeEnum {
  Incident = 'INCIDENT',
  Request = 'REQUEST',
  IncidentTask = 'INCIDENT_TASK',
  RequestTask = 'REQUEST_TASK',
}

export enum TaskAssignedEnum {
  Assigned = 'True',
  NotAssigned = 'False',
}

export enum TaskOverdueEnum {
  Overdue = 'True',
  NotOverdue = 'False',
}

export enum TaskDetailsTabsEnum {
  SubTaskList = 'SubTaskList',
  CommentList = 'CommentList',
  Resolution = 'Resolution',
  Description = 'Description',
  Journal = 'Journal',
  RelocationTaskList = 'RelocationTaskList',
}

export enum TaskStorageKeysEnum {
  TasksFilters = 'tasks/filters',
}
