export enum TasksFastFilterEnum {
  AllLines = 'ALL_LINES',
  FirstLine = 'FIRST_LINE',
  SecondLine = 'SECOND_LINE',
  Free = 'FREE',
  Mine = 'MINE',
  Overdue = 'OVERDUE',
  LessOneHour = 'LESS_1_HOUR',
  LessThreeHours = 'LESS_3_HOURS',
  Returned = 'RETURNED',
  ReclassificationDenied = 'RECLASSIFICATION_DENIED',
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

export enum TaskAttachmentTypeEnum {
  Description = 'DESCRIPTION',
  Resolution = 'RESOLUTION',
  Comment = 'COMMENT',
  Journal = 'JOURNAL',
  Interaction = 'INTERACTION',
}

export enum TaskActionsPermissionsEnum {
  CanRead = 'CAN_READ',
  CanPutOnFirstLine = 'CAN_PUT_ON_FIRST_LINE',
  CanReclassificationRequestsCreate = 'CAN_RECLASSIFICATION_REQUESTS_CREATE',
  CanSuspendRequestsCreate = 'CAN_SUSPEND_REQUESTS_CREATE',
  CanExecute = 'CAN_EXECUTE',
  CanResolve = 'CAN_RESOLVE',
  CanAssignee = 'CAN_ASSIGNEE',
  CanSelfAssignee = 'CAN_SELF_ASSIGNEE',
  CanSubtasksCreate = 'CAN_SUBTASKS_CREATE',
  CanPutOnSecondLine = 'CAN_PUT_ON_SECOND_LINE',
}

export enum TaskJournalTypeEnum {
  StatusChange = 'STATUS_CHANGE',
  AssigneeChange = 'ASSIGNEE_CHANGE',
  TechMessage = 'TECH_MESSAGE',
  SubtaskCreated = 'SUBTASK_CREATED',
  Returned = 'RETURNED',
  Job = 'JOB',
  AttachmentDeleted = 'ATTACHMENT_DELETED',
  InternalCommunication = 'INTERNAL_COMMUNICATION',
  ExternalCommunication = 'EXTERNAL_COMMUNICATION',
  ReclassificationCreated = 'RECLASSIFICATION_CREATED',
  ReclassificationApproved = 'RECLASSIFICATION_APPROVED',
  ReclassificationRejected = 'RECLASSIFICATION_REJECTED',
  ReclassificationCancelled = 'RECLASSIFICATION_CANCELLED',
  Awaiting = 'AWAITING',
  AwaitingCreated = 'AWAITING_CREATED',
  AwaitingApproved = 'AWAITING_APPROVED',
  AwaitingRejected = 'AWAITING_REJECTED',
  FirstLineReturned = 'FIRST_LINE_RETURNED',
  AwaitingCanceled = 'AWAITING_CANCELED',
  AutoEscalation = 'AUTO_ESCALATION',
  ReassignmentSupportGroup = 'REASSIGNMENT_SUPPORT_GROUP',
  FiscalAccumulatorRegistered = 'FISCAL_ACCUMULATOR_REGISTERED',
  FiscalAccumulatorChangeRequest = 'FISCAL_ACCUMULATOR_CHANGE_REQUEST',
  FiscalAccumulatorChangeNotification = 'FISCAL_ACCUMULATOR_CHANGE_NOTIFICATION',
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

export enum ExternalResponsibleCompanyEnum {
  BusinessDepartmentX5 = 'BUSINESS_DEPARTMENT_X5',
  OutsideOrganization = 'OUTSIDE_ORGANIZATION',
}
