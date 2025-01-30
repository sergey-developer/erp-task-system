import { Rule } from 'rc-field-form/es/interface'

import { INCORRECT_PASSWORD_ERROR_MSG } from 'features/auth/constants'
import { checkPasswordValid } from 'features/auth/utils'

import { validationMessages } from 'shared/constants/validation'

export const passwordRules: Rule[] = [
  {
    validator: (_, value) => {
      if (value) {
        if (checkPasswordValid(value)) {
          return Promise.resolve()
        } else {
          return Promise.reject(INCORRECT_PASSWORD_ERROR_MSG)
        }
      } else {
        return Promise.reject(validationMessages.required)
      }
    },
  },
]

export const confirmPasswordRules: Rule[] = [
  { required: true },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve()
      }

      return Promise.reject(new Error('Пароли не совпадают'))
    },
  }),
]
