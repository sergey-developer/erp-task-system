import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as attachmentListTestUtils } from 'modules/task/components/AttachmentList/AttachmentList.test'
import { UserRoleEnum } from 'modules/user/constants'
import { testUtils as executeRelocationTaskModalTestUtils } from 'modules/warehouse/components/ExecuteRelocationTaskModal/ExecuteRelocationTaskModal.test'
import { testUtils as cancelRelocationTaskModalTestUtils } from 'modules/warehouse/components/CancelRelocationTaskModal/CancelRelocationTaskModal.test'
import { testUtils as confirmExecutionRelocationTaskModalTestUtils } from 'modules/warehouse/components/ConfirmExecutionRelocationTaskModal/ConfirmExecutionRelocationTaskModal.test'
import { testUtils as relocationEquipmentTableTestUtils } from 'modules/warehouse/components/RelocationEquipmentTable/RelocationEquipmentTable.test'
import { testUtils as returnRelocationTaskToReworkModalTestUtils } from 'modules/warehouse/components/ReturnRelocationTaskToReworkModal/ReturnRelocationTaskToReworkModal.test'
import {
  closeRelocationTaskMessages,
  executeRelocationTaskMessages,
  cancelRelocationTaskMessages,
  getRelocationEquipmentListMessages,
  getRelocationTaskMessages,
  getRelocationTaskWaybillM15Messages,
  relocationTaskStatusDict,
  RelocationTaskStatusEnum,
  returnRelocationTaskToReworkMessages,
} from 'modules/warehouse/constants/relocationTask'
import {
  getRelocationTaskTitle,
  getWaybillM15Filename,
} from 'modules/warehouse/utils/relocationTask'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadLinkUtils from 'shared/utils/common/downloadLink'
import { formatDate } from 'shared/utils/date'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockExecuteRelocationTaskBadRequestError,
  mockExecuteRelocationTaskForbiddenError,
  mockExecuteRelocationTaskNotFoundError,
  mockExecuteRelocationTaskServerError,
  mockExecuteRelocationTaskSuccess,
  mockCancelRelocationTaskBadRequestError,
  mockCancelRelocationTaskForbiddenError,
  mockCancelRelocationTaskNotFoundError,
  mockCancelRelocationTaskServerError,
  mockCancelRelocationTaskSuccess,
  mockCloseRelocationTaskBadRequestError,
  mockCloseRelocationTaskForbiddenError,
  mockCloseRelocationTaskNotFoundError,
  mockCloseRelocationTaskServerError,
  mockCloseRelocationTaskSuccess,
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
  mockReturnRelocationTaskToReworkBadRequestError,
  mockReturnRelocationTaskToReworkForbiddenError,
  mockReturnRelocationTaskToReworkNotFoundError,
  mockReturnRelocationTaskToReworkServerError,
  mockReturnRelocationTaskToReworkSuccess,
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

// edit task menu item
const getEditTaskMenuItem = () => menuTestUtils.getMenuItem('Изменить заявку')
const clickEditTaskMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Изменить заявку', user)

// execute task menu item
const getExecuteTaskMenuItem = () => menuTestUtils.getMenuItem('Выполнить заявку')

const clickExecuteTaskMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Выполнить заявку', user)

// rework menu item
const getReturnToReworkMenuItem = () => menuTestUtils.getMenuItem('Вернуть на доработку')

const clickReturnToReworkMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Вернуть на доработку', user)

// cancel task menu item
const getCancelTaskMenuItem = () => menuTestUtils.getMenuItem('Отменить заявку')
const clickCancelTaskMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Отменить заявку', user)

