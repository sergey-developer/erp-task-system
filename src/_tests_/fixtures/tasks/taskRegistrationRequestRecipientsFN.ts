import { TaskRegistrationRequestRecipientsFNDTO } from 'features/tasks/api/dto'

import { fakeName } from '_tests_/helpers'

export const taskRegistrationRequestRecipientsFN = (): TaskRegistrationRequestRecipientsFNDTO => ({
  email: [fakeName()],
  emailAsCopy: [fakeName()],
})
