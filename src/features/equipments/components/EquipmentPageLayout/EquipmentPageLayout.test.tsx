import EquipmentsPage from 'features/equipments/pages/EquipmentsPage'
import EquipmentNomenclaturesPage from 'features/nomenclatures/pages/EquipmentNomenclaturesPage'
import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'
import React from 'react'

import { equipmentFilterTestUtils } from '_tests_/features/warehouse/components/EquipmentFilter/testUtils'
import { equipmentNomenclatureTableTestUtils } from '_tests_/features/warehouse/components/EquipmentNomenclatureTable/testUtils'
import { equipmentPageLayoutTestUtils } from '_tests_/features/warehouse/components/EquipmentPageLayout/testUtils'
import { equipmentNomenclatureListPageTestUtils } from '_tests_/features/warehouse/pages/EquipmentNomenclaturesPage/testUtils'
import { equipmentListPageTestUtils } from '_tests_/features/warehouse/pages/EquipmentsPage/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import commonFixtures from '_tests_/fixtures/common'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetCustomerListSuccess,
  mockGetEquipmentCategoryListSuccess,
  mockGetEquipmentListSuccess,
  mockGetEquipmentNomenclaturesSuccess,
  mockGetLocationsCatalogSuccess,
} from '_tests_/mocks/api'
import { fakeWord, render, renderWithRouter, setupApiTests } from '_tests_/utils'

import EquipmentPageLayout from './index'

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
              element: <EquipmentNomenclaturesPage />,
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

        const button = equipmentPageLayoutTestUtils.getFilterButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Открывает фильтр', async () => {
        mockGetLocationsCatalogSuccess({ body: [] })
        mockGetCustomerListSuccess()
        mockGetEquipmentCategoryListSuccess()

        const { user } = render(<EquipmentPageLayout />)

        await equipmentPageLayoutTestUtils.clickFilterButton(user)
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
      mockGetLocationsCatalogSuccess({ body: catalogsFixtures.locationsCatalog() })
      mockGetEquipmentCategoryListSuccess({
        body: warehouseFixtures.equipmentCategoryList(),
      })
      mockGetEquipmentNomenclaturesSuccess()

      const { user } = render(<EquipmentPageLayout />)

      await equipmentPageLayoutTestUtils.clickFilterButton(user)
      await equipmentFilterTestUtils.clickCloseButton(user)
      const filter = equipmentFilterTestUtils.queryContainer()

      expect(filter).not.toBeInTheDocument()
    })

    test.todo('После применения значения сохраняются')

    test('После применения фильтр закрывается и отправляется запрос', async () => {
      mockGetCustomerListSuccess()

      const locationCatalogListItem = catalogsFixtures.locationCatalogListItem()
      mockGetLocationsCatalogSuccess({ body: [locationCatalogListItem] })

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
                element: <EquipmentNomenclaturesPage />,
              },
            ],
          },
        ],
        { initialEntries: [WarehouseRouteEnum.EquipmentNomenclatures] },
      )

      await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
      await equipmentPageLayoutTestUtils.clickFilterButton(user)
      await equipmentFilterTestUtils.findContainer()
      await equipmentFilterTestUtils.openLocationsSelect(user)
      await equipmentFilterTestUtils.setLocation(user, locationCatalogListItem.title)
      await equipmentFilterTestUtils.clickApplyButton(user)
      const filter = equipmentFilterTestUtils.queryContainer()

      await equipmentNomenclatureTableTestUtils.expectLoadingStarted()
      await equipmentNomenclatureTableTestUtils.expectLoadingFinished()
      expect(filter).not.toBeInTheDocument()
    })

    test('После применения переходит на страницу списка номенклатуры оборудования', async () => {
      mockGetCustomerListSuccess()
      mockGetLocationsCatalogSuccess({ body: catalogsFixtures.locationsCatalog() })
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
                element: <EquipmentNomenclaturesPage />,
              },
              {
                path: WarehouseRouteEnum.Equipments,
                element: <EquipmentsPage />,
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

      await equipmentPageLayoutTestUtils.clickFilterButton(user)
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

        const field = equipmentPageLayoutTestUtils.getSearchField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Можно установить значение', async () => {
        const { user } = render(<EquipmentPageLayout />)

        const value = fakeWord()
        const field = await equipmentPageLayoutTestUtils.setSearch(user, value)

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
                element: <EquipmentNomenclaturesPage />,
              },
              {
                path: WarehouseRouteEnum.Equipments,
                element: <EquipmentsPage />,
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
      await equipmentPageLayoutTestUtils.setSearch(user, fakeWord(), true)
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
    //     const { user } = render(<EquipmentsPage />)
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
    //     const { user } = render(<EquipmentsPage />)
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
    //     const { user } = render(<EquipmentsPage />)
    //
    //     await equipmentTableTestUtils.expectLoadingFinished()
    //     await equipmentTableTestUtils.clickRow(user, equipmentListItem.id)
    //     const equipment = await equipmentTestUtils.findContainer()
    //     await equipmentTestUtils.expectLoadingFinished()
    //     const notification = await notificationTestUtils.findNotification(
    //       getEquipmentErrorMessage,
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
