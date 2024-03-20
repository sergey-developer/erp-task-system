import { Rule } from 'rc-field-form/es/interface'

import {
  onlyRequiredRules,
  requiredStringRules,
  validationSizes,
} from 'shared/constants/validation'

export const titleRules: Rule[] = requiredStringRules.concat([
  { max: validationSizes.string.short },
])

export const quantityRules: Rule[] = onlyRequiredRules.concat([{ type: 'integer' }])
