import { InfrastructureOrderFormListItemModel } from 'modules/infrastructures/models'

import { ChangeInfrastructureOrderFormTableRow } from '../ChangeInfrastructureOrderFormTable/types'

export type ChangeInfrastructureOrdersFormsTabFormFields = Record<
  InfrastructureOrderFormListItemModel['id'],
  {
    works: ChangeInfrastructureOrderFormTableRow[]
  }
>
