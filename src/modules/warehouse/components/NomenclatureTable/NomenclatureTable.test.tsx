import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

import warehouseFixtures from 'fixtures/warehouse'

import { iconTestUtils, render } from '_tests_/utils'

import NomenclatureTable from './index'
import { NomenclatureTableItem, NomenclatureTableProps } from './types'

const nomenclatureListItem = warehouseFixtures.nomenclatureListItem()

const props: Readonly<NomenclatureTableProps> = {
  dataSource: [nomenclatureListItem],
  pagination: false,
  loading: false,
  onChange: jest.fn(),
  onClickName: jest.fn(),
}

const getContainer = () => screen.getByTestId('nomenclature-table')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const queryChildByText = (text: string) => within(getContainer()).queryByText(text)

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
  value: NumberOrString,
): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// loading
const expectLoadingStarted = () => iconTestUtils.expectLoadingStartedIn(getContainer())

const expectLoadingFinished = () => iconTestUtils.expectLoadingFinishedIn(getContainer())

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

  expectLoadingStarted,
  expectLoadingFinished,
}

// todo: написать тесты на пагинацию

describe('Таблица номенклатуры', () => {
  test('Отображается корректно', () => {
    render(<NomenclatureTable {...props} />)

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Колонка', () => {
    describe('Наименование', () => {
      test('Отображается корректно', () => {
        render(<NomenclatureTable {...props} />)

        const title = testUtils.getColTitle('Наименование')
        const value = testUtils.getColValue(nomenclatureListItem.id, nomenclatureListItem.title)

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test.todo('При клике открывается модалка')
    })

    describe('Юридическое лицо', () => {
      test('Отображается корректно', () => {
        render(<NomenclatureTable {...props} />)

        const title = testUtils.getColTitle('Артикул')
        const value = testUtils.getColValue(
          nomenclatureListItem.id,
          nomenclatureListItem.vendorCode,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })
  })
})
