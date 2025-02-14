import { ReclassificationRequestStatusEnum } from '../constants'
import { ReclassificationRequestArgs } from '../types'

export type CancelReclassificationRequestRequest = ReclassificationRequestArgs

export type CancelReclassificationRequestResponse = {
  status: ReclassificationRequestStatusEnum
}
