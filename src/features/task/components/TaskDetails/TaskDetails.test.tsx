import { waitFor, within } from '@testing-library/react'
import { InfrastructuresRoutesEnum } from 'features/infrastructures/constants/routes'
import ChangeInfrastructurePage from 'features/infrastructures/pages/ChangeInfrastructurePage'
import { getChangeInfrastructurePageLocationState } from 'features/infrastructures/pages/ChangeInfrastructurePage/utils'
import { TasksRoutesEnum } from 'features/task/constants/routes'
import {
  takeTaskErrMsg,
  TaskActionsPermissionsEnum,
  TaskExtendedStatusEnum,
} from 'features/task/constants/task'
import {
  createSuspendRequestErrMsg,
  deleteSuspendRequestErrMsg,
  SuspendReasonEnum,
  SuspendRequestStatusEnum,
} from 'features/task/constants/taskSuspendRequest'
import { CreateTaskSuspendRequestBadRequestErrorResponse } from 'features/task/models'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { getFullUserName } from 'features/users/helpers'
import { WorkTypeActionsEnum } from 'features/warehouse/constants/workType/enum'
import * as reactRouterDom from 'react-router-dom'

import { NO_ASSIGNEE_TEXT } from 'shared/constants/common'

import { changeInfrastructurePageTestUtils } from '_tests_/features/infrastructure/pages/ChangeInfrastructurePage/testUtils'
import { confirmCancelReclassificationRequestModalTestUtils } from '_tests_/features/tasks/components/ConfirmCancelReclassificationRequestModal/testUtils'
import { confirmExecuteTaskReclassificationTasksModalTestUtils } from '_tests_/features/tasks/components/ConfirmExecuteTaskReclassificationTasksModal/testUtils'
import { confirmExecuteTaskRegistrationFNModalTestUtils } from '_tests_/features/tasks/components/ConfirmExecuteTaskRegistrationFNModal/testUtils'
import { createRegistrationFNRequestModalTestUtils } from '_tests_/features/tasks/components/CreateRegistrationFNRequestModal/testUtils'
import { executeTaskModalTestUtils } from '_tests_/features/tasks/components/ExecuteTaskModal/testUtils'
import { requestTaskSuspendModalTestUtils } from '_tests_/features/tasks/components/RequestTaskSuspendModal/testUtils'
import { taskAssigneeTestUtils } from '_tests_/features/tasks/components/TaskAssignee/testUtils'
import { assigneeBlockTestUtils } from '_tests_/features/tasks/components/TaskDetails/AssigneeBlock/testUtils'
import {
  activeRequestSuspendItemProps,
  canRegisterFNItemProps,
} from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTitle/constants'
import { taskDetailsTitleTestUtils } from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTitle/testUtils'
import { workGroupBlockTestUtils } from '_tests_/features/tasks/components/TaskDetails/WorkGroupBlock/testUtils'
import {
  activeChangeInfrastructureButton,
  props,
  showChangeInfrastructureButton,
} from '_tests_/features/tasks/components/TaskDetails/constants'
import { taskDetailsTestUtils } from '_tests_/features/tasks/components/TaskDetails/testUtils'
import { taskReclassificationRequestTestUtils } from '_tests_/features/tasks/components/TaskReclassificationRequest/testUtils'
import { taskSuspendRequestTestUtils } from '_tests_/features/tasks/components/TaskSuspendRequest/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import infrastructuresFixtures from '_tests_/fixtures/infrastructures'
import systemFixtures from '_tests_/fixtures/system'
import taskFixtures from '_tests_/fixtures/task'
import { fakeUseLocationResult } from '_tests_/fixtures/useLocation'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
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
  mockUpdateInfrastructureSuccess,
} from '_tests_/mocks/api'
import { getSystemSettingsQueryMock } from '_tests_/mocks/state/system'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  fakeId,
  fakeWord,
  getStoreWithAuth,
  menuTestUtils,
  notificationTestUtils,
  render,
  renderWithRouter,
  setupApiTests,
} from '_tests_/utils'

