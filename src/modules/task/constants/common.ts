export enum TaskStatusEnum {
  New = 'NEW',
  Appointed = 'APPOINTED',
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
  Awaiting = 'AWAITING',
  InReclassification = 'IN_RECLASSIFICATION',
  Returned = 'RETURNED',
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
  InternalCommunication = 'INTERNAL_COMMUNICATION',
  ExternalCommunication = 'EXTERNAL_COMMUNICATION',
  Awaiting = 'AWAITING',
  StatusChange = 'STATUS_CHANGE',
  Reclassified = 'RECLASSIFIED',
  AssigneeChange = 'ASSIGNEE_CHANGE',
  TechMessage = 'TECH_MESSAGE',
  Job = 'JOB',
  Attachment = 'ATTACHMENT',
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

export enum ResolutionCodeEnum {
  Success = 'SUCCESS',
  WorkAround = 'WORK_AROUND',
  Canceled = 'CANCELED',
  Duplicate = 'DUPLICATE',
  Reclassified = 'RECLASSIFIED',
  NoResponse = 'NO_RESPONSE',
  NotResolved = 'NOT_RESOLVED',
  TemporaryResolution = 'TEMPORARY_RESOLUTION',
  PermanentResolution = 'PERMANENT_RESOLUTION',
}

export enum SuspendReasonEnum {
  AwaitingReleaseDate = 'AWAITING_RELEASE_DATE',
  ReturnToInitiator = 'RETURN_TO_INITIATOR',
  Guarantee = 'GUARANTEE',
  NoAnswer = 'NO_ANSWER',
  ByInitiatorDemand = 'BY_INITIATOR_DEMAND',
  NoFacilities = 'NO_FACILITIES',
  AwaitingConfirmation = 'AWAITING_CONFIRMATION',
  TransferToExternal = 'TRANSFER_TO_EXTERNAL',
  AwaitingByInitiatorAgreement = 'AWAITING_BY_INITIATOR_AGREEMENT',
  RequiredApproval = 'REQUIRED_APPROVAL',
  AwaitingStartTime = 'AWAITING_START_TIME',
  AwaitingInitiator = 'AWAITING_INITIATOR',
  AwaitingInformation = 'AWAITING_INFORMATION',
  AwaitingPurchase = 'AWAITING_PURCHASE',
  AwaitingRelease = 'AWAITING_RELEASE',
  AwaitingNonItWork = 'AWAITING_NON_IT_WORK',
  AwaitingInformationFromFirstLine = 'AWAITING_INFORMATION_FROM_FIRST_LINE',
}

export enum TaskAssignedEnum {
  Assigned = 'True',
  NotAssigned = 'False',
}

export enum TaskOverdueEnum {
  Overdue = 'True',
  NotOverdue = 'False',
}
