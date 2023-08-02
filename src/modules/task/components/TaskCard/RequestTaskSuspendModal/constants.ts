import { SuspendReasonEnum } from 'modules/task/constants'

export const reasonsMakeDateTimeFieldDisabled = [
  SuspendReasonEnum.AwaitingInformation,
  SuspendReasonEnum.AwaitingInitiator,
  SuspendReasonEnum.AwaitingInformationFromFirstLine,
]
