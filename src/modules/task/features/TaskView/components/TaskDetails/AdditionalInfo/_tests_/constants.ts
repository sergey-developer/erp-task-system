import { generateEmail, generateWord } from '_tests_/utils'

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
  severity: generateWord(),
  priority: generateWord(),
  impact: generateWord(),
  productClassifier1: generateWord(),
  productClassifier2: generateWord(),
  productClassifier3: generateWord(),
}

export const notRequiredProps: Readonly<
  Omit<AdditionalInfoProps, keyof typeof baseProps | keyof typeof requiredProps>
> = {
  email: generateEmail(),
  sapId: generateWord(),
  weight: 1,
  company: generateWord(),
  address: generateWord(),
  contactType: generateWord(),
  supportGroup: generateWord(),
}
