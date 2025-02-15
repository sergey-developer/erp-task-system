import { MaybeNull } from 'shared/types/utils'

export type TaskRegistrationRequestRecipientsFNDTO = {
  email: MaybeNull<string[]>
  emailAsCopy: MaybeNull<string[]>
}
