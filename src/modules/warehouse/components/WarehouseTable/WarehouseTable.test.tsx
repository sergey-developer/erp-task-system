import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { RouteEnum } from 'configs/routes'

import WarehousePage from 'modules/warehouse/pages/WarehousePage'
import { testUtils as warehousePageTestUtils } from 'modules/warehouse/pages/WarehousePage/WarehousePage.test'
import { getWarehousePageLink } from 'modules/warehouse/utils'

import { MaybeNull } from 'shared/types/utils'

import warehouseFixtures from 'fixtures/warehouse'

import {
  ariaSortAttrAscValue,
  ariaSortAttrDescValue,
  ariaSortAttrName,
  columnWithSortingClass,
} from '_tests_/constants/components'
import { mockGetWarehouseSuccess } from '_tests_/mocks/api'
import {
  expectLoadingFinishedByIconIn,
  expectLoadingStartedByIconIn,
  renderInRoute_latest,
  tableTestUtils,
} from '_tests_/utils'

import WarehouseTable from './index'
import { WarehouseTableItem, WarehouseTableProps } from './types'

const warehouseListItem = warehouseFixtures.warehouseListItem()

const props: Readonly<WarehouseTableProps> = {
  dataSource: [warehouseListItem],
  loading: false,
  onChange: jest.fn(),
}

const getContainer = () => screen.getByTestId('warehouse-table')

const getRow = (id: number) => tableTestUtils.getRowIn(getContainer(), id)

const getHeadCell = (text: string) =>
  tableTestUtils.getHeadCell(getContainer(), text)

const getColTitle = (text: string) => within(getContainer()).getByText(text)

const clickColTitle = async (user: UserEvent, title: string) => {
  const col = getColTitle(title)
  await user.click(col)
}

const getColValue = (
  id: WarehouseTableItem['id'],
  value: string,
): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// title
const getTitleLink = (
  id: WarehouseTableItem['id'],
  title: string,
): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByRole('link', { name: title }) : null
}

const clickTitleLink = async (
  user: UserEvent,
  id: WarehouseTableItem['id'],
  title: string,
) => {
  const link = getTitleLink(id, title)

  if (link) {
    await user.click(link)
  }
}

// loading
const expectLoadingStarted = () => expectLoadingStartedByIconIn(getContainer())

const expectLoadingFinished = () =>
  expectLoadingFinishedByIconIn(getContainer())

export const testUtils = {
  getContainer,

  getRow,

  getHeadCell,

  getColTitle,
  getColValue,
  clickColTitle,

  getTitleLink,
  clickTitleLink,

  expectLoadingStarted,
  expectLoadingFinished,
}

