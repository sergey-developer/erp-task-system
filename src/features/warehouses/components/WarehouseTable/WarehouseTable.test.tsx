import { makeWarehousePageLink } from 'features/warehouses/helpers'
import WarehousePage from 'features/warehouses/pages/WarehousePage'

import {
  ariaSortAttrAscValue,
  ariaSortAttrDescValue,
  ariaSortAttrName,
  columnWithSortingClass,
} from '_tests_/constants/components'
import {
  props,
  warehouseListItem,
} from '_tests_/features/warehouses/components/WarehouseTable/constants'
import { warehouseTableTestUtils } from '_tests_/features/warehouses/components/WarehouseTable/testUtils'
import { warehousePageTestUtils } from '_tests_/features/warehouses/pages/WarehousePage/testUtils'
import { mockGetWarehouseSuccess } from '_tests_/mocks/api'
import { renderWithRouter } from '_tests_/helpers'

import { WarehousesRoutesEnum } from '../../routes/routes'
import WarehouseTable from './index'

afterEach(() => {
  const onChange = props.onChange as jest.Mock
  onChange.mockReset()
})
// todo: сделать тесты для сортировки как в EquipmentTable
describe.skip('Таблица складов', () => {
  test('Отображается корректно', () => {
    renderWithRouter(
      [
        {
          path: WarehousesRoutesEnum.Warehouses,
          element: <WarehouseTable {...props} />,
        },
      ],
      { initialEntries: [WarehousesRoutesEnum.Warehouses] },
    )

    const table = warehouseTableTestUtils.getContainer()

    expect(table).toBeInTheDocument()

    props.dataSource.forEach((item) => {
      const row = warehouseTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Колонка', () => {
    describe('Наименование объекта', () => {
      test('Отображается корректно', () => {
        renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouses,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.Warehouses] },
        )

        const headCell = warehouseTableTestUtils.getHeadCell('Наименование объекта')
        const title = warehouseTableTestUtils.getColTitle('Наименование объекта')
        const link = warehouseTableTestUtils.getTitleLink(
          warehouseListItem.id,
          warehouseListItem.title,
        )

        expect(title).toBeInTheDocument()
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute(
          'href',
          makeWarehousePageLink(warehouseListItem.id, warehouseListItem.title),
        )
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике переходит на страницу склада', async () => {
        mockGetWarehouseSuccess(warehouseListItem.id)

        const { user } = renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouses,
              element: <WarehouseTable {...props} />,
            },
            {
              path: WarehousesRoutesEnum.Warehouse,
              element: <WarehousePage />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.Warehouses] },
        )

        await warehouseTableTestUtils.clickTitleLink(
          user,
          warehouseListItem.id,
          warehouseListItem.title,
        )

        const page = warehousePageTestUtils.getContainer()
        expect(page).toBeInTheDocument()
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouses,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.Warehouses] },
        )

        await warehouseTableTestUtils.clickColTitle(user, 'Наименование объекта')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouses,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.Warehouses] },
        )

        await warehouseTableTestUtils.clickColTitle(user, 'Наименование объекта')
        const headCell = warehouseTableTestUtils.getHeadCell('Наименование объекта')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await warehouseTableTestUtils.clickColTitle(user, 'Наименование объекта')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        await warehouseTableTestUtils.clickColTitle(user, 'Наименование объекта')
        expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        props.dataSource.forEach((item) => {
          const row = warehouseTableTestUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Юридическое лицо', () => {
      test('Отображается корректно', () => {
        renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouses,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.Warehouses] },
        )

        const headCell = warehouseTableTestUtils.getHeadCell('Юридическое лицо')
        const title = warehouseTableTestUtils.getColTitle('Юридическое лицо')
        const value = warehouseTableTestUtils.getColValue(
          warehouseListItem.id,
          warehouseListItem.legalEntity.title,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouses,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.Warehouses] },
        )

        await warehouseTableTestUtils.clickColTitle(user, 'Юридическое лицо')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouses,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.Warehouses] },
        )

        await warehouseTableTestUtils.clickColTitle(user, 'Юридическое лицо')
        const headCell = warehouseTableTestUtils.getHeadCell('Юридическое лицо')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await warehouseTableTestUtils.clickColTitle(user, 'Юридическое лицо')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        await warehouseTableTestUtils.clickColTitle(user, 'Юридическое лицо')
        expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        props.dataSource.forEach((item) => {
          const row = warehouseTableTestUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Адрес', () => {
      test('Отображается корректно', () => {
        renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouses,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.Warehouses] },
        )

        const headCell = warehouseTableTestUtils.getHeadCell('Адрес')
        const title = warehouseTableTestUtils.getColTitle('Адрес')
        const value = warehouseTableTestUtils.getColValue(
          warehouseListItem.id,
          warehouseListItem.address,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouses,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.Warehouses] },
        )

        await warehouseTableTestUtils.clickColTitle(user, 'Адрес')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouses,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.Warehouses] },
        )

        await warehouseTableTestUtils.clickColTitle(user, 'Адрес')
        const headCell = warehouseTableTestUtils.getHeadCell('Адрес')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await warehouseTableTestUtils.clickColTitle(user, 'Адрес')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        await warehouseTableTestUtils.clickColTitle(user, 'Адрес')
        expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        props.dataSource.forEach((item) => {
          const row = warehouseTableTestUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Родительский склад', () => {
      test('Отображается корректно', () => {
        renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouses,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.Warehouses] },
        )

        const headCell = warehouseTableTestUtils.getHeadCell('Родительский склад')
        const title = warehouseTableTestUtils.getColTitle('Родительский склад')
        const value = warehouseTableTestUtils.getColValue(
          warehouseListItem.id,
          warehouseListItem.parent!.title,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouses,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.Warehouses] },
        )

        await warehouseTableTestUtils.clickColTitle(user, 'Родительский склад')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouses,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.Warehouses] },
        )

        await warehouseTableTestUtils.clickColTitle(user, 'Родительский склад')
        const headCell = warehouseTableTestUtils.getHeadCell('Родительский склад')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await warehouseTableTestUtils.clickColTitle(user, 'Родительский склад')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        await warehouseTableTestUtils.clickColTitle(user, 'Родительский склад')
        expect(headCell).not.toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        props.dataSource.forEach((item) => {
          const row = warehouseTableTestUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })
  })
})
