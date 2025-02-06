import { InfrastructureOrderFormDTO } from 'features/infrastructures/api/dto'

import { ChangeInfrastructureOrderFormTableRow } from '../ChangeInfrastructureOrderFormTable/types'

export type ChangeInfrastructureOrdersFormsTabFormFields = Record<
  InfrastructureOrderFormDTO['id'],
  {
    works: ChangeInfrastructureOrderFormTableRow[]
  }
>
