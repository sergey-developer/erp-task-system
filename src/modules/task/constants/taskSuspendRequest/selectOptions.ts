import { CheckboxOptionType } from 'antd'

import { externalResponsibleCompanyDict } from './dict'

export const externalResponsibleCompanyOptions: CheckboxOptionType[] = Object.keys(
  externalResponsibleCompanyDict,
).map((key) => ({
  label: externalResponsibleCompanyDict[key as keyof typeof externalResponsibleCompanyDict],
  value: key,
}))
