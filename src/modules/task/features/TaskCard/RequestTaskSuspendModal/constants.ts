import { SuspendReasonEnum } from 'modules/task/constants/common'

export const reasonsMakeDateTimeFieldDisabled = [
  SuspendReasonEnum.AwaitingInformation,
  SuspendReasonEnum.AwaitingInitiator,
  SuspendReasonEnum.AwaitingInformationFromFirstLine,
]
