import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import React from 'react'

import { testUtils as equipmentFilterTestUtils } from 'modules/warehouse/components/EquipmentFilter/EquipmentFilter.test'
import { testUtils as equipmentNomenclatureTableTestUtils } from 'modules/warehouse/components/EquipmentNomenclatureTable/EquipmentNomenclatureTable.test'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import EquipmentListPage from 'modules/warehouse/pages/EquipmentListPage'
import { testUtils as equipmentListPageTestUtils } from 'modules/warehouse/pages/EquipmentListPage/EquipmentListPage.test'
import EquipmentNomenclatureListPage from 'modules/warehouse/pages/EquipmentNomenclatureListPage'
import { testUtils as equipmentNomenclatureListPageTestUtils } from 'modules/warehouse/pages/EquipmentNomenclatureListPage/EquipmentNomenclatureListPage.test'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import commonFixtures from '_tests_/fixtures/common'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetCustomerListSuccess,
  mockGetEquipmentCategoryListSuccess,
  mockGetEquipmentListSuccess,
  mockGetEquipmentNomenclaturesSuccess,
  mockGetLocationListSuccess,
} from '_tests_/mocks/api'
import { buttonTestUtils, fakeWord, render, renderWithRouter, setupApiTests } from '_tests_/utils'

import EquipmentPageLayout from './index'

const getContainer = () => screen.getByTestId('equipment-page-layout')

// filter button
const getFilterButton = () => buttonTestUtils.getButtonIn(getContainer(), /filter/)

const clickFilterButton = async (user: UserEvent) => {
  const button = getFilterButton()
  await user.click(button)
}

// search field
const getSearchField = () => within(getContainer()).getByPlaceholderText('Поиск оборудования')

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

  getSearchField,
  setSearch,
}

setupApiTests()

