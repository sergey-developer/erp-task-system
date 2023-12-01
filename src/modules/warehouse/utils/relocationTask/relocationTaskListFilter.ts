import { RelocationTaskListFilterFormFields } from 'modules/warehouse/components/RelocationTaskListFilter/types'
import { GetRelocationTaskListFilter } from 'modules/warehouse/models'

export const relocationTaskListFilterToParams = ({
  status,
  ...values
}: RelocationTaskListFilterFormFields): GetRelocationTaskListFilter => ({
  ...values,
  statuses: status,
})
