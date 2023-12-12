import { CheckboxOptionType } from 'antd'

import { externalResponsibleCompanyDict } from './dict'

export const organizationOptions: CheckboxOptionType[] = Object.keys(
  externalResponsibleCompanyDict,
).map((key) => ({
  label: externalResponsibleCompanyDict[key as keyof typeof externalResponsibleCompanyDict],
  value: key,
}))