// confirm execution menu item
const getConfirmExecutionMenuItem = () => menuTestUtils.getMenuItem('Подтвердить выполнение')
const clickConfirmExecutionMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Подтвердить выполнение', user)

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

  getReturnToReworkMenuItem,
  clickReturnToReworkMenuItem,

  getEditTaskMenuItem,
  clickEditTaskMenuItem,

  getExecuteTaskMenuItem,
  clickExecuteTaskMenuItem,

  getCancelTaskMenuItem,
  clickCancelTaskMenuItem,

  getConfirmExecutionMenuItem,
  clickConfirmExecutionMenuItem,

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
        getRelocationTaskTitle(relocationTask),
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

    test('Причина возврата отображается корректно', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
      )

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getRelocationTaskInfo('return-reason', /Причина возврата/)
      const value = testUtils.getRelocationTaskInfo('return-reason', relocationTask.revision!.text)

      await user.hover(value)
      const date = await screen.findByText(
        formatDate(relocationTask.revision!.createdAt, DATE_FORMAT),
      )
      const fullName = await screen.findByText(relocationTask.revision!.user.fullName)
      const phone = await screen.findByText(relocationTask.revision!.user.phone!)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(date).toBeInTheDocument()
      expect(fullName).toBeInTheDocument()
      expect(phone).toBeInTheDocument()
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
        body: relocationEquipmentList,
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
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
      )

      await testUtils.openMenu(user)
      const item = testUtils.getWaybillM15MenuItem()
      expect(item).toBeInTheDocument()
    })

    test('Пункт меню активен если есть права', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_READ'] }),
            },
          }),
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
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_READ'] }),
            },
          }),
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
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_READ'] }),
              },
            }),
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
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_READ'] }),
              },
            }),
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
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_READ'] }),
              },
            }),
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
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
      )

      await testUtils.openMenu(user)
      const item = testUtils.getEditTaskMenuItem()
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
          store: getStoreWithAuth(
            {
              userId: relocationTask.createdBy!.id,
              userRole: UserRoleEnum.FirstLineSupport,
            },
            undefined,
            undefined,
            {
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
              },
            },
          ),
        },
      )

      await testUtils.openMenu(user)
      const item = testUtils.getEditTaskMenuItem()
      await waitFor(() => menuTestUtils.expectMenuItemNotDisabled(item))
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
        const item = testUtils.getEditTaskMenuItem()
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
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
              },
            }),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getEditTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
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
        const item = testUtils.getEditTaskMenuItem()
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
        const item = testUtils.getEditTaskMenuItem()
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
          store: getStoreWithAuth(
            {
              userId: relocationTask.createdBy!.id,
              userRole: UserRoleEnum.FirstLineSupport,
            },
            undefined,
            undefined,
            {
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
              },
            },
          ),
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
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
              },
            }),
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
            store: getStoreWithAuth(
              {
                userId: relocationTask.createdBy!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
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

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 400', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const detailErrorMsg = fakeWord()
        const documentsErrorMsg = fakeWord()
        mockExecuteRelocationTaskBadRequestError(props.relocationTaskId, {
          body: {
            detail: detailErrorMsg,
            documents: [documentsErrorMsg],
          },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.createdBy!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickExecuteTaskMenuItem(user)
        await executeRelocationTaskModalTestUtils.findContainer()
        await executeRelocationTaskModalTestUtils.setDocument(user)
        await executeRelocationTaskModalTestUtils.clickSubmitButton(user)
        await executeRelocationTaskModalTestUtils.expectLoadingFinished()

        const documentsError = await executeRelocationTaskModalTestUtils.findDocumentsError(
          documentsErrorMsg,
        )
        const notification = await notificationTestUtils.findNotification(detailErrorMsg)

        expect(documentsError).toBeInTheDocument()
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 403', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const detailErrorMsg = fakeWord()
        mockExecuteRelocationTaskForbiddenError(props.relocationTaskId, {
          body: { detail: detailErrorMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.createdBy!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickExecuteTaskMenuItem(user)
        await executeRelocationTaskModalTestUtils.findContainer()
        await executeRelocationTaskModalTestUtils.setDocument(user)
        await executeRelocationTaskModalTestUtils.clickSubmitButton(user)
        await executeRelocationTaskModalTestUtils.expectLoadingFinished()

        const notification = await notificationTestUtils.findNotification(detailErrorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const detailErrorMsg = fakeWord()
        mockExecuteRelocationTaskNotFoundError(props.relocationTaskId, {
          body: { detail: detailErrorMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.createdBy!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickExecuteTaskMenuItem(user)
        await executeRelocationTaskModalTestUtils.findContainer()
        await executeRelocationTaskModalTestUtils.setDocument(user)
        await executeRelocationTaskModalTestUtils.clickSubmitButton(user)
        await executeRelocationTaskModalTestUtils.expectLoadingFinished()

        const notification = await notificationTestUtils.findNotification(detailErrorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)
        mockExecuteRelocationTaskServerError(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.createdBy!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickExecuteTaskMenuItem(user)
        await executeRelocationTaskModalTestUtils.findContainer()
        await executeRelocationTaskModalTestUtils.setDocument(user)
        await executeRelocationTaskModalTestUtils.clickSubmitButton(user)
        await executeRelocationTaskModalTestUtils.expectLoadingFinished()

        const notification = await notificationTestUtils.findNotification(
          executeRelocationTaskMessages.commonError,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Вернуть на доработку', () => {
    test('Пункт меню отображается', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
      )

      await testUtils.openMenu(user)
      const item = testUtils.getReturnToReworkMenuItem()
      expect(item).toBeInTheDocument()
    })

    test('Пункт меню активен если условия соблюдены', async () => {
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
            {
              userId: relocationTask.executor!.id,
              userRole: UserRoleEnum.FirstLineSupport,
            },
            undefined,
            undefined,
            {
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
              },
            },
          ),
        },
      )

      await testUtils.openMenu(user)
      const item = testUtils.getReturnToReworkMenuItem()
      await waitFor(() => {
        menuTestUtils.expectMenuItemNotDisabled(item)
      })
    })

    describe('Пункт меню не активен', () => {
      test('Если условия соблюдены, но нет прав', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          { store: getStoreWithAuth({ userId: relocationTask.executor!.id }) },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getReturnToReworkMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но исполнитель заявки не авторизованный пользователь', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
              },
            }),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getReturnToReworkMenuItem()
        await waitFor(() => {
          menuTestUtils.expectMenuItemDisabled(item)
        })
      })

      test('Если условия соблюдены, но заявка не в статусе завершена', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth({ userId: relocationTask.executor!.id }, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }) },
            }),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getReturnToReworkMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })
    })

    describe('При успешном запросе', () => {
      test('Закрывается модалка и заявка загружается снова', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)
        mockReturnRelocationTaskToReworkSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              { userId: relocationTask.executor!.id, userRole: UserRoleEnum.FirstLineSupport },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickReturnToReworkMenuItem(user)
        const modal = await returnRelocationTaskToReworkModalTestUtils.findContainer()
        await returnRelocationTaskToReworkModalTestUtils.setReason(user, fakeWord())
        await returnRelocationTaskToReworkModalTestUtils.clickSubmitButton(user)
        await returnRelocationTaskToReworkModalTestUtils.expectLoadingFinished()

        await waitFor(() => {
          expect(modal).not.toBeInTheDocument()
        })
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 400', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const detailErrorMsg = fakeWord()
        const reasonErrorMsg = fakeWord()
        mockReturnRelocationTaskToReworkBadRequestError(props.relocationTaskId, {
          body: { detail: detailErrorMsg, reason: [reasonErrorMsg] },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.executor!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickReturnToReworkMenuItem(user)
        await returnRelocationTaskToReworkModalTestUtils.findContainer()
        await returnRelocationTaskToReworkModalTestUtils.setReason(user, fakeWord())
        await returnRelocationTaskToReworkModalTestUtils.clickSubmitButton(user)
        await returnRelocationTaskToReworkModalTestUtils.expectLoadingFinished()

        const reasonError = await returnRelocationTaskToReworkModalTestUtils.findReasonError(
          reasonErrorMsg,
        )
        const notification = await notificationTestUtils.findNotification(detailErrorMsg)

        expect(reasonError).toBeInTheDocument()
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 403', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const errorMsg = fakeWord()
        mockReturnRelocationTaskToReworkForbiddenError(props.relocationTaskId, {
          body: { detail: errorMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.executor!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickReturnToReworkMenuItem(user)
        await returnRelocationTaskToReworkModalTestUtils.findContainer()
        await returnRelocationTaskToReworkModalTestUtils.setReason(user, fakeWord())
        await returnRelocationTaskToReworkModalTestUtils.clickSubmitButton(user)
        await returnRelocationTaskToReworkModalTestUtils.expectLoadingFinished()

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const errorMsg = fakeWord()
        mockReturnRelocationTaskToReworkNotFoundError(props.relocationTaskId, {
          body: { detail: errorMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.executor!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickReturnToReworkMenuItem(user)
        await returnRelocationTaskToReworkModalTestUtils.findContainer()
        await returnRelocationTaskToReworkModalTestUtils.setReason(user, fakeWord())
        await returnRelocationTaskToReworkModalTestUtils.clickSubmitButton(user)
        await returnRelocationTaskToReworkModalTestUtils.expectLoadingFinished()

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const errorMsg = fakeWord()
        mockReturnRelocationTaskToReworkServerError(props.relocationTaskId, {
          body: { detail: errorMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.executor!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickReturnToReworkMenuItem(user)
        await returnRelocationTaskToReworkModalTestUtils.findContainer()
        await returnRelocationTaskToReworkModalTestUtils.setReason(user, fakeWord())
        await returnRelocationTaskToReworkModalTestUtils.clickSubmitButton(user)
        await returnRelocationTaskToReworkModalTestUtils.expectLoadingFinished()

        const notification = await notificationTestUtils.findNotification(
          returnRelocationTaskToReworkMessages.commonError,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Отменить заявку', () => {
    test('Пункт меню отображается', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
      )

      await testUtils.openMenu(user)
      const item = testUtils.getCancelTaskMenuItem()
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
          store: getStoreWithAuth(
            {
              userId: relocationTask.createdBy!.id,
              userRole: UserRoleEnum.FirstLineSupport,
            },
            undefined,
            undefined,
            {
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
              },
            },
          ),
        },
      )

      await testUtils.openMenu(user)
      const item = testUtils.getCancelTaskMenuItem()
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
        const item = testUtils.getCancelTaskMenuItem()
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
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
              },
            }),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getCancelTaskMenuItem()
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
        const item = testUtils.getCancelTaskMenuItem()
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
        const item = testUtils.getCancelTaskMenuItem()
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
        const item = testUtils.getCancelTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })
    })

    describe('При успешном запросе', () => {
      test('Закрывается модалка и меняется статус заявки', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const cancelRelocationTaskResponse = { status: RelocationTaskStatusEnum.Canceled }
        mockCancelRelocationTaskSuccess(props.relocationTaskId, {
          body: cancelRelocationTaskResponse,
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.createdBy!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickCancelTaskMenuItem(user)
        const modal = await cancelRelocationTaskModalTestUtils.findContainer()
        await cancelRelocationTaskModalTestUtils.clickConfirmButton(user)

        await waitFor(() => expect(modal).not.toBeInTheDocument())

        const status = testUtils.getRelocationTaskInfo(
          'status',
          relocationTaskStatusDict[cancelRelocationTaskResponse.status],
        )
        expect(status).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 400', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const errorMsg = fakeWord()
        mockCancelRelocationTaskBadRequestError(props.relocationTaskId, {
          body: { detail: errorMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.createdBy!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickCancelTaskMenuItem(user)
        await cancelRelocationTaskModalTestUtils.findContainer()
        await cancelRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 403', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const errorMsg = fakeWord()
        mockCancelRelocationTaskForbiddenError(props.relocationTaskId, {
          body: { detail: errorMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.createdBy!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickCancelTaskMenuItem(user)
        await cancelRelocationTaskModalTestUtils.findContainer()
        await cancelRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const errorMsg = fakeWord()
        mockCancelRelocationTaskNotFoundError(props.relocationTaskId, {
          body: { detail: errorMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.createdBy!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickCancelTaskMenuItem(user)
        await cancelRelocationTaskModalTestUtils.findContainer()
        await cancelRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)
        mockCancelRelocationTaskServerError(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.createdBy!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickCancelTaskMenuItem(user)
        await cancelRelocationTaskModalTestUtils.findContainer()
        await cancelRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(
          cancelRelocationTaskMessages.commonError,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Подтвердить выполнение', () => {
    test('Пункт меню отображается', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
      )

      await testUtils.openMenu(user)
      const item = testUtils.getConfirmExecutionMenuItem()
      expect(item).toBeInTheDocument()
    })

    test('Пункт меню активен если условия соблюдены', async () => {
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
            {
              userId: relocationTask.executor!.id,
              userRole: UserRoleEnum.FirstLineSupport,
            },
            undefined,
            undefined,
            {
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
              },
            },
          ),
        },
      )

      await testUtils.openMenu(user)
      const item = testUtils.getConfirmExecutionMenuItem()
      await waitFor(() => {
        menuTestUtils.expectMenuItemNotDisabled(item)
      })
    })

    describe('Пункт меню не активен', () => {
      test('Если условия соблюдены, но нет прав', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          { store: getStoreWithAuth({ userId: relocationTask.executor!.id }) },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getConfirmExecutionMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но исполнитель заявки не авторизованный пользователь', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
              },
            }),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getConfirmExecutionMenuItem()
        await waitFor(() => {
          menuTestUtils.expectMenuItemDisabled(item)
        })
      })

      test('Если условия соблюдены, но заявка не завершена', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth({ userId: relocationTask.executor!.id }, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }) },
            }),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getConfirmExecutionMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })
    })

    describe('При успешном запросе', () => {
      test('Закрывается модалка и меняется статус заявки', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const closeRelocationTaskResponse = { status: RelocationTaskStatusEnum.Closed }
        mockCloseRelocationTaskSuccess(props.relocationTaskId, {
          body: closeRelocationTaskResponse,
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.executor!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickConfirmExecutionMenuItem(user)
        const modal = await confirmExecutionRelocationTaskModalTestUtils.findContainer()
        await confirmExecutionRelocationTaskModalTestUtils.clickConfirmButton(user)

        await waitFor(() => expect(modal).not.toBeInTheDocument())

        const status = testUtils.getRelocationTaskInfo(
          'status',
          relocationTaskStatusDict[closeRelocationTaskResponse.status],
        )
        expect(status).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 400', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const errorMsg = fakeWord()
        mockCloseRelocationTaskBadRequestError(props.relocationTaskId, {
          body: { detail: errorMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.executor!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickConfirmExecutionMenuItem(user)
        await confirmExecutionRelocationTaskModalTestUtils.findContainer()
        await confirmExecutionRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 403', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const errorMsg = fakeWord()
        mockCloseRelocationTaskForbiddenError(props.relocationTaskId, {
          body: { detail: errorMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.executor!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickConfirmExecutionMenuItem(user)
        await confirmExecutionRelocationTaskModalTestUtils.findContainer()
        await confirmExecutionRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const errorMsg = fakeWord()
        mockCloseRelocationTaskNotFoundError(props.relocationTaskId, {
          body: { detail: errorMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.executor!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickConfirmExecutionMenuItem(user)
        await confirmExecutionRelocationTaskModalTestUtils.findContainer()
        await confirmExecutionRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)
        mockCloseRelocationTaskServerError(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                userId: relocationTask.executor!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_UPDATE'] }),
                },
              },
            ),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickConfirmExecutionMenuItem(user)
        await confirmExecutionRelocationTaskModalTestUtils.findContainer()
        await confirmExecutionRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(
          closeRelocationTaskMessages.commonError,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })
})
