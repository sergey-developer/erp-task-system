export enum FastFilterEnum {
  All = 'ALL',
  Free = 'FREE',
  Mine = 'MINE',
  Overdue = 'OVERDUE',
}

export enum TaskStatusEnum {
  Appointed = 'APPOINTED',
  Awaiting = 'AWAITING',
  Closed = 'CLOSED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  InReclassification = 'IN_RECLASSIFICATION',
  New = 'NEW',
  Reclassified = 'RECLASSIFIED',
}

export enum SmartSortEnum {
  ByCreatedDateAsc = 'BY_CREATED_DATE_ASC',
  ByCreatedDateDesc = 'BY_CREATED_DATE_DESC',
  ByOlaAsc = 'BY_OLA_ASC',
  ByOlaDesc = 'BY_OLA_DESC',
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

export enum CommentTypeEnum {
  Common = 'COMMON',
  Awaiting = 'AWAITING',
  Reclassified = 'RECLASSIFIED',
  Completed = 'COMPLETED',
  System = 'SYSTEM',
}

export enum ResolutionCodeEnum {
  Success = 'SUCCESS',
  WorkAround = 'WORK_AROUND',
  Canceled = 'CANCELED',
  Duplicate = 'DUBLICATE',
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
  AwaitingConfimation = 'AWAITING_CONFIMATION',
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

export const taskStatusDictionary: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.Appointed]: 'В ожидании',
  [TaskStatusEnum.Awaiting]: 'В ожидании (Awaiting?)',
  [TaskStatusEnum.Closed]: 'Возврат с II линии',
  [TaskStatusEnum.Completed]: 'Выполнено',
  [TaskStatusEnum.InProgress]: 'В работе',
  [TaskStatusEnum.InReclassification]:
    'На переклассификации (InReclassification?)',
  [TaskStatusEnum.New]: 'Ожидает выполнения',
  [TaskStatusEnum.Reclassified]: 'На переклассификации',
}
