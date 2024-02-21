import { ExternalRelocationStatusEnum } from 'modules/warehouse/constants/relocationTask'
import { BaseRelocationTaskRequestArgs } from 'modules/warehouse/types'

import { RelocationTaskModel } from './relocationTask.model'

export type UpdateExternalRelocationMutationArgs = BaseRelocationTaskRequestArgs &
  Partial<{
    number: string
    status: ExternalRelocationStatusEnum
  }>

export type UpdateExternalRelocationSuccessResponse = RelocationTaskModel['externalRelocation']
