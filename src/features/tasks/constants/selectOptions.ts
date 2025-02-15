import { CheckboxOptionType } from 'antd'

import { externalResponsibleCompanyDict } from './taskSuspendRequest'

export const organizationOptions: CheckboxOptionType[] = Object.keys(
  externalResponsibleCompanyDict,
).map((key) => ({
  label: externalResponsibleCompanyDict[key as keyof typeof externalResponsibleCompanyDict],
  value: key,
}))
