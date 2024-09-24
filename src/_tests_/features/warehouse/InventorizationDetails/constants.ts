import { InventorizationDetailsProps } from 'modules/warehouse/components/InventorizationDetails/index'

import { fakeId } from '_tests_/utils/index'

export const props: InventorizationDetailsProps = {
  open: true,
  inventorizationId: fakeId(),
  onClose: jest.fn(),
}

export enum TestIdsEnum {
  InventorizationDetails = 'inventorization-details',
}
