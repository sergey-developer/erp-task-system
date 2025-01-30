import { TaskRegistrationRequestRecipientsFNModel } from 'features/task/models'

import { fakeName } from '_tests_/utils'

export const registrationRequestRecipientsFN = (): TaskRegistrationRequestRecipientsFNModel => ({
  email: [fakeName()],
  emailAsCopy: [fakeName()],
})
