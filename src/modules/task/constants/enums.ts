export enum FastFilterEnum {
  All = 'ALL',
  Free = 'FREE',
  Mine = 'MINE',
  Overdue = 'OVERDUE',
  FirstLine = 'FIRST_LINE',
  SecondLine = 'SECOND_LINE',
  LessOneHour = 'LESS_1_HOUR',
  LessThreeHours = 'LESS_3_HOURS',
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

export enum TaskJournalTypeEnum {
  StatusChange = 'STATUS_CHANGE',
  AssigneeChange = 'ASSIGNEE_CHANGE',
  TechMessage = 'TECH_MESSAGE',
  Returned = 'RETURNED',
  Job = 'JOB',
  Attachment = 'ATTACHMENT',
  InternalCommunication = 'INTERNAL_COMMUNICATION',
  ExternalCommunication = 'EXTERNAL_COMMUNICATION',
  ReclassificationCreated = 'RECLASSIFICATION_CREATED',
  ReclassificationApproved = 'RECLASSIFICATION_APPROVED',
  ReclassificationRejected = 'RECLASSIFICATION_REJECTED',
  ReclassificationCancelled = 'RECLASSIFICATION_CANCELLED',
  AwaitingCreated = 'AWAITING_CREATED',
  AwaitingApproved = 'AWAITING_APPROVED',
  AwaitingRejected = 'AWAITING_REJECTED',
  FirstLineReturned = 'FIRST_LINE_RETURNED',
  AwaitingCanceled = 'AWAITING_CANCELED',
  AutoEscalation = 'AUTO_ESCALATION',
  Other = 'OTHER',
}

export enum TaskJournalSourceEnum {
  X5 = 'X5',
  ITSM = 'ITSM',
}

export enum ReclassificationReasonEnum {
  WrongClassification = 'WRONG_CLASSIFICATION',
  WrongSupportGroup = 'WRONG_SUPPORT_GROUP',
  DivideTask = 'DIVIDE_TASK',
}

export enum TaskTypeEnum {
  Incident = 'INCIDENT',
  Request = 'REQUEST',
  IncidentTask = 'INCIDENT_TASK',
  RequestTask = 'REQUEST_TASK',
}

export enum SuspendReasonEnum {
  AwaitingInformation = 'AWAITING_INFORMATION',
  AwaitingInformationFromFirstLine = 'AWAITING_INFORMATION_FROM_FIRST_LINE',
  AwaitingInitiator = 'AWAITING_INITIATOR',
  AwaitingPurchase = 'AWAITING_PURCHASE',
  AwaitingRelease = 'AWAITING_RELEASE',
  AwaitingNonItWork = 'AWAITING_NON_IT_WORK',
}

export enum SuspendRequestStatusEnum {
  New = 'NEW',
  InProgress = 'IN_PROGRESS',
  Approved = 'APPROVED',
  Denied = 'DENIED',
  Canceled = 'CANCELED',
}

export enum FiscalAccumulatorFormatEnum {
  Dubbed = 'DUBBED',
  OutOfMemoryLess7 = 'OUT_OF_MEMORY_LESS_7',
  OutOfMemoryLess15 = 'DATE_EXPIRES_LESS_15',
  OutOfMemoryLess21 = 'DATE_EXPIRES_LESS_21',
}

export enum TaskAssignedEnum {
  Assigned = 'True',
  NotAssigned = 'False',
}

export enum TaskOverdueEnum {
  Overdue = 'True',
  NotOverdue = 'False',
}
