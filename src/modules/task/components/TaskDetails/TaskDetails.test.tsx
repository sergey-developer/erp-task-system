import { screen, waitFor } from '@testing-library/react'

import { testUtils as confirmCancelReclassificationRequestModalTestUtils } from 'modules/task/components/ConfirmCancelReclassificationRequestModal/ConfirmCancelReclassificationRequestModal.test'
import { testUtils as confirmExecuteTaskReclassificationTasksModalTestUtils } from 'modules/task/components/ConfirmExecuteTaskReclassificationTasksModal/ConfirmExecuteTaskReclassificationTasksModal.test'
import { testUtils as confirmExecuteTaskRegistrationFNModalTestUtils } from 'modules/task/components/ConfirmExecuteTaskRegistrationFNModal/ConfirmExecuteTaskRegistrationFNModal.test'
import { testUtils as createRegistrationFNRequestModalTestUtils } from 'modules/task/components/CreateRegistrationFNRequestModal/CreateRegistrationFNRequestModal.test'
import { testUtils as executeTaskModalTestUtils } from 'modules/task/components/ExecuteTaskModal/ExecuteTaskModal.test'
import { testUtils as assigneeBlockTestUtils } from 'modules/task/components/TaskDetails/AssigneeBlock/AssigneeBlock.test'
import { testUtils as workGroupBlockTestUtils } from 'modules/task/components/TaskDetails/WorkGroupBlock/WorkGroupBlock.test'
import { testUtils as taskReclassificationRequestTestUtils } from 'modules/task/components/TaskReclassificationRequest/TaskReclassificationRequest.test'
import {
  takeTaskErrMsg,
  TaskActionsPermissionsEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/task'
import {
  createSuspendRequestErrMsg,
  deleteSuspendRequestErrMsg,
  SuspendReasonEnum,
  SuspendRequestStatusEnum,
} from 'modules/task/constants/taskSuspendRequest'
import { CreateTaskSuspendRequestBadRequestErrorResponse } from 'modules/task/models'

import { commonApiMessages } from 'shared/constants/common'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import {
  mockCancelReclassificationRequestSuccess,
  mockCreateTaskAttachmentSuccess,
  mockCreateTaskRegistrationFNRequestSuccess,
  mockCreateTaskSuspendRequestBadRequestError,
  mockCreateTaskSuspendRequestNotFoundError,
  mockCreateTaskSuspendRequestServerError,
  mockCreateTaskSuspendRequestSuccess,
  mockDeleteTaskSuspendRequestBadRequestError,
  mockDeleteTaskSuspendRequestNotFoundError,
  mockDeleteTaskSuspendRequestServerError,
  mockDeleteTaskSuspendRequestSuccess,
  mockGetFaChangeTypesSuccess,
  mockGetTaskReclassificationRequestSuccess,
  mockGetTaskRegistrationRequestRecipientsFNSuccess,
  mockGetTaskSuccess,
  mockGetUserActionsSuccess,
  mockGetWorkGroupsSuccess,
  mockResolveTaskSuccess,
  mockTakeTaskServerError,
  mockTakeTaskSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  fakeId,
  fakeWord,
  getStoreWithAuth,
  menuTestUtils,
  notificationTestUtils,
  render,
  setupApiTests,
  spinnerTestUtils,
} from '_tests_/utils'

import { testUtils as requestTaskSuspendModalTestUtils } from '../RequestTaskSuspendModal/RequestTaskSuspendModal.test'
import { testUtils as taskSuspendRequestTestUtils } from '../TaskSuspendRequest/TaskSuspendRequest.test'
import {
  activeRequestSuspendItemProps,
  canExecuteTaskProps,
  canRegisterFNItemProps,
  testUtils as taskDetailsTitleTestUtils,
} from './TaskDetailsTitle/TaskDetailsTitle.test'
import TaskDetails, { TaskDetailsProps } from './index'

const props: TaskDetailsProps = {
  taskId: fakeId(),

  additionalInfoExpanded: false,
  onExpandAdditionalInfo: jest.fn(),

  activeTab: undefined,
  onClose: jest.fn(),
}

const findContainer = () => screen.findByTestId('task-details')
const getContainer = () => screen.getByTestId('task-details')

// loading
const expectTaskLoadingStarted = spinnerTestUtils.expectLoadingStarted('task-loading')
const expectTaskLoadingFinished = spinnerTestUtils.expectLoadingFinished('task-loading')

const expectReclassificationRequestLoadingStarted = spinnerTestUtils.expectLoadingStarted(
  'task-reclassification-request-loading',
)
const expectReclassificationRequestLoadingFinished = spinnerTestUtils.expectLoadingFinished(
  'task-reclassification-request-loading',
)

export const testUtils = {
  getContainer,
  findContainer,

  expectTaskLoadingStarted,
  expectTaskLoadingFinished,
  expectReclassificationRequestLoadingStarted,
  expectReclassificationRequestLoadingFinished,
}

setupApiTests()

describe('Карточка заявки', () => {
  test('Блок информации о рабочей группе отображается', async () => {
    const task = taskFixtures.task({ id: props.taskId })
    mockGetTaskSuccess(props.taskId, { body: task })

    const userId = fakeId()
    mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

    render(<TaskDetails {...props} />, {
      store: getStoreWithAuth({ id: userId }, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    await testUtils.expectTaskLoadingFinished()
    const container = workGroupBlockTestUtils.getContainer()

    expect(container).toBeInTheDocument()
  })

  test('Блок информации о исполнителе отображается', async () => {
    const task = taskFixtures.task({ id: props.taskId })
    mockGetTaskSuccess(props.taskId, { body: task })

    const userId = fakeId()
    mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

    render(<TaskDetails {...props} />, {
      store: getStoreWithAuth({ id: userId }, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    await testUtils.expectTaskLoadingFinished()
    const container = assigneeBlockTestUtils.getContainer()

    expect(container).toBeInTheDocument()
  })

  describe('Выполнить заявку', () => {
    test('Кнопка активная если условия соблюдены', async () => {
      const task = taskFixtures.task({ id: props.taskId, ...canExecuteTaskProps })
      mockGetTaskSuccess(props.taskId, { body: task })

      const userId = task.assignee!.id
      mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

      const { user } = render(<TaskDetails {...props} />, {
        store: getStoreWithAuth({ id: userId }, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      await testUtils.expectTaskLoadingFinished()
      await taskDetailsTitleTestUtils.openMenu(user)
      const menuItem = taskDetailsTitleTestUtils.getExecuteTaskMenuItem()

      expect(menuItem).toBeInTheDocument()
      menuTestUtils.expectMenuItemNotDisabled(menuItem)
    })

    describe('Кнопка не активна если условия соблюдены', () => {
      test('Но пользователь не является исполнителем заявки', async () => {
        const task = taskFixtures.task({ id: props.taskId, ...canExecuteTaskProps })
        mockGetTaskSuccess(props.taskId, { body: task })

        const userId = fakeId()
        mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

        const { user } = render(<TaskDetails {...props} />, {
          store: getStoreWithAuth({ id: userId }, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        await testUtils.expectTaskLoadingFinished()
        await taskDetailsTitleTestUtils.openMenu(user)
        const menuItem = taskDetailsTitleTestUtils.getExecuteTaskMenuItem()

        menuTestUtils.expectMenuItemDisabled(menuItem)
      })

      test(`Но статус заявки не ${TaskStatusEnum.InProgress}`, async () => {
        const task = taskFixtures.task({
          id: props.taskId,
          ...canExecuteTaskProps,
          status: TaskStatusEnum.New,
        })
        mockGetTaskSuccess(props.taskId, { body: task })

        const userId = task.assignee!.id
        mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

        const { user } = render(<TaskDetails {...props} />, {
          store: getStoreWithAuth({ id: userId }, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        await testUtils.expectTaskLoadingFinished()
        await taskDetailsTitleTestUtils.openMenu(user)
        const menuItem = taskDetailsTitleTestUtils.getExecuteTaskMenuItem()

        menuTestUtils.expectMenuItemDisabled(menuItem)
      })

      test(`Но расширенный статус заявки ${TaskExtendedStatusEnum.InReclassification}`, async () => {
        const task = taskFixtures.task({
          id: props.taskId,
          ...canExecuteTaskProps,
          extendedStatus: TaskExtendedStatusEnum.InReclassification,
        })
        mockGetTaskSuccess(props.taskId, { body: task })
        mockGetTaskReclassificationRequestSuccess(props.taskId)

        const userId = task.assignee!.id
        mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

        const { user } = render(<TaskDetails {...props} />, {
          store: getStoreWithAuth({ id: userId }, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        await testUtils.expectTaskLoadingFinished()
        await taskDetailsTitleTestUtils.openMenu(user)
        const menuItem = taskDetailsTitleTestUtils.getExecuteTaskMenuItem()

        menuTestUtils.expectMenuItemDisabled(menuItem)
      })
    })

    test('Модалка выполнения заявки открывается после показа всех предупреждений', async () => {
      const task = taskFixtures.task({
        id: props.taskId,
        ...canExecuteTaskProps,
        hasRelocationTasks: false,
        fiscalAccumulator: {
          isRequestSent: true,
          isRequestApproved: false,
        },
      })
      mockGetTaskSuccess(props.taskId, { body: task })

      const userId = task.assignee!.id
      mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

      const { user } = render(<TaskDetails {...props} />, {
        store: getStoreWithAuth({ id: userId }, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      await testUtils.expectTaskLoadingFinished()
      await taskDetailsTitleTestUtils.openMenu(user)
      await taskDetailsTitleTestUtils.clickExecuteTaskMenuItem(user)

      const confirmExecuteTaskRegistrationFNModal =
        await confirmExecuteTaskRegistrationFNModalTestUtils.findContainer()
      expect(confirmExecuteTaskRegistrationFNModal).toBeInTheDocument()
      await confirmExecuteTaskRegistrationFNModalTestUtils.clickConfirmButton(user)

      const confirmExecuteTaskReclassificationTasksModal =
        await confirmExecuteTaskReclassificationTasksModalTestUtils.findContainer()
      expect(confirmExecuteTaskReclassificationTasksModal).toBeInTheDocument()
      await confirmExecuteTaskReclassificationTasksModalTestUtils.clickConfirmButton(user)

      const executeTaskDrawer = await executeTaskModalTestUtils.findContainer()
      expect(executeTaskDrawer).toBeInTheDocument()
    })

    test('После успешного запроса закрывается модалка и вызывается обработчик закрытия карточки заявки', async () => {
      const task = taskFixtures.task({
        id: props.taskId,
        ...canExecuteTaskProps,
        hasRelocationTasks: true,
      })
      mockGetTaskSuccess(props.taskId, { body: task })
      mockResolveTaskSuccess(props.taskId)

      const userId = task.assignee!.id
      mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

      const { user } = render(<TaskDetails {...props} />, {
        store: getStoreWithAuth({ id: userId }, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      await testUtils.expectTaskLoadingFinished()
      await taskDetailsTitleTestUtils.openMenu(user)
      await taskDetailsTitleTestUtils.clickExecuteTaskMenuItem(user)

      await executeTaskModalTestUtils.findContainer()
      await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
      await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
      await executeTaskModalTestUtils.clickSubmitButton(user)
      await waitFor(() => expect(props.onClose).toBeCalledTimes(1))
    })
  })

  describe('Зарегистрировать ФН', () => {
    test('После успешного запроса закрывается модалка', async () => {
      const task = taskFixtures.task({ id: props.taskId, ...canRegisterFNItemProps })
      mockGetTaskSuccess(props.taskId, { body: task, once: false })

      const faChangeTypeListItem = catalogsFixtures.faChangeTypeListItem()
      mockGetFaChangeTypesSuccess({ body: [faChangeTypeListItem] })

      mockGetTaskRegistrationRequestRecipientsFNSuccess(props.taskId, {
        body: taskFixtures.registrationRequestRecipientsFN(),
      })

      mockCreateTaskAttachmentSuccess(props.taskId)
      mockCreateTaskRegistrationFNRequestSuccess(props.taskId)

      const userId = canRegisterFNItemProps.assignee!.id
      mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

      const { user } = render(<TaskDetails {...props} />, {
        store: getStoreWithAuth({ id: userId }, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      await testUtils.expectTaskLoadingFinished()
      await taskDetailsTitleTestUtils.openMenu(user)
      await taskDetailsTitleTestUtils.clickRegisterFNMenuItem(user)

      const modal = await createRegistrationFNRequestModalTestUtils.findContainer()
      await createRegistrationFNRequestModalTestUtils.openChangeTypeSelect(user)
      await createRegistrationFNRequestModalTestUtils.setChangeType(
        user,
        faChangeTypeListItem.title,
      )
      await createRegistrationFNRequestModalTestUtils.setAttachment(user)
      await createRegistrationFNRequestModalTestUtils.clickSubmitButton(user)

      await waitFor(() => expect(modal).not.toBeInTheDocument())
    })
  })

  describe('Переклассификация заявки', () => {
    describe('Отмена запроса', () => {
      test('После подтверждения отмены перезапрашивается заявка и закрывается модалка подтверждения', async () => {
        mockGetTaskSuccess(props.taskId, {
          body: taskFixtures.task({
            id: props.taskId,
            extendedStatus: TaskExtendedStatusEnum.InReclassification,
          }),
          once: false,
        })

        const reclassificationRequest = taskFixtures.reclassificationRequest()
        mockGetTaskReclassificationRequestSuccess(props.taskId, { body: reclassificationRequest })

        const currentUser = userFixtures.user()
        mockGetUserActionsSuccess(currentUser.id, {
          body: {
            tasks: {
              ...userFixtures.taskActionsPermissions,
              [TaskActionsPermissionsEnum.CanReclassificationRequestsCreate]: [props.taskId],
            },
          },
        })

        mockCancelReclassificationRequestSuccess(reclassificationRequest.id)

        const { user } = render(<TaskDetails {...props} />, {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await testUtils.expectReclassificationRequestLoadingFinished()
        await taskReclassificationRequestTestUtils.findContainer()
        await taskReclassificationRequestTestUtils.clickCancelButton(user)
        const modal = await confirmCancelReclassificationRequestModalTestUtils.findContainer()
        await confirmCancelReclassificationRequestModalTestUtils.clickConfirmButton(user)
        await testUtils.expectTaskLoadingStarted()
        await testUtils.expectTaskLoadingFinished()
        expect(modal).not.toBeInTheDocument()
      })
    })
  })

  // todo: поправить
  describe('Перевод заявки в ожидание', () => {
    describe('Создание запроса', () => {
      describe('При успешном запросе', () => {
        test('Созданный запрос отображается', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...activeRequestSuspendItemProps,
          })
          mockGetTaskSuccess(task.id, { body: task })

          mockCreateTaskSuspendRequestSuccess(props.taskId, { body: taskFixtures.suspendRequest() })

          const userId = task.assignee!.id
          mockGetUserActionsSuccess(userId, {
            body: userFixtures.userActions({
              tasks: {
                ...userFixtures.taskActionsPermissions,
                CAN_SUSPEND_REQUESTS_CREATE: [task.id],
              },
            }),
          })

          const { user } = render(<TaskDetails {...props} />, {
            store: getStoreWithAuth({ id: userId }, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          })

          await testUtils.expectTaskLoadingFinished()
          await taskDetailsTitleTestUtils.openMenu(user)
          await taskDetailsTitleTestUtils.clickRequestSuspendItem(user)
          await requestTaskSuspendModalTestUtils.findContainer()

          await requestTaskSuspendModalTestUtils.setReason(
            user,
            SuspendReasonEnum.AwaitingInformation,
          )
          await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
          await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

          expect(await taskSuspendRequestTestUtils.findContainer()).toBeInTheDocument()
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 404', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              ...activeRequestSuspendItemProps,
            }),
          })

          mockCreateTaskSuspendRequestNotFoundError(props.taskId)

          const { user } = render(<TaskDetails {...props} />, {
            store: getStoreWithAuth({}),
          })

          await testUtils.expectTaskLoadingFinished()

          await taskDetailsTitleTestUtils.openMenu(user)
          await taskDetailsTitleTestUtils.clickRequestSuspendItem(user)
          await requestTaskSuspendModalTestUtils.findContainer()

          await requestTaskSuspendModalTestUtils.setReason(
            user,
            SuspendReasonEnum.AwaitingInformation,
          )
          await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
          await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

          expect(
            await notificationTestUtils.findNotification(createSuspendRequestErrMsg),
          ).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 400', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              ...activeRequestSuspendItemProps,
            }),
          })

          const badRequestResponse: Required<CreateTaskSuspendRequestBadRequestErrorResponse> = {
            comment: [fakeWord()],
            suspendEndAt: [fakeWord()],
            suspendReason: [fakeWord()],
            externalRevisionLink: [fakeWord()],
            externalResponsibleCompany: [fakeWord()],
          }

          mockCreateTaskSuspendRequestBadRequestError(props.taskId, {
            body: badRequestResponse,
          })

          const { user } = render(<TaskDetails {...props} />, {
            store: getStoreWithAuth({}),
          })

          await testUtils.expectTaskLoadingFinished()

          await taskDetailsTitleTestUtils.openMenu(user)
          await taskDetailsTitleTestUtils.clickRequestSuspendItem(user)
          await requestTaskSuspendModalTestUtils.findContainer()

          await requestTaskSuspendModalTestUtils.setReason(
            user,
            SuspendReasonEnum.AwaitingInformation,
          )
          await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
          await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

          expect(
            await notificationTestUtils.findNotification(createSuspendRequestErrMsg),
          ).toBeInTheDocument()

          expect(
            await requestTaskSuspendModalTestUtils.findReasonError(
              badRequestResponse.suspendReason[0],
            ),
          ).toBeInTheDocument()

          expect(
            await requestTaskSuspendModalTestUtils.findCommentError(badRequestResponse.comment[0]),
          ).toBeInTheDocument()

          expect(
            await requestTaskSuspendModalTestUtils.findEndDateError(
              badRequestResponse.suspendEndAt[0],
            ),
          ).toBeInTheDocument()

          expect(
            await requestTaskSuspendModalTestUtils.findEndTimeError(
              badRequestResponse.suspendEndAt[0],
            ),
          ).toBeInTheDocument()

          expect(
            await requestTaskSuspendModalTestUtils.findEndTimeError(
              badRequestResponse.externalRevisionLink[0],
            ),
          ).toBeInTheDocument()

          expect(
            await requestTaskSuspendModalTestUtils.findEndTimeError(
              badRequestResponse.externalResponsibleCompany[0],
            ),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              ...activeRequestSuspendItemProps,
            }),
          })

          mockCreateTaskSuspendRequestServerError(props.taskId)

          const { user } = render(<TaskDetails {...props} />, {
            store: getStoreWithAuth({}),
          })

          await testUtils.expectTaskLoadingFinished()

          await taskDetailsTitleTestUtils.openMenu(user)
          await taskDetailsTitleTestUtils.clickRequestSuspendItem(user)
          await requestTaskSuspendModalTestUtils.findContainer()

          await requestTaskSuspendModalTestUtils.setReason(
            user,
            SuspendReasonEnum.AwaitingInformation,
          )
          await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
          await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

          expect(
            await notificationTestUtils.findNotification(commonApiMessages.unknownError),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Отмена запроса', () => {
      describe('При успешном запросе', () => {
        test('Заявка перезапрашивается с сервера', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              suspendRequest: taskFixtures.suspendRequest({
                status: SuspendRequestStatusEnum.New,
              }),
            }),
            once: false,
          })

          const currentUser = userFixtures.user()
          mockGetUserActionsSuccess(currentUser.id, {
            body: userFixtures.userActions({
              tasks: {
                ...userFixtures.taskActionsPermissions,
                [TaskActionsPermissionsEnum.CanSuspendRequestsCreate]: [props.taskId],
              },
            }),
          })

          mockDeleteTaskSuspendRequestSuccess(props.taskId)

          const { user } = render(<TaskDetails {...props} />, {
            store: getStoreWithAuth(currentUser, undefined, undefined, {
              queries: { ...getUserMeQueryMock(currentUser) },
            }),
          })

          await testUtils.expectTaskLoadingFinished()
          await taskSuspendRequestTestUtils.findContainer()
          await taskSuspendRequestTestUtils.clickCancelButton(user)
          await testUtils.expectTaskLoadingStarted()
          await testUtils.expectTaskLoadingFinished()
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 404', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              suspendRequest: taskFixtures.suspendRequest({
                status: SuspendRequestStatusEnum.New,
              }),
            }),
            once: false,
          })

          const currentUser = userFixtures.user()
          mockGetUserActionsSuccess(currentUser.id, {
            body: userFixtures.userActions({
              tasks: {
                ...userFixtures.taskActionsPermissions,
                [TaskActionsPermissionsEnum.CanSuspendRequestsCreate]: [props.taskId],
              },
            }),
          })

          const detailError = fakeWord()
          mockDeleteTaskSuspendRequestNotFoundError(props.taskId, {
            body: { detail: [detailError] },
          })

          const { user } = render(<TaskDetails {...props} />, {
            store: getStoreWithAuth(currentUser, undefined, undefined, {
              queries: { ...getUserMeQueryMock(currentUser) },
            }),
          })

          await testUtils.expectTaskLoadingFinished()
          await taskSuspendRequestTestUtils.findContainer()
          await taskSuspendRequestTestUtils.clickCancelButton(user)
          await testUtils.expectTaskLoadingStarted()
          await testUtils.expectTaskLoadingFinished()

          const notification = await notificationTestUtils.findNotification(detailError)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 400', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              suspendRequest: taskFixtures.suspendRequest({
                status: SuspendRequestStatusEnum.New,
              }),
            }),
            once: false,
          })

          const currentUser = userFixtures.user()
          mockGetUserActionsSuccess(currentUser.id, {
            body: userFixtures.userActions({
              tasks: {
                ...userFixtures.taskActionsPermissions,
                [TaskActionsPermissionsEnum.CanSuspendRequestsCreate]: [props.taskId],
              },
            }),
          })

          const detailError = fakeWord()
          mockDeleteTaskSuspendRequestBadRequestError(props.taskId, {
            body: { detail: [detailError] },
          })

          const { user } = render(<TaskDetails {...props} />, {
            store: getStoreWithAuth(currentUser, undefined, undefined, {
              queries: { ...getUserMeQueryMock(currentUser) },
            }),
          })

          await testUtils.expectTaskLoadingFinished()
          await taskSuspendRequestTestUtils.findContainer()
          await taskSuspendRequestTestUtils.clickCancelButton(user)

          const notification = await notificationTestUtils.findNotification(detailError)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              suspendRequest: taskFixtures.suspendRequest({
                status: SuspendRequestStatusEnum.New,
              }),
            }),
            once: false,
          })

          const currentUser = userFixtures.user()
          mockGetUserActionsSuccess(currentUser.id, {
            body: userFixtures.userActions({
              tasks: {
                ...userFixtures.taskActionsPermissions,
                [TaskActionsPermissionsEnum.CanSuspendRequestsCreate]: [props.taskId],
              },
            }),
          })

          mockDeleteTaskSuspendRequestServerError(props.taskId)

          const { user } = render(<TaskDetails {...props} />, {
            store: getStoreWithAuth(currentUser, undefined, undefined, {
              queries: { ...getUserMeQueryMock(currentUser) },
            }),
          })

          await testUtils.expectTaskLoadingFinished()
          await taskSuspendRequestTestUtils.findContainer()
          await taskSuspendRequestTestUtils.clickCancelButton(user)

          const notification = await notificationTestUtils.findNotification(
            deleteSuspendRequestErrMsg,
          )
          expect(notification).toBeInTheDocument()
        })
      })
    })

    describe('Вернуть в работу', () => {
      describe('При успешном запросе', () => {
        test('Заявка перезапрашивается с сервера', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              suspendRequest: taskFixtures.suspendRequest({
                status: SuspendRequestStatusEnum.Approved,
              }),
            }),
            once: false,
          })

          const currentUser = userFixtures.user()
          mockGetUserActionsSuccess(currentUser.id, {
            body: userFixtures.userActions({
              tasks: {
                ...userFixtures.taskActionsPermissions,
                [TaskActionsPermissionsEnum.CanSuspendRequestsCreate]: [props.taskId],
              },
            }),
          })

          mockTakeTaskSuccess(props.taskId)

          const { user } = render(<TaskDetails {...props} />, {
            store: getStoreWithAuth(currentUser, undefined, undefined, {
              queries: { ...getUserMeQueryMock(currentUser) },
            }),
          })

          await testUtils.expectTaskLoadingStarted()
          await testUtils.expectTaskLoadingFinished()
          await taskSuspendRequestTestUtils.findContainer()
          await taskSuspendRequestTestUtils.clickReturnToWorkButton(user)
          await testUtils.expectTaskLoadingStarted()
          await testUtils.expectTaskLoadingFinished()
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 500', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              suspendRequest: taskFixtures.suspendRequest({
                status: SuspendRequestStatusEnum.Approved,
              }),
            }),
          })

          const currentUser = userFixtures.user()
          mockGetUserActionsSuccess(currentUser.id, {
            body: userFixtures.userActions({
              tasks: {
                ...userFixtures.taskActionsPermissions,
                [TaskActionsPermissionsEnum.CanSuspendRequestsCreate]: [props.taskId],
              },
            }),
          })

          mockTakeTaskServerError(props.taskId)

          const { user } = render(<TaskDetails {...props} />, {
            store: getStoreWithAuth(currentUser, undefined, undefined, {
              queries: { ...getUserMeQueryMock(currentUser) },
            }),
          })

          await testUtils.expectTaskLoadingStarted()
          await testUtils.expectTaskLoadingFinished()
          await taskSuspendRequestTestUtils.findContainer()
          await taskSuspendRequestTestUtils.clickReturnToWorkButton(user)

          expect(await notificationTestUtils.findNotification(takeTaskErrMsg)).toBeInTheDocument()
        })
      })
    })
  })
})
