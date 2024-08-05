import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { equipmentConditionDict } from 'modules/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'
import { MaybeNull, NumberOrString } from 'shared/types/utils'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { buttonTestUtils, render, tableTestUtils } from '_tests_/utils'

import RelocationEquipmentTable from './index'
import { RelocationEquipmentTableProps } from './types'

const relocationEquipmentListItem = warehouseFixtures.relocationEquipmentListItem()

const props: Readonly<RelocationEquipmentTableProps> = {
  dataSource: [relocationEquipmentListItem],
  loading: false,
  onClickImages: jest.fn(),
}

const getContainer = () => screen.getByTestId('relocation-equipment-table')

const getRow = (id: IdType) => tableTestUtils.getRowById(getContainer(), id)

const getHeadCell = (text: string) => tableTestUtils.getHeadCell(getContainer(), text)

const getColTitle = (text: string) => within(getContainer()).getByText(text)

const getColValue = (id: IdType, value: NumberOrString): MaybeNull<HTMLElement> => {
  const row = getRow(id)
  return row ? within(row).getByText(value) : null
}

// images col
const getViewImagesButton = (id: IdType) => buttonTestUtils.getButtonIn(getRow(id), 'Посмотреть')
const clickViewImagesButton = async (user: UserEvent, id: IdType) => {
  const button = getViewImagesButton(id)
  await user.click(button)
}

// loading
const expectLoadingStarted = () => tableTestUtils.expectLoadingStarted(getContainer())

const expectLoadingFinished = async (): Promise<HTMLElement> => {
  const container = getContainer()
  await tableTestUtils.expectLoadingFinished(container)
  return container
}

export const testUtils = {
  getContainer,
  getRow,
  getHeadCell,
  getColTitle,
  getColValue,

  getViewImagesButton,
  clickViewImagesButton,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Таблица перечня оборудования заявки на перемещение оборудования', () => {
  test('Отображается корректно', () => {
    render(<RelocationEquipmentTable {...props} />)

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)

    props.dataSource.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Оборудование', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Оборудование')
      const value = testUtils.getColValue(
        relocationEquipmentListItem.id,
        relocationEquipmentListItem.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Серийный номер', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Серийный номер')
      const value = testUtils.getColValue(
        relocationEquipmentListItem.id,
        relocationEquipmentListItem.serialNumber!,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Назначение', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Назначение')
      const value = testUtils.getColValue(
        relocationEquipmentListItem.id,
        relocationEquipmentListItem.purpose,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Состояние', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Состояние')
      const value = testUtils.getColValue(
        relocationEquipmentListItem.id,
        equipmentConditionDict[relocationEquipmentListItem.condition],
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Количество', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Количество')
      const value = testUtils.getColValue(
        relocationEquipmentListItem.id,
        relocationEquipmentListItem.quantity,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Стоимость', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Стоимость')
      const value = testUtils.getColValue(
        relocationEquipmentListItem.id,
        relocationEquipmentListItem.price!,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Валюта', () => {
    test('Отображается корректно', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Валюта')
      const value = testUtils.getColValue(
        relocationEquipmentListItem.id,
        relocationEquipmentListItem.currency!.title,
      )

      expect(title).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Изображения', () => {
    test('Заголовок и кнопка отображаются', () => {
      render(<RelocationEquipmentTable {...props} />)

      const title = testUtils.getColTitle('Изображения')
      const button = testUtils.getViewImagesButton(relocationEquipmentListItem.id)

      expect(title).toBeInTheDocument()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике на кнопку обработчик вызывается', async () => {
      const { user } = render(<RelocationEquipmentTable {...props} />)

      await testUtils.clickViewImagesButton(user, relocationEquipmentListItem.id)

      expect(props.onClickImages).toBeCalledTimes(1)
      expect(props.onClickImages).toBeCalledWith(expect.anything(), relocationEquipmentListItem)
    })
  })
})
