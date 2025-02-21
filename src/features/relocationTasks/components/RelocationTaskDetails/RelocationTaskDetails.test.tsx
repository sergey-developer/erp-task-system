import { screen, waitFor, within } from '@testing-library/react'
import { testUtils as attachmentImagesTestUtils } from 'features/attachments/components/AttachmentImages/AttachmentImages.test'
import { testUtils as taskAttachmentListTestUtils } from 'features/attachments/components/Attachments/Attachments.test'
import { testUtils as attachmentListModalTestUtils } from 'features/attachments/components/AttachmentsModal/AttachmentsModal.test'
import { getRelocationEquipmentAttachmentsErrorMessage } from 'features/relocationEquipments/api/constants'
import {
  cancelRelocationTaskErrorMessage,
  closeRelocationTaskErrorMessage,
  executeRelocationTaskErrorMessage,
  getRelocationEquipmentsErrorMessage,
  getRelocationTaskErrorMessage,
  getRelocationTaskWaybillM15ErrorMessage,
  RelocationTaskStatusEnum,
  returnRelocationTaskToReworkErrorMessage,
} from 'features/relocationTasks/api/constants'
import {
  relocationTaskStatusDict,
  relocationTaskTypeDict,
} from 'features/relocationTasks/constants'
import { getRelocateFromToTitle, getWaybillM15Filename } from 'features/relocationTasks/helpers'
import EditRelocationTaskDraftPage from 'features/relocationTasks/pages/EditRelocationTaskDraftPage'
import { makeGetTasksPageLink } from 'features/tasks/helpers'
import TasksPage from 'features/tasks/pages/TasksPage'
import { TasksRoutesEnum } from 'features/tasks/routes/routes'
import { UserPermissionsEnum } from 'features/users/api/constants'
import CreateDocumentsPackagePage from 'features/warehouses/pages/CreateDocumentsPackagePage'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import { split } from 'lodash'

import { CommonRoutesEnum } from 'configs/routes'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import { formatDate } from 'shared/utils/date'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import { taskDetailsTestUtils } from '_tests_/features/tasks/components/TaskDetails/testUtils'
import { cancelRelocationTaskModalTestUtils } from '_tests_/features/warehouses/components/CancelRelocationTaskModal/testUtils'
import { confirmExecutionRelocationTaskModalTestUtils } from '_tests_/features/warehouses/components/ConfirmExecutionRelocationTaskModal/testUtils'
import { confirmMoveRelocationTaskDraftToWorkModalTestUtils } from '_tests_/features/warehouses/components/ConfirmMoveRelocationTaskDraftToWorkModal/testUtils'
import { executeRelocationTaskModalTestUtils } from '_tests_/features/warehouses/components/ExecuteRelocationTaskModal/testUtils'
import { relocationEquipmentTableTestUtils } from '_tests_/features/warehouses/components/RelocationEquipmentTable/testUtils'
import {
  canExecuteRelocationTaskProps,
  props,
} from '_tests_/features/warehouses/components/RelocationTaskDetails/constants'
import { relocationTaskDetailsTestUtils } from '_tests_/features/warehouses/components/RelocationTaskDetails/testUtils'
import { returnRelocationTaskToReworkModalTestUtils } from '_tests_/features/warehouses/components/ReturnRelocationTaskToReworkModal/testUtils'
import { createDocumentsPackagePageTestUtils } from '_tests_/features/warehouses/pages/CreateDocumentsPackagePage/testUtils'
import { editRelocationTaskDraftPageTestUtils } from '_tests_/features/warehouses/pages/EditRelocationTaskDraftPage/testUtils'
import inventorizationsFixtures from '_tests_/fixtures/api/data/inventorizations'
import relocationEquipmentsFixtures from '_tests_/fixtures/api/data/relocationEquipments'
import relocationTasksFixtures from '_tests_/fixtures/api/data/relocationTasks'
import userFixtures from '_tests_/fixtures/api/data/users'
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
  mockGetInventorizationEquipmentsSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetRelocationEquipmentAttachmentsForbiddenError,
  mockGetRelocationEquipmentAttachmentsNotFoundError,
  mockGetRelocationEquipmentAttachmentsServerError,
  mockGetRelocationEquipmentAttachmentsSuccess,
  mockGetRelocationEquipmentsForbiddenError,
  mockGetRelocationEquipmentsNotFoundError,
  mockGetRelocationEquipmentsServerError,
  mockGetRelocationEquipmentsSuccess,
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
  mockGetUsersGroupsSuccess,
  mockGetUsersSuccess,
  mockMoveRelocationTaskDraftToWorkSuccess,
  mockReturnRelocationTaskToReworkBadRequestError,
  mockReturnRelocationTaskToReworkForbiddenError,
  mockReturnRelocationTaskToReworkNotFoundError,
  mockReturnRelocationTaskToReworkServerError,
  mockReturnRelocationTaskToReworkSuccess,
} from '_tests_/mocks/api'
import { getStoreWithAuth } from '_tests_/fixtures/store/auth'
import { getUserMeQueryMock } from '_tests_/fixtures/store/users'
import {
  fakeWord,
  menuTestUtils,
  notificationTestUtils,
  render,
  renderWithRouter,
  setupApiTests,
} from '_tests_/helpers'

