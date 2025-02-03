import { SuspendReasonEnum } from 'features/task/constants/taskSuspendRequest'

type SuspendReasonSystemSettingsDTO = {
  limit: number
  editable: boolean
}

export type SystemSettingsDTO = {
  suspendReasons: Record<SuspendReasonEnum, SuspendReasonSystemSettingsDTO>
}
