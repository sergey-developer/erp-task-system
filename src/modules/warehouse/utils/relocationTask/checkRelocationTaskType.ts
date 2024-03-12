import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'

export const checkRelocationTaskTypeIsWriteOff = (type?: RelocationTaskTypeEnum): boolean =>
  type === RelocationTaskTypeEnum.WriteOff

export const checkRelocationTaskTypeIsWarranty = (type?: RelocationTaskTypeEnum): boolean =>
  type === RelocationTaskTypeEnum.Warranty

export const checkRelocationTaskTypeIsCustomer = (type?: RelocationTaskTypeEnum): boolean =>
  type === RelocationTaskTypeEnum.Customer

export const checkRelocationTaskTypeIsEnteringBalances = (type?: RelocationTaskTypeEnum): boolean =>
  type === RelocationTaskTypeEnum.EnteringBalances
