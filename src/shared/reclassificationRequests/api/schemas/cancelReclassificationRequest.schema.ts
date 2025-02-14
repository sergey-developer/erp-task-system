import { ReclassificationRequestStatusEnum } from '../constants'
import { RequestWithReclassificationRequest } from '../types'

export type CancelReclassificationRequestRequest = RequestWithReclassificationRequest

export type CancelReclassificationRequestResponse = {
  status: ReclassificationRequestStatusEnum
}
