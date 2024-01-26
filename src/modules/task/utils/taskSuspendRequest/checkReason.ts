import { SuspendReasonEnum } from 'modules/task/constants/taskSuspendRequest'

export const suspendReasonValues = Object.values(SuspendReasonEnum)

export const checkReasonExist = (value: string): boolean =>
  suspendReasonValues.includes(value as SuspendReasonEnum)
