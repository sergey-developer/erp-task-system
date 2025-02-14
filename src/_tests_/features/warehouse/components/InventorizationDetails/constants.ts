import { InventorizationDetailsProps } from 'features/inventorizations/components/InventorizationDetails/index'

import { fakeId } from '_tests_/utils'

export const props: InventorizationDetailsProps = {
  open: true,
  inventorizationId: fakeId(),
  onClose: jest.fn(),
}

export enum TestIdsEnum {
  InventorizationDetails = 'inventorization-details',
}
