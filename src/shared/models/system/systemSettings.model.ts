import { SuspendReasonEnum } from 'features/task/constants/taskSuspendRequest'

export type SystemSettingsModel = {
  suspendReasons: Record<
    SuspendReasonEnum,
    {
      limit: number
      editable: boolean
    }
  >
}
