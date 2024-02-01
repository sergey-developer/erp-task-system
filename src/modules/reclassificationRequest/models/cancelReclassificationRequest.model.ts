import { ReclassificationRequestStatusEnum } from '../constants'
import { ReclassificationRequestArgs } from '../types'

export type CancelReclassificationRequestMutationArgs = ReclassificationRequestArgs

export type CancelReclassificationRequestSuccessResponse = {
  status: ReclassificationRequestStatusEnum
}
