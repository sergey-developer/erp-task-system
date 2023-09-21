import { RelocationTaskListFilterFormFields } from 'modules/warehouse/components/RelocationTaskListFilter/types'
import { GetRelocationTaskListFilter } from 'modules/warehouse/models'

export const relocationTaskListFilterToParams = (
  values: RelocationTaskListFilterFormFields,
): GetRelocationTaskListFilter => ({
  statuses: values.status,
})
