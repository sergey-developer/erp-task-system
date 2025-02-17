import { RelocationEquipmentTableProps } from 'features/relocationEquipments/components/RelocationEquipmentTable/types'

import relocationEquipmentsFixtures from '_tests_/fixtures/relocationEquipments'

export const relocationEquipmentListItem = relocationEquipmentsFixtures.relocationEquipment()

export const props: Readonly<RelocationEquipmentTableProps> = {
  dataSource: [relocationEquipmentListItem],
  loading: false,
  onClickImages: jest.fn(),
}

export enum TestIdsEnum {
  RelocationEquipmentTable = 'relocation-equipment-table',
}
