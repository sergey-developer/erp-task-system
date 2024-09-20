import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { split } from 'lodash'
import pick from 'lodash/pick'

import { testUtils as attachmentImagesTestUtils } from 'modules/attachment/components/AttachmentImages/AttachmentImages.test'
import { testUtils as attachmentListModalTestUtils } from 'modules/attachment/components/AttachmentListModal/AttachmentListModal.test'
import { testUtils as taskAttachmentListTestUtils } from 'modules/attachment/components/Attachments/Attachments.test'
import { TasksRoutesEnum } from 'modules/task/constants/routes'
import TasksPage from 'modules/task/pages/TasksPage'
import { getTasksPageLink } from 'modules/task/utils/task'
import { UserPermissionsEnum } from 'modules/user/constants'
import { testUtils as executeRelocationTaskModalTestUtils } from 'modules/warehouse/components/ExecuteRelocationTaskModal/ExecuteRelocationTaskModal.test'
import { testUtils as relocationEquipmentTableTestUtils } from 'modules/warehouse/components/RelocationEquipmentTable/RelocationEquipmentTable.test'
import { testUtils as returnRelocationTaskToReworkModalTestUtils } from 'modules/warehouse/components/ReturnRelocationTaskToReworkModal/ReturnRelocationTaskToReworkModal.test'
import { getRelocationEquipmentAttachmentListErrMsg } from 'modules/warehouse/constants/relocationEquipment'
import {
  cancelRelocationTaskMessages,
  closeRelocationTaskMessages,
  executeRelocationTaskMessages,
  getRelocationEquipmentListMessages,
  getRelocationTaskMessages,
  getRelocationTaskWaybillM15ErrMsg,
  relocationTaskStatusDict,
  RelocationTaskStatusEnum,
  relocationTaskTypeDict,
  returnRelocationTaskToReworkMessages,
} from 'modules/warehouse/constants/relocationTask'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { RelocationTaskModel } from 'modules/warehouse/models'
import CreateDocumentsPackagePage from 'modules/warehouse/pages/CreateDocumentsPackagePage'
import { testUtils as createDocumentsPackagePageTestUtils } from 'modules/warehouse/pages/CreateDocumentsPackagePage/CreateDocumentsPackagePage.test'
import {
  getRelocateFromToTitle,
  getWaybillM15Filename,
} from 'modules/warehouse/utils/relocationTask'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import { formatDate } from 'shared/utils/date'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import { taskDetailsTestUtils } from '_tests_/features/tasks/TaskDetails/testUtils'
import { cancelRelocationTaskModalTestUtils } from '_tests_/features/warehouse/CancelRelocationTaskModal/testUtils'
import { confirmExecutionRelocationTaskModalTestUtils } from '_tests_/features/warehouse/ConfirmExecutionRelocationTaskModal/testUtils'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
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
  mockCreateRelocationTaskAttachmentSuccess,
  mockExecuteRelocationTaskBadRequestError,
  mockExecuteRelocationTaskForbiddenError,
  mockExecuteRelocationTaskNotFoundError,
  mockExecuteRelocationTaskServerError,
  mockExecuteRelocationTaskSuccess,
  mockGetRelocationEquipmentAttachmentsForbiddenError,
  mockGetRelocationEquipmentAttachmentsNotFoundError,
  mockGetRelocationEquipmentAttachmentsServerError,
  mockGetRelocationEquipmentAttachmentsSuccess,
  mockGetRelocationEquipmentListForbiddenError,
  mockGetRelocationEquipmentListNotFoundError,
  mockGetRelocationEquipmentListServerError,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskAttachmentsSuccess,
  mockGetRelocationTaskCompletionDocumentsSuccess,
  mockGetRelocationTaskForbiddenError,
  mockGetRelocationTaskNotFoundError,
  mockGetRelocationTaskServerError,
  mockGetRelocationTaskSuccess,
  mockGetRelocationTaskWaybillM15ForbiddenError,
  mockGetRelocationTaskWaybillM15NotFoundError,
  mockGetRelocationTaskWaybillM15ServerError,
  mockGetRelocationTaskWaybillM15Success,
  mockGetTaskCountersSuccess,
  mockGetTasksSuccess,
  mockGetTaskSuccess,
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
  renderWithRouter,
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

