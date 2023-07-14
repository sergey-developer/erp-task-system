import { screen, within } from '@testing-library/react'

import { render } from '_tests_/utils'

import WarehousePage from './index'

const getContainer = () => screen.getByTestId('warehouse-page')

const getChildByText = (value: string) =>
  within(getContainer()).getByText(value)

export const testUtils = {
  getContainer,
  getChildByText,
}

describe('Страница склада', () => {
  describe('Наименование объекта', () => {
    test('Отображается корректно', () => {
      render(<WarehousePage />)

      const label = testUtils.getChildByText('Наименование объекта')
      const value = testUtils.getChildByText('ООО “СКЛАД”')

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Родительский склад', () => {
    test('Отображается корректно', () => {
      render(<WarehousePage />)

      const label = testUtils.getChildByText('Родительский склад')
      const value = testUtils.getChildByText('ООО “СКЛАД-ОСНОВНОЙ”')

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Юридическое лицо', () => {
    test('Отображается корректно', () => {
      render(<WarehousePage />)

      const label = testUtils.getChildByText('Юридическое лицо')
      const value = testUtils.getChildByText(
        'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "СКЛАД"',
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Адрес', () => {
    test('Отображается корректно', () => {
      render(<WarehousePage />)

      const label = testUtils.getChildByText('Адрес')
      const value = testUtils.getChildByText(
        '123112, город Москва, Пресненская наб, д. 10 стр. 2, помещ. 5н офис 337',
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Договор', () => {
    test('Отображается корректно', () => {
      render(<WarehousePage />)

      const label = testUtils.getChildByText('Договор')
      const value = testUtils.getChildByText(
        'Договор складского хранения №55369',
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('Прочие данные', () => {
    test('Отображается корректно', () => {
      render(<WarehousePage />)

      const label = testUtils.getChildByText('Прочие данные')
      const value = testUtils.getChildByText('Прочие данные о складе')

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })
})
