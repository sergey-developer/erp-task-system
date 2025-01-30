import { Rule } from 'rc-field-form/es/interface'

import { onlyRequiredRules, requiredStringRules } from 'shared/constants/validation'

export const restorationActionRules: Rule[] = requiredStringRules.concat({ max: 200 })
export const restorationCostRules: Rule[] = onlyRequiredRules.concat({ type: 'integer' })
