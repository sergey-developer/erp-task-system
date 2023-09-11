import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as addOrEditNomenclatureGroupModalTestUtils } from 'modules/warehouse/components/AddOrEditNomenclatureGroupModal/AddOrEditNomenclatureGroupModal.test'
import { testUtils as addOrEditNomenclatureModalTestUtils } from 'modules/warehouse/components/AddOrEditNomenclatureModal/AddOrEditNomenclatureModal.test'
import { testUtils as nomenclatureTableTestUtils } from 'modules/warehouse/components/NomenclatureTable/NomenclatureTable.test'
import { createNomenclatureGroupMessages } from 'modules/warehouse/constants'

import warehouseFixtures from '_tests_/fixtures/warehouse'

import {
  mockCreateNomenclatureGroupBadRequestError,
  mockCreateNomenclatureGroupForbiddenError,
  mockCreateNomenclatureGroupServerError,
  mockCreateNomenclatureGroupSuccess,
  mockGetNomenclatureGroupListSuccess,
  mockGetNomenclatureListSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  spinnerTestUtils,
  fakeWord,
  notificationTestUtils,
  render,
  setupApiTests,
} from '_tests_/utils'

import NomenclatureListPage from './index'

const getContainer = () => screen.getByTestId('nomenclature-list-page')

// search field
const getSearchField = () => within(getContainer()).getByPlaceholderText('Поиск номенклатуры')

const setSearchValue = async (user: UserEvent, value: string) => {
  const field = getSearchField()
  await user.type(field, value)
  return field
}

// add nomenclature group button
const getAddNomenclatureGroupButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Добавить группу/)

const queryAddNomenclatureGroupButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /Добавить группу/)

const clickAddNomenclatureGroupButton = async (user: UserEvent) => {
  const button = await getAddNomenclatureGroupButton()
  await user.click(button)
}

// add nomenclature button
const getAddNomenclatureButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Добавить номенклатуру/)

const queryAddNomenclatureButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /Добавить номенклатуру/)

const clickAddNomenclatureButton = async (user: UserEvent) => {
  const button = await getAddNomenclatureButton()
  await user.click(button)
}

// group list
const getGroupList = () => within(getContainer()).getByRole('menu')

const getGroupListItem = (name: string) => within(getGroupList()).getByRole('menuitem', { name })

const getAllGroupListItems = () => within(getGroupList()).getAllByRole('menuitem')

const expectGroupListLoadingStarted = spinnerTestUtils.expectLoadingStarted('group-list-loading')

const expectGroupListLoadingFinished = spinnerTestUtils.expectLoadingFinished('group-list-loading')

