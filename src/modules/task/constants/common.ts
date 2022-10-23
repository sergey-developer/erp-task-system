export enum TaskStatusEnum {
  New = 'NEW',
  InProgress = 'IN_PROGRESS',
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
  Other = 'OTHER',
}

export enum TaskJournalSourceEnum {
  X5 = 'X5',
  ITSM = 'ITSM',
}

export enum TaskCommentTypeEnum {
  Common = 'COMMON',
  Awaiting = 'AWAITING',
  Reclassified = 'RECLASSIFIED',
  Completed = 'COMPLETED',
  System = 'SYSTEM',
}

export enum ReclassificationReasonEnum {
  WrongClassification = 'WRONG_CLASSIFICATION',
  WrongSupportGroup = 'WRONG_SUPPORT_GROUP',
  DivideTask = 'DIVIDE_TASK',
}

export enum ReclassificationRequestStatusEnum {
  Created = 'CREATED',
  Approved = 'APPROVED',
  Denied = 'DENIED',
  InProgress = 'IN_PROGRESS',
}

export enum TaskTypeEnum {
  Incident = 'INCIDENT',
  Request = 'REQUEST',
  IncidentTask = 'INCIDENT_TASK',
  RequestTask = 'REQUEST_TASK',
}
