import { ReviseInventorizationEquipmentTableProps } from 'features/inventorizations/components/ReviseInventorizationEquipmentTable/types'

import inventorizationsFixtures from '_tests_/fixtures/api/data/inventorizations'

export const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment()

export const props: ReviseInventorizationEquipmentTableProps = {
  dataSource: [inventorizationEquipmentListItem],
  pagination: {},
  loading: false,

  locations: [],
  locationsIsLoading: false,

  onTableChange: jest.fn(),

  onChangeQuantityFact: jest.fn(),
  changeQuantityFactIsLoading: false,

  onChangeLocationFact: jest.fn(),
  changeLocationFactIsLoading: false,

  fulfilledTimeStamp: undefined,
}

export enum TestIdsEnum {
  ReviseEquipmentTable = 'revise-inventorization-equipment-table',
  LocationFactFormItem = 'location-fact-form-item',
  QuantityFactFormItem = 'quantity-fact-form-item',
}
