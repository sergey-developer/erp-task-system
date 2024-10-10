import { screen } from '@testing-library/react'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.EquipmentNomenclatureListPage)

const findContainer = (): Promise<HTMLElement> =>
  screen.findByTestId(TestIdsEnum.EquipmentNomenclatureListPage)

export const equipmentNomenclatureListPageTestUtils = {
  getContainer,
  findContainer,
}
