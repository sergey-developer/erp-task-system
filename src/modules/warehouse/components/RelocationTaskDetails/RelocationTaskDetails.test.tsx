import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as attachmentListTestUtils } from 'modules/task/components/AttachmentList/AttachmentList.test'
import { UserRoleEnum } from 'modules/user/constants'
import { testUtils as executeRelocationTaskModalTestUtils } from 'modules/warehouse/components/ExecuteRelocationTaskModal/ExecuteRelocationTaskModal.test'
import { testUtils as relocationEquipmentTableTestUtils } from 'modules/warehouse/components/RelocationEquipmentTable/RelocationEquipmentTable.test'
import {
  getRelocationEquipmentListMessages,
  getRelocationTaskMessages,
  getRelocationTaskWaybillM15Messages,
  relocationTaskStatusDict,
  RelocationTaskStatusEnum,
} from 'modules/warehouse/constants/relocationTask'
import { getWaybillM15Filename } from 'modules/warehouse/utils/relocationTask'

import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadLinkUtils from 'shared/utils/common/downloadLink'
import { formatDate } from 'shared/utils/date'

import commonFixtures from '_tests_/fixtures/common'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockExecuteRelocationTaskSuccess,
  mockGetRelocationEquipmentListForbiddenError,
  mockGetRelocationEquipmentListNotFoundError,
  mockGetRelocationEquipmentListServerError,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskForbiddenError,
  mockGetRelocationTaskNotFoundError,
  mockGetRelocationTaskServerError,
  mockGetRelocationTaskSuccess,
  mockGetRelocationTaskWaybillM15ForbiddenError,
  mockGetRelocationTaskWaybillM15NotFoundError,
  mockGetRelocationTaskWaybillM15ServerError,
  mockGetRelocationTaskWaybillM15Success,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeId,
  fakeWord,
  getStoreWithAuth,
  menuTestUtils,
  notificationTestUtils,
  render,
  setupApiTests,
  spinnerTestUtils,
} from '_tests_/utils'
import getAuthState from '_tests_/utils/auth/getAuthState'

import RelocationTaskDetails from './index'
import { RelocationTaskDetailsProps } from './types'

const props: RelocationTaskDetailsProps = {
  open: true,
  relocationTaskId: fakeId(),
  onClose: jest.fn(),
}

const getContainer = () => screen.getByTestId('relocation-task-details')
const findContainer = () => screen.findByTestId('relocation-task-details')

const getRelocationTaskInfo = (testId: string, text: string | RegExp) =>
  within(within(getContainer()).getByTestId(testId)).getByText(text)

const openMenu = (user: UserEvent) =>
  buttonTestUtils.clickMenuButtonIn(testUtils.getContainer(), user)

// waybill m15 menu item
const getWaybillM15MenuItem = () => menuTestUtils.getMenuItem(/Сформировать накладную М-15/)

const clickWaybillM15MenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem(/Сформировать накладную М-15/, user)

// edit task
const getEditTaskMenuItem = () => menuTestUtils.getMenuItem('Изменить заявку')

const clickEditTaskMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Изменить заявку', user)

// execute task
const getExecuteTaskMenuItem = () => menuTestUtils.getMenuItem('Выполнить заявку')

const clickExecuteTaskMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Выполнить заявку', user)

// loading
const expectRelocationTaskLoadingStarted = spinnerTestUtils.expectLoadingStarted(
  'relocation-task-details-loading',
)

const expectRelocationTaskLoadingFinished = spinnerTestUtils.expectLoadingFinished(
  'relocation-task-details-loading',
)

const expectRelocationEquipmentListLoadingFinished =
  relocationEquipmentTableTestUtils.expectLoadingFinished

