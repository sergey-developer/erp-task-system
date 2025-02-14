import { screen } from '@testing-library/react'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.EquipmentNomenclaturesPage)

const findContainer = (): Promise<HTMLElement> =>
  screen.findByTestId(TestIdsEnum.EquipmentNomenclaturesPage)

export const equipmentNomenclatureListPageTestUtils = {
  getContainer,
  findContainer,
}
