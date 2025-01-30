import { RelocationTasksFilterFormFields } from 'features/warehouse/components/RelocationTasksFilter/types'
import { GetRelocationTasksFilter } from 'features/warehouse/models'

import { DATE_FILTER_FORMAT } from 'shared/constants/dateTime'
import { formatDate } from 'shared/utils/date'

export const relocationTaskListFilterToParams = ({
  status,
  deadlineAt,
  createdAt,
  ...values
}: RelocationTasksFilterFormFields): GetRelocationTasksFilter => ({
  ...values,
  statuses: status,
  deadlineAtFrom: deadlineAt?.[0] ? formatDate(deadlineAt[0], DATE_FILTER_FORMAT) : undefined,
  deadlineAtTo: deadlineAt?.[1] ? formatDate(deadlineAt[1], DATE_FILTER_FORMAT) : undefined,
  createdAtFrom: createdAt?.[0] ? formatDate(createdAt[0], DATE_FILTER_FORMAT) : undefined,
  createdAtTo: createdAt?.[1] ? formatDate(createdAt[1], DATE_FILTER_FORMAT) : undefined,
})