export const testUtils = {
  getContainer,
  findContainer,

  getRelocationTaskInfo,

  openMenu,

  getWaybillM15MenuItem,
  clickWaybillM15MenuItem,

  getEditTaskMenuItem,
  clickEditTaskMenuItem,

  getExecuteTaskMenuItem,
  clickExecuteTaskMenuItem,

  clickCloseButton: (user: UserEvent) => buttonTestUtils.clickCloseButtonIn(getContainer(), user),

  expectRelocationTaskLoadingStarted,
  expectRelocationTaskLoadingFinished,

  expectRelocationEquipmentListLoadingFinished,
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Информация о заявке о перемещении', () => {
  describe('При успешном запросе', () => {
    test('Заголовок отображается корректно', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

      await testUtils.expectRelocationTaskLoadingFinished()

      const title = within(testUtils.getContainer()).getByText(
        `Заявка на перемещение оборудования ${relocationTask.relocateFrom?.title} 🠖 ${relocationTask.relocateTo?.title}`,
      )

      expect(title).toBeInTheDocument()
    })

    test('Срок выполнения отображается корректно', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getRelocationTaskInfo('deadline-at', /Срок выполнения/)
      const value = testUtils.getRelocationTaskInfo(
        'deadline-at',
        formatDate(relocationTask.deadlineAt),
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Объект выбытия отображается корректно', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getRelocationTaskInfo('relocate-from', /Объект выбытия/)
      const value = testUtils.getRelocationTaskInfo(
        'relocate-from',
        relocationTask.relocateFrom!.title,
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Объект прибытия отображается корректно', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getRelocationTaskInfo('relocate-to', /Объект прибытия/)
      const value = testUtils.getRelocationTaskInfo('relocate-to', relocationTask.relocateTo!.title)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Исполнитель отображается корректно', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getRelocationTaskInfo('executor', /Исполнитель/)
      const value = testUtils.getRelocationTaskInfo('executor', relocationTask.executor!.fullName)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Статус отображается корректно', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getRelocationTaskInfo('status', /Статус/)
      const value = testUtils.getRelocationTaskInfo(
        'status',
        relocationTaskStatusDict[relocationTask.status],
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Инициатор отображается корректно', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getRelocationTaskInfo('created-by', /Инициатор/)
      const value = testUtils.getRelocationTaskInfo(
        'created-by',
        relocationTask.createdBy!.fullName,
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Создано отображается корректно', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getRelocationTaskInfo('created-at', /Создано/)
      const value = testUtils.getRelocationTaskInfo(
        'created-at',
        formatDate(relocationTask.createdAt),
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Комментарий отображается корректно', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getRelocationTaskInfo('comment', /Комментарий/)
      const value = testUtils.getRelocationTaskInfo('comment', relocationTask.comment!)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Документы отображается корректно', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getRelocationTaskInfo('documents', /Документы/)
      const value = attachmentListTestUtils.getContainerIn(testUtils.getContainer())

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })
  })

  describe('При не успешном запросе', () => {
    test('Обрабатывается ошибка 403', async () => {
      const errorMessage = fakeWord()
      mockGetRelocationTaskForbiddenError(props.relocationTaskId, {
        body: { detail: errorMessage },
      })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

      await testUtils.expectRelocationTaskLoadingFinished()

      const notification = await notificationTestUtils.findNotification(errorMessage)
      expect(notification).toBeInTheDocument()
    })

    test('Обрабатывается ошибка 404', async () => {
      const errorMessage = fakeWord()
      mockGetRelocationTaskNotFoundError(props.relocationTaskId, {
        body: { detail: errorMessage },
      })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

      await testUtils.expectRelocationTaskLoadingFinished()

      const notification = await notificationTestUtils.findNotification(errorMessage)
      expect(notification).toBeInTheDocument()
    })

    test('Обрабатывается ошибка 500', async () => {
      mockGetRelocationTaskServerError(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

      await testUtils.expectRelocationTaskLoadingFinished()

      const notification = await notificationTestUtils.findNotification(
        getRelocationTaskMessages.commonError,
      )
      expect(notification).toBeInTheDocument()
    })
  })

  describe('Перечень оборудования', () => {
    test('При успешном запросе отображается корректно', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      const relocationEquipmentList = warehouseFixtures.relocationEquipmentList()
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId, {
        body: commonFixtures.paginatedListResponse(relocationEquipmentList),
      })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

      await testUtils.expectRelocationEquipmentListLoadingFinished()

      relocationEquipmentList.forEach((item) => {
        const row = relocationEquipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 403', async () => {
        mockGetRelocationTaskSuccess(props.relocationTaskId)
        const errorMessage = fakeWord()
        mockGetRelocationEquipmentListForbiddenError(props.relocationTaskId, {
          body: { detail: errorMessage },
        })

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

        await testUtils.expectRelocationEquipmentListLoadingFinished()

        const notification = await notificationTestUtils.findNotification(errorMessage)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        mockGetRelocationTaskSuccess(props.relocationTaskId)
        const errorMessage = fakeWord()
        mockGetRelocationEquipmentListNotFoundError(props.relocationTaskId, {
          body: { detail: errorMessage },
        })

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

        await testUtils.expectRelocationEquipmentListLoadingFinished()

        const notification = await notificationTestUtils.findNotification(errorMessage)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetRelocationTaskSuccess(props.relocationTaskId)
        mockGetRelocationEquipmentListServerError(props.relocationTaskId)

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />)

        await testUtils.expectRelocationEquipmentListLoadingFinished()

        const notification = await notificationTestUtils.findNotification(
          getRelocationEquipmentListMessages.commonError,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Накладная M15', () => {
    test('Пункт меню отображается', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId!)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId!)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
      )

      await testUtils.openMenu(user)
      const item = testUtils.getWaybillM15MenuItem()
      expect(item).toBeInTheDocument()
    })

    test('Пункт меню активен если есть права', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId!)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId!)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          preloadedState: {
            api: {
              // @ts-ignore
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_READ'] }),
              },
            },
          },
        },
      )

      await testUtils.openMenu(user)
      const item = testUtils.getWaybillM15MenuItem()
      menuTestUtils.expectMenuItemNotDisabled(item)
    })

    test('Пункт меню не активен если нет прав', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
      )

      await testUtils.openMenu(user)
      const item = testUtils.getWaybillM15MenuItem()
      menuTestUtils.expectMenuItemDisabled(item)
    })

    test('При успешном запросе отрабатывает функционал скачивания', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const m15File = fakeWord()
      mockGetRelocationTaskWaybillM15Success(props.relocationTaskId, { body: m15File })

      const clickDownloadLinkSpy = jest.spyOn(downloadLinkUtils, 'clickDownloadLink')

      const base64ToArrayBufferSpy = jest.spyOn(base64Utils, 'base64ToArrayBuffer')
      const arrayBuffer = new Uint8Array()
      base64ToArrayBufferSpy.mockReturnValueOnce(arrayBuffer)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          preloadedState: {
            api: {
              // @ts-ignore
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_READ'] }),
              },
            },
          },
        },
      )

      await testUtils.openMenu(user)
      await testUtils.clickWaybillM15MenuItem(user)

      await waitFor(() => {
        expect(base64ToArrayBufferSpy).toBeCalledTimes(1)
      })
      expect(base64ToArrayBufferSpy).toBeCalledWith(m15File)

      expect(clickDownloadLinkSpy).toBeCalledTimes(1)
      expect(clickDownloadLinkSpy).toBeCalledWith(
        arrayBuffer,
        MimetypeEnum.Pdf,
        getWaybillM15Filename(props.relocationTaskId),
      )
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 403', async () => {
        mockGetRelocationTaskSuccess(props.relocationTaskId)
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const errorMessage = fakeWord()
        mockGetRelocationTaskWaybillM15ForbiddenError(props.relocationTaskId, {
          body: { detail: errorMessage },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            preloadedState: {
              api: {
                // @ts-ignore
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_READ'] }),
                },
              },
            },
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickWaybillM15MenuItem(user)

        const notification = await notificationTestUtils.findNotification(errorMessage)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        mockGetRelocationTaskSuccess(props.relocationTaskId)
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const errorMessage = fakeWord()
        mockGetRelocationTaskWaybillM15NotFoundError(props.relocationTaskId, {
          body: { detail: errorMessage },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            preloadedState: {
              api: {
                // @ts-ignore
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_READ'] }),
                },
              },
            },
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickWaybillM15MenuItem(user)

        const notification = await notificationTestUtils.findNotification(errorMessage)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetRelocationTaskSuccess(props.relocationTaskId)
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)
        mockGetRelocationTaskWaybillM15ServerError(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            preloadedState: {
              api: {
                // @ts-ignore
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_READ'] }),
                },
              },
            },
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickWaybillM15MenuItem(user)

        const notification = await notificationTestUtils.findNotification(
          getRelocationTaskWaybillM15Messages.commonError,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Редактирование заявки', () => {
    test('Пункт меню отображается', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId!)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId!)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
      )

      await testUtils.openMenu(user)
      const item = testUtils.getEditTaskMenuItem()
      expect(item).toBeInTheDocument()
    })

    test('Пункт меню активен если условия соблюдены', async () => {
      const relocationTask = warehouseFixtures.relocationTask({
        id: props.relocationTaskId!,
        status: RelocationTaskStatusEnum.New,
      })

      mockGetRelocationTaskSuccess(props.relocationTaskId!, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId!)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          preloadedState: {
            auth: getAuthState({
              user: {
                userId: relocationTask.createdBy!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
            }),
            api: {
              // @ts-ignore
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
              },
            },
          },
        },
      )

      await testUtils.openMenu(user)
      const item = testUtils.getEditTaskMenuItem()
      menuTestUtils.expectMenuItemNotDisabled(item)
    })

    describe('Пункт меню не активен', () => {
      test('Если условия соблюдены, но нет прав', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId!,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId!, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId!)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          { store: getStoreWithAuth({ userId: relocationTask.createdBy!.id }) },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getEditTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но создатель заявки не авторизованный пользователь', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId!,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId!, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId!)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            preloadedState: {
              api: {
                // @ts-ignore
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            },
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getEditTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но заявка отменена', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId!,
          status: RelocationTaskStatusEnum.Canceled,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId!, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId!)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              { userId: relocationTask.createdBy!.id },
              undefined,
              undefined,
              { queries: { ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }) } },
            ),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getEditTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но заявка закрыта', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId!,
          status: RelocationTaskStatusEnum.Closed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId!, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId!)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              { userId: relocationTask.createdBy!.id },
              undefined,
              undefined,
              { queries: { ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }) } },
            ),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getEditTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но заявка завершена', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId!,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId!, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId!)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              { userId: relocationTask.createdBy!.id },
              undefined,
              undefined,
              { queries: { ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }) } },
            ),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getEditTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })
    })
  })

  describe('Выполнить заявку', () => {
    test('Пункт меню отображается', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
      )

      await testUtils.openMenu(user)
      const item = testUtils.getExecuteTaskMenuItem()
      expect(item).toBeInTheDocument()
    })

    test('Пункт меню активен если условия соблюдены', async () => {
      const relocationTask = warehouseFixtures.relocationTask({
        id: props.relocationTaskId,
        status: RelocationTaskStatusEnum.New,
      })

      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          preloadedState: {
            auth: getAuthState({
              user: {
                userId: relocationTask.createdBy!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
            }),
            api: {
              // @ts-ignore
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
              },
            },
          },
        },
      )

      await testUtils.openMenu(user)
      const item = testUtils.getExecuteTaskMenuItem()
      await waitFor(() => {
        menuTestUtils.expectMenuItemNotDisabled(item)
      })
    })

    describe('Пункт меню не активен', () => {
      test('Если условия соблюдены, но нет прав', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          { store: getStoreWithAuth({ userId: relocationTask.createdBy!.id }) },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getExecuteTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но создатель заявки не авторизованный пользователь', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            preloadedState: {
              api: {
                // @ts-ignore
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            },
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getExecuteTaskMenuItem()
        await waitFor(() => {
          menuTestUtils.expectMenuItemDisabled(item)
        })
      })

      test('Если условия соблюдены, но заявка отменена', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Canceled,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              { userId: relocationTask.createdBy!.id },
              undefined,
              undefined,
              { queries: { ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }) } },
            ),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getExecuteTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но заявка закрыта', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Closed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              { userId: relocationTask.createdBy!.id },
              undefined,
              undefined,
              { queries: { ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }) } },
            ),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getExecuteTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но заявка завершена', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              { userId: relocationTask.createdBy!.id },
              undefined,
              undefined,
              { queries: { ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }) } },
            ),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getExecuteTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })
    })

    describe('При успешном запросе', () => {
      test('Закрывается модалка и заявка загружается снова', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)
        mockExecuteRelocationTaskSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            preloadedState: {
              auth: getAuthState({
                user: {
                  userId: relocationTask.createdBy!.id,
                  userRole: UserRoleEnum.FirstLineSupport,
                },
              }),
              api: {
                // @ts-ignore
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            },
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickExecuteTaskMenuItem(user)
        const modal = await executeRelocationTaskModalTestUtils.findContainer()
        await executeRelocationTaskModalTestUtils.setDocument(user)
        await executeRelocationTaskModalTestUtils.clickSubmitButton(user)
        await executeRelocationTaskModalTestUtils.expectLoadingFinished()

        await waitFor(() => {
          expect(modal).not.toBeInTheDocument()
        })
      })
    })
  })
})
