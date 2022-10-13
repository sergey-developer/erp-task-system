import { DurationFormatSettings } from 'moment'

import humanizeDuration from 'shared/utils/date/humanizeDuration'

const settings: DurationFormatSettings = {
  template: 'Mмес Dд hhч mmмин',
  trim: 'all',
}

export const getTaskRemainingTime = (value: number): string =>
  humanizeDuration(value, 'milliseconds', settings)
