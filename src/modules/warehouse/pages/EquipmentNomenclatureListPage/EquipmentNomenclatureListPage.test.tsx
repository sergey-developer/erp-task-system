import { screen } from '@testing-library/react'

import { RouteEnum } from 'configs/routes'

import { testUtils as equipmentNomenclatureTableTestUtils } from 'modules/warehouse/components/EquipmentNomenclatureTable/EquipmentNomenclatureTable.test'

import { renderInRoute_latest } from '_tests_/utils'

import EquipmentNomenclatureListPage from './index'

const getContainer = () =>
  screen.getByTestId('equipment-nomenclature-list-page')

export const testUtils = {
  getContainer,
}

describe('Страница списка номенклатуры оборудования', () => {
  test('Отображает таблицу', () => {
    renderInRoute_latest(
      [
        {
          path: RouteEnum.EquipmentNomenclatureList,
          element: <EquipmentNomenclatureListPage />,
        },
      ],
      { initialEntries: [RouteEnum.EquipmentNomenclatureList] },
    )

    const table = equipmentNomenclatureTableTestUtils.getContainer()
    expect(table).toBeInTheDocument()
  })
})
