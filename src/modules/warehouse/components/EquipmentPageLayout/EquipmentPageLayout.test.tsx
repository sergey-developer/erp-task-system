import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { RouteEnum } from 'configs/routes'

import { testUtils as equipmentFilterTestUtils } from 'modules/warehouse/components/EquipmentFilter/EquipmentFilter.test'
import { testUtils as equipmentNomenclatureTableTestUtils } from 'modules/warehouse/components/EquipmentNomenclatureTable/EquipmentNomenclatureTable.test'
import EquipmentListPage from 'modules/warehouse/pages/EquipmentListPage'
import { testUtils as equipmentListPageTestUtils } from 'modules/warehouse/pages/EquipmentListPage/EquipmentListPage.test'
import EquipmentNomenclatureListPage from 'modules/warehouse/pages/EquipmentNomenclatureListPage'
import { testUtils as equipmentNomenclatureListPageTestUtils } from 'modules/warehouse/pages/EquipmentNomenclatureListPage/EquipmentNomenclatureListPage.test'

import commonFixtures from 'fixtures/common'
import warehouseFixtures from 'fixtures/warehouse'

import {
  mockGetCustomerListSuccess,
  mockGetEquipmentCategoryListSuccess,
  mockGetEquipmentListSuccess,
  mockGetEquipmentNomenclatureListSuccess,
  mockGetWarehouseListSuccess,
} from '_tests_/mocks/api'
import {
  fakeWord,
  getButtonIn,
  render,
  renderInRoute_latest,
  setupApiTests,
} from '_tests_/utils'

import EquipmentPageLayout from './index'

const getContainer = () => screen.getByTestId('reserves-list-layout')

// filter button
const getFilterButton = () => getButtonIn(getContainer(), /filter/)

const clickFilterButton = async (user: UserEvent) => {
  const button = getFilterButton()
  await user.click(button)
}

// add equipment button
const getAddEquipmentButton = () =>
  getButtonIn(getContainer(), /Добавить оборудование/)

// search field
const getSearchField = () =>
  within(getContainer()).getByPlaceholderText('Поиск оборудования')

const setSearch = async (
  user: UserEvent,
  value: string,
  pressEnter: boolean = false,
): Promise<HTMLElement> => {
  const field = getSearchField()
  await user.type(field, pressEnter ? value.concat('{enter}') : value)
  return field
}

const testUtils = {
  getContainer,

  getFilterButton,
  clickFilterButton,

  getAddEquipmentButton,

  getSearchField,
  setSearch,
}

setupApiTests()

describe('Layout номенклатуры оборудования', () => {
  test('Отображает дочерний роут', () => {
    mockGetEquipmentNomenclatureListSuccess()

    renderInRoute_latest(
      [
        {
          path: RouteEnum.EquipmentNomenclatureList,
          element: <EquipmentPageLayout />,
          children: [
            {
              index: true,
              element: <EquipmentNomenclatureListPage />,
            },
          ],
        },
      ],
      { initialEntries: [RouteEnum.EquipmentNomenclatureList] },
    )

    const page = equipmentNomenclatureListPageTestUtils.getContainer()
    expect(page).toBeInTheDocument()
  })

  describe('Фильтры', () => {
    describe('Кнопка фильтров', () => {
      test('Отображается корректно', () => {
        render(<EquipmentPageLayout />)

        const button = testUtils.getFilterButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Открывает фильтр', async () => {
        mockGetCustomerListSuccess()
        mockGetWarehouseListSuccess()
        mockGetEquipmentCategoryListSuccess()

        const { user } = render(<EquipmentPageLayout />)

        await testUtils.clickFilterButton(user)

        const filter = equipmentFilterTestUtils.getContainer()
        expect(filter).toBeInTheDocument()
      })
    })

    test.todo('Устанавливается значение по умолчанию для состояния')
    test.todo('Устанавливается значение по умолчанию для склада')
    test.todo('Устанавливается значение по умолчанию для категории')
    test.todo('Можно закрыть фильтр')
    test.todo('После применения значения сохраняются')

    test.todo('После применения фильтр закрывается и отправляется запрос')
    test.todo(
      'После применения переходит на страницу списка номенклатуры оборудования',
    )
  })

  describe('Добавление оборудования', () => {
    describe('Кнопка добавления', () => {
      test('Отображается корректно', () => {
        render(<EquipmentPageLayout />)

        const button = testUtils.getAddEquipmentButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })
    })
  })

  describe('Поиск', () => {
    describe('Поле поиска', () => {
      test('Отображается корректно', () => {
        render(<EquipmentPageLayout />)

        const field = testUtils.getSearchField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Можно установить значение', async () => {
        const { user } = render(<EquipmentPageLayout />)

        const value = fakeWord()
        const field = await testUtils.setSearch(user, value)

        expect(field).toHaveDisplayValue(value)
      })
    })

    test('После применения переходит на страницу списка номенклатуры оборудования', async () => {
      const equipmentNomenclatureListItem =
        warehouseFixtures.equipmentNomenclatureListItem()

      mockGetEquipmentNomenclatureListSuccess({
        body: commonFixtures.paginatedListResponse([
          equipmentNomenclatureListItem,
        ]),
        once: false,
      })

      mockGetEquipmentListSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: RouteEnum.EquipmentNomenclatureList,
            element: <EquipmentPageLayout />,
            children: [
              {
                index: true,
                element: <EquipmentNomenclatureListPage />,
              },
              {
                path: RouteEnum.EquipmentList,
                element: <EquipmentListPage />,
              },
            ],
          },
        ],
        { initialEntries: [RouteEnum.EquipmentNomenclatureList] },
      )

      await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
      await equipmentNomenclatureTableTestUtils.clickTitleLink(
        user,
        equipmentNomenclatureListItem.id,
        equipmentNomenclatureListItem.title,
      )

      const equipmentListPage = equipmentListPageTestUtils.getContainer()
      expect(equipmentListPage).toBeInTheDocument()

      await testUtils.setSearch(user, fakeWord(), true)

      const equipmentNomenclatureListPage =
        equipmentNomenclatureListPageTestUtils.getContainer()
      expect(equipmentNomenclatureListPage).toBeInTheDocument()

      await equipmentNomenclatureTableTestUtils.expectLoadingStarted()
      await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
    })
  })
})
