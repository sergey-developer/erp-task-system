import { InventorizationModel } from 'modules/warehouse/models'

import { MaybeNull } from 'shared/types/utils'

export type ExecuteInventorizationPageLocationState = MaybeNull<
  Pick<
    InventorizationModel,
    'executor' | 'status' | 'type' | 'deadlineAt' | 'createdAt' | 'createdBy' | 'warehouses'
  >
>
