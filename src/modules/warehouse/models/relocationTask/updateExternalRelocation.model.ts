import { ExternalRelocationStatusEnum } from 'modules/warehouse/constants/relocationTask'
import { RelocationTaskRequestArgs } from 'modules/warehouse/types'

import { RelocationTaskModel } from './relocationTask.model'

export type UpdateExternalRelocationMutationArgs = RelocationTaskRequestArgs &
  Partial<{
    number: string
    status: ExternalRelocationStatusEnum
  }>

export type UpdateExternalRelocationSuccessResponse = RelocationTaskModel['externalRelocation']
