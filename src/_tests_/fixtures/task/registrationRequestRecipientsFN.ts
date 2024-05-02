import { TaskRegistrationRequestRecipientsFNModel } from 'modules/task/models'

import { fakeName } from '_tests_/utils'

export const registrationRequestRecipientsFN = (): TaskRegistrationRequestRecipientsFNModel => ({
  email: [fakeName()],
  emailAsCopy: [fakeName()],
})
