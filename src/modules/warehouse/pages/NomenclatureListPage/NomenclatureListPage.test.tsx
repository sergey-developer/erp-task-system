import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as addOrEditNomenclatureGroupModalTestUtils } from 'modules/warehouse/components/AddOrEditNomenclatureGroupModal/AddOrEditNomenclatureGroupModal.test'
import { testUtils as addOrEditNomenclatureItemModalTestUtils } from 'modules/warehouse/components/AddOrEditNomenclatureItemModal/AddOrEditNomenclatureItemModal.test'
import { testUtils as nomenclatureTableTestUtils } from 'modules/warehouse/components/NomenclatureTable/NomenclatureTable.test'
import { createNomenclatureGroupMessages } from 'modules/warehouse/constants'

import {
  mockCreateNomenclatureGroupBadRequestError,
  mockCreateNomenclatureGroupForbiddenError,
  mockCreateNomenclatureGroupServerError,
  mockCreateNomenclatureGroupSuccess,
} from '_tests_/mocks/api'
import {
  fakeWord,
  findNotification,
  getButtonIn,
  render,
  setupApiTests,
  setupNotifications,
} from '_tests_/utils'

import NomenclatureListPage from './index'

const getContainer = () => screen.getByTestId('nomenclature-list-page')

// search field
const getSearchField = () =>
  within(getContainer()).getByPlaceholderText('Поиск номенклатуры')

const setSearchValue = async (user: UserEvent, value: string) => {
  const field = getSearchField()
  await user.type(field, value)
  return field
}

// add nomenclature group button
const getAddNomenclatureGroupButton = () =>
  getButtonIn(getContainer(), /Добавить группу/)

const clickAddNomenclatureGroupButton = async (user: UserEvent) => {
  const button = await getAddNomenclatureGroupButton()
  await user.click(button)
}

// add nomenclature item button
const getAddNomenclatureItemButton = () =>
  getButtonIn(getContainer(), /Добавить номенклатуру/)

const clickAddNomenclatureItemButton = async (user: UserEvent) => {
  const button = await getAddNomenclatureItemButton()
  await user.click(button)
}

// group list
const getGroupList = () => within(getContainer()).getByTestId('group-list')

export const testUtils = {
  getContainer,

  getSearchField,
  setSearchValue,

  getAddNomenclatureGroupButton,
  clickAddNomenclatureGroupButton,

  getAddNomenclatureItemButton,
  clickAddNomenclatureItemButton,

  getGroupList,
}

setupApiTests()
setupNotifications()

describe('Страница списка номенклатур', () => {
  describe('Поле поиска', () => {
    test('Отображается', () => {
      render(<NomenclatureListPage />)

      const field = testUtils.getSearchField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<NomenclatureListPage />)

      const value = fakeWord()
      const field = await testUtils.setSearchValue(user, value)

      expect(field).toHaveDisplayValue(value)
    })
  })

  describe('Кнопка добавления группы', () => {
    test('Отображается', () => {
      render(<NomenclatureListPage />)

      const button = testUtils.getAddNomenclatureGroupButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('После клика отображается модалка', async () => {
      const { user } = render(<NomenclatureListPage />)

      await testUtils.clickAddNomenclatureGroupButton(user)
      const modal = addOrEditNomenclatureGroupModalTestUtils.getContainer()

      expect(modal).toBeInTheDocument()
    })
  })

  describe('Добавление группы', () => {
    test('При успешном запросе закрывается модалка и в список добавляется новая группа', async () => {
      // todo: добавить тесты для "в список добавляется новая группа" как будет готова интеграция со списком групп
      mockCreateNomenclatureGroupSuccess()

      const { user } = render(<NomenclatureListPage />)

      await testUtils.clickAddNomenclatureGroupButton(user)
      await addOrEditNomenclatureGroupModalTestUtils.setName(user, fakeWord())
      await addOrEditNomenclatureGroupModalTestUtils.clickAddButton(user)
      await addOrEditNomenclatureGroupModalTestUtils.expectLoadingFinished()

      const modal = addOrEditNomenclatureGroupModalTestUtils.queryContainer()

      await waitFor(() => {
        expect(modal).not.toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 400', async () => {
        const detailErrorMessage = fakeWord()
        const titleErrorMessage = fakeWord()

        mockCreateNomenclatureGroupBadRequestError({
          body: { detail: detailErrorMessage, title: [titleErrorMessage] },
        })

        const { user } = render(<NomenclatureListPage />)

        await testUtils.clickAddNomenclatureGroupButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.setName(user, fakeWord())
        await addOrEditNomenclatureGroupModalTestUtils.clickAddButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.expectLoadingFinished()

        const titleError =
          await addOrEditNomenclatureGroupModalTestUtils.findNameError(
            titleErrorMessage,
          )
        const notification = await findNotification(detailErrorMessage)

        expect(titleError).toBeInTheDocument()
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 403', async () => {
        const detailErrorMessage = fakeWord()

        mockCreateNomenclatureGroupForbiddenError({
          body: { detail: detailErrorMessage },
        })

        const { user } = render(<NomenclatureListPage />)

        await testUtils.clickAddNomenclatureGroupButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.setName(user, fakeWord())
        await addOrEditNomenclatureGroupModalTestUtils.clickAddButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.expectLoadingFinished()

        const notification = await findNotification(detailErrorMessage)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockCreateNomenclatureGroupServerError()

        const { user } = render(<NomenclatureListPage />)

        await testUtils.clickAddNomenclatureGroupButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.setName(user, fakeWord())
        await addOrEditNomenclatureGroupModalTestUtils.clickAddButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.expectLoadingFinished()

        const notification = await findNotification(
          createNomenclatureGroupMessages.commonError,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Кнопка добавления номенклатуры', () => {
    test('Отображается', () => {
      render(<NomenclatureListPage />)

      const button = testUtils.getAddNomenclatureItemButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('После клика отображается модалка', async () => {
      const { user } = render(<NomenclatureListPage />)

      await testUtils.clickAddNomenclatureItemButton(user)
      const modal = addOrEditNomenclatureItemModalTestUtils.getContainer()

      expect(modal).toBeInTheDocument()
    })
  })

  describe('Список групп', () => {
    test('Отображается', () => {
      render(<NomenclatureListPage />)
      const groupList = testUtils.getGroupList()
      expect(groupList).toBeInTheDocument()
    })
  })

  test('Таблица номенклатур отображается', () => {
    render(<NomenclatureListPage />)
    const table = nomenclatureTableTestUtils.getContainer()
    expect(table).toBeInTheDocument()
  })
})
