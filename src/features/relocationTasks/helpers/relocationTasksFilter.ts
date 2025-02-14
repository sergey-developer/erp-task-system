import { RelocationTasksFilterFormFields } from 'features/relocationTasks/components/RelocationTasksFilter/types'

import { DATE_FILTER_FORMAT } from 'shared/constants/dateTime'
import { formatDate } from 'shared/utils/date'

import { GetRelocationTasksFilter } from '../api/schemas'

export const relocationTasksFilterToRequestArgs = ({
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
