import pick from 'lodash/pick'

import { InventorizationModel } from 'modules/warehouse/models'
import { ExecuteInventorizationPageLocationState } from 'modules/warehouse/types'

export const getExecuteInventorizationPageLocationState = (
  inventorization: InventorizationModel,
): ExecuteInventorizationPageLocationState => pick(inventorization, 'executor', 'status')
