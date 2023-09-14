import { SuspendReasonEnum } from 'modules/task/constants/taskSuspendRequest'

export const reasonsMakeDateTimeFieldDisabled = [
  SuspendReasonEnum.AwaitingInformation,
  SuspendReasonEnum.AwaitingInitiator,
  SuspendReasonEnum.AwaitingInformationFromFirstLine,
]
