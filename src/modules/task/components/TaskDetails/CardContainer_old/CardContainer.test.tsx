import { waitFor, within } from '@testing-library/react'

import {
  activeSecondLineButtonProps,
  showSecondLineButtonProps,
  testUtils as workGroupBlockTestUtils,
} from 'modules/task/components/TaskDetails/WorkGroupBlock/WorkGroupBlock.test'
import {
  getTaskMessages,
  resolveTaskErrMsg,
  TaskExtendedStatusEnum,
} from 'modules/task/constants/task'
import { updateTaskAssigneeErrMsg } from 'modules/task/constants/taskAssignee'
import { createReclassificationRequestMessages } from 'modules/task/constants/taskReclassificationRequest'
import {
  createSuspendRequestErrorMsg,
  deleteSuspendRequestErrorMsg,
  SuspendReasonEnum,
  SuspendRequestStatusEnum,
} from 'modules/task/constants/taskSuspendRequest'
import { updateTaskWorkGroupMessages } from 'modules/task/constants/taskWorkGroup'
import {
  CreateTaskSuspendRequestBadRequestErrorResponse,
  ResolveTaskBadRequestErrorResponse,
  UpdateTaskWorkGroupBadRequestErrorResponse,
} from 'modules/task/models'
import { getTaskNotFoundErrorMsg, getTaskServerErrorMsg } from 'modules/task/utils/task'
import { UserRoleEnum } from 'modules/user/constants'
import { getFullUserName } from 'modules/user/utils'
import { getWorkGroupsErrMsg } from 'modules/workGroup/constants'

import { commonApiMessages } from 'shared/constants/common'

import taskFixtures from '_tests_/fixtures/task'
import workGroupFixtures from '_tests_/fixtures/workGroup'
import {
  mockCreateTaskReclassificationRequestNotFoundError,
  mockCreateTaskReclassificationRequestSuccess,
  mockCreateTaskSuspendRequestBadRequestError,
  mockCreateTaskSuspendRequestNotFoundError,
  mockCreateTaskSuspendRequestServerError,
  mockCreateTaskSuspendRequestSuccess,
  mockDeleteTaskSuspendRequestBadRequestError,
  mockDeleteTaskSuspendRequestNotFoundError,
  mockDeleteTaskSuspendRequestServerError,
  mockDeleteTaskSuspendRequestSuccess,
  mockDeleteTaskWorkGroupBadRequestError,
  mockDeleteTaskWorkGroupForbiddenError,
  mockDeleteTaskWorkGroupNotFoundError,
  mockDeleteTaskWorkGroupServerError,
  mockDeleteTaskWorkGroupSuccess,
  mockGetTaskBadRequestError,
  mockGetTaskForbiddenError,
  mockGetTaskNotFoundError,
  mockGetTaskReclassificationRequestServerError,
  mockGetTaskReclassificationRequestSuccess,
  mockGetTaskServerError,
  mockGetTaskSuccess,
  mockGetWorkGroupsServerError,
  mockGetWorkGroupsSuccess,
  mockResolveTaskBadRequestError,
  mockResolveTaskServerError,
  mockResolveTaskSuccess,
  mockTakeTaskForbiddenError,
  mockTakeTaskServerError,
  mockTakeTaskSuccess,
  mockUpdateTaskAssigneeServerError,
  mockUpdateTaskAssigneeSuccess,
  mockUpdateTaskWorkGroupBadRequestError,
  mockUpdateTaskWorkGroupForbiddenError,
  mockUpdateTaskWorkGroupServerError,
  mockUpdateTaskWorkGroupSuccess,
} from '_tests_/mocks/api'
import {
  buttonTestUtils,
  cardTestUtils,
  fakeId,
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  setupApiTests,
} from '_tests_/utils'

import { testUtils as executeTaskModalTestUtils } from '../../ExecuteTaskModal/ExecuteTaskModal.test'
import {
  reasonValues,
  testUtils as taskReclassificationModalTestUtils,
} from '../../RequestTaskReclassificationModal/RequestTaskReclassificationModal.test'
import { testUtils as requestTaskSuspendModalTestUtils } from '../../RequestTaskSuspendModal/RequestTaskSuspendModal.test'
import { testUtils as taskFirstLineModalTestUtils } from '../../TaskFirstLineModal/TaskFirstLineModal.test'
import { TaskFirstLineFormErrors } from '../../TaskFirstLineModal/types'
import { testUtils as taskReclassificationRequestTestUtils } from '../../TaskReclassificationRequest/TaskReclassificationRequest.test'
import { testUtils as taskSecondLineModalTestUtils } from '../../TaskSecondLineModal/TaskSecondLineModal.test'
import { testUtils as taskSuspendRequestTestUtils } from '../../TaskSuspendRequest/TaskSuspendRequest.test'
import {
  activeAssignButtonProps,
  activeAssignOnMeButtonProps,
  activeTakeTaskButtonProps,
  canSelectAssigneeProps,
  testUtils as assigneeBlockTestUtils,
} from '../AssigneeBlock/AssigneeBlock.test'
import { testUtils as taskCardTestUtils } from '../Card_old/Card.test'
import {
  activeRequestReclassificationItemProps,
  activeRequestSuspendItemProps,
  canExecuteTaskProps,
  testUtils as cardTitleTestUtils,
} from '../TaskDetailsTitle/TaskDetailsTitle.test'
import TaskCardContainer, { TaskCardContainerProps } from './index'

