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
  EnteringBalances = 'ENTERING_BALANCES',
}