export const testUtils = {
  getContainer,

  getSearchField,
  setSearchValue,

  getAddNomenclatureGroupButton,
  queryAddNomenclatureGroupButton,
  clickAddNomenclatureGroupButton,

  getAddNomenclatureButton,
  queryAddNomenclatureButton,
  clickAddNomenclatureButton,

  getGroupList,
  getGroupListItem,
  getAllGroupListItems,
  expectGroupListLoadingStarted,
  expectGroupListLoadingFinished,
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница списка номенклатур', () => {
  describe('Поле поиска', () => {
    test('Отображается', async () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      render(<NomenclatureListPage />)

      await testUtils.expectGroupListLoadingFinished()
      const field = testUtils.getSearchField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      const { user } = render(<NomenclatureListPage />)

      await testUtils.expectGroupListLoadingFinished()
      const value = fakeWord()
      const field = await testUtils.setSearchValue(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Не активно при загрузке групп', async () => {
      mockGetNomenclatureListSuccess()
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

      mockGetNomenclatureListSuccess({ once: false })

      const { user } = render(<NomenclatureListPage />)

      await testUtils.expectGroupListLoadingFinished()
      await testUtils.setSearchValue(user, groupListItem.title)
      await user.click(buttonTestUtils.getButtonIn(getContainer(), 'search'))
      await testUtils.expectGroupListLoadingStarted()
      await testUtils.expectGroupListLoadingFinished()

      const allGroupListItems = testUtils.getAllGroupListItems()
      expect(allGroupListItems).toHaveLength(groupList.length)
    })
  })

  describe('Кнопка добавления группы', () => {
    test('Отображается если есть права', () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      render(<NomenclatureListPage />, {
        preloadedState: {
          api: {
            // @ts-ignore
            queries: {
              ...getUserMeQueryMock({
                permissions: ['NOMENCLATURE_GROUPS_CREATE'],
              }),
            },
          },
        },
      })

      const button = testUtils.getAddNomenclatureGroupButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если нет прав', () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      render(<NomenclatureListPage />)

      const button = testUtils.queryAddNomenclatureGroupButton()
      expect(button).not.toBeInTheDocument()
    })

    test('После клика отображается модалка', async () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      const { user } = render(<NomenclatureListPage />, {
        preloadedState: {
          api: {
            // @ts-ignore
            queries: {
              ...getUserMeQueryMock({
                permissions: ['NOMENCLATURE_GROUPS_CREATE'],
              }),
            },
          },
        },
      })

      await testUtils.clickAddNomenclatureGroupButton(user)
      const modal = await addOrEditNomenclatureGroupModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })
  })

  describe('Добавление группы', () => {
    test('При успешном запросе закрывается модалка и в список добавляется новая группа', async () => {
      const groupList = [warehouseFixtures.nomenclatureGroupListItem()]
      mockGetNomenclatureGroupListSuccess({ body: groupList })

      const createdGroup = warehouseFixtures.nomenclatureGroupListItem()
      mockCreateNomenclatureGroupSuccess({ body: createdGroup })

      mockGetNomenclatureListSuccess()

      const { user } = render(<NomenclatureListPage />, {
        preloadedState: {
          api: {
            // @ts-ignore
            queries: {
              ...getUserMeQueryMock({
                permissions: ['NOMENCLATURE_GROUPS_CREATE'],
              }),
            },
          },
        },
      })

      await testUtils.expectGroupListLoadingFinished()
      await testUtils.clickAddNomenclatureGroupButton(user)
      const modal = await addOrEditNomenclatureGroupModalTestUtils.findContainer()
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

        mockGetNomenclatureListSuccess()

        const { user } = render(<NomenclatureListPage />, {
          preloadedState: {
            api: {
              // @ts-ignore
              queries: {
                ...getUserMeQueryMock({
                  permissions: ['NOMENCLATURE_GROUPS_CREATE'],
                }),
              },
            },
          },
        })

        await testUtils.clickAddNomenclatureGroupButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.findContainer()
        await addOrEditNomenclatureGroupModalTestUtils.setName(user, fakeWord())
        await addOrEditNomenclatureGroupModalTestUtils.clickAddButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.expectLoadingFinished()

        const titleError = await addOrEditNomenclatureGroupModalTestUtils.findNameError(
          titleErrorMessage,
        )
        const notification = await notificationTestUtils.findNotification(detailErrorMessage)

        expect(titleError).toBeInTheDocument()
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 403', async () => {
        mockGetNomenclatureGroupListSuccess({ body: [] })

        const detailErrorMessage = fakeWord()
        mockCreateNomenclatureGroupForbiddenError({
          body: { detail: detailErrorMessage },
        })

        mockGetNomenclatureListSuccess()

        const { user } = render(<NomenclatureListPage />, {
          preloadedState: {
            api: {
              // @ts-ignore
              queries: {
                ...getUserMeQueryMock({
                  permissions: ['NOMENCLATURE_GROUPS_CREATE'],
                }),
              },
            },
          },
        })

        await testUtils.clickAddNomenclatureGroupButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.findContainer()
        await addOrEditNomenclatureGroupModalTestUtils.setName(user, fakeWord())
        await addOrEditNomenclatureGroupModalTestUtils.clickAddButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.expectLoadingFinished()

        const notification = await notificationTestUtils.findNotification(detailErrorMessage)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetNomenclatureGroupListSuccess({ body: [] })
        mockCreateNomenclatureGroupServerError()
        mockGetNomenclatureListSuccess()

        const { user } = render(<NomenclatureListPage />, {
          preloadedState: {
            api: {
              // @ts-ignore
              queries: {
                ...getUserMeQueryMock({
                  permissions: ['NOMENCLATURE_GROUPS_CREATE'],
                }),
              },
            },
          },
        })

        await testUtils.clickAddNomenclatureGroupButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.findContainer()
        await addOrEditNomenclatureGroupModalTestUtils.setName(user, fakeWord())
        await addOrEditNomenclatureGroupModalTestUtils.clickAddButton(user)
        await addOrEditNomenclatureGroupModalTestUtils.expectLoadingFinished()

        const notification = await notificationTestUtils.findNotification(
          createNomenclatureGroupMessages.commonError,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Кнопка добавления номенклатуры', () => {
    test('Отображается если есть права', () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      render(<NomenclatureListPage />, {
        preloadedState: {
          api: {
            // @ts-ignore
            queries: {
              ...getUserMeQueryMock({
                permissions: ['NOMENCLATURES_CREATE'],
              }),
            },
          },
        },
      })

      const button = testUtils.getAddNomenclatureButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если нет прав', () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      render(<NomenclatureListPage />)

      const button = testUtils.queryAddNomenclatureButton()
      expect(button).not.toBeInTheDocument()
    })

    test('После клика отображается модалка', async () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      const { user } = render(<NomenclatureListPage />, {
        preloadedState: {
          api: {
            // @ts-ignore
            queries: {
              ...getUserMeQueryMock({
                permissions: ['NOMENCLATURES_CREATE'],
              }),
            },
          },
        },
      })

      await testUtils.clickAddNomenclatureButton(user)
      const modal = await addOrEditNomenclatureModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })
  })

  describe('Список групп', () => {
    test('Отображается', async () => {
      const groupList = [warehouseFixtures.nomenclatureGroupListItem()]
      mockGetNomenclatureGroupListSuccess({ body: groupList })

      mockGetNomenclatureListSuccess()

      render(<NomenclatureListPage />)

      await testUtils.expectGroupListLoadingFinished()

      groupList.forEach((g) => {
        const item = testUtils.getGroupListItem(g.title)
        expect(item).toBeInTheDocument()
      })
    })
  })

  test('Таблица номенклатур отображается', () => {
    mockGetNomenclatureListSuccess()
    mockGetNomenclatureGroupListSuccess({ body: [] })

    render(<NomenclatureListPage />)

    const table = nomenclatureTableTestUtils.getContainer()
    expect(table).toBeInTheDocument()
  })
})
