import { SuspendReasonEnum } from 'modules/task/constants/taskSuspendRequest'

export const reasonsMakeDateTimeFieldDisabled: ReadonlyArray<SuspendReasonEnum> = [
  SuspendReasonEnum.AwaitingInformation,
  SuspendReasonEnum.AwaitingInitiator,
  SuspendReasonEnum.AwaitingInformationFromFirstLine,
]