export const canExecuteRelocationTaskProps: {
  permissions: [UserPermissionsEnum.RelocationTasksUpdate]
  relocationTask: Pick<RelocationTaskModel, 'status' | 'executors' | 'completedBy'>
} = {
  relocationTask: pick(warehouseFixtures.relocationTask(), 'status', 'executors', 'completedBy'),
  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
}

const getContainer = () => screen.getByTestId('relocation-task-details')
const findContainer = () => screen.findByTestId('relocation-task-details')

const getBlock = (testId: string) => within(getContainer()).getByTestId(testId)
const getBlockInfo = (testId: string, text: string | RegExp) =>
  within(getBlock(testId)).getByText(text)

const openMenu = (user: UserEvent) => buttonTestUtils.clickMenuButtonIn(getContainer(), user)

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

// create documents package menu item
const getCreateDocumentsPackageMenuItem = () =>
  menuTestUtils.getMenuItem('Сформировать пакет документов')
const clickCreateDocumentsPackageMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem('Сформировать пакет документов', user)

// stretch details button
const getStretchDetailsButton = () => buttonTestUtils.getButtonIn(getContainer(), 'double-right')
const clickStretchDetailsButton = async (user: UserEvent) => {
  const button = getStretchDetailsButton()
  await user.click(button)
}

// documents
const getDocumentsBlock = () => getBlock('documents')

const getCreateDocumentsButton = () =>
  buttonTestUtils.getButtonIn(getDocumentsBlock(), /Добавить вложение/)

const setDocument = async (
  user: UserEvent,
  file: File = new File([], '', { type: 'image/png' }),
) => {
  const block = getDocumentsBlock()
  // eslint-disable-next-line testing-library/no-node-access
  const input = block.querySelector('input[type="file"]') as HTMLInputElement
  await user.upload(input, file)
  return { input, file }
}

const getUploadedDocument = (filename: string) => within(getDocumentsBlock()).getByTitle(filename)

// common photos button
const getCommonPhotosButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Посмотреть общие фото/)

const clickCommonPhotosButton = async (user: UserEvent) => {
  const button = getCommonPhotosButton()
  await user.click(button)
}

const expectCommonPhotosLoadingStarted = () =>
  buttonTestUtils.expectLoadingStarted(getCommonPhotosButton())
const expectCommonPhotosLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getCommonPhotosButton())

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

  getBlockInfo,

  openMenu,

  getStretchDetailsButton,
  clickStretchDetailsButton,

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

  getCreateDocumentsPackageMenuItem,
  clickCreateDocumentsPackageMenuItem,

  getCreateDocumentsButton,
  setDocument,
  getUploadedDocument,

  getCommonPhotosButton,
  clickCommonPhotosButton,
  expectCommonPhotosLoadingStarted,
  expectCommonPhotosLoadingFinished,

  clickCloseButton: (user: UserEvent) => buttonTestUtils.clickCloseButtonIn(getContainer(), user),

  expectRelocationTaskLoadingStarted,
  expectRelocationTaskLoadingFinished,

  expectRelocationEquipmentListLoadingFinished,
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Информация о заявке о перемещении', () => {
  describe('При успешном запросе', () => {
    test('Заголовок отображается', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.expectRelocationTaskLoadingFinished()
      const title = within(testUtils.getContainer()).getByText(
        getRelocateFromToTitle(relocationTask),
      )

      expect(title).toBeInTheDocument()
    })

    test('Тип заявки отображается', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getBlockInfo('type', /Тип заявки/)
      const value = testUtils.getBlockInfo('type', relocationTaskTypeDict[relocationTask.type])

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Срок выполнения отображается', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getBlockInfo('deadline-at', /Срок выполнения/)
      const value = testUtils.getBlockInfo('deadline-at', formatDate(relocationTask.deadlineAt))

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Объект выбытия отображается', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getBlockInfo('relocate-from', /Объект выбытия/)
      const value = testUtils.getBlockInfo('relocate-from', relocationTask.relocateFrom!.title)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Объект прибытия отображается', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getBlockInfo('relocate-to', /Объект прибытия/)
      const value = testUtils.getBlockInfo('relocate-to', relocationTask.relocateTo!.title)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    describe('Исполнитель', () => {
      test('Отображается кто завершил заявку если он есть, вместо исполнителей', async () => {
        const relocationTask = warehouseFixtures.relocationTask()
        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await testUtils.expectRelocationTaskLoadingFinished()

        const label = testUtils.getBlockInfo('executor', /Исполнитель/)
        const value = testUtils.getBlockInfo('executor', relocationTask.completedBy!.fullName)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Отображаются исполнители если нет того кто завершил заявку', async () => {
        const relocationTask = warehouseFixtures.relocationTask({ completedBy: null })
        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await testUtils.expectRelocationTaskLoadingFinished()

        const label = testUtils.getBlockInfo('executor', /Исполнитель/)

        expect(label).toBeInTheDocument()
        relocationTask.executors.forEach((e) => {
          const value = testUtils.getBlockInfo('executor', e.fullName)
          expect(value).toBeInTheDocument()
        })
      })
    })

    test('Контролер отображается', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getBlockInfo('controller', /Контролер/)
      const value = testUtils.getBlockInfo('controller', relocationTask.controller!.fullName)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Статус отображается', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getBlockInfo('status', /Статус/)
      const value = testUtils.getBlockInfo(
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
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getBlockInfo('return-reason', /Причина возврата/)
      const value = testUtils.getBlockInfo('return-reason', relocationTask.revision!.text)

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

    test('Инициатор отображается', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getBlockInfo('created-by', /Инициатор/)
      const value = testUtils.getBlockInfo('created-by', relocationTask.createdBy!.fullName)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Создано отображается', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getBlockInfo('created-at', /Создано/)
      const value = testUtils.getBlockInfo('created-at', formatDate(relocationTask.createdAt))

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    describe('Заявка ITSM', () => {
      test('Отображается корректно', async () => {
        const relocationTask = warehouseFixtures.relocationTask()
        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await testUtils.expectRelocationTaskLoadingFinished()

        const label = testUtils.getBlockInfo('task', /Заявка ITSM/)
        const link = testUtils.getBlockInfo('task', relocationTask.task!.recordId)

        expect(label).toBeInTheDocument()
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute(
          'href',
          getTasksPageLink({ viewTask: relocationTask.task!.id }),
        )
      })

      test('При клике переходит на страницу реестра заявок и открывает карточку заявки', async () => {
        const relocationTask = warehouseFixtures.relocationTask()
        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)
        mockGetTaskSuccess(relocationTask.task!.id)
        mockGetTasksSuccess()
        mockGetTaskCountersSuccess()

        const { user } = renderWithRouter(
          [
            {
              path: WarehouseRouteEnum.RelocationTasks,
              element: (
                <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />
              ),
            },
            {
              path: TasksRoutesEnum.DesktopTasks,
              element: <TasksPage />,
            },
          ],
          { initialEntries: [WarehouseRouteEnum.RelocationTasks], initialIndex: 0 },
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        await testUtils.expectRelocationTaskLoadingFinished()

        const link = testUtils.getBlockInfo('task', relocationTask.task!.recordId)
        await user.click(link)
        const card = await taskDetailsTestUtils.findContainer()

        expect(card).toBeInTheDocument()
      })
    })

    test('Комментарий отображается', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.expectRelocationTaskLoadingFinished()

      const label = testUtils.getBlockInfo('comment', /Комментарий/)
      const value = testUtils.getBlockInfo('comment', relocationTask.comment!)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    describe('Документы', () => {
      test('Отображаются', async () => {
        const relocationTask = warehouseFixtures.relocationTask()
        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await testUtils.expectRelocationTaskLoadingFinished()

        const label = testUtils.getBlockInfo('documents', /Документы/)
        const value = taskAttachmentListTestUtils.getContainerIn(testUtils.getContainer())

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Кнопка добавления', () => {
      test('Отображается', async () => {
        const relocationTask = warehouseFixtures.relocationTask()
        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await testUtils.expectRelocationTaskLoadingFinished()
        const button = testUtils.getCreateDocumentsButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Загруженный документ отображается', async () => {
        const relocationTask = warehouseFixtures.relocationTask()
        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)
        mockCreateRelocationTaskAttachmentSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        await testUtils.expectRelocationTaskLoadingFinished()

        const { input, file } = await testUtils.setDocument(user)
        const uploadedAttachment = testUtils.getUploadedDocument(file.name)

        expect(input.files!.item(0)).toBe(file)
        expect(input.files).toHaveLength(1)
        expect(uploadedAttachment).toBeInTheDocument()
      })
    })
  })

  describe('При не успешном запросе', () => {
    test('Обрабатывается ошибка 403', async () => {
      const errorMessage = fakeWord()
      mockGetRelocationTaskForbiddenError(props.relocationTaskId, {
        body: { detail: errorMessage },
      })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

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

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.expectRelocationTaskLoadingFinished()

      const notification = await notificationTestUtils.findNotification(errorMessage)
      expect(notification).toBeInTheDocument()
    })

    test('Обрабатывается ошибка 500', async () => {
      mockGetRelocationTaskServerError(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.expectRelocationTaskLoadingFinished()

      const notification = await notificationTestUtils.findNotification(
        getRelocationTaskMessages.commonError,
      )
      expect(notification).toBeInTheDocument()
    })
  })

  describe('Перечень оборудования', () => {
    test('При успешном запросе отображается', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      const relocationEquipmentList = warehouseFixtures.relocationEquipmentList()
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId, {
        body: relocationEquipmentList,
      })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

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

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

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

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await testUtils.expectRelocationEquipmentListLoadingFinished()

        const notification = await notificationTestUtils.findNotification(errorMessage)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetRelocationTaskSuccess(props.relocationTaskId)
        mockGetRelocationEquipmentListServerError(props.relocationTaskId)

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await testUtils.expectRelocationEquipmentListLoadingFinished()

        const notification = await notificationTestUtils.findNotification(
          getRelocationEquipmentListMessages.commonError,
        )
        expect(notification).toBeInTheDocument()
      })
    })

    describe('Изображения оборудования', () => {
      test('При успешном запросе отображаются', async () => {
        mockGetRelocationTaskSuccess(props.relocationTaskId)
        const relocationEquipmentListItem = warehouseFixtures.relocationEquipmentListItem()
        const relocationEquipmentList = [relocationEquipmentListItem]
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId, {
          body: relocationEquipmentList,
        })

        const relocationEquipmentAttachments = warehouseFixtures.relocationEquipmentAttachments()
        mockGetRelocationEquipmentAttachmentsSuccess(
          relocationEquipmentListItem.relocationEquipmentId,
          { body: relocationEquipmentAttachments },
        )

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        await testUtils.expectRelocationEquipmentListLoadingFinished()
        await relocationEquipmentTableTestUtils.clickViewImagesButton(
          user,
          relocationEquipmentListItem.id,
        )
        const modal = await attachmentListModalTestUtils.findContainer()
        await attachmentListModalTestUtils.expectLoadingFinished()

        relocationEquipmentAttachments.forEach((item) => {
          const image = attachmentImagesTestUtils.getImageIn(modal, item.name)
          expect(image).toBeInTheDocument()
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывает ошибку 403', async () => {
          mockGetRelocationTaskSuccess(props.relocationTaskId)
          const relocationEquipmentListItem = warehouseFixtures.relocationEquipmentListItem()
          mockGetRelocationEquipmentListSuccess(props.relocationTaskId, {
            body: [relocationEquipmentListItem],
          })

          const errorMsg = fakeWord()
          mockGetRelocationEquipmentAttachmentsForbiddenError(
            relocationEquipmentListItem.relocationEquipmentId,
            { body: { detail: errorMsg } },
          )

          const { user } = render(
            <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.expectRelocationEquipmentListLoadingFinished()
          await relocationEquipmentTableTestUtils.clickViewImagesButton(
            user,
            relocationEquipmentListItem.id,
          )
          await attachmentListModalTestUtils.findContainer()

          const notification = await notificationTestUtils.findNotification(errorMsg)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывает ошибку 404', async () => {
          mockGetRelocationTaskSuccess(props.relocationTaskId)
          const relocationEquipmentListItem = warehouseFixtures.relocationEquipmentListItem()
          mockGetRelocationEquipmentListSuccess(props.relocationTaskId, {
            body: [relocationEquipmentListItem],
          })

          const errorMsg = fakeWord()
          mockGetRelocationEquipmentAttachmentsNotFoundError(
            relocationEquipmentListItem.relocationEquipmentId,
            { body: { detail: errorMsg } },
          )

          const { user } = render(
            <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.expectRelocationEquipmentListLoadingFinished()
          await relocationEquipmentTableTestUtils.clickViewImagesButton(
            user,
            relocationEquipmentListItem.id,
          )
          await attachmentListModalTestUtils.findContainer()

          const notification = await notificationTestUtils.findNotification(errorMsg)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывает ошибку 500', async () => {
          mockGetRelocationTaskSuccess(props.relocationTaskId)
          const relocationEquipmentListItem = warehouseFixtures.relocationEquipmentListItem()
          mockGetRelocationEquipmentListSuccess(props.relocationTaskId, {
            body: [relocationEquipmentListItem],
          })

          mockGetRelocationEquipmentAttachmentsServerError(
            relocationEquipmentListItem.relocationEquipmentId,
          )

          const { user } = render(
            <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.expectRelocationEquipmentListLoadingFinished()
          await relocationEquipmentTableTestUtils.clickViewImagesButton(
            user,
            relocationEquipmentListItem.id,
          )
          await attachmentListModalTestUtils.findContainer()

          const notification = await notificationTestUtils.findNotification(
            getRelocationEquipmentAttachmentListErrMsg,
          )
          expect(notification).toBeInTheDocument()
        })
      })
    })
  })

  describe('Накладная M15', () => {
    test('Пункт меню отображается', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
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
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksRead] }),
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
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
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

      const downloadFileSpy = jest.spyOn(downloadFileUtils, 'downloadFile')

      const base64ToArrayBufferSpy = jest.spyOn(base64Utils, 'base64ToBytes')
      const arrayBuffer = new Uint8Array()
      base64ToArrayBufferSpy.mockReturnValueOnce(arrayBuffer)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksRead] }),
            },
          }),
        },
      )

      await testUtils.openMenu(user)
      await testUtils.clickWaybillM15MenuItem(user)

      await waitFor(() => expect(base64ToArrayBufferSpy).toBeCalledTimes(1))
      expect(base64ToArrayBufferSpy).toBeCalledWith(m15File)

      expect(downloadFileSpy).toBeCalledTimes(1)
      expect(downloadFileSpy).toBeCalledWith(
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
                ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksRead] }),
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
                ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksRead] }),
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
                ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksRead] }),
              },
            }),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickWaybillM15MenuItem(user)

        const notification = await notificationTestUtils.findNotification(
          getRelocationTaskWaybillM15ErrMsg,
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
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
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
              id: relocationTask.createdBy!.id,
            },
            undefined,
            undefined,
            {
              queries: {
                ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksUpdate] }),
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
          {
            store: getStoreWithAuth({ id: relocationTask.createdBy!.id }, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
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
                ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksUpdate] }),
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
            store: getStoreWithAuth({ id: relocationTask.createdBy!.id }, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
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
            store: getStoreWithAuth({ id: relocationTask.createdBy!.id }, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
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
            store: getStoreWithAuth({ id: relocationTask.createdBy!.id }, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
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
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      await testUtils.openMenu(user)
      const item = testUtils.getExecuteTaskMenuItem()
      expect(item).toBeInTheDocument()
    })

    test('Пункт меню активен если: есть права на обновление заявки, заявка не завершена, не закрыта и не отменена, пользователь является исполнителем заявки', async () => {
      const relocationTask = warehouseFixtures.relocationTask({
        id: props.relocationTaskId,
        ...canExecuteRelocationTaskProps.relocationTask,
      })

      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(
            {
              id: relocationTask.executors![0].id,
            },
            undefined,
            undefined,
            {
              queries: {
                ...getUserMeQueryMock({ permissions: canExecuteRelocationTaskProps.permissions }),
              },
            },
          ),
        },
      )

      await testUtils.openMenu(user)
      const item = testUtils.getExecuteTaskMenuItem()
      await waitFor(() => menuTestUtils.expectMenuItemNotDisabled(item))
    })

    test('Пункт меню активен если: есть права на обновление заявки, заявка не завершена, не закрыта и не отменена, пользователем является завершивший заявку', async () => {
      const relocationTask = warehouseFixtures.relocationTask({
        id: props.relocationTaskId,
        ...canExecuteRelocationTaskProps.relocationTask,
      })

      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(
            {
              id: relocationTask.completedBy!.id,
            },
            undefined,
            undefined,
            {
              queries: {
                ...getUserMeQueryMock({ permissions: canExecuteRelocationTaskProps.permissions }),
              },
            },
          ),
        },
      )

      await testUtils.openMenu(user)
      const item = testUtils.getExecuteTaskMenuItem()
      await waitFor(() => menuTestUtils.expectMenuItemNotDisabled(item))
    })

    describe('Пункт меню не активен', () => {
      test('Если условия соблюдены, но нет прав', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          ...canExecuteRelocationTaskProps.relocationTask,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth({ id: relocationTask.executors![0].id }, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getExecuteTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но исполнитель заявки или её завершивший не авторизованный пользователь', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          ...canExecuteRelocationTaskProps.relocationTask,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({ permissions: canExecuteRelocationTaskProps.permissions }),
              },
            }),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getExecuteTaskMenuItem()
        await waitFor(() => menuTestUtils.expectMenuItemDisabled(item))
      })

      test('Если условия соблюдены, но заявка отменена', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          ...canExecuteRelocationTaskProps.relocationTask,
          status: RelocationTaskStatusEnum.Canceled,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth({ id: relocationTask.executors![0].id }, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: canExecuteRelocationTaskProps.permissions,
                }),
              },
            }),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getExecuteTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но заявка закрыта', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          ...canExecuteRelocationTaskProps.relocationTask,
          status: RelocationTaskStatusEnum.Closed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth({ id: relocationTask.executors![0].id }, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: canExecuteRelocationTaskProps.permissions,
                }),
              },
            }),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getExecuteTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но заявка завершена', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          ...canExecuteRelocationTaskProps.relocationTask,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth({ id: relocationTask.executors![0].id }, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: canExecuteRelocationTaskProps.permissions,
                }),
              },
            }),
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
                id: relocationTask.executors![0].id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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

        const detailErrMsg = fakeWord()
        const documentsErrMsg = fakeWord()
        mockExecuteRelocationTaskBadRequestError(props.relocationTaskId, {
          body: {
            detail: detailErrMsg,
            documents: [documentsErrMsg],
          },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                id: relocationTask.executors![0].id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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
          documentsErrMsg,
        )
        const notification = await notificationTestUtils.findNotification(detailErrMsg)

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

        const detailErrMsg = fakeWord()
        mockExecuteRelocationTaskForbiddenError(props.relocationTaskId, {
          body: { detail: detailErrMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                id: relocationTask.executors![0].id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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

        const notification = await notificationTestUtils.findNotification(detailErrMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        const relocationTask = warehouseFixtures.relocationTask({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask, once: false })
        mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

        const detailErrMsg = fakeWord()
        mockExecuteRelocationTaskNotFoundError(props.relocationTaskId, {
          body: { detail: detailErrMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(
              {
                id: relocationTask.executors![0].id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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

        const notification = await notificationTestUtils.findNotification(detailErrMsg)
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
                id: relocationTask.executors![0].id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
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
          store: getStoreWithAuth(relocationTask.controller!, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksUpdate] }),
            },
          }),
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
          {
            store: getStoreWithAuth({ id: relocationTask.controller!.id }, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getReturnToReworkMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но контролер заявки не авторизованный пользователь', async () => {
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
                ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksUpdate] }),
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
            store: getStoreWithAuth(relocationTask.controller!, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
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
            store: getStoreWithAuth(relocationTask.controller!, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
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

        const detailErrMsg = fakeWord()
        const reasonErrMsg = fakeWord()
        mockReturnRelocationTaskToReworkBadRequestError(props.relocationTaskId, {
          body: { detail: detailErrMsg, reason: [reasonErrMsg] },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.controller!, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickReturnToReworkMenuItem(user)
        await returnRelocationTaskToReworkModalTestUtils.findContainer()
        await returnRelocationTaskToReworkModalTestUtils.setReason(user, fakeWord())
        await returnRelocationTaskToReworkModalTestUtils.clickSubmitButton(user)
        await returnRelocationTaskToReworkModalTestUtils.expectLoadingFinished()

        const reasonError = await returnRelocationTaskToReworkModalTestUtils.findReasonError(
          reasonErrMsg,
        )
        const notification = await notificationTestUtils.findNotification(detailErrMsg)

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
                id: relocationTask.controller!.id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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
                id: relocationTask.controller!.id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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
                id: relocationTask.controller!.id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
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
              id: relocationTask.createdBy!.id,
            },
            undefined,
            undefined,
            {
              queries: {
                ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksUpdate] }),
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
          {
            store: getStoreWithAuth({ id: relocationTask.createdBy!.id }, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
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
                ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksUpdate] }),
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
            store: getStoreWithAuth({ id: relocationTask.createdBy!.id }, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
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
            store: getStoreWithAuth({ id: relocationTask.createdBy!.id }, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
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
            store: getStoreWithAuth({ id: relocationTask.createdBy!.id }, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
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
                id: relocationTask.createdBy!.id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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

        const status = testUtils.getBlockInfo(
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
                id: relocationTask.createdBy!.id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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
                id: relocationTask.createdBy!.id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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
                id: relocationTask.createdBy!.id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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
                id: relocationTask.createdBy!.id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
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
              id: relocationTask.controller!.id,
            },
            undefined,
            undefined,
            {
              queries: {
                ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksUpdate] }),
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
          {
            store: getStoreWithAuth({ id: relocationTask.controller!.id }, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getConfirmExecutionMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но контролер заявки не авторизованный пользователь', async () => {
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
                ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksUpdate] }),
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
            store: getStoreWithAuth(relocationTask.controller!, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
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
                id: relocationTask.controller!.id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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

        const status = testUtils.getBlockInfo(
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
                id: relocationTask.controller!.id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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
                id: relocationTask.controller!.id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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
                id: relocationTask.controller!.id,
              },
              undefined,
              undefined,
              {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                  }),
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
            store: getStoreWithAuth(relocationTask.controller!, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
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

  describe('Сформировать пакет документов', () => {
    test('Пункт меню отображается', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      await testUtils.openMenu(user)
      const item = testUtils.getCreateDocumentsPackageMenuItem()
      expect(item).toBeInTheDocument()
      expect(item).toBeEnabled()
    })

    test('При клике переходит на страницу формирования пакета документов', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)
      mockGetRelocationTaskCompletionDocumentsSuccess(props.relocationTaskId)

      const { user } = renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.RelocationTasks,
            element: <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          },
          {
            path: WarehouseRouteEnum.CreateDocumentsPackage,
            element: <CreateDocumentsPackagePage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.RelocationTasks], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      await testUtils.openMenu(user)
      await testUtils.clickCreateDocumentsPackageMenuItem(user)
      const page = await createDocumentsPackagePageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Посмотреть общие фото', () => {
    test('Кнопка отображается', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.expectRelocationTaskLoadingFinished()
      const button = testUtils.getCommonPhotosButton()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При нажатии открывается модалка просмотра изображений', async () => {
      const relocationTask = warehouseFixtures.relocationTask()
      mockGetRelocationTaskSuccess(props.relocationTaskId, { body: relocationTask })
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)
      mockGetRelocationTaskAttachmentsSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      await testUtils.expectRelocationTaskLoadingFinished()
      await testUtils.clickCommonPhotosButton(user)
      const modal = await attachmentListModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })
  })

  describe('Увеличение размера окна', () => {
    test('Кнопка увеличения отображается', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.expectRelocationTaskLoadingFinished()
      const button = testUtils.getStretchDetailsButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При нажатии на кнопку увеличивается высота окна', async () => {
      mockGetRelocationTaskSuccess(props.relocationTaskId)
      mockGetRelocationEquipmentListSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      await testUtils.expectRelocationTaskLoadingFinished()
      const heightBeforeFirstStretch = Number(split(testUtils.getContainer().style.height, 'px')[0])

      await testUtils.clickStretchDetailsButton(user)
      const heightAfterFirstStretch = Number(split(testUtils.getContainer().style.height, 'px')[0])
      expect(heightAfterFirstStretch).toBeGreaterThan(heightBeforeFirstStretch)

      await testUtils.clickStretchDetailsButton(user)
      const currentHeight = Number(split(testUtils.getContainer().style.height, 'px')[0])
      expect(currentHeight).toBeLessThan(heightAfterFirstStretch)
      expect(currentHeight).toBe(heightBeforeFirstStretch)
    })
  })
})
