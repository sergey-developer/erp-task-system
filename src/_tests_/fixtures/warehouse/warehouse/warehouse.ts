import pick from 'lodash/pick'

import { WarehouseTypeEnum } from 'modules/warehouse/constants/warehouse'
import { WarehouseModel } from 'modules/warehouse/models'

import macroregionFixtures from '_tests_/fixtures/macroregion'
import { fakeId, fakeWord } from '_tests_/utils'

export const warehouse = (
  props?: Partial<Pick<WarehouseModel, 'id' | 'type'>>,
): WarehouseModel => ({
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
