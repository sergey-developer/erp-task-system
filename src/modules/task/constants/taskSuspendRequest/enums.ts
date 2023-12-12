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