const props: Readonly<TaskCardContainerProps> = {
  taskId: fakeId(),
  closeTaskCard: jest.fn(),
  additionalInfoExpanded: false,
  onExpandAdditionalInfo: jest.fn(),
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Контейнер детальной карточки заявки', () => {
  describe('Получение списка рабочих групп', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      describe('При не успешном запросе', () => {
        test('Отображается уведомление об ошибке', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({ id: props.taskId }),
          })

          mockGetWorkGroupsServerError()

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          const notification = await notificationTestUtils.findNotification(getWorkGroupsErrMsg)

          expect(notification).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
      describe('При не успешном запросе', () => {
        test('Отображается уведомление об ошибке', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({ id: props.taskId }),
          })

          mockGetWorkGroupsServerError()

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          const notification = await notificationTestUtils.findNotification(getWorkGroupsErrMsg)
          expect(notification).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
      describe('При не успешном запросе', () => {
        test('Отображается уведомление об ошибке', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({ id: props.taskId }),
          })

          mockGetWorkGroupsServerError()

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          const notification = await notificationTestUtils.findNotification(getWorkGroupsErrMsg)
          expect(notification).toBeInTheDocument()
        })
      })
    })
  })

  describe('Переклассификация заявки', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      describe('Получение запроса на переклассификацию', () => {
        describe('Запрос отправляется если условия соблюдены', () => {
          describe('При успешном запросе', () => {
            test('Запрос отображается', async () => {
              mockGetWorkGroupsSuccess({ body: [] })

              mockGetTaskSuccess(props.taskId, {
                body: taskFixtures.task({
                  id: props.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestSuccess(props.taskId, {
                body: taskFixtures.reclassificationRequest(),
              })

              render(<TaskCardContainer {...props} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.FirstLineSupport,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              expect(await taskReclassificationRequestTestUtils.findContainer()).toBeInTheDocument()
            })
          })

          describe('При не успешном запросе', () => {
            test('Обрабатывается неизвестная ошибка', async () => {
              mockGetWorkGroupsSuccess({ body: [] })

              mockGetTaskSuccess(props.taskId, {
                body: taskFixtures.task({
                  id: props.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestServerError(props.taskId)

              render(<TaskCardContainer {...props} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.FirstLineSupport,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              const notification = await notificationTestUtils.findNotification(
                commonApiMessages.unknownError,
              )
              expect(notification).toBeInTheDocument()
            })
          })
        })

        describe('Запрос не отправляется если условия соблюдены', () => {
          test('Но расширенный статус заявка не "На переклассификации"', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                extendedStatus: TaskExtendedStatusEnum.New,
              }),
            })

            render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()
            taskCardTestUtils.expectReclassificationRequestLoadingNotStarted()

            expect(taskReclassificationRequestTestUtils.queryContainer()).not.toBeInTheDocument()
          })
        })

        describe('Запрос не отправляется повторно если', () => {
          test.todo('Ранее был создан запрос на переклассификацию')
        })
      })

      describe('Создание запроса на переклассификацию', () => {
        describe('При успешном запросе', () => {
          test('Отображается запрос и закрывается модалка', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                ...activeRequestReclassificationItemProps,
              }),
            })

            mockGetTaskReclassificationRequestSuccess(props.taskId, {
              body: taskFixtures.reclassificationRequest(),
            })
            mockCreateTaskReclassificationRequestSuccess(props.taskId)

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            const modal = await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.setComment(user, fakeWord())
            await taskReclassificationModalTestUtils.setReclassificationReason(
              user,
              reasonValues[0],
            )
            await taskReclassificationModalTestUtils.clickSubmitButton(user)

            expect(await taskReclassificationRequestTestUtils.findContainer()).toBeInTheDocument()

            expect(modal).not.toBeInTheDocument()
          })
        })

        describe('При не успешном запросе', () => {
          test('Обрабатывается ошибка 404', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                ...activeRequestReclassificationItemProps,
              }),
            })

            mockCreateTaskReclassificationRequestNotFoundError(props.taskId)

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.setComment(user, fakeWord())
            await taskReclassificationModalTestUtils.setReclassificationReason(
              user,
              reasonValues[0],
            )
            await taskReclassificationModalTestUtils.clickSubmitButton(user)

            const notification = await notificationTestUtils.findNotification(
              createReclassificationRequestMessages.notFoundError,
            )
            expect(notification).toBeInTheDocument()
          })
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
      describe('Получение запроса на переклассификацию', () => {
        describe('Запрос отправляется если условия соблюдены', () => {
          describe('При успешном запросе', () => {
            test('Запрос отображается', async () => {
              mockGetWorkGroupsSuccess({ body: [] })

              mockGetTaskSuccess(props.taskId, {
                body: taskFixtures.task({
                  id: props.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestSuccess(props.taskId, {
                body: taskFixtures.reclassificationRequest(),
              })

              render(<TaskCardContainer {...props} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.Engineer,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              expect(await taskReclassificationRequestTestUtils.findContainer()).toBeInTheDocument()
            })
          })

          describe('При не успешном запросе', () => {
            test('Обрабатывается неизвестная ошибка', async () => {
              mockGetWorkGroupsSuccess({ body: [] })

              mockGetTaskSuccess(props.taskId, {
                body: taskFixtures.task({
                  id: props.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestServerError(props.taskId)

              render(<TaskCardContainer {...props} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.Engineer,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              const notification = await notificationTestUtils.findNotification(
                commonApiMessages.unknownError,
              )
              expect(notification).toBeInTheDocument()
            })
          })
        })

        describe('Запрос не отправляется если условия соблюдены', () => {
          test('Но расширенный статус заявка не "На переклассификации"', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                extendedStatus: TaskExtendedStatusEnum.New,
              }),
            })

            render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()
            taskCardTestUtils.expectReclassificationRequestLoadingNotStarted()

            expect(taskReclassificationRequestTestUtils.queryContainer()).not.toBeInTheDocument()
          })
        })

        describe('Запрос не отправляется повторно если', () => {
          test.todo('Ранее был создан запрос на переклассификацию')
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
      describe('Получение запроса на переклассификацию', () => {
        describe('Запрос отправляется если условия соблюдены', () => {
          describe('При успешном запросе', () => {
            test('Запрос отображается', async () => {
              mockGetWorkGroupsSuccess({ body: [] })

              mockGetTaskSuccess(props.taskId, {
                body: taskFixtures.task({
                  id: props.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestSuccess(props.taskId, {
                body: taskFixtures.reclassificationRequest(),
              })

              render(<TaskCardContainer {...props} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.SeniorEngineer,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              expect(await taskReclassificationRequestTestUtils.findContainer()).toBeInTheDocument()
            })
          })

          describe('При не успешном запросе', () => {
            test('Обрабатывается неизвестная ошибка', async () => {
              mockGetWorkGroupsSuccess({ body: [] })

              mockGetTaskSuccess(props.taskId, {
                body: taskFixtures.task({
                  id: props.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestServerError(props.taskId)

              render(<TaskCardContainer {...props} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.SeniorEngineer,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              const notification = await notificationTestUtils.findNotification(
                commonApiMessages.unknownError,
              )
              expect(notification).toBeInTheDocument()
            })
          })
        })

        describe('Запрос не отправляется если условия соблюдены', () => {
          test('Но расширенный статус заявка не "На переклассификации"', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                extendedStatus: TaskExtendedStatusEnum.New,
              }),
            })

            render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()
            taskCardTestUtils.expectReclassificationRequestLoadingNotStarted()

            expect(taskReclassificationRequestTestUtils.queryContainer()).not.toBeInTheDocument()
          })
        })

        describe('Запрос не отправляется повторно если', () => {
          test.todo('Ранее был создан запрос на переклассификацию')
        })
      })

      describe('Создание запроса на переклассификацию', () => {
        describe('При успешном запросе', () => {
          test('Отображается запрос и закрывается модалка', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                ...activeRequestReclassificationItemProps,
              }),
            })

            mockGetTaskReclassificationRequestSuccess(props.taskId, {
              body: taskFixtures.reclassificationRequest(),
            })
            mockCreateTaskReclassificationRequestSuccess(props.taskId)

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            const modal = await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.setComment(user, fakeWord())
            await taskReclassificationModalTestUtils.setReclassificationReason(
              user,
              reasonValues[0],
            )
            await taskReclassificationModalTestUtils.clickSubmitButton(user)

            expect(await taskReclassificationRequestTestUtils.findContainer()).toBeInTheDocument()

            expect(modal).not.toBeInTheDocument()
          })
        })

        describe('При не успешном запросе', () => {
          test('Обрабатывается ошибка 404', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                ...activeRequestReclassificationItemProps,
              }),
            })

            mockCreateTaskReclassificationRequestNotFoundError(props.taskId)

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.setComment(user, fakeWord())
            await taskReclassificationModalTestUtils.setReclassificationReason(
              user,
              reasonValues[0],
            )
            await taskReclassificationModalTestUtils.clickSubmitButton(user)

            const notification = await notificationTestUtils.findNotification(
              createReclassificationRequestMessages.notFoundError,
            )
            expect(notification).toBeInTheDocument()
          })
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
      describe('Получение запроса на переклассификацию', () => {
        describe('Запрос отправляется если условия соблюдены', () => {
          describe('При успешном запросе', () => {
            test('Запрос отображается', async () => {
              mockGetWorkGroupsSuccess({ body: [] })

              mockGetTaskSuccess(props.taskId, {
                body: taskFixtures.task({
                  id: props.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestSuccess(props.taskId, {
                body: taskFixtures.reclassificationRequest(),
              })

              render(<TaskCardContainer {...props} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.HeadOfDepartment,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              expect(await taskReclassificationRequestTestUtils.findContainer()).toBeInTheDocument()
            })
          })

          describe('При не успешном запросе', () => {
            test('Обрабатывается неизвестная ошибка', async () => {
              mockGetWorkGroupsSuccess({ body: [] })

              mockGetTaskSuccess(props.taskId, {
                body: taskFixtures.task({
                  id: props.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestServerError(props.taskId)

              render(<TaskCardContainer {...props} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.HeadOfDepartment,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              const notification = await notificationTestUtils.findNotification(
                commonApiMessages.unknownError,
              )
              expect(notification).toBeInTheDocument()
            })
          })
        })

        describe('Запрос не отправляется если условия соблюдены', () => {
          test('Но расширенный статус заявка не "На переклассификации"', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                extendedStatus: TaskExtendedStatusEnum.New,
              }),
            })

            render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()
            taskCardTestUtils.expectReclassificationRequestLoadingNotStarted()

            expect(taskReclassificationRequestTestUtils.queryContainer()).not.toBeInTheDocument()
          })
        })

        describe('Запрос не отправляется повторно если', () => {
          test.todo('Ранее был создан запрос на переклассификацию')
        })
      })

      describe('Создание запроса на переклассификацию', () => {
        describe('При успешном запросе', () => {
          test('Отображается запрос и закрывается модалка', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                ...activeRequestReclassificationItemProps,
              }),
            })

            mockGetTaskReclassificationRequestSuccess(props.taskId, {
              body: taskFixtures.reclassificationRequest(),
            })
            mockCreateTaskReclassificationRequestSuccess(props.taskId)

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            const modal = await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.setComment(user, fakeWord())
            await taskReclassificationModalTestUtils.setReclassificationReason(
              user,
              reasonValues[0],
            )
            await taskReclassificationModalTestUtils.clickSubmitButton(user)

            expect(await taskReclassificationRequestTestUtils.findContainer()).toBeInTheDocument()

            expect(modal).not.toBeInTheDocument()
          })
        })

        describe('При не успешном запросе', () => {
          test('Обрабатывается ошибка 404', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                ...activeRequestReclassificationItemProps,
              }),
            })

            mockCreateTaskReclassificationRequestNotFoundError(props.taskId)

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.setComment(user, fakeWord())
            await taskReclassificationModalTestUtils.setReclassificationReason(
              user,
              reasonValues[0],
            )
            await taskReclassificationModalTestUtils.clickSubmitButton(user)

            const notification = await notificationTestUtils.findNotification(
              createReclassificationRequestMessages.notFoundError,
            )
            expect(notification).toBeInTheDocument()
          })
        })
      })
    })
  })

  describe('Выполнение заявки', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      describe('При успешном запросе', () => {
        test('Обработчик вызывается корректно', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...canExecuteTaskProps,
          })
          mockGetTaskSuccess(props.taskId, { body: task })

          mockResolveTaskSuccess(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskMenuItem(user)
          await executeTaskModalTestUtils.findContainer()

          await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
          await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
          await executeTaskModalTestUtils.setAttachment(user)
          await executeTaskModalTestUtils.clickSubmitButton(user)

          await waitFor(() => {
            expect(props.closeTaskCard).toBeCalledTimes(1)
          })
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...canExecuteTaskProps,
          })
          mockGetTaskSuccess(props.taskId, { body: task })

          const badRequestResponse: Required<ResolveTaskBadRequestErrorResponse> = {
            detail: [fakeWord()],
            spentHours: [fakeWord()],
            spentMinutes: [fakeWord()],
            userResolution: [fakeWord()],
            techResolution: [fakeWord()],
            attachments: [fakeWord()],
          }

          mockResolveTaskBadRequestError(props.taskId, {
            body: badRequestResponse,
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskMenuItem(user)
          await executeTaskModalTestUtils.findContainer()

          await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
          await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
          await executeTaskModalTestUtils.setAttachment(user)
          await executeTaskModalTestUtils.clickSubmitButton(user)

          expect(
            await notificationTestUtils.findNotification(badRequestResponse.detail[0]),
          ).toBeInTheDocument()

          expect(
            await executeTaskModalTestUtils.findTechResolutionError(
              badRequestResponse.techResolution[0],
            ),
          ).toBeInTheDocument()

          expect(
            await executeTaskModalTestUtils.findUserResolutionError(
              badRequestResponse.userResolution[0],
            ),
          ).toBeInTheDocument()

          expect(
            await executeTaskModalTestUtils.findAttachmentsError(badRequestResponse.attachments[0]),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...canExecuteTaskProps,
          })
          mockGetTaskSuccess(props.taskId, { body: task })

          mockResolveTaskServerError(props.taskId, { body: {} })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskMenuItem(user)
          await executeTaskModalTestUtils.findContainer()

          await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
          await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
          await executeTaskModalTestUtils.setAttachment(user)
          await executeTaskModalTestUtils.clickSubmitButton(user)

          const notification = await notificationTestUtils.findNotification(resolveTaskErrMsg)
          expect(notification).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
      describe('При успешном запросе', () => {
        test('Обработчик вызывается корректно', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...canExecuteTaskProps,
          })
          mockGetTaskSuccess(props.taskId, { body: task })

          mockResolveTaskSuccess(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskMenuItem(user)
          await executeTaskModalTestUtils.findContainer()

          await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
          await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
          await executeTaskModalTestUtils.setAttachment(user)
          await executeTaskModalTestUtils.clickSubmitButton(user)

          await waitFor(() => {
            expect(props.closeTaskCard).toBeCalledTimes(1)
          })
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...canExecuteTaskProps,
          })
          mockGetTaskSuccess(props.taskId, { body: task })

          const badRequestResponse: Required<ResolveTaskBadRequestErrorResponse> = {
            detail: [fakeWord()],
            spentHours: [fakeWord()],
            spentMinutes: [fakeWord()],
            userResolution: [fakeWord()],
            techResolution: [fakeWord()],
            attachments: [fakeWord()],
          }

          mockResolveTaskBadRequestError(props.taskId, {
            body: badRequestResponse,
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskMenuItem(user)
          await executeTaskModalTestUtils.findContainer()

          await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
          await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
          await executeTaskModalTestUtils.setAttachment(user)
          await executeTaskModalTestUtils.clickSubmitButton(user)

          expect(
            await notificationTestUtils.findNotification(badRequestResponse.detail[0]),
          ).toBeInTheDocument()

          expect(
            await executeTaskModalTestUtils.findTechResolutionError(
              badRequestResponse.techResolution[0],
            ),
          ).toBeInTheDocument()

          expect(
            await executeTaskModalTestUtils.findUserResolutionError(
              badRequestResponse.userResolution[0],
            ),
          ).toBeInTheDocument()

          expect(
            await executeTaskModalTestUtils.findAttachmentsError(badRequestResponse.attachments[0]),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...canExecuteTaskProps,
          })
          mockGetTaskSuccess(props.taskId, { body: task })

          mockResolveTaskServerError(props.taskId, { body: {} })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskMenuItem(user)
          await executeTaskModalTestUtils.findContainer()

          await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
          await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
          await executeTaskModalTestUtils.setAttachment(user)
          await executeTaskModalTestUtils.clickSubmitButton(user)

          const notification = await notificationTestUtils.findNotification(resolveTaskErrMsg)
          expect(notification).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
      describe('При успешном запросе', () => {
        test('Обработчик вызывается корректно', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...canExecuteTaskProps,
          })
          mockGetTaskSuccess(props.taskId, { body: task })

          mockResolveTaskSuccess(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskMenuItem(user)
          await executeTaskModalTestUtils.findContainer()

          await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
          await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
          await executeTaskModalTestUtils.setAttachment(user)
          await executeTaskModalTestUtils.clickSubmitButton(user)

          await waitFor(() => {
            expect(props.closeTaskCard).toBeCalledTimes(1)
          })
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...canExecuteTaskProps,
          })
          mockGetTaskSuccess(props.taskId, { body: task })

          const badRequestResponse: Required<ResolveTaskBadRequestErrorResponse> = {
            detail: [fakeWord()],
            spentHours: [fakeWord()],
            spentMinutes: [fakeWord()],
            userResolution: [fakeWord()],
            techResolution: [fakeWord()],
            attachments: [fakeWord()],
          }

          mockResolveTaskBadRequestError(props.taskId, {
            body: badRequestResponse,
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskMenuItem(user)
          await executeTaskModalTestUtils.findContainer()

          await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
          await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
          await executeTaskModalTestUtils.setAttachment(user)
          await executeTaskModalTestUtils.clickSubmitButton(user)

          expect(
            await notificationTestUtils.findNotification(badRequestResponse.detail[0]),
          ).toBeInTheDocument()

          expect(
            await executeTaskModalTestUtils.findTechResolutionError(
              badRequestResponse.techResolution[0],
            ),
          ).toBeInTheDocument()

          expect(
            await executeTaskModalTestUtils.findUserResolutionError(
              badRequestResponse.userResolution[0],
            ),
          ).toBeInTheDocument()

          expect(
            await executeTaskModalTestUtils.findAttachmentsError(badRequestResponse.attachments[0]),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...canExecuteTaskProps,
          })
          mockGetTaskSuccess(props.taskId, { body: task })

          mockResolveTaskServerError(props.taskId, { body: {} })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskMenuItem(user)
          await executeTaskModalTestUtils.findContainer()

          await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
          await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
          await executeTaskModalTestUtils.setAttachment(user)
          await executeTaskModalTestUtils.clickSubmitButton(user)

          const notification = await notificationTestUtils.findNotification(resolveTaskErrMsg)
          expect(notification).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
      describe('При успешном запросе', () => {
        test('Обработчик вызывается корректно', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...canExecuteTaskProps,
          })
          mockGetTaskSuccess(props.taskId, { body: task })

          mockResolveTaskSuccess(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskMenuItem(user)
          await executeTaskModalTestUtils.findContainer()

          await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
          await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
          await executeTaskModalTestUtils.setAttachment(user)
          await executeTaskModalTestUtils.clickSubmitButton(user)

          await waitFor(() => {
            expect(props.closeTaskCard).toBeCalledTimes(1)
          })
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...canExecuteTaskProps,
          })
          mockGetTaskSuccess(props.taskId, { body: task })

          const badRequestResponse: Required<ResolveTaskBadRequestErrorResponse> = {
            detail: [fakeWord()],
            spentHours: [fakeWord()],
            spentMinutes: [fakeWord()],
            userResolution: [fakeWord()],
            techResolution: [fakeWord()],
            attachments: [fakeWord()],
          }

          mockResolveTaskBadRequestError(props.taskId, {
            body: badRequestResponse,
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskMenuItem(user)
          await executeTaskModalTestUtils.findContainer()

          await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
          await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
          await executeTaskModalTestUtils.setAttachment(user)
          await executeTaskModalTestUtils.clickSubmitButton(user)

          expect(
            await notificationTestUtils.findNotification(badRequestResponse.detail[0]),
          ).toBeInTheDocument()

          expect(
            await executeTaskModalTestUtils.findTechResolutionError(
              badRequestResponse.techResolution[0],
            ),
          ).toBeInTheDocument()

          expect(
            await executeTaskModalTestUtils.findUserResolutionError(
              badRequestResponse.userResolution[0],
            ),
          ).toBeInTheDocument()

          expect(
            await executeTaskModalTestUtils.findAttachmentsError(badRequestResponse.attachments[0]),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          const task = taskFixtures.task({
            id: props.taskId,
            ...canExecuteTaskProps,
          })
          mockGetTaskSuccess(props.taskId, { body: task })

          mockResolveTaskServerError(props.taskId, { body: {} })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskMenuItem(user)
          await executeTaskModalTestUtils.findContainer()

          await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
          await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
          await executeTaskModalTestUtils.setAttachment(user)
          await executeTaskModalTestUtils.clickSubmitButton(user)

          const notification = await notificationTestUtils.findNotification(resolveTaskErrMsg)
          expect(notification).toBeInTheDocument()
        })
      })
    })
  })

  describe('Получение заявки', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      describe('При успешном запросе', () => {
        test('Отображается основной блок заявки', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({ id: props.taskId }),
          })

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(taskCardTestUtils.getCardDetails()).toBeInTheDocument()
        })
      })

      describe('При не успешном запросе', () => {
        test('Не отображается основной блок заявки', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskServerError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(taskCardTestUtils.queryCardDetails()).not.toBeInTheDocument()
        })

        test('Обрабатывается ошибка 404', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskNotFoundError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          const notification = await notificationTestUtils.findNotification(
            getTaskNotFoundErrorMsg(props.taskId),
          )
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 400', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskBadRequestError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          const notification = await notificationTestUtils.findNotification(
            getTaskServerErrorMsg(props.taskId),
          )
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskServerError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await notificationTestUtils.findNotification(getTaskServerErrorMsg(props.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskForbiddenError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await notificationTestUtils.findNotification(getTaskMessages.commonError),
          ).toBeInTheDocument()
        })
      })

      test('При успешном перезапросе заявки отображается основной блок заявки', async () => {
        mockGetWorkGroupsSuccess({ body: [] })

        mockGetTaskSuccess(props.taskId, {
          body: taskFixtures.task({ id: props.taskId }),
          once: false,
        })

        const { user } = render(<TaskCardContainer {...props} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()

        await cardTitleTestUtils.clickReloadButton(user)

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()

        expect(taskCardTestUtils.getCardDetails()).toBeInTheDocument()
      })
    })

    describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
      describe('При успешном запросе', () => {
        test('Отображается основной блок заявки', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({ id: props.taskId }),
          })

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(taskCardTestUtils.getCardDetails()).toBeInTheDocument()
        })
      })

      describe('При не успешном запросе', () => {
        test('Не отображается основной блок заявки', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskServerError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(taskCardTestUtils.queryCardDetails()).not.toBeInTheDocument()
        })

        test('Обрабатывается ошибка 404', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskNotFoundError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          const notification = await notificationTestUtils.findNotification(
            getTaskNotFoundErrorMsg(props.taskId),
          )
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 400', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskBadRequestError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await notificationTestUtils.findNotification(getTaskServerErrorMsg(props.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskServerError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await notificationTestUtils.findNotification(getTaskServerErrorMsg(props.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskForbiddenError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await notificationTestUtils.findNotification(getTaskMessages.commonError),
          ).toBeInTheDocument()
        })
      })

      test('При успешном перезапросе заявки отображается основной блок заявки', async () => {
        mockGetWorkGroupsSuccess({ body: [] })

        mockGetTaskSuccess(props.taskId, {
          body: taskFixtures.task({ id: props.taskId }),
          once: false,
        })

        const { user } = render(<TaskCardContainer {...props} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.Engineer,
          }),
        })

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()

        await cardTitleTestUtils.clickReloadButton(user)

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()

        expect(taskCardTestUtils.getCardDetails()).toBeInTheDocument()
      })
    })

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
      describe('При успешном запросе', () => {
        test('Отображается основной блок заявки', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({ id: props.taskId }),
          })

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(taskCardTestUtils.getCardDetails()).toBeInTheDocument()
        })
      })

      describe('При не успешном запросе', () => {
        test('Не отображается основной блок заявки', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskServerError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(taskCardTestUtils.queryCardDetails()).not.toBeInTheDocument()
        })

        test('Обрабатывается ошибка 404', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskNotFoundError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          const notification = await notificationTestUtils.findNotification(
            getTaskNotFoundErrorMsg(props.taskId),
          )
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 400', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskBadRequestError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await notificationTestUtils.findNotification(getTaskServerErrorMsg(props.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskServerError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await notificationTestUtils.findNotification(getTaskServerErrorMsg(props.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskForbiddenError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await notificationTestUtils.findNotification(getTaskMessages.commonError),
          ).toBeInTheDocument()
        })
      })

      test('При успешном перезапросе заявки отображается основной блок заявки', async () => {
        mockGetWorkGroupsSuccess({ body: [] })

        mockGetTaskSuccess(props.taskId, {
          body: taskFixtures.task({ id: props.taskId }),
          once: false,
        })

        const { user } = render(<TaskCardContainer {...props} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()

        await cardTitleTestUtils.clickReloadButton(user)

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()

        expect(taskCardTestUtils.getCardDetails()).toBeInTheDocument()
      })
    })

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
      describe('При успешном запросе', () => {
        test('Отображается основной блок заявки', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({ id: props.taskId }),
          })

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(taskCardTestUtils.getCardDetails()).toBeInTheDocument()
        })
      })

      describe('При не успешном запросе', () => {
        test('Не отображается основной блок заявки', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskServerError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(taskCardTestUtils.queryCardDetails()).not.toBeInTheDocument()
        })

        test('Обрабатывается ошибка 404', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskNotFoundError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await notificationTestUtils.findNotification(getTaskNotFoundErrorMsg(props.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 400', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskBadRequestError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await notificationTestUtils.findNotification(getTaskServerErrorMsg(props.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskServerError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await notificationTestUtils.findNotification(getTaskServerErrorMsg(props.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupsSuccess({ body: [] })
          mockGetTaskForbiddenError(props.taskId)

          render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await notificationTestUtils.findNotification(getTaskMessages.commonError),
          ).toBeInTheDocument()
        })
      })

      test('При успешном перезапросе заявки отображается основной блок заявки', async () => {
        mockGetWorkGroupsSuccess({ body: [] })

        mockGetTaskSuccess(props.taskId, {
          body: taskFixtures.task({ id: props.taskId }),
          once: false,
        })

        const { user } = render(<TaskCardContainer {...props} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.HeadOfDepartment,
          }),
        })

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()

        await cardTitleTestUtils.clickReloadButton(user)

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()

        expect(taskCardTestUtils.getCardDetails()).toBeInTheDocument()
      })
    })
  })

  describe('Взятие заявки в работу', () => {
    describe('При успешном запросе', () => {
      test('Уведомление об ошибке не отображается и заявка запрашивается заново', async () => {
        const task = taskFixtures.task({
          id: props.taskId,
          ...activeTakeTaskButtonProps,
        })

        mockGetTaskSuccess(props.taskId, { body: task })

        mockGetWorkGroupsSuccess({ body: [] })
        mockTakeTaskSuccess(props.taskId)

        const { user } = render(<TaskCardContainer {...props} />, {
          store: getStoreWithAuth({
            userId: task.assignee!.id,
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()
        await assigneeBlockTestUtils.clickTakeTaskButton(user)

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()
        expect(
          notificationTestUtils.queryNotification(commonApiMessages.unknownError),
        ).not.toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 500', async () => {
        const task = taskFixtures.task({
          id: props.taskId,
          ...activeTakeTaskButtonProps,
        })

        mockGetTaskSuccess(props.taskId, { body: task })

        mockGetWorkGroupsSuccess({ body: [] })
        mockTakeTaskServerError(props.taskId)

        const { user } = render(<TaskCardContainer {...props} />, {
          store: getStoreWithAuth({
            userId: task.assignee!.id,
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        await taskCardTestUtils.expectLoadingFinished()
        await assigneeBlockTestUtils.clickTakeTaskButton(user)
        taskCardTestUtils.expectLoadingNotStarted()

        const notification = await notificationTestUtils.findNotification(
          commonApiMessages.unknownError,
        )
        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 403', async () => {
        const task = taskFixtures.task({
          id: props.taskId,
          ...activeTakeTaskButtonProps,
          suspendRequest: taskFixtures.suspendRequest({ status: SuspendRequestStatusEnum.Denied }),
        })

        mockGetTaskSuccess(props.taskId, { body: task })

        mockGetWorkGroupsSuccess({ body: [] })

        const errorMessage = fakeWord()
        mockTakeTaskForbiddenError(props.taskId, {
          body: { detail: [errorMessage] },
        })

        const { user } = render(<TaskCardContainer {...props} />, {
          store: getStoreWithAuth({
            userId: task.assignee!.id,
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        await taskCardTestUtils.expectLoadingFinished()
        await assigneeBlockTestUtils.clickTakeTaskButton(user)
        taskCardTestUtils.expectLoadingNotStarted()

        const notification = await notificationTestUtils.findNotification(errorMessage)
        expect(notification).toBeInTheDocument()
      })
    })
  })

  describe('Назначение исполнителя заявки', () => {
    describe('При успешном запросе', () => {
      test('Уведомление об ошибке не отображается и заявка запрашивается заново', async () => {
        mockGetTaskSuccess(props.taskId, {
          body: taskFixtures.task({
            id: props.taskId,
            status: canSelectAssigneeProps.status,
            extendedStatus: activeAssignButtonProps.extendedStatus,
            assignee: activeAssignButtonProps.assignee,
            workGroup: taskFixtures.workGroup({
              id: canSelectAssigneeProps.workGroup.id,
            }),
          }),
          once: false,
        })

        mockUpdateTaskAssigneeSuccess(props.taskId)

        const { user } = render(<TaskCardContainer {...props} />, {
          store: getStoreWithAuth({
            userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()
        await assigneeBlockTestUtils.findAssigneeSelect()
        await assigneeBlockTestUtils.openAssigneeSelect(user)
        await assigneeBlockTestUtils.selectAssignee(
          user,
          getFullUserName(canSelectAssigneeProps.workGroup.members[0]),
        )
        await assigneeBlockTestUtils.clickAssignButton(user)
        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()

        expect(
          notificationTestUtils.queryNotification(updateTaskAssigneeErrMsg),
        ).not.toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Уведомление об ошибке отображается и заявка не запрашивается заново', async () => {
        mockGetTaskSuccess(props.taskId, {
          body: taskFixtures.task({
            id: props.taskId,
            status: canSelectAssigneeProps.status,
            extendedStatus: activeAssignButtonProps.extendedStatus,
            assignee: activeAssignButtonProps.assignee,
            workGroup: taskFixtures.workGroup({
              id: canSelectAssigneeProps.workGroup.id,
            }),
          }),
          once: false,
        })

        mockUpdateTaskAssigneeServerError(props.taskId)

        const { user } = render(<TaskCardContainer {...props} />, {
          store: getStoreWithAuth({
            userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()
        await assigneeBlockTestUtils.findAssigneeSelect()
        await assigneeBlockTestUtils.openAssigneeSelect(user)
        await assigneeBlockTestUtils.selectAssignee(
          user,
          getFullUserName(canSelectAssigneeProps.workGroup.members[0]),
        )
        await assigneeBlockTestUtils.clickAssignButton(user)

        taskCardTestUtils.expectLoadingNotStarted()
        expect(
          await notificationTestUtils.findNotification(updateTaskAssigneeErrMsg),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Назначение заявки на себя', () => {
    describe('При успешном запросе', () => {
      test('Уведомление об ошибке не отображается и заявка запрашивается заново', async () => {
        mockGetTaskSuccess(props.taskId, {
          body: taskFixtures.task({
            id: props.taskId,
            status: activeAssignOnMeButtonProps.status,
            extendedStatus: activeAssignOnMeButtonProps.extendedStatus,
          }),
          once: false,
        })

        mockGetWorkGroupsSuccess({ body: [] })
        mockUpdateTaskAssigneeSuccess(props.taskId)

        const { user } = render(<TaskCardContainer {...props} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()
        await assigneeBlockTestUtils.clickAssignOnMeButton(user)
        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()

        expect(
          notificationTestUtils.queryNotification(updateTaskAssigneeErrMsg),
        ).not.toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Уведомление об ошибке отображается и заявка не запрашивается заново', async () => {
        mockGetTaskSuccess(props.taskId, {
          body: taskFixtures.task({
            id: props.taskId,
            status: activeAssignOnMeButtonProps.status,
            extendedStatus: activeAssignOnMeButtonProps.extendedStatus,
          }),
        })

        mockGetWorkGroupsSuccess({ body: [] })
        mockUpdateTaskAssigneeServerError(props.taskId)

        const { user } = render(<TaskCardContainer {...props} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()
        await assigneeBlockTestUtils.clickAssignOnMeButton(user)

        taskCardTestUtils.expectLoadingNotStarted()
        expect(
          await notificationTestUtils.findNotification(updateTaskAssigneeErrMsg),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Перевод заявки на 1-ю линию', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      describe('При успешном запросе', () => {
        test('Переданные обработчики вызываются корректно и закрывается модалка', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          mockDeleteTaskWorkGroupSuccess(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          const modal = await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingFinished(firstLineButton)
          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })
          expect(props.closeTaskCard).toBeCalledTimes(1)
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          const descriptionError = fakeWord()
          mockDeleteTaskWorkGroupBadRequestError<TaskFirstLineFormErrors>(props.taskId, {
            body: {
              description: [descriptionError],
            },
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const descriptionContainer = taskFirstLineModalTestUtils.getDescriptionFieldContainer()

          const errorMsg = await within(descriptionContainer).findByText(descriptionError)
          expect(errorMsg).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 404', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          const notFoundError = fakeWord()
          mockDeleteTaskWorkGroupNotFoundError(props.taskId, {
            body: { detail: [notFoundError] },
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const notification = await notificationTestUtils.findNotification(notFoundError)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          const serverError = fakeWord()
          mockDeleteTaskWorkGroupServerError(props.taskId, {
            body: { detail: [serverError] },
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingStarted(firstLineButton)
          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const notification = await notificationTestUtils.findNotification(serverError)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          mockDeleteTaskWorkGroupForbiddenError(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingStarted(firstLineButton)
          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const errorMsg = await notificationTestUtils.findNotification(
            commonApiMessages.unknownError,
          )
          expect(errorMsg).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
      describe('При успешном запросе', () => {
        test('Переданные обработчики вызываются корректно и закрывается модалка', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          mockDeleteTaskWorkGroupSuccess(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          const modal = await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingFinished(firstLineButton)
          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })
          expect(props.closeTaskCard).toBeCalledTimes(1)
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          const descriptionError = fakeWord()
          mockDeleteTaskWorkGroupBadRequestError<TaskFirstLineFormErrors>(props.taskId, {
            body: { description: [descriptionError] },
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const descriptionContainer = taskFirstLineModalTestUtils.getDescriptionFieldContainer()

          const errorMsg = await within(descriptionContainer).findByText(descriptionError)
          expect(errorMsg).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 404', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          const notFoundError = fakeWord()
          mockDeleteTaskWorkGroupNotFoundError(props.taskId, {
            body: { detail: [notFoundError] },
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const notification = await notificationTestUtils.findNotification(notFoundError)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          const serverError = fakeWord()
          mockDeleteTaskWorkGroupServerError(props.taskId, {
            body: { detail: [serverError] },
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingStarted(firstLineButton)
          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const notification = await notificationTestUtils.findNotification(serverError)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          mockDeleteTaskWorkGroupForbiddenError(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingStarted(firstLineButton)
          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const errorMsg = await notificationTestUtils.findNotification(
            commonApiMessages.unknownError,
          )
          expect(errorMsg).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
      describe('При успешном запросе', () => {
        test('Переданные обработчики вызываются корректно и закрывается модалка', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          mockDeleteTaskWorkGroupSuccess(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          const modal = await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingFinished(firstLineButton)
          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })
          expect(props.closeTaskCard).toBeCalledTimes(1)
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          const descriptionError = fakeWord()
          mockDeleteTaskWorkGroupBadRequestError<TaskFirstLineFormErrors>(props.taskId, {
            body: { description: [descriptionError] },
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const descriptionContainer = taskFirstLineModalTestUtils.getDescriptionFieldContainer()

          const errorMsg = await within(descriptionContainer).findByText(descriptionError)
          expect(errorMsg).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 404', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          const notFoundError = fakeWord()
          mockDeleteTaskWorkGroupNotFoundError(props.taskId, {
            body: { detail: [notFoundError] },
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const notification = await notificationTestUtils.findNotification(notFoundError)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          const serverError = fakeWord()
          mockDeleteTaskWorkGroupServerError(props.taskId, {
            body: { detail: [serverError] },
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingStarted(firstLineButton)
          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const notification = await notificationTestUtils.findNotification(serverError)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          mockDeleteTaskWorkGroupForbiddenError(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingStarted(firstLineButton)
          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const errorMsg = await notificationTestUtils.findNotification(
            commonApiMessages.unknownError,
          )
          expect(errorMsg).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
      describe('При успешном запросе', () => {
        test('Переданные обработчики вызываются корректно и закрывается модалка', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          mockDeleteTaskWorkGroupSuccess(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          const modal = await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingFinished(firstLineButton)
          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })
          expect(props.closeTaskCard).toBeCalledTimes(1)
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          const descriptionError = fakeWord()
          mockDeleteTaskWorkGroupBadRequestError<TaskFirstLineFormErrors>(props.taskId, {
            body: { description: [descriptionError] },
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingStarted(firstLineButton)
          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const descriptionContainer = taskFirstLineModalTestUtils.getDescriptionFieldContainer()

          const errorMsg = await within(descriptionContainer).findByText(descriptionError)
          expect(errorMsg).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 404', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          const notFoundError = fakeWord()
          mockDeleteTaskWorkGroupNotFoundError(props.taskId, {
            body: { detail: [notFoundError] },
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingStarted(firstLineButton)
          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const notification = await notificationTestUtils.findNotification(notFoundError)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          const serverError = fakeWord()
          mockDeleteTaskWorkGroupServerError(props.taskId, {
            body: { detail: [serverError] },
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingStarted(firstLineButton)
          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const notification = await notificationTestUtils.findNotification(serverError)
          expect(notification).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: taskFixtures.workGroup({ id: workGroup.id }),
            }),
          })

          mockDeleteTaskWorkGroupForbiddenError(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await cardTestUtils.expectLoadingFinished(taskCard)

          const firstLineButton = await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, fakeWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await buttonTestUtils.expectLoadingStarted(firstLineButton)
          await buttonTestUtils.expectLoadingFinished(firstLineButton)

          const errorMsg = await notificationTestUtils.findNotification(
            commonApiMessages.unknownError,
          )
          expect(errorMsg).toBeInTheDocument()
        })
      })
    })
  })

  describe('Перевод заявки на 2-ю линию', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      describe('При успешном запросе', () => {
        test('Переданные обработчики вызываются корректно и закрывается модалка', async () => {
          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: showSecondLineButtonProps.workGroup,
              status: activeSecondLineButtonProps.status,
              extendedStatus: activeSecondLineButtonProps.extendedStatus,
            }),
          })

          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup], once: false })

          mockUpdateTaskWorkGroupSuccess(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupBlockTestUtils.clickSecondLineButton(user)
          const modal = await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
          await taskSecondLineModalTestUtils.openWorkGroupField(user)
          await taskSecondLineModalTestUtils.selectWorkGroup(user, workGroup.name)
          await taskSecondLineModalTestUtils.setComment(user, fakeWord())
          await taskSecondLineModalTestUtils.clickSubmitButton(user)

          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })
          expect(props.closeTaskCard).toBeCalledTimes(1)
        })
      })

      describe('При не успешный запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: showSecondLineButtonProps.workGroup,
              status: activeSecondLineButtonProps.status,
              extendedStatus: activeSecondLineButtonProps.extendedStatus,
            }),
          })

          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup], once: false })

          const badRequestResponse: UpdateTaskWorkGroupBadRequestErrorResponse['data'] = {
            workGroup: [fakeWord()],
          }

          mockUpdateTaskWorkGroupBadRequestError(props.taskId, {
            body: badRequestResponse,
          })

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupBlockTestUtils.clickSecondLineButton(user)
          await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
          await taskSecondLineModalTestUtils.openWorkGroupField(user)
          await taskSecondLineModalTestUtils.selectWorkGroup(user, workGroup.name)
          await taskSecondLineModalTestUtils.setComment(user, fakeWord())
          await taskSecondLineModalTestUtils.clickSubmitButton(user)

          expect(
            await taskSecondLineModalTestUtils.findWorkGroupError(badRequestResponse.workGroup![0]),
          ).toBeInTheDocument()

          expect(
            await notificationTestUtils.findNotification(updateTaskWorkGroupMessages.commonError),
          ).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: showSecondLineButtonProps.workGroup,
              status: activeSecondLineButtonProps.status,
              extendedStatus: activeSecondLineButtonProps.extendedStatus,
            }),
          })

          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup], once: false })

          mockUpdateTaskWorkGroupServerError(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupBlockTestUtils.clickSecondLineButton(user)
          await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
          await taskSecondLineModalTestUtils.openWorkGroupField(user)
          await taskSecondLineModalTestUtils.selectWorkGroup(user, workGroup.name)
          await taskSecondLineModalTestUtils.setComment(user, fakeWord())
          await taskSecondLineModalTestUtils.clickSubmitButton(user)

          expect(
            await notificationTestUtils.findNotification(updateTaskWorkGroupMessages.commonError),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              workGroup: showSecondLineButtonProps.workGroup,
              status: activeSecondLineButtonProps.status,
              extendedStatus: activeSecondLineButtonProps.extendedStatus,
            }),
          })

          const workGroup = workGroupFixtures.workGroupListItem()
          mockGetWorkGroupsSuccess({ body: [workGroup], once: false })

          mockUpdateTaskWorkGroupForbiddenError(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupBlockTestUtils.clickSecondLineButton(user)
          await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
          await taskSecondLineModalTestUtils.openWorkGroupField(user)
          await taskSecondLineModalTestUtils.selectWorkGroup(user, workGroup.name)
          await taskSecondLineModalTestUtils.setComment(user, fakeWord())
          await taskSecondLineModalTestUtils.clickSubmitButton(user)

          expect(
            await notificationTestUtils.findNotification(commonApiMessages.unknownError),
          ).toBeInTheDocument()
        })
      })
    })
  })

  describe('Перевод заявки в ожидание', () => {
    describe('Создание запроса', () => {
      describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
        describe('При успешном запросе', () => {
          test('Созданный запрос отображается', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                ...activeRequestSuspendItemProps,
              }),
            })

            mockCreateTaskSuspendRequestSuccess(props.taskId, {
              body: taskFixtures.suspendRequest(),
            })

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
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

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await notificationTestUtils.findNotification(createSuspendRequestErrorMsg),
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

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await notificationTestUtils.findNotification(createSuspendRequestErrorMsg),
            ).toBeInTheDocument()

            expect(
              await requestTaskSuspendModalTestUtils.findReasonError(
                badRequestResponse.suspendReason[0],
              ),
            ).toBeInTheDocument()

            expect(
              await requestTaskSuspendModalTestUtils.findCommentError(
                badRequestResponse.comment[0],
              ),
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

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
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

      describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
        describe('При успешном запросе', () => {
          test('Созданный запрос отображается', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                ...activeRequestSuspendItemProps,
              }),
            })

            mockCreateTaskSuspendRequestSuccess(props.taskId, {
              body: taskFixtures.suspendRequest(),
            })

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
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

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await notificationTestUtils.findNotification(createSuspendRequestErrorMsg),
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

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await notificationTestUtils.findNotification(createSuspendRequestErrorMsg),
            ).toBeInTheDocument()

            expect(
              await requestTaskSuspendModalTestUtils.findReasonError(
                badRequestResponse.suspendReason[0],
              ),
            ).toBeInTheDocument()

            expect(
              await requestTaskSuspendModalTestUtils.findCommentError(
                badRequestResponse.comment[0],
              ),
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

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
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

      describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
        describe('При успешном запросе', () => {
          test('Созданный запрос отображается', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                ...activeRequestSuspendItemProps,
              }),
            })

            mockCreateTaskSuspendRequestSuccess(props.taskId, {
              body: taskFixtures.suspendRequest(),
            })

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
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

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await notificationTestUtils.findNotification(createSuspendRequestErrorMsg),
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

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await notificationTestUtils.findNotification(createSuspendRequestErrorMsg),
            ).toBeInTheDocument()

            expect(
              await requestTaskSuspendModalTestUtils.findReasonError(
                badRequestResponse.suspendReason[0],
              ),
            ).toBeInTheDocument()

            expect(
              await requestTaskSuspendModalTestUtils.findCommentError(
                badRequestResponse.comment[0],
              ),
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

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
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

      describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
        describe('При успешном запросе', () => {
          test('Созданный запрос отображается', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                ...activeRequestSuspendItemProps,
              }),
            })

            mockCreateTaskSuspendRequestSuccess(props.taskId, {
              body: taskFixtures.suspendRequest(),
            })

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
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

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await notificationTestUtils.findNotification(createSuspendRequestErrorMsg),
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

            const badRequestResponse: Required<
              Omit<CreateTaskSuspendRequestBadRequestErrorResponse, 'detail'>
            > = {
              comment: [fakeWord()],
              suspendEndAt: [fakeWord()],
              suspendReason: [fakeWord()],
              externalRevisionLink: [fakeWord()],
              externalResponsibleCompany: [fakeWord()],
            }

            mockCreateTaskSuspendRequestBadRequestError(props.taskId, {
              body: badRequestResponse,
            })

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await notificationTestUtils.findNotification(createSuspendRequestErrorMsg),
            ).toBeInTheDocument()

            expect(
              await requestTaskSuspendModalTestUtils.findReasonError(
                badRequestResponse.suspendReason[0],
              ),
            ).toBeInTheDocument()

            expect(
              await requestTaskSuspendModalTestUtils.findCommentError(
                badRequestResponse.comment[0],
              ),
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

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
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
    })

    describe('Отмена запроса', () => {
      describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
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

            mockDeleteTaskSuspendRequestSuccess(props.taskId)

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.clickCancelButton(user)
            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()
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

            mockDeleteTaskSuspendRequestNotFoundError(props.taskId)

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.clickCancelButton(user)
            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            expect(
              await notificationTestUtils.findNotification(deleteSuspendRequestErrorMsg),
            ).toBeInTheDocument()
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
            })

            const badRequestErrorMessage = fakeWord()
            mockDeleteTaskSuspendRequestBadRequestError(props.taskId, {
              body: { detail: badRequestErrorMessage },
            })

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.clickCancelButton(user)

            const notification = await notificationTestUtils.findNotification(
              badRequestErrorMessage,
            )
            expect(notification).toBeInTheDocument()
          })

          test('Обрабатывается неизвестная ошибка', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                suspendRequest: taskFixtures.suspendRequest({
                  status: SuspendRequestStatusEnum.New,
                }),
              }),
            })

            mockDeleteTaskSuspendRequestServerError(props.taskId)

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.clickCancelButton(user)

            expect(
              await notificationTestUtils.findNotification(commonApiMessages.unknownError),
            ).toBeInTheDocument()
          })
        })
      })

      describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
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

            mockDeleteTaskSuspendRequestSuccess(props.taskId)

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.clickCancelButton(user)
            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()
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

            mockDeleteTaskSuspendRequestNotFoundError(props.taskId)

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.clickCancelButton(user)
            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            expect(
              await notificationTestUtils.findNotification(deleteSuspendRequestErrorMsg),
            ).toBeInTheDocument()
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
            })

            const badRequestErrorMessage = fakeWord()
            mockDeleteTaskSuspendRequestBadRequestError(props.taskId, {
              body: { detail: badRequestErrorMessage },
            })

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.clickCancelButton(user)

            const notification = await notificationTestUtils.findNotification(
              badRequestErrorMessage,
            )
            expect(notification).toBeInTheDocument()
          })

          test('Обрабатывается неизвестная ошибка', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                suspendRequest: taskFixtures.suspendRequest({
                  status: SuspendRequestStatusEnum.New,
                }),
              }),
            })

            mockDeleteTaskSuspendRequestServerError(props.taskId)

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.clickCancelButton(user)

            expect(
              await notificationTestUtils.findNotification(commonApiMessages.unknownError),
            ).toBeInTheDocument()
          })
        })
      })

      describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
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

            mockDeleteTaskSuspendRequestSuccess(props.taskId)

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.clickCancelButton(user)
            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()
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

            mockDeleteTaskSuspendRequestNotFoundError(props.taskId)

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.clickCancelButton(user)
            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            expect(
              await notificationTestUtils.findNotification(deleteSuspendRequestErrorMsg),
            ).toBeInTheDocument()
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
            })

            const badRequestErrorMessage = fakeWord()
            mockDeleteTaskSuspendRequestBadRequestError(props.taskId, {
              body: { detail: badRequestErrorMessage },
            })

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.clickCancelButton(user)

            const notification = await notificationTestUtils.findNotification(
              badRequestErrorMessage,
            )
            expect(notification).toBeInTheDocument()
          })

          test('Обрабатывается неизвестная ошибка', async () => {
            mockGetWorkGroupsSuccess({ body: [] })

            mockGetTaskSuccess(props.taskId, {
              body: taskFixtures.task({
                id: props.taskId,
                suspendRequest: taskFixtures.suspendRequest({
                  status: SuspendRequestStatusEnum.New,
                }),
              }),
            })

            mockDeleteTaskSuspendRequestServerError(props.taskId)

            const { user } = render(<TaskCardContainer {...props} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.clickCancelButton(user)

            expect(
              await notificationTestUtils.findNotification(commonApiMessages.unknownError),
            ).toBeInTheDocument()
          })
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

          mockTakeTaskSuccess(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth(),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()
          await taskSuspendRequestTestUtils.findContainer()
          await taskSuspendRequestTestUtils.clickReturnToWorkButton(user)
          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupsSuccess({ body: [] })

          mockGetTaskSuccess(props.taskId, {
            body: taskFixtures.task({
              id: props.taskId,
              suspendRequest: taskFixtures.suspendRequest({
                status: SuspendRequestStatusEnum.Approved,
              }),
            }),
          })

          mockTakeTaskServerError(props.taskId)

          const { user } = render(<TaskCardContainer {...props} />, {
            store: getStoreWithAuth(),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()
          await taskSuspendRequestTestUtils.findContainer()
          await taskSuspendRequestTestUtils.clickReturnToWorkButton(user)

          expect(
            await notificationTestUtils.findNotification(commonApiMessages.unknownError),
          ).toBeInTheDocument()
        })
      })
    })
  })
})
