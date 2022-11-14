import { generateEmail, generateWord } from '_tests_/utils'

import { AdditionalInfoProps } from '../index'

export const requiredProps: Readonly<
  Pick<
    AdditionalInfoProps,
    | 'expanded'
    | 'priority'
    | 'severity'
    | 'impact'
    | 'productClassifier1'
    | 'productClassifier2'
    | 'productClassifier3'
  > & {
    onExpand: jest.MockedFn<AdditionalInfoProps['onExpand']>
  }
> = {
  expanded: false,
  onExpand: jest.fn(),
  severity: generateWord(),
  priority: generateWord(),
  impact: generateWord(),
  productClassifier1: generateWord(),
  productClassifier2: generateWord(),
  productClassifier3: generateWord(),
}

export const notRequiredProps: Readonly<
  Omit<AdditionalInfoProps, keyof typeof requiredProps>
> = {
  email: generateEmail(),
  sapId: generateWord(),
  weight: 1,
  company: generateWord(),
  address: generateWord(),
  contactType: generateWord(),
  supportGroup: generateWord(),
}
