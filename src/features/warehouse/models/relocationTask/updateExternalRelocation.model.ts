import { ExternalRelocationStatusEnum } from 'features/warehouse/constants/relocationTask'
import { RequestWithRelocationTask } from 'features/warehouse/types'

import { RelocationTaskModel } from './relocationTask.model'

export type UpdateExternalRelocationRequest = RequestWithRelocationTask &
  Partial<{
    number: string
    status: ExternalRelocationStatusEnum
  }>

export type UpdateExternalRelocationResponse = RelocationTaskModel['externalRelocation']