describe('Layout номенклатуры оборудования', () => {
  test('Отображает дочерний роут', () => {
    mockGetEquipmentNomenclaturesSuccess()

    renderWithRouter(
      [
        {
          path: WarehouseRouteEnum.EquipmentNomenclatures,
          element: <EquipmentPageLayout />,
          children: [
            {
              index: true,
              element: <EquipmentNomenclatureListPage />,
            },
          ],
        },
      ],
      { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
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
        mockGetLocationListSuccess({ body: [] })
        mockGetCustomerListSuccess()
        mockGetEquipmentCategoryListSuccess()

        const { user } = render(<EquipmentPageLayout />)

        await testUtils.clickFilterButton(user)
        const filter = await equipmentFilterTestUtils.findContainer()

        expect(filter).toBeInTheDocument()
      })
    })

    test.todo('Устанавливается значение по умолчанию для состояния')

    test.todo('Устанавливается значение по умолчанию для склада')
    test.todo('Имеет верные варианты складов')

    test.todo('Устанавливается значение по умолчанию для категории')
    test.todo('Имеет верные варианты категорий')

    test.todo('Имеет верные варианты владельцев')

    test('Можно закрыть фильтр', async () => {
      mockGetCustomerListSuccess()
      mockGetLocationListSuccess({ body: catalogsFixtures.locationList() })
      mockGetEquipmentCategoryListSuccess({
        body: warehouseFixtures.equipmentCategoryList(),
      })
      mockGetEquipmentNomenclaturesSuccess()

      const { user } = render(<EquipmentPageLayout />)

      await testUtils.clickFilterButton(user)
      await equipmentFilterTestUtils.clickCloseButton(user)
      const filter = equipmentFilterTestUtils.queryContainer()

      expect(filter).not.toBeInTheDocument()
    })

    test.todo('После применения значения сохраняются')

    test('После применения фильтр закрывается и отправляется запрос', async () => {
      mockGetCustomerListSuccess()

      const locationListItem = catalogsFixtures.locationListItem()
      mockGetLocationListSuccess({ body: [locationListItem] })

      mockGetEquipmentCategoryListSuccess({ body: warehouseFixtures.equipmentCategoryList() })
      mockGetEquipmentNomenclaturesSuccess({ once: false })

      const { user } = renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.EquipmentNomenclatures,
            element: <EquipmentPageLayout />,
            children: [
              {
                index: true,
                element: <EquipmentNomenclatureListPage />,
              },
            ],
          },
        ],
        { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
      )

      await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
      await testUtils.clickFilterButton(user)
      await equipmentFilterTestUtils.findContainer()
      await equipmentFilterTestUtils.openLocationsSelect(user)
      await equipmentFilterTestUtils.setLocation(user, locationListItem.title)
      await equipmentFilterTestUtils.clickApplyButton(user)
      const filter = equipmentFilterTestUtils.queryContainer()

      await equipmentNomenclatureTableTestUtils.expectLoadingStarted()
      await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
      expect(filter).not.toBeInTheDocument()
    })

    test('После применения переходит на страницу списка номенклатуры оборудования', async () => {
      mockGetCustomerListSuccess()
      mockGetLocationListSuccess({ body: catalogsFixtures.locationList() })
      mockGetEquipmentCategoryListSuccess({ body: warehouseFixtures.equipmentCategoryList() })

      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
        once: false,
      })

      mockGetEquipmentListSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.EquipmentNomenclatures,
            element: <EquipmentPageLayout />,
            children: [
              {
                index: true,
                element: <EquipmentNomenclatureListPage />,
              },
              {
                path: WarehouseRouteEnum.Equipments,
                element: <EquipmentListPage />,
              },
            ],
          },
        ],
        { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
      )

      await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
      await equipmentNomenclatureTableTestUtils.clickTitleLink(
        user,
        equipmentNomenclatureListItem.id,
        equipmentNomenclatureListItem.title,
      )
      const equipmentListPage = equipmentListPageTestUtils.getContainer()
      expect(equipmentListPage).toBeInTheDocument()

      await testUtils.clickFilterButton(user)
      await equipmentFilterTestUtils.clickApplyButton(user)
      const equipmentNomenclatureListPage =
        await equipmentNomenclatureListPageTestUtils.findContainer()

      expect(equipmentNomenclatureListPage).toBeInTheDocument()
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
      const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()
      mockGetEquipmentNomenclaturesSuccess({
        body: commonFixtures.paginatedListResponse([equipmentNomenclatureListItem]),
        once: false,
      })

      mockGetEquipmentListSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.EquipmentNomenclatures,
            element: <EquipmentPageLayout />,
            children: [
              {
                index: true,
                element: <EquipmentNomenclatureListPage />,
              },
              {
                path: WarehouseRouteEnum.Equipments,
                element: <EquipmentListPage />,
              },
            ],
          },
        ],
        { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
      )

      await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
      await equipmentNomenclatureTableTestUtils.clickTitleLink(
        user,
        equipmentNomenclatureListItem.id,
        equipmentNomenclatureListItem.title,
      )
      equipmentListPageTestUtils.getContainer()
      await testUtils.setSearch(user, fakeWord(), true)
      equipmentNomenclatureListPageTestUtils.getContainer()
      await equipmentNomenclatureTableTestUtils.expectLoadingStarted()
      await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
    })
  })

  // todo: добавить тесты
  describe('Карточка просмотра оборудования', () => {
    // describe('При не успешном запросе', () => {
    //   test('Обрабатывается ошибка 403', async () => {
    //     const equipmentListItem = warehouseFixtures.equipmentListItem()
    //     mockGetEquipmentListSuccess({
    //       body: commonFixtures.paginatedListResponse([equipmentListItem]),
    //     })
    //
    //     const errorMessage = fakeWord()
    //     mockGetEquipmentForbiddenError(equipmentListItem.id, {
    //       body: { detail: errorMessage },
    //     })
    //
    //     const { user } = render(<EquipmentListPage />)
    //
    //     await equipmentTableTestUtils.expectLoadingFinished()
    //     await equipmentTableTestUtils.clickRow(user, equipmentListItem.id)
    //     const equipment = await equipmentTestUtils.findContainer()
    //     await equipmentTestUtils.expectLoadingFinished()
    //     const notification = await notificationTestUtils.findNotification(errorMessage)
    //
    //     expect(notification).toBeInTheDocument()
    //     await waitFor(() => {
    //       expect(equipment).not.toBeInTheDocument()
    //     })
    //   })
    //
    //   test('Обрабатывается ошибка 404', async () => {
    //     const equipmentListItem = warehouseFixtures.equipmentListItem()
    //     mockGetEquipmentListSuccess({
    //       body: commonFixtures.paginatedListResponse([equipmentListItem]),
    //     })
    //
    //     const errorMessage = fakeWord()
    //     mockGetEquipmentNotFoundError(equipmentListItem.id, {
    //       body: { detail: errorMessage },
    //     })
    //
    //     const { user } = render(<EquipmentListPage />)
    //
    //     await equipmentTableTestUtils.expectLoadingFinished()
    //     await equipmentTableTestUtils.clickRow(user, equipmentListItem.id)
    //     const equipment = await equipmentTestUtils.findContainer()
    //     await equipmentTestUtils.expectLoadingFinished()
    //     const notification = await notificationTestUtils.findNotification(errorMessage)
    //
    //     expect(notification).toBeInTheDocument()
    //     await waitFor(() => {
    //       expect(equipment).not.toBeInTheDocument()
    //     })
    //   })
    //
    //   test('Обрабатывается ошибка 500', async () => {
    //     const equipmentListItem = warehouseFixtures.equipmentListItem()
    //     mockGetEquipmentListSuccess({
    //       body: commonFixtures.paginatedListResponse([equipmentListItem]),
    //     })
    //
    //     mockGetEquipmentServerError(equipmentListItem.id)
    //
    //     const { user } = render(<EquipmentListPage />)
    //
    //     await equipmentTableTestUtils.expectLoadingFinished()
    //     await equipmentTableTestUtils.clickRow(user, equipmentListItem.id)
    //     const equipment = await equipmentTestUtils.findContainer()
    //     await equipmentTestUtils.expectLoadingFinished()
    //     const notification = await notificationTestUtils.findNotification(
    //       getEquipmentMessages.commonError,
    //     )
    //
    //     expect(notification).toBeInTheDocument()
    //     await waitFor(() => {
    //       expect(equipment).not.toBeInTheDocument()
    //     })
    //   })
    // })
  })
})
