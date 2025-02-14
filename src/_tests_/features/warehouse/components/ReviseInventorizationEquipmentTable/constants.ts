import { ReviseInventorizationEquipmentTableProps } from 'features/inventorizations/components/ReviseInventorizationEquipmentTable/types'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem()

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
