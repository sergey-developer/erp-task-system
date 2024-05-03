import { InventorizationStatusEnum } from 'modules/warehouse/constants/inventorization'

export const checkInventorizationStatusIsNew = (status: InventorizationStatusEnum): boolean =>
  status === InventorizationStatusEnum.New

export const checkInventorizationStatusIsInProgress = (
  status: InventorizationStatusEnum,
): boolean => status === InventorizationStatusEnum.InProgress
