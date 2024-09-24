import { EquipmentDetailsProps } from 'modules/warehouse/components/EquipmentDetails/types'

import { fakeInteger } from '_tests_/utils/index'

export const props: Readonly<EquipmentDetailsProps> = {
  open: true,
  onClose: jest.fn(),
  equipmentId: fakeInteger(),
}

export enum TestIdsEnum {
  EquipmentDetails = 'equipment-details',
  EquipmentImages = 'equipment-images',
}