import TaskDetails from './index'

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
}))

setupApiTests()
notificationTestUtils.setupNotifications()

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

    await taskDetailsTestUtils.expectTaskLoadingFinished()
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

    await taskDetailsTestUtils.expectTaskLoadingFinished()
    const container = assigneeBlockTestUtils.getContainer()

    expect(container).toBeInTheDocument()
  })

  describe('Выполнить заявку', () => {
    test('Кнопка активная если userActions содержит id заявки', async () => {
      const task = taskFixtures.task({ id: props.taskId })
      mockGetTaskSuccess(props.taskId, { body: task })

      const currentUser = userFixtures.user()
      mockGetUserActionsSuccess(currentUser.id, {
        body: userFixtures.userActions({
          tasks: {
            ...userFixtures.taskActionsPermissions,
            [TaskActionsPermissionsEnum.CanResolve]: [task.id],
          },
        }),
      })

      const { user } = render(<TaskDetails {...props} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskDetailsTestUtils.expectTaskLoadingFinished()
      await taskDetailsTitleTestUtils.openMenu(user)
      const menuItem = taskDetailsTitleTestUtils.getExecuteTaskMenuItem()

      expect(menuItem).toBeInTheDocument()
      menuTestUtils.expectMenuItemNotDisabled(menuItem)
    })

    test('Кнопка не активна если userActions не содержит id заявки', async () => {
      const task = taskFixtures.task({ id: props.taskId })
      mockGetTaskSuccess(task.id, { body: task })

      const currentUser = userFixtures.user()
      mockGetUserActionsSuccess(currentUser.id, {
        body: userFixtures.userActions({
          tasks: {
            ...userFixtures.taskActionsPermissions,
            [TaskActionsPermissionsEnum.CanResolve]: [],
          },
        }),
      })

      const { user } = render(<TaskDetails {...props} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskDetailsTestUtils.expectTaskLoadingFinished()
      await taskDetailsTitleTestUtils.openMenu(user)
      const menuItem = taskDetailsTitleTestUtils.getExecuteTaskMenuItem()

      menuTestUtils.expectMenuItemDisabled(menuItem)
    })

    test.skip('Модалка выполнения заявки открывается после показа всех предупреждений', async () => {
      const task = taskFixtures.task({
        id: props.taskId,
        hasRelocationTasks: false,
        fiscalAccumulator: {
          isRequestSent: true,
          isRequestApproved: false,
        },
      })
      mockGetTaskSuccess(props.taskId, { body: task })

      const currentUser = userFixtures.user()
      mockGetUserActionsSuccess(currentUser.id, {
        body: userFixtures.userActions({
          tasks: {
            ...userFixtures.taskActionsPermissions,
            [TaskActionsPermissionsEnum.CanResolve]: [task.id],
          },
        }),
      })

      const { user } = render(<TaskDetails {...props} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskDetailsTestUtils.expectTaskLoadingFinished()
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

    test.skip('После успешного запроса закрывается модалка и вызывается обработчик закрытия карточки заявки', async () => {
      const task = taskFixtures.task({
        id: props.taskId,
        hasRelocationTasks: true,
      })
      mockGetTaskSuccess(props.taskId, { body: task })
      mockResolveTaskSuccess(props.taskId)

      const currentUser = userFixtures.user()
      mockGetUserActionsSuccess(currentUser.id, {
        body: userFixtures.userActions({
          tasks: {
            ...userFixtures.taskActionsPermissions,
            [TaskActionsPermissionsEnum.CanResolve]: [task.id],
          },
        }),
      })

      const { user } = render(<TaskDetails {...props} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskDetailsTestUtils.expectTaskLoadingFinished()
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
    test.skip('После успешного запроса закрывается модалка', async () => {
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

      await taskDetailsTestUtils.expectTaskLoadingFinished()
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
    describe.skip('Отмена запроса', () => {
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

        await taskReclassificationRequestTestUtils.findContainer()
        await taskReclassificationRequestTestUtils.clickCancelButton(user)
        const modal = await confirmCancelReclassificationRequestModalTestUtils.findContainer()
        await confirmCancelReclassificationRequestModalTestUtils.clickConfirmButton(user)
        await taskDetailsTestUtils.expectTaskLoadingStarted()
        await taskDetailsTestUtils.expectTaskLoadingFinished()
        expect(modal).not.toBeInTheDocument()
      })
    })
  })

  // todo: поправить
  describe('Перевод заявки в ожидание', () => {
    describe.skip('Создание запроса', () => {
      describe('При успешном запросе', () => {
        // todo: не проходит на CI
        test.skip('Созданный запрос отображается', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...activeRequestSuspendItemProps,
          })
          mockGetTaskSuccess(task.id, { body: task })

          mockCreateTaskSuspendRequestSuccess(props.taskId, { body: taskFixtures.suspendRequest() })

          const currentUser = userFixtures.user({ id: task.assignee!.id })
          mockGetUserActionsSuccess(currentUser.id, {
            body: userFixtures.userActions({
              tasks: {
                ...userFixtures.taskActionsPermissions,
                CAN_SUSPEND_REQUESTS_CREATE: [task.id],
              },
            }),
          })

          const { user } = render(<TaskDetails {...props} />, {
            store: getStoreWithAuth(currentUser, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock(currentUser),
                ...getSystemSettingsQueryMock(systemFixtures.settings()),
              },
            }),
          })

          await taskDetailsTestUtils.expectTaskLoadingFinished()
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

          const task = taskFixtures.task({
            id: props.taskId,
            ...activeRequestSuspendItemProps,
          })
          mockGetTaskSuccess(task.id, { body: task })

          const currentUser = userFixtures.user()
          mockGetUserActionsSuccess(currentUser.id, {
            body: userFixtures.userActions({
              tasks: {
                ...userFixtures.taskActionsPermissions,
                CAN_SUSPEND_REQUESTS_CREATE: [task.id],
              },
            }),
          })

          const detailError = fakeWord()
          mockCreateTaskSuspendRequestNotFoundError(props.taskId, {
            body: { detail: [detailError] },
          })

          const { user } = render(<TaskDetails {...props} />, {
            store: getStoreWithAuth(currentUser, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock(currentUser),
                ...getSystemSettingsQueryMock(systemFixtures.settings()),
              },
            }),
          })

          await taskDetailsTestUtils.expectTaskLoadingFinished()

          await taskDetailsTitleTestUtils.openMenu(user)
          await taskDetailsTitleTestUtils.clickRequestSuspendItem(user)
          await requestTaskSuspendModalTestUtils.findContainer()

          await requestTaskSuspendModalTestUtils.setReason(
            user,
            SuspendReasonEnum.AwaitingInformation,
          )
          await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
          await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

          expect(await notificationTestUtils.findNotification(detailError)).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 400', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...activeRequestSuspendItemProps,
          })
          mockGetTaskSuccess(task.id, { body: task })

          const currentUser = userFixtures.user()
          mockGetUserActionsSuccess(currentUser.id, {
            body: userFixtures.userActions({
              tasks: {
                ...userFixtures.taskActionsPermissions,
                CAN_SUSPEND_REQUESTS_CREATE: [task.id],
              },
            }),
          })

          const badRequestResponse: Required<CreateTaskSuspendRequestBadRequestErrorResponse> = {
            comment: [fakeWord()],
            suspendEndAt: [fakeWord()],
            suspendReason: [fakeWord()],
            externalRevisionLink: [fakeWord()],
            externalResponsibleCompany: [fakeWord()],
          }

          mockCreateTaskSuspendRequestBadRequestError<CreateTaskSuspendRequestBadRequestErrorResponse>(
            task.id,
            { body: { ...badRequestResponse } },
          )

          const { user } = render(<TaskDetails {...props} />, {
            store: getStoreWithAuth(currentUser, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock(currentUser),
                ...getSystemSettingsQueryMock(systemFixtures.settings()),
              },
            }),
          })

          await taskDetailsTestUtils.expectTaskLoadingFinished()

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
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...activeRequestSuspendItemProps,
          })
          mockGetTaskSuccess(task.id, { body: task })

          const currentUser = userFixtures.user()
          mockGetUserActionsSuccess(currentUser.id, {
            body: userFixtures.userActions({
              tasks: {
                ...userFixtures.taskActionsPermissions,
                CAN_SUSPEND_REQUESTS_CREATE: [task.id],
              },
            }),
          })

          mockCreateTaskSuspendRequestServerError(props.taskId)

          const { user } = render(<TaskDetails {...props} />, {
            store: getStoreWithAuth(currentUser, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock(currentUser),
                ...getSystemSettingsQueryMock(systemFixtures.settings()),
              },
            }),
          })

          await taskDetailsTestUtils.expectTaskLoadingFinished()
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

          await taskDetailsTestUtils.expectTaskLoadingFinished()
          await taskSuspendRequestTestUtils.findContainer()
          await taskSuspendRequestTestUtils.clickCancelButton(user)
          await taskDetailsTestUtils.expectTaskLoadingStarted()
          await taskDetailsTestUtils.expectTaskLoadingFinished()
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

          await taskDetailsTestUtils.expectTaskLoadingFinished()
          await taskSuspendRequestTestUtils.findContainer()
          await taskSuspendRequestTestUtils.clickCancelButton(user)
          await taskDetailsTestUtils.expectTaskLoadingStarted()
          await taskDetailsTestUtils.expectTaskLoadingFinished()

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

          await taskDetailsTestUtils.expectTaskLoadingFinished()
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

          await taskDetailsTestUtils.expectTaskLoadingFinished()
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

          await taskDetailsTestUtils.expectTaskLoadingStarted()
          await taskDetailsTestUtils.expectTaskLoadingFinished()
          await taskSuspendRequestTestUtils.findContainer()
          await taskSuspendRequestTestUtils.clickReturnToWorkButton(user)
          await taskDetailsTestUtils.expectTaskLoadingStarted()
          await taskDetailsTestUtils.expectTaskLoadingFinished()
        })
      })

      describe('При не успешном запросе', () => {
        test.skip('Обрабатывается ошибка 500', async () => {
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

          await taskDetailsTestUtils.expectTaskLoadingStarted()
          await taskDetailsTestUtils.expectTaskLoadingFinished()
          await taskSuspendRequestTestUtils.findContainer()
          await taskSuspendRequestTestUtils.clickReturnToWorkButton(user)

          expect(await notificationTestUtils.findNotification(takeTaskErrMsg)).toBeInTheDocument()
        })
      })
    })
  })

  describe('Изменение инфраструктуры', () => {
    test(`Кнопка отображается если есть infrastructureProject и workType.actions содержит права ${WorkTypeActionsEnum.CreateInfrastructureProject}`, async () => {
      const task = taskFixtures.task({
        id: props.taskId,
        ...showChangeInfrastructureButton.task,
      })

      mockGetTaskSuccess(props.taskId, { body: task })

      const currentUser = userFixtures.user()
      mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions() })

      render(<TaskDetails {...props} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskDetailsTestUtils.expectTaskLoadingFinished()
      const button = taskDetailsTestUtils.getChangeInfrastructureButton()

      expect(button).toBeInTheDocument()
    })

    test(`Кнопка не отображается если есть infrastructureProject но workType.actions не содержит права ${WorkTypeActionsEnum.CreateInfrastructureProject}`, async () => {
      const task = taskFixtures.task({
        id: props.taskId,
        ...showChangeInfrastructureButton.task,
        workType: warehouseFixtures.workType({ actions: [] }),
      })

      mockGetTaskSuccess(props.taskId, { body: task })

      const currentUser = userFixtures.user()
      mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions() })

      render(<TaskDetails {...props} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskDetailsTestUtils.expectTaskLoadingFinished()
      const button = taskDetailsTestUtils.queryChangeInfrastructureButton()

      expect(button).not.toBeInTheDocument()
    })

    test(`Кнопка не отображается если workType.actions содержит права ${WorkTypeActionsEnum.CreateInfrastructureProject} но нет infrastructureProject`, async () => {
      const task = taskFixtures.task({
        id: props.taskId,
        ...showChangeInfrastructureButton.task,
        infrastructureProject: null,
      })

      mockGetTaskSuccess(props.taskId, { body: task })

      const currentUser = userFixtures.user()
      mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions() })

      render(<TaskDetails {...props} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskDetailsTestUtils.expectTaskLoadingFinished()
      const button = taskDetailsTestUtils.queryChangeInfrastructureButton()

      expect(button).not.toBeInTheDocument()
    })

    test(`Кнопка активна если есть права ${UserPermissionsEnum.InfrastructureProjectRead}`, async () => {
      const task = taskFixtures.task({
        id: props.taskId,
        ...showChangeInfrastructureButton.task,
      })

      mockGetTaskSuccess(props.taskId, { body: task })

      const currentUser = userFixtures.user({
        permissions: [UserPermissionsEnum.InfrastructureProjectRead],
      })
      mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions() })

      render(<TaskDetails {...props} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskDetailsTestUtils.expectTaskLoadingFinished()
      const button = taskDetailsTestUtils.getChangeInfrastructureButton()

      expect(button).toBeEnabled()
    })

    test(`Кнопка активна если есть права ${UserPermissionsEnum.AnyStatusInfrastructureProjectRead}`, async () => {
      const task = taskFixtures.task({
        id: props.taskId,
        ...showChangeInfrastructureButton.task,
      })

      mockGetTaskSuccess(props.taskId, { body: task })

      const currentUser = userFixtures.user({
        permissions: [UserPermissionsEnum.AnyStatusInfrastructureProjectRead],
      })
      mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions() })

      render(<TaskDetails {...props} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskDetailsTestUtils.expectTaskLoadingFinished()
      const button = taskDetailsTestUtils.getChangeInfrastructureButton()

      expect(button).toBeEnabled()
    })

    test(`Кнопка не активна если нет прав ${UserPermissionsEnum.InfrastructureProjectRead} и ${UserPermissionsEnum.AnyStatusInfrastructureProjectRead}`, async () => {
      const task = taskFixtures.task({
        id: props.taskId,
        ...showChangeInfrastructureButton.task,
      })

      mockGetTaskSuccess(props.taskId, { body: task })

      const currentUser = userFixtures.user({ permissions: [] })
      mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions() })

      render(<TaskDetails {...props} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskDetailsTestUtils.expectTaskLoadingFinished()
      const button = taskDetailsTestUtils.getChangeInfrastructureButton()

      expect(button).toBeDisabled()
    })

    test('При нажатии переходит на страницу изменения инфраструктуры', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(fakeId()) })

      const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationState }))

      const task = taskFixtures.task({
        id: props.taskId,
        ...showChangeInfrastructureButton.task,
      })

      mockGetTaskSuccess(props.taskId, { body: task })

      const currentUser = userFixtures.user({
        permissions: activeChangeInfrastructureButton.permissions,
      })
      mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions() })

      const { user } = renderWithRouter(
        [
          {
            path: TasksRoutesEnum.DesktopTasks,
            element: <TaskDetails {...props} />,
          },
          {
            path: InfrastructuresRoutesEnum.DesktopChangeInfrastructure,
            element: <ChangeInfrastructurePage />,
          },
        ],
        { initialIndex: 0, initialEntries: [TasksRoutesEnum.DesktopTasks] },
        {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        },
      )

      await taskDetailsTestUtils.expectTaskLoadingFinished()
      await taskDetailsTestUtils.clickChangeInfrastructureButton(user)
      const page = changeInfrastructurePageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Менеджер по сопровождению', () => {
    test('Отображается если есть менеджер в infrastructureProject', async () => {
      const task = taskFixtures.task({
        id: props.taskId,
        infrastructureProject: infrastructuresFixtures.infrastructure(),
      })

      mockGetTaskSuccess(props.taskId, { body: task })

      const currentUser = userFixtures.user()
      mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions() })

      render(<TaskDetails {...props} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskDetailsTestUtils.expectTaskLoadingFinished()
      const title = within(taskDetailsTestUtils.getSupportManagerBlock()).getByText(
        'Менеджер по сопровождению',
      )
      const taskAssignee = taskAssigneeTestUtils.getContainerIn(
        taskDetailsTestUtils.getSupportManagerBlock(),
      )

      expect(title).toBeInTheDocument()
      expect(taskAssignee).toBeInTheDocument()
    })

    test('Соответствующий текст отображается если нет менеджера в infrastructureProject', async () => {
      const task = taskFixtures.task({
        id: props.taskId,
        infrastructureProject: infrastructuresFixtures.infrastructure({ manager: null }),
      })

      mockGetTaskSuccess(props.taskId, { body: task })

      const currentUser = userFixtures.user()
      mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions() })

      render(<TaskDetails {...props} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await taskDetailsTestUtils.expectTaskLoadingFinished()
      const noAssigneeText = within(taskDetailsTestUtils.getSupportManagerBlock()).getByText(
        NO_ASSIGNEE_TEXT,
      )

      expect(noAssigneeText).toBeInTheDocument()
    })

    describe('Кнопка назначить на себя', () => {
      test(`Отображается если есть права ${UserPermissionsEnum.InfrastructureProjectLeading}`, async () => {
        const task = taskFixtures.task({
          id: props.taskId,
          infrastructureProject: infrastructuresFixtures.infrastructure(),
        })

        mockGetTaskSuccess(props.taskId, { body: task })

        const currentUser = userFixtures.user({
          permissions: [UserPermissionsEnum.InfrastructureProjectLeading],
        })
        mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions() })

        render(<TaskDetails {...props} />, {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await taskDetailsTestUtils.expectTaskLoadingFinished()
        const button = taskDetailsTestUtils.getAssigneeOnMeButton()

        expect(button).toBeInTheDocument()
      })

      test(`Не отображается если нет прав ${UserPermissionsEnum.InfrastructureProjectLeading}`, async () => {
        const task = taskFixtures.task({
          id: props.taskId,
          infrastructureProject: infrastructuresFixtures.infrastructure(),
        })

        mockGetTaskSuccess(props.taskId, { body: task })

        const currentUser = userFixtures.user()
        mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions() })

        render(<TaskDetails {...props} />, {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await taskDetailsTestUtils.expectTaskLoadingFinished()
        const button = taskDetailsTestUtils.queryAssigneeOnMeButton()

        expect(button).not.toBeInTheDocument()
      })

      test('После назначения отображает нового менеджера', async () => {
        const infrastructure = infrastructuresFixtures.infrastructure()
        const task = taskFixtures.task({ id: props.taskId, infrastructureProject: infrastructure })

        mockGetTaskSuccess(props.taskId, { body: task })

        const currentUser = userFixtures.user({
          permissions: [UserPermissionsEnum.InfrastructureProjectLeading],
        })
        mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions() })

        const newInfrastructureManager = infrastructuresFixtures.infrastructure().manager!
        mockUpdateInfrastructureSuccess(
          { infrastructureId: infrastructure.id },
          { body: { ...infrastructure, manager: newInfrastructureManager } },
        )

        const { user } = render(<TaskDetails {...props} />, {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await taskDetailsTestUtils.expectTaskLoadingFinished()
        await taskDetailsTestUtils.clickAssigneeOnMeButton(user)
        await taskDetailsTestUtils.assigneeOnMeLoadingFinished()
        const assignee = taskAssigneeTestUtils.getContainerIn(
          taskDetailsTestUtils.getSupportManagerBlock(),
        )

        expect(assignee).toHaveTextContent(getFullUserName(newInfrastructureManager))
      })
    })
  })
})
