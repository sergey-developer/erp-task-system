import { InfrastructureOrderFormListItemModel } from 'features/infrastructures/models'

import { ChangeInfrastructureOrderFormTableRow } from '../ChangeInfrastructureOrderFormTable/types'

export type ChangeInfrastructureOrdersFormsTabFormFields = Record<
  InfrastructureOrderFormListItemModel['id'],
  {
    works: ChangeInfrastructureOrderFormTableRow[]
  }
>
