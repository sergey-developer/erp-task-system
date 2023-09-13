import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as addOrEditNomenclatureGroupModalTestUtils } from 'modules/warehouse/components/AddOrEditNomenclatureGroupModal/AddOrEditNomenclatureGroupModal.test'
import { testUtils as addOrEditNomenclatureModalTestUtils } from 'modules/warehouse/components/AddOrEditNomenclatureModal/AddOrEditNomenclatureModal.test'
import { testUtils as nomenclatureTableTestUtils } from 'modules/warehouse/components/NomenclatureTable/NomenclatureTable.test'
import { createNomenclatureGroupMessages } from 'modules/warehouse/constants'

import warehouseFixtures from 'fixtures/warehouse'

import {
  mockCreateNomenclatureGroupBadRequestError,
  mockCreateNomenclatureGroupForbiddenError,
  mockCreateNomenclatureGroupServerError,
  mockCreateNomenclatureGroupSuccess,
  mockGetNomenclatureGroupListSuccess,
} from '_tests_/mocks/api'
import {
  expectLoadingFinishedBySpinner,
  expectLoadingStartedBySpinner,
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

// add nomenclature button
const getAddNomenclatureButton = () =>
  getButtonIn(getContainer(), /Добавить номенклатуру/)

const clickAddNomenclatureButton = async (user: UserEvent) => {
  const button = await getAddNomenclatureButton()
  await user.click(button)
}

// group list
const getGroupList = () => within(getContainer()).getByRole('menu')

const getGroupListItem = (name: string) =>
  within(getGroupList()).getByRole('menuitem', { name })

const getAllGroupListItems = () =>
  within(getGroupList()).getAllByRole('menuitem')

const expectGroupListLoadingStarted =
  expectLoadingStartedBySpinner('group-list-loading')

const expectGroupListLoadingFinished =
  expectLoadingFinishedBySpinner('group-list-loading')

export const testUtils = {
  getContainer,

  getSearchField,
  setSearchValue,

  getAddNomenclatureGroupButton,
  clickAddNomenclatureGroupButton,

  getAddNomenclatureButton,
  clickAddNomenclatureButton,

  getGroupList,
  getGroupListItem,
  getAllGroupListItems,
  expectGroupListLoadingStarted,
  expectGroupListLoadingFinished,
}

setupApiTests()
setupNotifications()

describe('Страница списка номенклатур', () => {
  describe('Поле поиска', () => {
    test('Отображается', async () => {
      mockGetNomenclatureGroupListSuccess({ body: [] })

      render(<NomenclatureListPage />)

      await testUtils.expectGroupListLoadingFinished()
      const field = testUtils.getSearchField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      mockGetNomenclatureGroupListSuccess({ body: [] })

      const { user } = render(<NomenclatureListPage />)

      await testUtils.expectGroupListLoadingFinished()
      const value = fakeWord()
      const field = await testUtils.setSearchValue(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Не активно при загрузке групп', async () => {
      mockGetNomenclatureGroupListSuccess({ body: [] })

      render(<NomenclatureListPage />)

      await testUtils.expectGroupListLoadingStarted()
      const field = await testUtils.getSearchField()

      expect(field).toBeDisabled()
    })

    test('После поиска группы отображаются', async () => {
      const groupListItem = warehouseFixtures.nomenclatureGroupListItem()
      const groupList = [groupListItem]
      mockGetNomenclatureGroupListSuccess({ body: groupList, once: false })

      const { user } = render(<NomenclatureListPage />)

      await testUtils.expectGroupListLoadingFinished()
      await testUtils.setSearchValue(user, groupListItem.title)
      await user.click(getButtonIn(getContainer(), 'search'))
      await testUtils.expectGroupListLoadingStarted()
      await testUtils.expectGroupListLoadingFinished()

      const allGroupListItems = testUtils.getAllGroupListItems()
      expect(allGroupListItems).toHaveLength(groupList.length)
    })
  })

  describe('Кнопка добавления группы', () => {
    test('Отображается', async () => {
      mockGetNomenclatureGroupListSuccess({ body: [] })

      render(<NomenclatureListPage />)

      const button = testUtils.getAddNomenclatureGroupButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('После клика отображается модалка', async () => {
      mockGetNomenclatureGroupListSuccess({ body: [] })

      const { user } = render(<NomenclatureListPage />)

      await testUtils.clickAddNomenclatureGroupButton(user)
      const modal =
        await addOrEditNomenclatureGroupModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })
  })

  describe('Добавление группы', () => {
    test('При успешном запросе закрывается модалка и в список добавляется новая группа', async () => {
      const groupList = [warehouseFixtures.nomenclatureGroupListItem()]
      mockGetNomenclatureGroupListSuccess({ body: groupList })

      const createdGroup = warehouseFixtures.nomenclatureGroupListItem()
      mockCreateNomenclatureGroupSuccess({ body: createdGroup })

      const { user } = render(<NomenclatureListPage />)

      await testUtils.expectGroupListLoadingFinished()
      await testUtils.clickAddNomenclatureGroupButton(user)
      const modal =
        await addOrEditNomenclatureGroupModalTestUtils.findContainer()
      await addOrEditNomenclatureGroupModalTestUtils.setName(user, fakeWord())
      await addOrEditNomenclatureGroupModalTestUtils.clickAddButton(user)
      await addOrEditNomenclatureGroupModalTestUtils.expectLoadingFinished()

      await waitFor(() => {
        expect(modal).not.toBeInTheDocument()
      })

      const allGroupListItems = testUtils.getAllGroupListItems()
      const lastGroupListItem = allGroupListItems[allGroupListItems.length - 1]
      expect(lastGroupListItem).toHaveTextContent(createdGroup.title)
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 400', async () => {
        mockGetNomenclatureGroupListSuccess({ body: [] })

        const detailErrorMessage = fakeWord()
        const titleErrorMessage = fakeWord()
        mockCreateNomenclatureGroupBadRequestError({
          body: { detail: detailErrorMessage, title: [titleErrorMessage] },
        })

        const { user } = render(<NomenclatureListPage />)

        await testUtils.clickAddNomenclatureGroupButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.findContainer()
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
        mockGetNomenclatureGroupListSuccess({ body: [] })

        const detailErrorMessage = fakeWord()
        mockCreateNomenclatureGroupForbiddenError({
          body: { detail: detailErrorMessage },
        })

        const { user } = render(<NomenclatureListPage />)

        await testUtils.clickAddNomenclatureGroupButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.findContainer()
        await addOrEditNomenclatureGroupModalTestUtils.setName(user, fakeWord())
        await addOrEditNomenclatureGroupModalTestUtils.clickAddButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.expectLoadingFinished()

        const notification = await findNotification(detailErrorMessage)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetNomenclatureGroupListSuccess({ body: [] })
        mockCreateNomenclatureGroupServerError()

        const { user } = render(<NomenclatureListPage />)

        await testUtils.clickAddNomenclatureGroupButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.findContainer()
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
      mockGetNomenclatureGroupListSuccess({ body: [] })

      render(<NomenclatureListPage />)

      const button = testUtils.getAddNomenclatureButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('После клика отображается модалка', async () => {
      mockGetNomenclatureGroupListSuccess({ body: [] })

      const { user } = render(<NomenclatureListPage />)

      await testUtils.clickAddNomenclatureButton(user)
      const modal =
        await addOrEditNomenclatureModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })
  })

  describe('Список групп', () => {
    test('Отображается', async () => {
      const groupList = [warehouseFixtures.nomenclatureGroupListItem()]
      mockGetNomenclatureGroupListSuccess({ body: groupList })

      render(<NomenclatureListPage />)

      await testUtils.expectGroupListLoadingFinished()

      groupList.forEach((g) => {
        const item = testUtils.getGroupListItem(g.title)
        expect(item).toBeInTheDocument()
      })
    })
  })

  test('Таблица номенклатур отображается', () => {
    mockGetNomenclatureGroupListSuccess({ body: [] })

    render(<NomenclatureListPage />)

    const table = nomenclatureTableTestUtils.getContainer()
    expect(table).toBeInTheDocument()
  })
})
