import { Rule } from 'rc-field-form/es/interface'

import { TaskTypeEnum } from 'features/task/constants/task'

import { onlyNotEmptyStringRules, requiredStringRules } from 'shared/constants/validation'
import { dateValidator, timeValidator } from 'shared/utils/validation'

export const typeRules: Rule[] = [
  {
    required: true,
    type: 'enum',
    enum: Object.values(TaskTypeEnum).filter(
      (value) => value !== TaskTypeEnum.RequestTask && value !== TaskTypeEnum.IncidentTask,
    ),
  },
]

export const olaNextBreachDateRules: Rule[] = [
  {
    type: 'date',
    required: true,
    validator: dateValidator({ required: true }),
  },
]

export const olaNextBreachTimeRules: Rule[] = [
  ({ getFieldValue }) => ({
    type: 'date',
    required: true,
    validator: timeValidator({
      dateGetter: getFieldValue,
      dateFieldPath: 'olaNextBreachDate',
      required: true,
    }),
  }),
]

export const titleRules: Rule[] = requiredStringRules.concat([{ max: 500 }])
export const contactTypeRules: Rule[] = onlyNotEmptyStringRules.concat([{ max: 255 }])
export const emailRules: Rule[] = [{ type: 'email', max: 140 }]
export const addressRules: Rule[] = onlyNotEmptyStringRules.concat([{ max: 255 }])
