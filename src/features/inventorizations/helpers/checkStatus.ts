import { InventorizationStatusEnum } from '../api/constants'

export const checkInventorizationStatusIsNew = (status: InventorizationStatusEnum): boolean =>
  status === InventorizationStatusEnum.New

export const checkInventorizationStatusIsInProgress = (
  status: InventorizationStatusEnum,
): boolean => status === InventorizationStatusEnum.InProgress
