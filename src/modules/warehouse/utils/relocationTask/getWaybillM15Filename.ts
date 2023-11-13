import { DATE_FORMAT } from 'shared/constants/dateTime'
import { IdType } from 'shared/types/common'
import { formatDate } from 'shared/utils/date'

export const getWaybillM15Filename = (relocationTaskId: IdType): string =>
  `Накладная М-15 №${relocationTaskId} от ${formatDate(Date.now(), DATE_FORMAT)}.pdf`
