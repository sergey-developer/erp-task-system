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
  severity: 'severity',
  priority: 'priority',
  impact: 'impact',
  productClassifier1: 'productClassifier1',
  productClassifier2: 'productClassifier2',
  productClassifier3: 'productClassifier3',
}

export const notRequiredProps: Readonly<
  Omit<AdditionalInfoProps, keyof typeof baseProps | keyof typeof requiredProps>
> = {
  email: 'email',
  sapId: 'sapId',
  weight: 1,
  company: 'company',
  address: 'address',
  contactType: 'contactType',
  supportGroup: 'supportGroup',
}
