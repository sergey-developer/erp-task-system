import { generateEmail, generateString } from '_tests_/utils'

import { AdditionalInfoProps } from '../index'

export const baseProps: Readonly<
  Pick<AdditionalInfoProps, 'expanded'> & {
    onExpand: jest.MockedFn<AdditionalInfoProps['onExpand']>
  }
> = {
  expanded: false,
  onExpand: jest.fn(),
}

export const requiredProps: Readonly<
  Pick<
    AdditionalInfoProps,
    | 'priority'
    | 'severity'
    | 'impact'
    | 'productClassifier1'
    | 'productClassifier2'
    | 'productClassifier3'
  >
> = {
  severity: generateString(),
  priority: generateString(),
  impact: generateString(),
  productClassifier1: generateString(),
  productClassifier2: generateString(),
  productClassifier3: generateString(),
}

export const notRequiredProps: Readonly<
  Omit<AdditionalInfoProps, keyof typeof baseProps | keyof typeof requiredProps>
> = {
  email: generateEmail(),
  sapId: generateString(),
  weight: 1,
  company: generateString(),
  address: generateString(),
  contactType: generateString(),
  supportGroup: generateString(),
}
