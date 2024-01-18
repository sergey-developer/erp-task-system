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
  ReassignmentSupportGroup = 'REASSIGNMENT_SUPPORT_GROUP',
  Other = 'OTHER',
}

export enum TaskJournalSourceEnum {
  X5 = 'X5',
  ITSM = 'ITSM',
}
