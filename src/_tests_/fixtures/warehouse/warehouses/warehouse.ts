import { WarehouseTypeEnum } from 'features/warehouses/api/constants'
import { WarehouseDetailDTO } from 'features/warehouses/api/dto'
import pick from 'lodash/pick'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import { fakeId, fakeWord } from '_tests_/helpers'

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
  macroregions: [pick(catalogsFixtures.macroregionCatalogItem(), 'id', 'title')],
})
