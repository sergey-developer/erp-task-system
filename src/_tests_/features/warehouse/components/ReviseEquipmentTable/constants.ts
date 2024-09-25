import { ReviseEquipmentTableProps } from 'modules/warehouse/components/ReviseEquipmentTable/types'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem()

export const props: ReviseEquipmentTableProps = {
  dataSource: [inventorizationEquipmentListItem],
  pagination: {},
  loading: false,

  locations: [],
  locationsIsLoading: false,

  onTableChange: jest.fn(),

  onChangeQuantityFact: jest.fn(),
  onChangeLocationFact: jest.fn(),
}

export enum TestIdsEnum {
  ReviseEquipmentTable = 'revise-equipment-table',
  LocationFactFormItem = 'location-fact-form-item',
  QuantityFactFormItem = 'quantity-fact-form-item',
}
