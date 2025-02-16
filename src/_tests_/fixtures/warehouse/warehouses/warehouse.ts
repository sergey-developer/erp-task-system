import { WarehouseTypeEnum } from 'features/warehouses/api/constants'
import { WarehouseDetailDTO } from 'features/warehouses/api/dto'
import pick from 'lodash/pick'

import macroregionFixtures from '_tests_/fixtures/macroregions'
import { fakeId, fakeWord } from '_tests_/utils'

export const warehouse = (
  props?: Partial<Pick<WarehouseDetailDTO, 'id' | 'type'>>,
): WarehouseDetailDTO => ({
  id: props?.id || fakeId(),
  type: props?.type || WarehouseTypeEnum.Main,

  title: fakeWord(),
  address: fakeWord(),
  contract: fakeWord(),
  notes: fakeWord(),
  parent: {
    id: fakeId(),
    title: fakeWord(),
  },
  legalEntity: {
    id: fakeId(),
    title: fakeWord(),
  },
  macroregions: [pick(macroregionFixtures.macroregionListItem(), 'id', 'title')],
})
