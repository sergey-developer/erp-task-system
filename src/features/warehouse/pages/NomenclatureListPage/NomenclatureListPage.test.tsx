import { waitFor } from '@testing-library/react'

import { UserPermissionsEnum } from 'features/user/constants'
import { createNomenclatureGroupMessages } from 'features/warehouse/constants/nomenclatureGroup'

import { nomenclatureFormModalTestUtils } from '_tests_/features/warehouse/components/NomenclatureFormModal/testUtils'
import { nomenclatureGroupFormModalTestUtils } from '_tests_/features/warehouse/components/NomenclatureGroupFormModal/testUtils'
import { nomenclatureTableTestUtils } from '_tests_/features/warehouse/components/NomenclatureTable/testUtils'
import { nomenclatureListPageTestUtils } from '_tests_/features/warehouse/pages/NomenclatureListPage/testUtils'
import userFixtures from '_tests_/fixtures/user'
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
  fakeWord,
  getStoreWithAuth,
  menuTestUtils,
  notificationTestUtils,
  render,
  setupApiTests,
} from '_tests_/utils'

import NomenclatureListPage from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница списка номенклатур', () => {
  describe('Поле поиска', () => {
    test('Отображается', async () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      render(<NomenclatureListPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await nomenclatureListPageTestUtils.expectGroupListLoadingFinished()
      await nomenclatureTableTestUtils.expectLoadingFinished()
      const field = nomenclatureListPageTestUtils.getSearchField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      const { user } = render(<NomenclatureListPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await nomenclatureListPageTestUtils.expectGroupListLoadingFinished()
      await nomenclatureTableTestUtils.expectLoadingFinished()
      const value = fakeWord()
      const field = await nomenclatureListPageTestUtils.setSearchValue(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Не активно при загрузке групп', async () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      render(<NomenclatureListPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await nomenclatureListPageTestUtils.expectGroupListLoadingStarted()
      const field = await nomenclatureListPageTestUtils.getSearchField()

      expect(field).toBeDisabled()
    })

    test('После поиска группы отображаются', async () => {
      const groupListItem = warehouseFixtures.nomenclatureGroupListItem()
      const groupList = [groupListItem]
      mockGetNomenclatureGroupListSuccess({ body: groupList, once: false })

      mockGetNomenclatureListSuccess({ once: false })

      const { user } = render(<NomenclatureListPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await nomenclatureListPageTestUtils.expectGroupListLoadingFinished()
      await nomenclatureTableTestUtils.expectLoadingFinished()
      await nomenclatureListPageTestUtils.setSearchValue(user, groupListItem.title)
      await user.click(
        buttonTestUtils.getButtonIn(nomenclatureListPageTestUtils.getContainer(), 'search'),
      )
      await nomenclatureListPageTestUtils.expectGroupListLoadingStarted()
      await nomenclatureListPageTestUtils.expectGroupListLoadingFinished()

      groupList.forEach((group) => {
        expect(nomenclatureListPageTestUtils.getGroupListItem(group.title)).toBeInTheDocument()
      })
    })
  })

  describe('Кнопка добавления группы', () => {
    test('Отображается если есть права', () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      render(<NomenclatureListPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.NomenclatureGroupsCreate] }),
          },
        }),
      })

      const button = nomenclatureListPageTestUtils.getAddNomenclatureGroupButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если нет прав', () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      render(<NomenclatureListPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = nomenclatureListPageTestUtils.queryAddNomenclatureGroupButton()
      expect(button).not.toBeInTheDocument()
    })

    test('После клика отображается модалка', async () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      const { user } = render(<NomenclatureListPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.NomenclatureGroupsCreate] }),
          },
        }),
      })

      await nomenclatureListPageTestUtils.clickAddNomenclatureGroupButton(user)
      const modal = await nomenclatureGroupFormModalTestUtils.findContainer()

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
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.NomenclatureGroupsCreate] }),
          },
        }),
      })

      await nomenclatureListPageTestUtils.expectGroupListLoadingFinished()
      await nomenclatureListPageTestUtils.clickAddNomenclatureGroupButton(user)
      const modal = await nomenclatureGroupFormModalTestUtils.findContainer()
      await nomenclatureGroupFormModalTestUtils.setName(user, fakeWord())
      await nomenclatureGroupFormModalTestUtils.clickAddButton(user)
      await nomenclatureGroupFormModalTestUtils.expectLoadingFinished()
      await waitFor(() => expect(modal).not.toBeInTheDocument())
      const newGroupItem = nomenclatureListPageTestUtils.getGroupListItem(createdGroup.title)

      expect(newGroupItem).toBeInTheDocument()
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
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({
                permissions: [UserPermissionsEnum.NomenclatureGroupsCreate],
              }),
            },
          }),
        })

        await nomenclatureListPageTestUtils.clickAddNomenclatureGroupButton(user)
        await nomenclatureGroupFormModalTestUtils.findContainer()
        await nomenclatureGroupFormModalTestUtils.setName(user, fakeWord())
        await nomenclatureGroupFormModalTestUtils.clickAddButton(user)
        await nomenclatureGroupFormModalTestUtils.expectLoadingFinished()

        const titleError = await nomenclatureGroupFormModalTestUtils.findNameError(
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
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({
                permissions: [UserPermissionsEnum.NomenclatureGroupsCreate],
              }),
            },
          }),
        })

        await nomenclatureListPageTestUtils.clickAddNomenclatureGroupButton(user)
        await nomenclatureGroupFormModalTestUtils.findContainer()
        await nomenclatureGroupFormModalTestUtils.setName(user, fakeWord())
        await nomenclatureGroupFormModalTestUtils.clickAddButton(user)
        await nomenclatureGroupFormModalTestUtils.expectLoadingFinished()

        const notification = await notificationTestUtils.findNotification(detailErrorMessage)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetNomenclatureGroupListSuccess({ body: [] })
        mockCreateNomenclatureGroupServerError()
        mockGetNomenclatureListSuccess()

        const { user } = render(<NomenclatureListPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({
                permissions: [UserPermissionsEnum.NomenclatureGroupsCreate],
              }),
            },
          }),
        })

        await nomenclatureListPageTestUtils.clickAddNomenclatureGroupButton(user)
        await nomenclatureGroupFormModalTestUtils.findContainer()
        await nomenclatureGroupFormModalTestUtils.setName(user, fakeWord())
        await nomenclatureGroupFormModalTestUtils.clickAddButton(user)
        await nomenclatureGroupFormModalTestUtils.expectLoadingFinished()

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
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.NomenclaturesCreate] }),
          },
        }),
      })

      const button = nomenclatureListPageTestUtils.getAddNomenclatureButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если нет прав', () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      render(<NomenclatureListPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = nomenclatureListPageTestUtils.queryAddNomenclatureButton()
      expect(button).not.toBeInTheDocument()
    })

    test('После клика отображается модалка', async () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      const { user } = render(<NomenclatureListPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.NomenclaturesCreate] }),
          },
        }),
      })

      await nomenclatureListPageTestUtils.clickAddNomenclatureButton(user)
      const modal = await nomenclatureFormModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })
  })

  describe('Кнопка всей номенклатуры', () => {
    test('Отображается', async () => {
      mockGetNomenclatureListSuccess()
      mockGetNomenclatureGroupListSuccess({ body: [] })

      render(<NomenclatureListPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await nomenclatureListPageTestUtils.expectGroupListLoadingFinished()
      await nomenclatureTableTestUtils.expectLoadingFinished()
      const button = nomenclatureListPageTestUtils.getAllNomenclatureButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике перезапрашивается номенклатура', async () => {
      mockGetNomenclatureListSuccess({ once: false })
      const nomenclatureGroupListItem = warehouseFixtures.nomenclatureGroupListItem()
      mockGetNomenclatureGroupListSuccess({ body: [nomenclatureGroupListItem] })

      const { user } = render(<NomenclatureListPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await nomenclatureListPageTestUtils.expectGroupListLoadingFinished()
      await nomenclatureTableTestUtils.expectLoadingFinished()
      await menuTestUtils.clickMenuItem(nomenclatureGroupListItem.title, user)
      await nomenclatureTableTestUtils.expectLoadingStarted()
      await nomenclatureTableTestUtils.expectLoadingFinished()
      await nomenclatureListPageTestUtils.clickAllNomenclatureButton(user)
      await nomenclatureTableTestUtils.expectLoadingStarted()
      await nomenclatureTableTestUtils.expectLoadingFinished()
    })
  })

  describe('Список групп', () => {
    test('Отображается', async () => {
      const groupList = [warehouseFixtures.nomenclatureGroupListItem()]
      mockGetNomenclatureGroupListSuccess({ body: groupList })
      mockGetNomenclatureListSuccess()

      render(<NomenclatureListPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await nomenclatureListPageTestUtils.expectGroupListLoadingFinished()

      groupList.forEach((g) => {
        const item = nomenclatureListPageTestUtils.getGroupListItem(g.title)
        expect(item).toBeInTheDocument()
      })
    })
  })

  test('Таблица номенклатур отображается', () => {
    mockGetNomenclatureListSuccess()
    mockGetNomenclatureGroupListSuccess({ body: [] })

    render(<NomenclatureListPage />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })

    const table = nomenclatureTableTestUtils.getContainer()
    expect(table).toBeInTheDocument()
  })
})
