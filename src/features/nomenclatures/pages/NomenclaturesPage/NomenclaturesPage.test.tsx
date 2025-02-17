import { waitFor } from '@testing-library/react'
import { createNomenclatureGroupErrorMessage } from 'features/nomenclatures/api/constants'
import { UserPermissionsEnum } from 'features/users/api/constants'

import { nomenclatureFormModalTestUtils } from '_tests_/features/warehouses/components/NomenclatureFormModal/testUtils'
import { nomenclatureGroupFormModalTestUtils } from '_tests_/features/warehouses/components/NomenclatureGroupFormModal/testUtils'
import { nomenclatureTableTestUtils } from '_tests_/features/warehouses/components/NomenclatureTable/testUtils'
import { nomenclatureListPageTestUtils } from '_tests_/features/warehouses/pages/NomenclatureListPage/testUtils'
import userFixtures from '_tests_/fixtures/users'
import warehousesFixtures from '_tests_/fixtures/warehouse'
import {
  buttonTestUtils,
  fakeWord,
  getStoreWithAuth,
  menuTestUtils,
  notificationTestUtils,
  render,
  setupApiTests,
} from '_tests_/helpers'
import {
  mockCreateNomenclatureGroupBadRequestError,
  mockCreateNomenclatureGroupForbiddenError,
  mockCreateNomenclatureGroupServerError,
  mockCreateNomenclatureGroupSuccess,
  mockGetNomenclatureGroupsSuccess,
  mockGetNomenclaturesSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/store/users'

import NomenclaturesPage from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница списка номенклатур', () => {
  describe('Поле поиска', () => {
    test('Отображается', async () => {
      mockGetNomenclaturesSuccess()
      mockGetNomenclatureGroupsSuccess({ body: [] })

      render(<NomenclaturesPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
      mockGetNomenclaturesSuccess()
      mockGetNomenclatureGroupsSuccess({ body: [] })

      const { user } = render(<NomenclaturesPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await nomenclatureListPageTestUtils.expectGroupListLoadingFinished()
      await nomenclatureTableTestUtils.expectLoadingFinished()
      const value = fakeWord()
      const field = await nomenclatureListPageTestUtils.setSearchValue(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Не активно при загрузке групп', async () => {
      mockGetNomenclaturesSuccess()
      mockGetNomenclatureGroupsSuccess({ body: [] })

      render(<NomenclaturesPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await nomenclatureListPageTestUtils.expectGroupListLoadingStarted()
      const field = await nomenclatureListPageTestUtils.getSearchField()

      expect(field).toBeDisabled()
    })

    test('После поиска группы отображаются', async () => {
      const groupListItem = warehousesFixtures.nomenclatureGroupListItem()
      const groupList = [groupListItem]
      mockGetNomenclatureGroupsSuccess({ body: groupList, once: false })

      mockGetNomenclaturesSuccess({ once: false })

      const { user } = render(<NomenclaturesPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
      mockGetNomenclaturesSuccess()
      mockGetNomenclatureGroupsSuccess({ body: [] })

      render(<NomenclaturesPage />, {
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
      mockGetNomenclaturesSuccess()
      mockGetNomenclatureGroupsSuccess({ body: [] })

      render(<NomenclaturesPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const button = nomenclatureListPageTestUtils.queryAddNomenclatureGroupButton()
      expect(button).not.toBeInTheDocument()
    })

    test('После клика отображается модалка', async () => {
      mockGetNomenclaturesSuccess()
      mockGetNomenclatureGroupsSuccess({ body: [] })

      const { user } = render(<NomenclaturesPage />, {
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
      const groupList = [warehousesFixtures.nomenclatureGroupListItem()]
      mockGetNomenclatureGroupsSuccess({ body: groupList })

      const createdGroup = warehousesFixtures.nomenclatureGroupListItem()
      mockCreateNomenclatureGroupSuccess({ body: createdGroup })
      mockGetNomenclaturesSuccess()

      const { user } = render(<NomenclaturesPage />, {
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
        mockGetNomenclatureGroupsSuccess({ body: [] })

        const detailErrorMessage = fakeWord()
        const titleErrorMessage = fakeWord()
        mockCreateNomenclatureGroupBadRequestError({
          body: { detail: detailErrorMessage, title: [titleErrorMessage] },
        })

        mockGetNomenclaturesSuccess()

        const { user } = render(<NomenclaturesPage />, {
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
        mockGetNomenclatureGroupsSuccess({ body: [] })

        const detailErrorMessage = fakeWord()
        mockCreateNomenclatureGroupForbiddenError({
          body: { detail: detailErrorMessage },
        })

        mockGetNomenclaturesSuccess()

        const { user } = render(<NomenclaturesPage />, {
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
        mockGetNomenclatureGroupsSuccess({ body: [] })
        mockCreateNomenclatureGroupServerError()
        mockGetNomenclaturesSuccess()

        const { user } = render(<NomenclaturesPage />, {
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
          createNomenclatureGroupErrorMessage,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Кнопка добавления номенклатуры', () => {
    test('Отображается если есть права', () => {
      mockGetNomenclaturesSuccess()
      mockGetNomenclatureGroupsSuccess({ body: [] })

      render(<NomenclaturesPage />, {
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
      mockGetNomenclaturesSuccess()
      mockGetNomenclatureGroupsSuccess({ body: [] })

      render(<NomenclaturesPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const button = nomenclatureListPageTestUtils.queryAddNomenclatureButton()
      expect(button).not.toBeInTheDocument()
    })

    test('После клика отображается модалка', async () => {
      mockGetNomenclaturesSuccess()
      mockGetNomenclatureGroupsSuccess({ body: [] })

      const { user } = render(<NomenclaturesPage />, {
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
      mockGetNomenclaturesSuccess()
      mockGetNomenclatureGroupsSuccess({ body: [] })

      render(<NomenclaturesPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await nomenclatureListPageTestUtils.expectGroupListLoadingFinished()
      await nomenclatureTableTestUtils.expectLoadingFinished()
      const button = nomenclatureListPageTestUtils.getAllNomenclatureButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике перезапрашивается номенклатура', async () => {
      mockGetNomenclaturesSuccess({ once: false })
      const nomenclatureGroupListItem = warehousesFixtures.nomenclatureGroupListItem()
      mockGetNomenclatureGroupsSuccess({ body: [nomenclatureGroupListItem] })

      const { user } = render(<NomenclaturesPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
      const groupList = [warehousesFixtures.nomenclatureGroupListItem()]
      mockGetNomenclatureGroupsSuccess({ body: groupList })
      mockGetNomenclaturesSuccess()

      render(<NomenclaturesPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
    mockGetNomenclaturesSuccess()
    mockGetNomenclatureGroupsSuccess({ body: [] })

    render(<NomenclaturesPage />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
      }),
    })

    const table = nomenclatureTableTestUtils.getContainer()
    expect(table).toBeInTheDocument()
  })
})
