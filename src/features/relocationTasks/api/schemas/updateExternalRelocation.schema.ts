import { ExternalRelocationStatusEnum } from '../constants'
import { RelocationTaskDetailDTO } from '../dto'
import { RequestWithRelocationTask } from '../types'

export type UpdateExternalRelocationRequest = RequestWithRelocationTask &
  Partial<{
    number: string
    status: ExternalRelocationStatusEnum
  }>

export type UpdateExternalRelocationResponse = RelocationTaskDetailDTO['externalRelocation']
