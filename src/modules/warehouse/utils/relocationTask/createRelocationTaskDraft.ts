import pick from 'lodash/pick'

import { InventorizationModel } from 'modules/warehouse/models'
import { CreateRelocationTaskDraftPageLocationState } from 'modules/warehouse/types'

export const makeCreateRelocationTaskDraftPageLocationState = (
  inventorization: Pick<InventorizationModel, 'executor' | 'status'>,
): NonNullable<CreateRelocationTaskDraftPageLocationState> => ({
  inventorization: pick(inventorization, 'executor', 'status'),
})
