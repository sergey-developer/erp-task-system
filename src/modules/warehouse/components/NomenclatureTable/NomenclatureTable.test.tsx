import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { RouteEnum } from 'configs/routes'

import { MaybeNull } from 'shared/types/utils'

import {
  expectLoadingFinishedByIconIn,
  expectLoadingStartedByIconIn,
  fakeInteger,
  fakeWord,
  renderInRoute_latest,
} from '_tests_/utils'

import WarehouseTable from './index'
import NomenclatureTable from './index'
import { NomenclatureTableItem, NomenclatureTableProps } from './types'

const nomenclatureListItem = {
  id: 1,
  title: fakeWord(),
  vendorCode: fakeInteger(),
}

const props: Readonly<NomenclatureTableProps> = {
  dataSource: [nomenclatureListItem],
  loading: false,
}

const getContainer = () => screen.getByTestId('nomenclature-table')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const queryChildByText = (text: string) =>
  within(getContainer()).queryByText(text)

const getRow = (id: NomenclatureTableItem['id']): MaybeNull<HTMLElement> =>
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
  id: NomenclatureTableItem['id'],
  value: string,
): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// title
const getTitleLink = (
  id: NomenclatureTableItem['id'],
  title: string,
): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByRole('link', { name: title }) : null
}

const clickTitleLink = async (
  user: UserEvent,
  id: NomenclatureTableItem['id'],
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

describe('Таблица номенклатуры', () => {
  test('Отображается корректно', () => {
    renderInRoute_latest(
      [
        {
          path: RouteEnum.NomenclatureList,
          element: <NomenclatureTable {...props} />,
        },
      ],
      { initialEntries: [RouteEnum.NomenclatureList] },
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

        // const headCell = testUtils.getHeadCell('Наименование объекта')
        const title = testUtils.getColTitle('Наименование объекта')
        const link = testUtils.getTitleLink(
          nomenclatureListItem.id,
          nomenclatureListItem.title,
        )

        expect(title).toBeInTheDocument()
        expect(link).toBeInTheDocument()
        // expect(link).toHaveAttribute(
        //   'href',
        //   `${getWarehousePageLink(warehouseListItem.id)}?name=${
        //     warehouseListItem.title
        //   }`,
        // )
      })

      test.todo('При клике открывается модалка')
    })

    describe('Юридическое лицо', () => {
      test('Отображается корректно', () => {
        renderInRoute_latest(
          [
            {
              path: RouteEnum.NomenclatureList,
              element: <NomenclatureTable {...props} />,
            },
          ],
          { initialEntries: [RouteEnum.NomenclatureList] },
        )

        // const headCell = testUtils.getHeadCell('Юридическое лицо')
        const title = testUtils.getColTitle('Юридическое лицо')
        const value = testUtils.getColValue(
          nomenclatureListItem.id,
          String(nomenclatureListItem.vendorCode),
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })
  })
})
