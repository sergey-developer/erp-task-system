import { EquipmentDetailsProps } from 'features/equipments/components/EquipmentDetails/types'

import { fakeInteger } from '_tests_/helpers'

export const props: Readonly<EquipmentDetailsProps> = {
  open: true,
  onClose: jest.fn(),
  equipmentId: fakeInteger(),
}

export enum TestIdsEnum {
  EquipmentDetails = 'equipment-details',
  EquipmentImages = 'equipment-images',
}
