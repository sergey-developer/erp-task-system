import { SuspendReasonEnum } from 'modules/task/constants/taskSuspendRequest'

export type SystemSettingsModel = {
  suspendReasons: Record<
    SuspendReasonEnum,
    {
      limit: number
      editable: boolean
    }
  >
}
