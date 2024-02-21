export enum RelocationTaskStatusEnum {
  New = 'NEW',
  Completed = 'COMPLETED',
  Returned = 'RETURNED',
  Closed = 'CLOSED',
  Canceled = 'CANCELED',
}

export enum RelocationTaskTypeEnum {
  Relocation = 'RELOCATION',
  Repair = 'REPAIR',
  Warranty = 'WARRANTY',
  WriteOff = 'WRITE_OFF',
  Customer = 'CUSTOMER',
}

export enum ExternalRelocationStatusEnum {
  InTransit = 'IN_TRANSIT',
  ToApprovalSsi = 'TO_APPROVAL_SSI',
  ToApprovalVsi = 'TO_APPROVAL_VSI',
  ToApprovalMrp = 'TO_APPROVAL_MRP',
  Closed = 'CLOSED',
  Reversed = 'REVERSED',
}