afterEach(() => {
  const onChange = props.onChange as jest.Mock
  onChange.mockReset()
})
// todo: сделать тесты для сортировки как в EquipmentTable
describe('Таблица складов', () => {
  test('Отображается корректно', () => {
    renderInRoute_latest(
      [
        {
          path: RouteEnum.WarehouseList,
          element: <WarehouseTable {...props} />,
        },
      ],
      { initialEntries: [RouteEnum.WarehouseList] },
    )

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Колонка', () => {
    describe('Наименование объекта', () => {
      test('Отображается корректно', () => {
        renderInRoute_latest(
          [
            {
              path: RouteEnum.WarehouseList,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [RouteEnum.WarehouseList] },
        )

        const headCell = testUtils.getHeadCell('Наименование объекта')
        const title = testUtils.getColTitle('Наименование объекта')
        const link = testUtils.getTitleLink(
          warehouseListItem.id,
          warehouseListItem.title,
        )

        expect(title).toBeInTheDocument()
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute(
          'href',
          `${getWarehousePageLink(warehouseListItem.id)}?title=${
            warehouseListItem.title
          }`,
        )
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике переходит на страницу склада', async () => {
        mockGetWarehouseSuccess(warehouseListItem.id)

        const { user } = renderInRoute_latest(
          [
            {
              path: RouteEnum.WarehouseList,
              element: <WarehouseTable {...props} />,
            },
            {
              path: RouteEnum.Warehouse,
              element: <WarehousePage />,
            },
          ],
          { initialEntries: [RouteEnum.WarehouseList] },
        )

        await testUtils.clickTitleLink(
          user,
          warehouseListItem.id,
          warehouseListItem.title,
        )

        const page = warehousePageTestUtils.getContainer()
        expect(page).toBeInTheDocument()
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = renderInRoute_latest(
          [
            {
              path: RouteEnum.WarehouseList,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [RouteEnum.WarehouseList] },
        )

        await testUtils.clickColTitle(user, 'Наименование объекта')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = renderInRoute_latest(
          [
            {
              path: RouteEnum.WarehouseList,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [RouteEnum.WarehouseList] },
        )

        await testUtils.clickColTitle(user, 'Наименование объекта')
        const headCell = testUtils.getHeadCell('Наименование объекта')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Наименование объекта')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )

        await testUtils.clickColTitle(user, 'Наименование объекта')
        expect(headCell).not.toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )

        props.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Юридическое лицо', () => {
      test('Отображается корректно', () => {
        renderInRoute_latest(
          [
            {
              path: RouteEnum.WarehouseList,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [RouteEnum.WarehouseList] },
        )

        const headCell = testUtils.getHeadCell('Юридическое лицо')
        const title = testUtils.getColTitle('Юридическое лицо')
        const value = testUtils.getColValue(
          warehouseListItem.id,
          warehouseListItem.legalEntity.title,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = renderInRoute_latest(
          [
            {
              path: RouteEnum.WarehouseList,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [RouteEnum.WarehouseList] },
        )

        await testUtils.clickColTitle(user, 'Юридическое лицо')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = renderInRoute_latest(
          [
            {
              path: RouteEnum.WarehouseList,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [RouteEnum.WarehouseList] },
        )

        await testUtils.clickColTitle(user, 'Юридическое лицо')
        const headCell = testUtils.getHeadCell('Юридическое лицо')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Юридическое лицо')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )

        await testUtils.clickColTitle(user, 'Юридическое лицо')
        expect(headCell).not.toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )

        props.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Адрес', () => {
      test('Отображается корректно', () => {
        renderInRoute_latest(
          [
            {
              path: RouteEnum.WarehouseList,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [RouteEnum.WarehouseList] },
        )

        const headCell = testUtils.getHeadCell('Адрес')
        const title = testUtils.getColTitle('Адрес')
        const value = testUtils.getColValue(
          warehouseListItem.id,
          warehouseListItem.address,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = renderInRoute_latest(
          [
            {
              path: RouteEnum.WarehouseList,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [RouteEnum.WarehouseList] },
        )

        await testUtils.clickColTitle(user, 'Адрес')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = renderInRoute_latest(
          [
            {
              path: RouteEnum.WarehouseList,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [RouteEnum.WarehouseList] },
        )

        await testUtils.clickColTitle(user, 'Адрес')
        const headCell = testUtils.getHeadCell('Адрес')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Адрес')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )

        await testUtils.clickColTitle(user, 'Адрес')
        expect(headCell).not.toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )

        props.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Родительский склад', () => {
      test('Отображается корректно', () => {
        renderInRoute_latest(
          [
            {
              path: RouteEnum.WarehouseList,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [RouteEnum.WarehouseList] },
        )

        const headCell = testUtils.getHeadCell('Родительский склад')
        const title = testUtils.getColTitle('Родительский склад')
        const value = testUtils.getColValue(
          warehouseListItem.id,
          warehouseListItem.parent!.title,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = renderInRoute_latest(
          [
            {
              path: RouteEnum.WarehouseList,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [RouteEnum.WarehouseList] },
        )

        await testUtils.clickColTitle(user, 'Родительский склад')

        expect(props.onChange).toBeCalledTimes(1)
        expect(props.onChange).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })

      test('Сортировка работает корректно', async () => {
        const { user } = renderInRoute_latest(
          [
            {
              path: RouteEnum.WarehouseList,
              element: <WarehouseTable {...props} />,
            },
          ],
          { initialEntries: [RouteEnum.WarehouseList] },
        )

        await testUtils.clickColTitle(user, 'Родительский склад')
        const headCell = testUtils.getHeadCell('Родительский склад')
        expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Родительский склад')
        expect(headCell).toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )

        await testUtils.clickColTitle(user, 'Родительский склад')
        expect(headCell).not.toHaveAttribute(
          ariaSortAttrName,
          ariaSortAttrDescValue,
        )

        props.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })
  })
})
