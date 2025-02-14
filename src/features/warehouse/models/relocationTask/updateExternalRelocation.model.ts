import { ExternalRelocationStatusEnum } from 'features/warehouse/constants/relocationTask'
import { RelocationTaskRequestArgs } from 'features/warehouse/types'

import { RelocationTaskModel } from './relocationTask.model'

export type UpdateExternalRelocationRequest = RelocationTaskRequestArgs &
  Partial<{
    number: string
    status: ExternalRelocationStatusEnum
  }>

export type UpdateExternalRelocationResponse = RelocationTaskModel['externalRelocation']
