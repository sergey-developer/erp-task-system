import { SuspendReasonEnum } from 'features/task/constants/taskSuspendRequest'

import { SystemSettingsDTO } from 'shared/system/api/dto/systemSettings'

import { fakeInteger } from '_tests_/utils'

export const settings = (): SystemSettingsDTO => ({
  suspendReasons: {
    [SuspendReasonEnum.AwaitingInformation]: {
      editable: true,
      limit: fakeInteger({ min: 1, max: 20 }),
    },
    [SuspendReasonEnum.AwaitingInitiator]: {
      editable: true,
      limit: fakeInteger({ min: 1, max: 20 }),
    },
    [SuspendReasonEnum.AwaitingNonItWork]: {
      editable: true,
      limit: fakeInteger({ min: 1, max: 20 }),
    },
    [SuspendReasonEnum.AwaitingRelease]: {
      editable: true,
      limit: fakeInteger({ min: 1, max: 20 }),
    },
    [SuspendReasonEnum.AwaitingPurchase]: {
      editable: true,
      limit: fakeInteger({ min: 1, max: 20 }),
    },
    [SuspendReasonEnum.AwaitingInformationFromFirstLine]: {
      editable: true,
      limit: fakeInteger({ min: 1, max: 20 }),
    },
  },
})
