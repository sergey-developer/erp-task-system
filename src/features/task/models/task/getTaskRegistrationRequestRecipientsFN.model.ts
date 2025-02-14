import { RequestWithTask } from 'features/task/types'

import { TaskRegistrationRequestRecipientsFNModel } from './taskRegistrationRequestRecipientsFN.model'

export type GetTaskRegistrationRequestRecipientsFNRequest = RequestWithTask

export type GetTaskRegistrationRequestRecipientsFNResponse =
  TaskRegistrationRequestRecipientsFNModel
