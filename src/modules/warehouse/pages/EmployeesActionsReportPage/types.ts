import { Moment } from 'moment-timezone'

import { IdType } from 'shared/types/common'

export type FormFields = {
  employee: IdType
  period?: [Moment, Moment]
}