import RelocationTaskDetails from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Информация о заявке о перемещении', () => {
  describe('При успешном запросе', () => {
    test('Заголовок отображается', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail()
      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()
      const title = within(relocationTaskDetailsTestUtils.getContainer()).getByText(
        getRelocateFromToTitle(relocationTask),
      )

      expect(title).toBeInTheDocument()
    })

    test('Тип заявки отображается', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail()
      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

      const label = relocationTaskDetailsTestUtils.getBlockInfo('type', /Тип заявки/)
      const value = relocationTaskDetailsTestUtils.getBlockInfo(
        'type',
        relocationTaskTypeDict[relocationTask.type],
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Срок выполнения отображается', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail()
      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

      const label = relocationTaskDetailsTestUtils.getBlockInfo('deadline-at', /Срок выполнения/)
      const value = relocationTaskDetailsTestUtils.getBlockInfo(
        'deadline-at',
        formatDate(relocationTask.deadlineAt),
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Объект выбытия отображается', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail()
      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

      const label = relocationTaskDetailsTestUtils.getBlockInfo('relocate-from', /Объект выбытия/)
      const value = relocationTaskDetailsTestUtils.getBlockInfo(
        'relocate-from',
        relocationTask.relocateFrom!.title,
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Объект прибытия отображается', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail()
      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

      const label = relocationTaskDetailsTestUtils.getBlockInfo('relocate-to', /Объект прибытия/)
      const value = relocationTaskDetailsTestUtils.getBlockInfo(
        'relocate-to',
        relocationTask.relocateTo!.title,
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    describe('Исполнитель', () => {
      test('Отображается кто завершил заявку если он есть, вместо исполнителей', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail()
        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

        const label = relocationTaskDetailsTestUtils.getBlockInfo('executor', /Исполнитель/)
        const value = relocationTaskDetailsTestUtils.getBlockInfo(
          'executor',
          relocationTask.completedBy!.fullName,
        )

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test('Отображаются исполнители если нет того кто завершил заявку', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({ completedBy: null })
        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

        const label = relocationTaskDetailsTestUtils.getBlockInfo('executor', /Исполнитель/)

        expect(label).toBeInTheDocument()
        relocationTask.executors.forEach((e) => {
          const value = relocationTaskDetailsTestUtils.getBlockInfo('executor', e.fullName)
          expect(value).toBeInTheDocument()
        })
      })
    })

    test('Контролер отображается', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail()
      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

      const label = relocationTaskDetailsTestUtils.getBlockInfo('controller', /Контролер/)
      const value = relocationTaskDetailsTestUtils.getBlockInfo(
        'controller',
        relocationTask.controller!.fullName,
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Статус отображается', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail()
      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

      const label = relocationTaskDetailsTestUtils.getBlockInfo('status', /Статус/)
      const value = relocationTaskDetailsTestUtils.getBlockInfo(
        'status',
        relocationTaskStatusDict[relocationTask.status],
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Причина возврата отображается корректно', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail()
      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

      const label = relocationTaskDetailsTestUtils.getBlockInfo('return-reason', /Причина возврата/)
      const value = relocationTaskDetailsTestUtils.getBlockInfo(
        'return-reason',
        relocationTask.revision!.text,
      )

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
      const relocationTask = relocationTasksFixtures.relocationTaskDetail()
      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

      const label = relocationTaskDetailsTestUtils.getBlockInfo('created-by', /Инициатор/)
      const value = relocationTaskDetailsTestUtils.getBlockInfo(
        'created-by',
        relocationTask.createdBy!.fullName,
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    test('Создано отображается', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail()
      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

      const label = relocationTaskDetailsTestUtils.getBlockInfo('created-at', /Создано/)
      const value = relocationTaskDetailsTestUtils.getBlockInfo(
        'created-at',
        formatDate(relocationTask.createdAt),
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    describe('Заявка ITSM', () => {
      test('Отображается корректно', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail()
        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

        const label = relocationTaskDetailsTestUtils.getBlockInfo('task', /Заявка ITSM/)
        const link = relocationTaskDetailsTestUtils.getBlockInfo(
          'task',
          relocationTask.task!.recordId,
        )

        expect(label).toBeInTheDocument()
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute(
          'href',
          makeGetTasksPageLink({ viewTask: relocationTask.task!.id }),
        )
      })

      test('При клике переходит на страницу реестра заявок и открывает карточку заявки', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail()
        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })
        mockGetTaskSuccess(relocationTask.task!.id)
        mockGetTasksSuccess()
        mockGetTaskCountersSuccess()

        const { user } = renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.RelocationTasks,
              element: (
                <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />
              ),
            },
            {
              path: TasksRoutesEnum.DesktopTasks,
              element: <TasksPage />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.RelocationTasks], initialIndex: 0 },
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

        const link = relocationTaskDetailsTestUtils.getBlockInfo(
          'task',
          relocationTask.task!.recordId,
        )
        await user.click(link)
        const card = await taskDetailsTestUtils.findContainer()

        expect(card).toBeInTheDocument()
      })
    })

    test('Комментарий отображается', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail()
      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

      const label = relocationTaskDetailsTestUtils.getBlockInfo('comment', /Комментарий/)
      const value = relocationTaskDetailsTestUtils.getBlockInfo('comment', relocationTask.comment!)

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    describe('Документы', () => {
      test('Отображаются', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail()
        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

        const label = relocationTaskDetailsTestUtils.getBlockInfo('documents', /Документы/)
        const value = taskAttachmentListTestUtils.getContainerIn(
          relocationTaskDetailsTestUtils.getContainer(),
        )

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Кнопка добавления', () => {
      test('Отображается', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail()
        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()
        const button = relocationTaskDetailsTestUtils.getCreateDocumentsButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Загруженный документ отображается', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail()
        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })
        mockCreateRelocationTaskAttachmentSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

        const { input, file } = await relocationTaskDetailsTestUtils.setDocument(user)
        const uploadedAttachment = relocationTaskDetailsTestUtils.getUploadedDocument(file.name)

        expect(input.files!.item(0)).toBe(file)
        expect(input.files).toHaveLength(1)
        expect(uploadedAttachment).toBeInTheDocument()
      })
    })
  })

  describe('При не успешном запросе', () => {
    test('Обрабатывается ошибка 403', async () => {
      const errorMessage = fakeWord()
      mockGetRelocationTaskForbiddenError(
        { relocationTaskId: props.relocationTaskId },
        {
          body: { detail: errorMessage },
        },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

      const notification = await notificationTestUtils.findNotification(errorMessage)
      expect(notification).toBeInTheDocument()
    })

    test('Обрабатывается ошибка 404', async () => {
      const errorMessage = fakeWord()
      mockGetRelocationTaskNotFoundError(
        { relocationTaskId: props.relocationTaskId },
        {
          body: { detail: errorMessage },
        },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

      const notification = await notificationTestUtils.findNotification(errorMessage)
      expect(notification).toBeInTheDocument()
    })

    test('Обрабатывается ошибка 500', async () => {
      mockGetRelocationTaskServerError({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()

      const notification = await notificationTestUtils.findNotification(
        getRelocationTaskErrorMessage,
      )
      expect(notification).toBeInTheDocument()
    })
  })

  describe('Перечень оборудования', () => {
    test('При успешном запросе отображается', async () => {
      mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
      const relocationEquipmentList = relocationEquipmentsFixtures.relocationEquipments()
      mockGetRelocationEquipmentsSuccess(
        { relocationTaskId: props.relocationTaskId },
        {
          body: relocationEquipmentList,
        },
      )

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationEquipmentListLoadingFinished()

      relocationEquipmentList.forEach((item) => {
        const row = relocationEquipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 403', async () => {
        mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
        const errorMessage = fakeWord()
        mockGetRelocationEquipmentsForbiddenError(
          { relocationTaskId: props.relocationTaskId },
          {
            body: { detail: errorMessage },
          },
        )

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await relocationTaskDetailsTestUtils.expectRelocationEquipmentListLoadingFinished()

        const notification = await notificationTestUtils.findNotification(errorMessage)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
        const errorMessage = fakeWord()
        mockGetRelocationEquipmentsNotFoundError(
          { relocationTaskId: props.relocationTaskId },
          {
            body: { detail: errorMessage },
          },
        )

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await relocationTaskDetailsTestUtils.expectRelocationEquipmentListLoadingFinished()

        const notification = await notificationTestUtils.findNotification(errorMessage)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
        mockGetRelocationEquipmentsServerError({ relocationTaskId: props.relocationTaskId })

        render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await relocationTaskDetailsTestUtils.expectRelocationEquipmentListLoadingFinished()

        const notification = await notificationTestUtils.findNotification(
          getRelocationEquipmentsErrorMessage,
        )
        expect(notification).toBeInTheDocument()
      })
    })

    describe('Изображения оборудования', () => {
      test('При успешном запросе отображаются', async () => {
        mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
        const relocationEquipmentListItem = relocationEquipmentsFixtures.relocationEquipment()
        const relocationEquipmentList = [relocationEquipmentListItem]
        mockGetRelocationEquipmentsSuccess(
          { relocationTaskId: props.relocationTaskId },
          {
            body: relocationEquipmentList,
          },
        )

        const relocationEquipmentAttachments =
          relocationEquipmentsFixtures.relocationEquipmentAttachments()
        mockGetRelocationEquipmentAttachmentsSuccess(
          relocationEquipmentListItem.relocationEquipmentId,
          { body: relocationEquipmentAttachments },
        )

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.expectRelocationEquipmentListLoadingFinished()
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
          mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
          const relocationEquipmentListItem = relocationEquipmentsFixtures.relocationEquipment()
          mockGetRelocationEquipmentsSuccess(
            { relocationTaskId: props.relocationTaskId },
            {
              body: [relocationEquipmentListItem],
            },
          )

          const errorMsg = fakeWord()
          mockGetRelocationEquipmentAttachmentsForbiddenError(
            relocationEquipmentListItem.relocationEquipmentId,
            { body: { detail: errorMsg } },
          )

          const { user } = render(
            <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await relocationTaskDetailsTestUtils.expectRelocationEquipmentListLoadingFinished()
          await relocationEquipmentTableTestUtils.clickViewImagesButton(
            user,
            relocationEquipmentListItem.id,
          )
          await attachmentListModalTestUtils.findContainer()

          const notification = await notificationTestUtils.findNotification(errorMsg)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывает ошибку 404', async () => {
          mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
          const relocationEquipmentListItem = relocationEquipmentsFixtures.relocationEquipment()
          mockGetRelocationEquipmentsSuccess(
            { relocationTaskId: props.relocationTaskId },
            {
              body: [relocationEquipmentListItem],
            },
          )

          const errorMsg = fakeWord()
          mockGetRelocationEquipmentAttachmentsNotFoundError(
            relocationEquipmentListItem.relocationEquipmentId,
            { body: { detail: errorMsg } },
          )

          const { user } = render(
            <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await relocationTaskDetailsTestUtils.expectRelocationEquipmentListLoadingFinished()
          await relocationEquipmentTableTestUtils.clickViewImagesButton(
            user,
            relocationEquipmentListItem.id,
          )
          await attachmentListModalTestUtils.findContainer()

          const notification = await notificationTestUtils.findNotification(errorMsg)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывает ошибку 500', async () => {
          mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
          const relocationEquipmentListItem = relocationEquipmentsFixtures.relocationEquipment()
          mockGetRelocationEquipmentsSuccess(
            { relocationTaskId: props.relocationTaskId },
            {
              body: [relocationEquipmentListItem],
            },
          )

          mockGetRelocationEquipmentAttachmentsServerError(
            relocationEquipmentListItem.relocationEquipmentId,
          )

          const { user } = render(
            <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await relocationTaskDetailsTestUtils.expectRelocationEquipmentListLoadingFinished()
          await relocationEquipmentTableTestUtils.clickViewImagesButton(
            user,
            relocationEquipmentListItem.id,
          )
          await attachmentListModalTestUtils.findContainer()

          const notification = await notificationTestUtils.findNotification(
            getRelocationEquipmentAttachmentsErrorMessage,
          )
          expect(notification).toBeInTheDocument()
        })
      })
    })
  })

  describe('Накладная M15', () => {
    test('Пункт меню отображается', async () => {
      mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getWaybillM15MenuItem()
      expect(item).toBeInTheDocument()
    })

    test('Пункт меню активен если есть права', async () => {
      mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getWaybillM15MenuItem()
      menuTestUtils.expectMenuItemNotDisabled(item)
    })

    test('Пункт меню не активен если нет прав', async () => {
      mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getWaybillM15MenuItem()
      menuTestUtils.expectMenuItemDisabled(item)
    })

    test('При успешном запросе отрабатывает функционал скачивания', async () => {
      mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

      await relocationTaskDetailsTestUtils.openMenu(user)
      await relocationTaskDetailsTestUtils.clickWaybillM15MenuItem(user)

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
        mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickWaybillM15MenuItem(user)

        const notification = await notificationTestUtils.findNotification(errorMessage)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickWaybillM15MenuItem(user)

        const notification = await notificationTestUtils.findNotification(errorMessage)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })
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

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickWaybillM15MenuItem(user)

        const notification = await notificationTestUtils.findNotification(
          getRelocationTaskWaybillM15ErrorMessage,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Редактирование заявки', () => {
    test('Пункт меню отображается', async () => {
      mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getEditTaskMenuItem()
      expect(item).toBeInTheDocument()
    })

    test('Пункт меню активен если условия соблюдены', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail({
        id: props.relocationTaskId,
        status: RelocationTaskStatusEnum.New,
      })

      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(relocationTask.createdBy!, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksUpdate] }),
            },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getEditTaskMenuItem()
      await waitFor(() => menuTestUtils.expectMenuItemNotDisabled(item))
    })

    describe('Пункт меню не активен', () => {
      test('Если условия соблюдены, но нет прав', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.createdBy!, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getEditTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но создатель заявки не авторизованный пользователь', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getEditTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но заявка отменена', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Canceled,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getEditTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но заявка закрыта', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Closed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getEditTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но заявка завершена', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getEditTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })
    })
  })

  describe('Выполнить заявку', () => {
    test('Пункт меню отображается', async () => {
      mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getExecuteTaskMenuItem()
      expect(item).toBeInTheDocument()
    })

    test('Пункт меню активен если: есть права на обновление заявки, заявка не завершена, не закрыта и не отменена, пользователь является исполнителем заявки', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail({
        id: props.relocationTaskId,
        ...canExecuteRelocationTaskProps.relocationTask,
      })

      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(relocationTask.executors[0], undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: canExecuteRelocationTaskProps.permissions }),
            },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getExecuteTaskMenuItem()
      await waitFor(() => menuTestUtils.expectMenuItemNotDisabled(item))
    })

    test('Пункт меню активен если: есть права на обновление заявки, заявка не завершена, не закрыта и не отменена, пользователем является завершивший заявку', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail({
        id: props.relocationTaskId,
        ...canExecuteRelocationTaskProps.relocationTask,
      })

      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(relocationTask.completedBy!, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: canExecuteRelocationTaskProps.permissions }),
            },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getExecuteTaskMenuItem()
      await waitFor(() => menuTestUtils.expectMenuItemNotDisabled(item))
    })

    describe('Пункт меню не активен', () => {
      test('Если условия соблюдены, но нет прав', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          ...canExecuteRelocationTaskProps.relocationTask,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.executors[0], undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getExecuteTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но исполнитель заявки или её завершивший не авторизованный пользователь', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          ...canExecuteRelocationTaskProps.relocationTask,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getExecuteTaskMenuItem()
        await waitFor(() => menuTestUtils.expectMenuItemDisabled(item))
      })

      test('Если условия соблюдены, но заявка отменена', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          ...canExecuteRelocationTaskProps.relocationTask,
          status: RelocationTaskStatusEnum.Canceled,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.executors[0], undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({ permissions: canExecuteRelocationTaskProps.permissions }),
              },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getExecuteTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но заявка закрыта', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          ...canExecuteRelocationTaskProps.relocationTask,
          status: RelocationTaskStatusEnum.Closed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.executors[0], undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({ permissions: canExecuteRelocationTaskProps.permissions }),
              },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getExecuteTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но заявка завершена', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          ...canExecuteRelocationTaskProps.relocationTask,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.executors[0], undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({ permissions: canExecuteRelocationTaskProps.permissions }),
              },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getExecuteTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })
    })

    describe('При успешном запросе', () => {
      test.skip('Закрывается модалка и заявка загружается снова', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })
        mockExecuteRelocationTaskSuccess(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.executors[0], undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickExecuteTaskMenuItem(user)
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
      test.skip('Обрабатывается ошибка 400', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const detailErrorMessage = fakeWord()
        const documentsErrorMessage = fakeWord()
        mockExecuteRelocationTaskBadRequestError(props.relocationTaskId, {
          body: {
            detail: detailErrorMessage,
            documents: [documentsErrorMessage],
          },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.executors[0], undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickExecuteTaskMenuItem(user)
        await executeRelocationTaskModalTestUtils.findContainer()
        await executeRelocationTaskModalTestUtils.setDocument(user)
        await executeRelocationTaskModalTestUtils.clickSubmitButton(user)
        await executeRelocationTaskModalTestUtils.expectLoadingFinished()

        const documentsError = await executeRelocationTaskModalTestUtils.findDocumentsError(
          documentsErrorMessage,
        )
        const notification = await notificationTestUtils.findNotification(detailErrorMessage)

        expect(documentsError).toBeInTheDocument()
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 403', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const detailErrorMessage = fakeWord()
        mockExecuteRelocationTaskForbiddenError(props.relocationTaskId, {
          body: { detail: detailErrorMessage },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.executors[0], undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickExecuteTaskMenuItem(user)
        await executeRelocationTaskModalTestUtils.findContainer()
        await executeRelocationTaskModalTestUtils.setDocument(user)
        await executeRelocationTaskModalTestUtils.clickSubmitButton(user)
        await executeRelocationTaskModalTestUtils.expectLoadingFinished()

        const notification = await notificationTestUtils.findNotification(detailErrorMessage)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const detailErrorMessage = fakeWord()
        mockExecuteRelocationTaskNotFoundError(props.relocationTaskId, {
          body: { detail: detailErrorMessage },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.executors[0], undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickExecuteTaskMenuItem(user)
        await executeRelocationTaskModalTestUtils.findContainer()
        await executeRelocationTaskModalTestUtils.setDocument(user)
        await executeRelocationTaskModalTestUtils.clickSubmitButton(user)
        await executeRelocationTaskModalTestUtils.expectLoadingFinished()

        const notification = await notificationTestUtils.findNotification(detailErrorMessage)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })
        mockExecuteRelocationTaskServerError(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.executors[0], undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickExecuteTaskMenuItem(user)
        await executeRelocationTaskModalTestUtils.findContainer()
        await executeRelocationTaskModalTestUtils.setDocument(user)
        await executeRelocationTaskModalTestUtils.clickSubmitButton(user)
        await executeRelocationTaskModalTestUtils.expectLoadingFinished()

        const notification = await notificationTestUtils.findNotification(
          executeRelocationTaskErrorMessage,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Вернуть на доработку', () => {
    test('Пункт меню отображается', async () => {
      mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getReturnToReworkMenuItem()
      expect(item).toBeInTheDocument()
    })

    test('Пункт меню активен если условия соблюдены', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail({
        id: props.relocationTaskId,
        status: RelocationTaskStatusEnum.Completed,
      })

      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getReturnToReworkMenuItem()
      await waitFor(() => {
        menuTestUtils.expectMenuItemNotDisabled(item)
      })
    })

    describe('Пункт меню не активен', () => {
      test('Если условия соблюдены, но нет прав', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.controller!, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getReturnToReworkMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но контролер заявки не авторизованный пользователь', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getReturnToReworkMenuItem()
        await waitFor(() => {
          menuTestUtils.expectMenuItemDisabled(item)
        })
      })

      test('Если условия соблюдены, но заявка не в статусе завершена', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getReturnToReworkMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })
    })

    describe('При успешном запросе', () => {
      test('Закрывается модалка и заявка загружается снова', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })
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

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickReturnToReworkMenuItem(user)
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
      test.skip('Обрабатывается ошибка 400', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const detailErrorMessage = fakeWord()
        const reasonErrorMessage = fakeWord()
        mockReturnRelocationTaskToReworkBadRequestError(props.relocationTaskId, {
          body: { detail: detailErrorMessage, reason: [reasonErrorMessage] },
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

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickReturnToReworkMenuItem(user)
        await returnRelocationTaskToReworkModalTestUtils.findContainer()
        await returnRelocationTaskToReworkModalTestUtils.setReason(user, fakeWord())
        await returnRelocationTaskToReworkModalTestUtils.clickSubmitButton(user)
        await returnRelocationTaskToReworkModalTestUtils.expectLoadingFinished()

        const reasonError = await returnRelocationTaskToReworkModalTestUtils.findReasonError(
          reasonErrorMessage,
        )
        const notification = await notificationTestUtils.findNotification(detailErrorMessage)

        expect(reasonError).toBeInTheDocument()
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 403', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const errorMsg = fakeWord()
        mockReturnRelocationTaskToReworkForbiddenError(props.relocationTaskId, {
          body: { detail: errorMsg },
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

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickReturnToReworkMenuItem(user)
        await returnRelocationTaskToReworkModalTestUtils.findContainer()
        await returnRelocationTaskToReworkModalTestUtils.setReason(user, fakeWord())
        await returnRelocationTaskToReworkModalTestUtils.clickSubmitButton(user)
        await returnRelocationTaskToReworkModalTestUtils.expectLoadingFinished()

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const errorMsg = fakeWord()
        mockReturnRelocationTaskToReworkNotFoundError(props.relocationTaskId, {
          body: { detail: errorMsg },
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

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickReturnToReworkMenuItem(user)
        await returnRelocationTaskToReworkModalTestUtils.findContainer()
        await returnRelocationTaskToReworkModalTestUtils.setReason(user, fakeWord())
        await returnRelocationTaskToReworkModalTestUtils.clickSubmitButton(user)
        await returnRelocationTaskToReworkModalTestUtils.expectLoadingFinished()

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const errorMsg = fakeWord()
        mockReturnRelocationTaskToReworkServerError(props.relocationTaskId, {
          body: { detail: errorMsg },
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

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickReturnToReworkMenuItem(user)
        await returnRelocationTaskToReworkModalTestUtils.findContainer()
        await returnRelocationTaskToReworkModalTestUtils.setReason(user, fakeWord())
        await returnRelocationTaskToReworkModalTestUtils.clickSubmitButton(user)
        await returnRelocationTaskToReworkModalTestUtils.expectLoadingFinished()

        const notification = await notificationTestUtils.findNotification(
          returnRelocationTaskToReworkErrorMessage,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Отменить заявку', () => {
    test('Пункт меню отображается', async () => {
      mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getCancelTaskMenuItem()
      expect(item).toBeInTheDocument()
    })

    test('Пункт меню активен если условия соблюдены', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail({
        id: props.relocationTaskId,
        status: RelocationTaskStatusEnum.New,
      })

      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(relocationTask.createdBy!, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksUpdate] }),
            },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getCancelTaskMenuItem()
      await waitFor(() => {
        menuTestUtils.expectMenuItemNotDisabled(item)
      })
    })

    describe('Пункт меню не активен', () => {
      test('Если условия соблюдены, но нет прав', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.createdBy!, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getCancelTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но создатель заявки не авторизованный пользователь', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getCancelTaskMenuItem()
        await waitFor(() => {
          menuTestUtils.expectMenuItemDisabled(item)
        })
      })

      test('Если условия соблюдены, но заявка отменена', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Canceled,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getCancelTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но заявка закрыта', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Closed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getCancelTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но заявка завершена', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getCancelTaskMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })
    })

    describe('При успешном запросе', () => {
      test('Закрывается модалка и меняется статус заявки', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const cancelRelocationTaskResponse = { status: RelocationTaskStatusEnum.Canceled }
        mockCancelRelocationTaskSuccess(props.relocationTaskId, {
          body: cancelRelocationTaskResponse,
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.createdBy!, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickCancelTaskMenuItem(user)
        const modal = await cancelRelocationTaskModalTestUtils.findContainer()
        await cancelRelocationTaskModalTestUtils.clickConfirmButton(user)

        await waitFor(() => expect(modal).not.toBeInTheDocument())

        const status = relocationTaskDetailsTestUtils.getBlockInfo(
          'status',
          relocationTaskStatusDict[cancelRelocationTaskResponse.status],
        )
        expect(status).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 400', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const errorMsg = fakeWord()
        mockCancelRelocationTaskBadRequestError(props.relocationTaskId, {
          body: { detail: errorMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.createdBy!, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickCancelTaskMenuItem(user)
        await cancelRelocationTaskModalTestUtils.findContainer()
        await cancelRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 403', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const errorMsg = fakeWord()
        mockCancelRelocationTaskForbiddenError(props.relocationTaskId, {
          body: { detail: errorMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.createdBy!, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickCancelTaskMenuItem(user)
        await cancelRelocationTaskModalTestUtils.findContainer()
        await cancelRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const errorMsg = fakeWord()
        mockCancelRelocationTaskNotFoundError(props.relocationTaskId, {
          body: { detail: errorMsg },
        })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.createdBy!, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickCancelTaskMenuItem(user)
        await cancelRelocationTaskModalTestUtils.findContainer()
        await cancelRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })
        mockCancelRelocationTaskServerError(props.relocationTaskId)

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.createdBy!, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.RelocationTasksUpdate],
                }),
              },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickCancelTaskMenuItem(user)
        await cancelRelocationTaskModalTestUtils.findContainer()
        await cancelRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(
          cancelRelocationTaskErrorMessage,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Подтвердить выполнение', () => {
    test('Пункт меню отображается', async () => {
      mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getConfirmExecutionMenuItem()
      expect(item).toBeInTheDocument()
    })

    test('Пункт меню активен если условия соблюдены', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail({
        id: props.relocationTaskId,
        status: RelocationTaskStatusEnum.Completed,
      })

      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getConfirmExecutionMenuItem()
      await waitFor(() => {
        menuTestUtils.expectMenuItemNotDisabled(item)
      })
    })

    describe('Пункт меню не активен', () => {
      test('Если условия соблюдены, но нет прав', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(relocationTask.controller!, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getConfirmExecutionMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })

      test('Если условия соблюдены, но контролер заявки не авторизованный пользователь', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getConfirmExecutionMenuItem()
        await waitFor(() => {
          menuTestUtils.expectMenuItemDisabled(item)
        })
      })

      test('Если условия соблюдены, но заявка не завершена', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

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

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.getConfirmExecutionMenuItem()
        menuTestUtils.expectMenuItemDisabled(item)
      })
    })

    describe('При успешном запросе', () => {
      test('Закрывается модалка и меняется статус заявки', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const closeRelocationTaskResponse = { status: RelocationTaskStatusEnum.Closed }
        mockCloseRelocationTaskSuccess(props.relocationTaskId, {
          body: closeRelocationTaskResponse,
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

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickConfirmExecutionMenuItem(user)
        const modal = await confirmExecutionRelocationTaskModalTestUtils.findContainer()
        await confirmExecutionRelocationTaskModalTestUtils.clickConfirmButton(user)

        await waitFor(() => expect(modal).not.toBeInTheDocument())

        const status = relocationTaskDetailsTestUtils.getBlockInfo(
          'status',
          relocationTaskStatusDict[closeRelocationTaskResponse.status],
        )
        expect(status).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 400', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const errorMsg = fakeWord()
        mockCloseRelocationTaskBadRequestError(props.relocationTaskId, {
          body: { detail: errorMsg },
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

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickConfirmExecutionMenuItem(user)
        await confirmExecutionRelocationTaskModalTestUtils.findContainer()
        await confirmExecutionRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 403', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const errorMsg = fakeWord()
        mockCloseRelocationTaskForbiddenError(props.relocationTaskId, {
          body: { detail: errorMsg },
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

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickConfirmExecutionMenuItem(user)
        await confirmExecutionRelocationTaskModalTestUtils.findContainer()
        await confirmExecutionRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 404', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

        const errorMsg = fakeWord()
        mockCloseRelocationTaskNotFoundError(props.relocationTaskId, {
          body: { detail: errorMsg },
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

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickConfirmExecutionMenuItem(user)
        await confirmExecutionRelocationTaskModalTestUtils.findContainer()
        await confirmExecutionRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(errorMsg)
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Completed,
        })

        mockGetRelocationTaskSuccess(
          { relocationTaskId: props.relocationTaskId },
          { body: relocationTask, once: false },
        )
        mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })
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

        await relocationTaskDetailsTestUtils.openMenu(user)
        await relocationTaskDetailsTestUtils.clickConfirmExecutionMenuItem(user)
        await confirmExecutionRelocationTaskModalTestUtils.findContainer()
        await confirmExecutionRelocationTaskModalTestUtils.clickConfirmButton(user)

        const notification = await notificationTestUtils.findNotification(
          closeRelocationTaskErrorMessage,
        )
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Сформировать пакет документов', () => {
    test('Пункт меню отображается', async () => {
      mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getCreateDocumentsPackageMenuItem()
      expect(item).toBeInTheDocument()
      expect(item).toBeEnabled()
    })

    test('При клике переходит на страницу формирования пакета документов', async () => {
      mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationTaskCompletionDocumentsSuccess(props.relocationTaskId)

      const { user } = renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.RelocationTasks,
            element: <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          },
          {
            path: WarehousesRoutesEnum.CreateDocumentsPackage,
            element: <CreateDocumentsPackagePage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.RelocationTasks], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      await relocationTaskDetailsTestUtils.clickCreateDocumentsPackageMenuItem(user)
      const page = await createDocumentsPackagePageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Изменить черновик', () => {
    test('Пункт меню отображается если заявка черновик', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail({
        id: props.relocationTaskId,
        status: RelocationTaskStatusEnum.Draft,
      })
      mockGetRelocationTaskSuccess(
        { relocationTaskId: relocationTask.id },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTask.id })

      const { user } = render(<RelocationTaskDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.openMenu(user)
      const menuItem = relocationTaskDetailsTestUtils.getChangeDraftMenuItem()
      expect(menuItem).toBeInTheDocument()
      menuTestUtils.expectMenuItemDisabled(menuItem)
    })

    test(`Пункт меню активен если есть права ${UserPermissionsEnum.RelocationTasksUpdate}, ${UserPermissionsEnum.InventorizationUpdate}, исполнитель инвентаризации текущий пользователь`, async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail({
        id: props.relocationTaskId,
        status: RelocationTaskStatusEnum.Draft,
      })
      mockGetRelocationTaskSuccess(
        { relocationTaskId: relocationTask.id },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTask.id })

      const currentUser = userFixtures.userDetail({
        permissions: [
          UserPermissionsEnum.RelocationTasksUpdate,
          UserPermissionsEnum.InventorizationUpdate,
        ],
      })
      const inventorization = inventorizationsFixtures.inventorizationDetail({
        executor: currentUser,
      })

      const { user } = render(
        <RelocationTaskDetails {...props} inventorization={inventorization} />,
        {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const menuItem = relocationTaskDetailsTestUtils.getChangeDraftMenuItem()
      menuTestUtils.expectMenuItemNotDisabled(menuItem)
    })

    test(`Пункт меню не активен если есть права ${UserPermissionsEnum.RelocationTasksUpdate}, ${UserPermissionsEnum.InventorizationUpdate}, но исполнитель инвентаризации не текущий пользователь`, async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail({
        id: props.relocationTaskId,
        status: RelocationTaskStatusEnum.Draft,
      })
      mockGetRelocationTaskSuccess(
        { relocationTaskId: relocationTask.id },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTask.id })

      const currentUser = userFixtures.userDetail({
        permissions: [
          UserPermissionsEnum.RelocationTasksUpdate,
          UserPermissionsEnum.InventorizationUpdate,
        ],
      })
      const inventorization = inventorizationsFixtures.inventorization()

      const { user } = render(
        <RelocationTaskDetails {...props} inventorization={inventorization} />,
        {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const menuItem = relocationTaskDetailsTestUtils.getChangeDraftMenuItem()
      menuTestUtils.expectMenuItemDisabled(menuItem)
    })

    test(`Пункт меню не активен если есть права ${UserPermissionsEnum.RelocationTasksUpdate}, исполнитель инвентаризации текущий пользователь, но нет прав ${UserPermissionsEnum.InventorizationUpdate}`, async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail({
        id: props.relocationTaskId,
        status: RelocationTaskStatusEnum.Draft,
      })
      mockGetRelocationTaskSuccess(
        { relocationTaskId: relocationTask.id },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTask.id })

      const currentUser = userFixtures.userDetail({
        permissions: [UserPermissionsEnum.RelocationTasksUpdate],
      })
      const inventorization = inventorizationsFixtures.inventorizationDetail({
        executor: currentUser,
      })

      const { user } = render(
        <RelocationTaskDetails {...props} inventorization={inventorization} />,
        {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const menuItem = relocationTaskDetailsTestUtils.getChangeDraftMenuItem()
      menuTestUtils.expectMenuItemDisabled(menuItem)
    })

    test(`Пункт меню не активен если есть права ${UserPermissionsEnum.InventorizationUpdate}, исполнитель инвентаризации текущий пользователь, но нет прав ${UserPermissionsEnum.RelocationTasksUpdate}`, async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail({
        id: props.relocationTaskId,
        status: RelocationTaskStatusEnum.Draft,
      })
      mockGetRelocationTaskSuccess(
        { relocationTaskId: relocationTask.id },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTask.id })

      const currentUser = userFixtures.userDetail({
        permissions: [UserPermissionsEnum.InventorizationUpdate],
      })
      const inventorization = inventorizationsFixtures.inventorizationDetail({
        executor: currentUser,
      })

      const { user } = render(
        <RelocationTaskDetails {...props} inventorization={inventorization} />,
        {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const menuItem = relocationTaskDetailsTestUtils.getChangeDraftMenuItem()
      menuTestUtils.expectMenuItemDisabled(menuItem)
    })

    test('При клике переходит на страницу редактирования черновика заявки на перемещение', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail({
        id: props.relocationTaskId,
        status: RelocationTaskStatusEnum.Draft,
      })
      mockGetRelocationTaskSuccess(
        { relocationTaskId: relocationTask.id },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTask.id })

      const currentUser = userFixtures.userDetail({
        permissions: [
          UserPermissionsEnum.RelocationTasksUpdate,
          UserPermissionsEnum.InventorizationUpdate,
        ],
      })
      const inventorization = inventorizationsFixtures.inventorizationDetail({
        executor: currentUser,
      })
      mockGetUsersSuccess({ once: false })
      mockGetUsersGroupsSuccess({ once: false })
      mockGetInventorizationEquipmentsSuccess({ inventorizationId: inventorization.id })
      mockGetLocationsCatalogSuccess({ once: false })

      const { user } = renderWithRouter(
        [
          {
            path: CommonRoutesEnum.Root,
            element: <RelocationTaskDetails {...props} inventorization={inventorization} />,
          },
          {
            path: WarehousesRoutesEnum.EditRelocationTaskDraft,
            element: <EditRelocationTaskDraftPage />,
          },
        ],
        { initialEntries: [CommonRoutesEnum.Root], initialIndex: 0 },
        {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      await relocationTaskDetailsTestUtils.clickChangeDraftMenuItem(user)
      const page = editRelocationTaskDraftPageTestUtils.getContainer()
      expect(page).toBeInTheDocument()
    })
  })

  describe('Перевести черновик в работу', () => {
    test(`Пункт меню отображается если заявка в статусе ${RelocationTaskStatusEnum.Draft}, создатель заявки текущий пользователь и есть права ${UserPermissionsEnum.RelocationTasksUpdate}`, async () => {
      const currentUser = userFixtures.userDetail({
        permissions: [UserPermissionsEnum.RelocationTasksUpdate],
      })
      const relocationTask = relocationTasksFixtures.relocationTaskDetail({
        id: props.relocationTaskId,
        status: RelocationTaskStatusEnum.Draft,
        createdBy: currentUser,
      })
      mockGetRelocationTaskSuccess(
        { relocationTaskId: relocationTask.id },
        { body: relocationTask },
      )

      mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTask.id })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      const item = relocationTaskDetailsTestUtils.getMoveDraftToWorkMenuItem()
      expect(item).toBeInTheDocument()
      expect(item).toBeEnabled()
    })

    describe('Пункт меню не отображается', () => {
      test(`Если заявка в статусе ${RelocationTaskStatusEnum.Draft}, создатель заявки текущий пользователь но нет прав ${UserPermissionsEnum.RelocationTasksUpdate}`, async () => {
        const currentUser = userFixtures.userDetail({ permissions: [] })
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Draft,
          createdBy: currentUser,
        })
        mockGetRelocationTaskSuccess(
          { relocationTaskId: relocationTask.id },
          { body: relocationTask },
        )

        mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTask.id })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(currentUser, undefined, undefined, {
              queries: { ...getUserMeQueryMock(currentUser) },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.queryMoveDraftToWorkMenuItem()
        expect(item).not.toBeInTheDocument()
      })

      test(`Если заявка в статусе ${RelocationTaskStatusEnum.Draft}, есть права ${UserPermissionsEnum.RelocationTasksUpdate}, но создатель заявки не текущий пользователь`, async () => {
        const currentUser = userFixtures.userDetail({
          permissions: [UserPermissionsEnum.RelocationTasksUpdate],
        })
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.Draft,
        })
        mockGetRelocationTaskSuccess(
          { relocationTaskId: relocationTask.id },
          { body: relocationTask },
        )

        mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTask.id })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(currentUser, undefined, undefined, {
              queries: { ...getUserMeQueryMock(currentUser) },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.queryMoveDraftToWorkMenuItem()
        expect(item).not.toBeInTheDocument()
      })

      test(`Если есть права ${UserPermissionsEnum.RelocationTasksUpdate}, создатель заявки текущий пользователь но заявка не в статусе ${RelocationTaskStatusEnum.Draft}`, async () => {
        const currentUser = userFixtures.userDetail({
          permissions: [UserPermissionsEnum.RelocationTasksUpdate],
        })
        const relocationTask = relocationTasksFixtures.relocationTaskDetail({
          id: props.relocationTaskId,
          status: RelocationTaskStatusEnum.New,
          createdBy: currentUser,
        })
        mockGetRelocationTaskSuccess(
          { relocationTaskId: relocationTask.id },
          { body: relocationTask },
        )

        mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTask.id })

        const { user } = render(
          <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
          {
            store: getStoreWithAuth(currentUser, undefined, undefined, {
              queries: { ...getUserMeQueryMock(currentUser) },
            }),
          },
        )

        await relocationTaskDetailsTestUtils.openMenu(user)
        const item = relocationTaskDetailsTestUtils.queryMoveDraftToWorkMenuItem()
        expect(item).not.toBeInTheDocument()
      })
    })

    test('При клике открывается модалка подтверждения перевода заявки в работу', async () => {
      const currentUser = userFixtures.userDetail({
        permissions: [UserPermissionsEnum.RelocationTasksUpdate],
      })
      const relocationTask = relocationTasksFixtures.relocationTaskDetail({
        id: props.relocationTaskId,
        status: RelocationTaskStatusEnum.Draft,
        createdBy: currentUser,
      })
      mockGetRelocationTaskSuccess(
        { relocationTaskId: relocationTask.id },
        { body: relocationTask },
      )

      mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTask.id })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      await relocationTaskDetailsTestUtils.clickMoveDraftToWorkMenuItem(user)
      const modal = await confirmMoveRelocationTaskDraftToWorkModalTestUtils.findContainer()
      expect(modal).toBeInTheDocument()
    })

    test('После успешного подтверждения закрывается модалка, вызывается функция перезапроса заявок на перемещение и меняется статус заявки', async () => {
      const currentUser = userFixtures.userDetail({
        permissions: [UserPermissionsEnum.RelocationTasksUpdate],
      })
      const relocationTask = relocationTasksFixtures.relocationTaskDetail({
        id: props.relocationTaskId,
        status: RelocationTaskStatusEnum.Draft,
        createdBy: currentUser,
      })
      mockGetRelocationTaskSuccess(
        { relocationTaskId: relocationTask.id },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTask.id })

      const updatedRelocationTask = relocationTasksFixtures.relocationTaskDetail({
        status: RelocationTaskStatusEnum.New,
      })
      mockMoveRelocationTaskDraftToWorkSuccess(
        { relocationTaskId: relocationTask.id },
        { body: updatedRelocationTask },
      )

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.openMenu(user)
      await relocationTaskDetailsTestUtils.clickMoveDraftToWorkMenuItem(user)
      const modal = await confirmMoveRelocationTaskDraftToWorkModalTestUtils.findContainer()
      await confirmMoveRelocationTaskDraftToWorkModalTestUtils.clickConfirmButton(user)

      await waitFor(() => expect(modal).not.toBeInTheDocument())
      expect(props.refetchRelocationTasks).toBeCalledTimes(1)
      const status = relocationTaskDetailsTestUtils.getBlockInfo(
        'status',
        relocationTaskStatusDict[updatedRelocationTask.status],
      )
      expect(status).toBeInTheDocument()
    })
  })

  describe('Посмотреть общие фото', () => {
    test('Кнопка отображается', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail()
      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()
      const button = relocationTaskDetailsTestUtils.getCommonPhotosButton()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При нажатии открывается модалка просмотра изображений', async () => {
      const relocationTask = relocationTasksFixtures.relocationTaskDetail()
      mockGetRelocationTaskSuccess(
        { relocationTaskId: props.relocationTaskId },
        { body: relocationTask },
      )
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationTaskAttachmentsSuccess(props.relocationTaskId)

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()
      await relocationTaskDetailsTestUtils.clickCommonPhotosButton(user)
      const modal = await attachmentListModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })
  })

  describe('Увеличение размера окна', () => {
    test('Кнопка увеличения отображается', async () => {
      mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      render(<RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()
      const button = relocationTaskDetailsTestUtils.getStretchDetailsButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При нажатии на кнопку увеличивается высота окна', async () => {
      mockGetRelocationTaskSuccess({ relocationTaskId: props.relocationTaskId })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: props.relocationTaskId })

      const { user } = render(
        <RelocationTaskDetails {...props} relocationTaskId={props.relocationTaskId} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await relocationTaskDetailsTestUtils.expectRelocationTaskLoadingFinished()
      const heightBeforeFirstStretch = Number(
        split(relocationTaskDetailsTestUtils.getContainer().style.height, 'px')[0],
      )

      await relocationTaskDetailsTestUtils.clickStretchDetailsButton(user)
      const heightAfterFirstStretch = Number(
        split(relocationTaskDetailsTestUtils.getContainer().style.height, 'px')[0],
      )
      expect(heightAfterFirstStretch).toBeGreaterThan(heightBeforeFirstStretch)

      await relocationTaskDetailsTestUtils.clickStretchDetailsButton(user)
      const currentHeight = Number(
        split(relocationTaskDetailsTestUtils.getContainer().style.height, 'px')[0],
      )
      expect(currentHeight).toBeLessThan(heightAfterFirstStretch)
      expect(currentHeight).toBe(heightBeforeFirstStretch)
    })
  })
})
