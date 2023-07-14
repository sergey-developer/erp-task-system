import { within, screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { RouteEnum } from 'configs/routes'

import { getWarehousePageLink } from 'modules/warehouse/utils'

import { MaybeNull } from 'shared/interfaces/utils'

import warehouseFixtures from 'fixtures/warehouse'

import {
  ariaSortAttrName,
  columnWithSortingClass,
} from '_tests_/constants/components'
import {
  expectLoadingFinishedByIconIn,
  expectLoadingStartedByIconIn,
} from '_tests_/utils'
import { renderInRoute_latest } from '_tests_/utils/renderInRoute'

import WarehouseTable from './index'
import { WarehouseTableItem, WarehouseTableProps } from './interfaces'

const fakeWarehouseListItem = warehouseFixtures.warehouseListItem()

const props: Readonly<WarehouseTableProps> = {
  dataSource: [fakeWarehouseListItem],
  loading: false,
}

const getContainer = () => screen.getByTestId('warehouse-table')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const queryChildByText = (text: string) =>
  within(getContainer()).queryByText(text)

const getRow = (id: WarehouseTableItem['id']): MaybeNull<HTMLElement> =>
  // eslint-disable-next-line testing-library/no-node-access
  getContainer().querySelector(`[data-row-key='${id}']`)

const getHeadCell = (text: string) => {
  // eslint-disable-next-line testing-library/no-node-access
  return getChildByText(text).parentElement?.parentElement!
}

const getColTitle = getChildByText
const queryColTitle = queryChildByText

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
  getChildByText,
  queryChildByText,
  getHeadCell,
  getColTitle,
  getColValue,
  queryColTitle,
  clickColTitle,

  getTitleLink,
  clickTitleLink,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Таблица заявок фискальных накопителей', () => {
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
          fakeWarehouseListItem.id,
          fakeWarehouseListItem.title,
        )

        expect(title).toBeInTheDocument()
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute(
          'href',
          getWarehousePageLink(fakeWarehouseListItem.id),
        )
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })

      test.todo('При клике на заголовок обработчик вызывается корректно')
      test.todo('Сортировка работает корректно')
      test.todo('При клике переходит на страницу склада')
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
          fakeWarehouseListItem.id,
          fakeWarehouseListItem.legalEntity.title,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
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
          fakeWarehouseListItem.id,
          fakeWarehouseListItem.address,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
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
          fakeWarehouseListItem.id,
          fakeWarehouseListItem.parent!.title,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
        expect(headCell).toHaveClass(columnWithSortingClass)
        expect(headCell).not.toHaveAttribute(ariaSortAttrName)
      })
    })
  })
})
