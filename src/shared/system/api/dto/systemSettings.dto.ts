import { SuspendReasonEnum } from 'features/tasks/api/constants'

type SuspendReasonSystemSettingsDTO = {
  limit: number
  editable: boolean
}

export type SystemSettingsDTO = {
  suspendReasons: Record<SuspendReasonEnum, SuspendReasonSystemSettingsDTO>
}
