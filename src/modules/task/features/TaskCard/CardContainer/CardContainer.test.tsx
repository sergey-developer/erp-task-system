import head from 'lodash/head'

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
  mockGetWorkGroupListSuccess,
  mockTakeTaskServerError,
  mockTakeTaskSuccess,
  mockUpdateTaskAssigneeServerError,
  mockUpdateTaskAssigneeSuccess,
  mockUpdateTaskWorkGroupForbiddenError,
  mockUpdateTaskWorkGroupNotFoundError,
  mockUpdateTaskWorkGroupServerError,
  mockUpdateTaskWorkGroupSuccess,
} from '_tests_/mocks/api'
import {
  findNotification,
  generateId,
  generateWord,
  getStoreWithAuth,
  loadingFinishedByButton,
  loadingFinishedByCard,
  loadingStartedByButton,
  queryNotification,
  render,
  setupApiTests,
  setupNotifications,
} from '_tests_/utils'
import { waitFor, within } from '@testing-library/react'
import taskFixtures from 'fixtures/task'
import workGroupFixtures from 'fixtures/workGroup'
import {
  SuspendReasonEnum,
  TaskExtendedStatusEnum,
} from 'modules/task/constants/common'
import {
  CREATE_TASK_RECLASSIFICATION_REQUEST_NOT_FOUND_ERROR_MSG,
  UPDATE_TASK_ASSIGNEE_COMMON_ERROR_MSG,
  UPDATE_TASK_WORK_GROUP_COMMON_ERROR_MSG,
} from 'modules/task/constants/errorMessages'
import { CreateTaskSuspendRequestBadRequestErrorResponse } from 'modules/task/models'
import {
  getTaskNotFoundErrorMsg,
  getTaskServerErrorMsg,
} from 'modules/task/utils/messages'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/errors'
import { UserRoleEnum } from 'shared/constants/roles'
import { ErrorResponse } from 'shared/services/api'

import {
  activeSecondLineButtonProps,
  showSecondLineButtonProps,
  testUtils as workGroupBlockTestUtils,
} from '../../TaskCard/WorkGroupBlock/WorkGroupBlock.test'
import {
  activeAssignButtonProps,
  activeAssignOnMeButtonProps,
  activeTakeTaskButtonProps,
  testUtils as assigneeBlockTestUtils,
  canSelectAssigneeProps,
} from '../AssigneeBlock/AssigneeBlock.test'
import { testUtils as taskCardTestUtils } from '../Card/Card.test'
import {
  activeRequestReclassificationItemProps,
  activeRequestSuspendItemProps,
  testUtils as cardTitleTestUtils,
} from '../CardTitle/CardTitle.test'
import {
  availableReasons,
  testUtils as taskReclassificationModalTestUtils,
} from '../RequestTaskReclassificationModal/TaskReclassificationModal.test'
import { testUtils as requestTaskSuspendModalTestUtils } from '../RequestTaskSuspendModal/RequestTaskSuspendModal.test'
import { TaskFirstLineFormErrors } from '../TaskFirstLineModal/interfaces'
import { testUtils as taskFirstLineModalTestUtils } from '../TaskFirstLineModal/TaskFirstLineModal.test'
import { testUtils as taskReclassificationRequestTestUtils } from '../TaskReclassificationRequest/TaskReclassificationRequest.test'
import { testUtils as taskSecondLineModalTestUtils } from '../TaskSecondLineModal/TaskSecondLineModal.test'
import { testUtils as taskSuspendRequestTestUtils } from '../TaskSuspendRequest/TaskSuspendRequest.test'
import TaskCardContainer, { TaskCardContainerProps } from './index'

const requiredProps: TaskCardContainerProps = {
  taskId: generateId(),
  closeTaskCard: jest.fn(),
  additionalInfoExpanded: false,
  onExpandAdditionalInfo: jest.fn(),
}

setupApiTests()
setupNotifications()

describe('Контейнер детальной карточки заявки', () => {
  describe('Получение заявки', () => {
    describe('Роль - первая линия поддержки', () => {
      describe('При успешном запросе', () => {
        test('Отображается основной блок заявки', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId }),
          })

          render(<TaskCardContainer {...requiredProps} />, {
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
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskServerError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(taskCardTestUtils.queryCardDetails()).not.toBeInTheDocument()
        })

        test('Обрабатывается ошибка - 404', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskNotFoundError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await findNotification(
              getTaskNotFoundErrorMsg(requiredProps.taskId),
            ),
          ).toBeInTheDocument()
        })

        test('Обрабатывается ошибка - 400', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskBadRequestError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await findNotification(getTaskServerErrorMsg(requiredProps.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается ошибка - 500', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskServerError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await findNotification(getTaskServerErrorMsg(requiredProps.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskForbiddenError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(await findNotification(UNKNOWN_ERROR_MSG)).toBeInTheDocument()
        })
      })
    })

    describe('Роль - инженер', () => {
      describe('При успешном запросе', () => {
        test('Отображается основной блок заявки', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId }),
          })

          render(<TaskCardContainer {...requiredProps} />, {
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
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskServerError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(taskCardTestUtils.queryCardDetails()).not.toBeInTheDocument()
        })

        test('Обрабатывается ошибка - 404', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskNotFoundError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await findNotification(
              getTaskNotFoundErrorMsg(requiredProps.taskId),
            ),
          ).toBeInTheDocument()
        })

        test('Обрабатывается ошибка - 400', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskBadRequestError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await findNotification(getTaskServerErrorMsg(requiredProps.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается ошибка - 500', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskServerError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await findNotification(getTaskServerErrorMsg(requiredProps.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskForbiddenError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(await findNotification(UNKNOWN_ERROR_MSG)).toBeInTheDocument()
        })
      })
    })

    describe('Роль - старший инженер', () => {
      describe('При успешном запросе', () => {
        test('Отображается основной блок заявки', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId }),
          })

          render(<TaskCardContainer {...requiredProps} />, {
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
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskServerError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(taskCardTestUtils.queryCardDetails()).not.toBeInTheDocument()
        })

        test('Обрабатывается ошибка - 404', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskNotFoundError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await findNotification(
              getTaskNotFoundErrorMsg(requiredProps.taskId),
            ),
          ).toBeInTheDocument()
        })

        test('Обрабатывается ошибка - 400', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskBadRequestError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await findNotification(getTaskServerErrorMsg(requiredProps.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается ошибка - 500', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskServerError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await findNotification(getTaskServerErrorMsg(requiredProps.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskForbiddenError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(await findNotification(UNKNOWN_ERROR_MSG)).toBeInTheDocument()
        })
      })
    })

    describe('Роль - глава отдела', () => {
      describe('При успешном запросе', () => {
        test('Отображается основной блок заявки', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId }),
          })

          render(<TaskCardContainer {...requiredProps} />, {
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
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskServerError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(taskCardTestUtils.queryCardDetails()).not.toBeInTheDocument()
        })

        test('Обрабатывается ошибка - 404', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskNotFoundError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await findNotification(
              getTaskNotFoundErrorMsg(requiredProps.taskId),
            ),
          ).toBeInTheDocument()
        })

        test('Обрабатывается ошибка - 400', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskBadRequestError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await findNotification(getTaskServerErrorMsg(requiredProps.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается ошибка - 500', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskServerError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await findNotification(getTaskServerErrorMsg(requiredProps.taskId)),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupListSuccess({ body: [] })
          mockGetTaskForbiddenError(requiredProps.taskId)

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(await findNotification(UNKNOWN_ERROR_MSG)).toBeInTheDocument()
        })
      })
    })
  })

  describe('Переклассификация заявки', () => {
    describe('Роль - первая линия поддержки', () => {
      describe('Получение запроса на переклассификацию', () => {
        describe('Запрос отправляется если условия соблюдены', () => {
          describe('При успешном запросе', () => {
            test('Запрос отображается', async () => {
              mockGetWorkGroupListSuccess({ body: [] })

              mockGetTaskSuccess(requiredProps.taskId, {
                body: taskFixtures.getTask({
                  id: requiredProps.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestSuccess(requiredProps.taskId, {
                body: taskFixtures.getReclassificationRequest(),
              })

              render(<TaskCardContainer {...requiredProps} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.FirstLineSupport,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              expect(
                await taskReclassificationRequestTestUtils.findContainer(),
              ).toBeInTheDocument()
            })
          })

          describe('При не успешном запросе', () => {
            test('Обрабатывается неизвестная ошибка', async () => {
              mockGetWorkGroupListSuccess({ body: [] })

              mockGetTaskSuccess(requiredProps.taskId, {
                body: taskFixtures.getTask({
                  id: requiredProps.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestServerError(
                requiredProps.taskId,
              )

              render(<TaskCardContainer {...requiredProps} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.FirstLineSupport,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              expect(
                await findNotification(UNKNOWN_ERROR_MSG),
              ).toBeInTheDocument()
            })
          })
        })

        describe('Запрос не отправляется если условия соблюдены', () => {
          test('Но расширенный статус заявка не "На переклассификации"', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                extendedStatus: TaskExtendedStatusEnum.New,
              }),
            })

            render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()
            taskCardTestUtils.expectReclassificationRequestLoadingNotStarted()

            expect(
              taskReclassificationRequestTestUtils.queryContainer(),
            ).not.toBeInTheDocument()
          })
        })

        describe('Запрос не отправляется повторно если', () => {
          test.todo('Ранее был создан запрос на переклассификацию')
        })
      })

      describe('Создание запроса на переклассификацию', () => {
        describe('При успешном запросе', () => {
          test('Отображается запрос и закрывается модалка', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                status: activeRequestReclassificationItemProps.status,
                olaStatus: activeRequestReclassificationItemProps.olaStatus,
                type: activeRequestReclassificationItemProps.type,
              }),
            })

            mockGetTaskReclassificationRequestSuccess(requiredProps.taskId, {
              body: taskFixtures.getReclassificationRequest(),
            })
            mockCreateTaskReclassificationRequestSuccess(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            const modal =
              await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.userSetComment(
              user,
              generateWord(),
            )
            await taskReclassificationModalTestUtils.userSetReclassificationReason(
              user,
              availableReasons[0],
            )
            await taskReclassificationModalTestUtils.userClickSubmitButton(user)

            expect(
              await taskReclassificationRequestTestUtils.findContainer(),
            ).toBeInTheDocument()

            expect(modal).not.toBeInTheDocument()
          })
        })

        describe('При не успешном запросе', () => {
          test('Корректно обрабатывается ошибка - 404', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                status: activeRequestReclassificationItemProps.status,
                olaStatus: activeRequestReclassificationItemProps.olaStatus,
                type: activeRequestReclassificationItemProps.type,
              }),
            })

            mockCreateTaskReclassificationRequestNotFoundError(
              requiredProps.taskId,
            )

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.userSetComment(
              user,
              generateWord(),
            )
            await taskReclassificationModalTestUtils.userSetReclassificationReason(
              user,
              availableReasons[0],
            )
            await taskReclassificationModalTestUtils.userClickSubmitButton(user)

            expect(
              await findNotification(
                CREATE_TASK_RECLASSIFICATION_REQUEST_NOT_FOUND_ERROR_MSG,
              ),
            ).toBeInTheDocument()
          })
        })
      })
    })

    describe('Роль - инженер', () => {
      describe('Получение запроса на переклассификацию', () => {
        describe('Запрос отправляется если условия соблюдены', () => {
          describe('При успешном запросе', () => {
            test('Запрос отображается', async () => {
              mockGetWorkGroupListSuccess({ body: [] })

              mockGetTaskSuccess(requiredProps.taskId, {
                body: taskFixtures.getTask({
                  id: requiredProps.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestSuccess(requiredProps.taskId, {
                body: taskFixtures.getReclassificationRequest(),
              })

              render(<TaskCardContainer {...requiredProps} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.Engineer,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              expect(
                await taskReclassificationRequestTestUtils.findContainer(),
              ).toBeInTheDocument()
            })
          })

          describe('При не успешном запросе', () => {
            test('Обрабатывается неизвестная ошибка', async () => {
              mockGetWorkGroupListSuccess({ body: [] })

              mockGetTaskSuccess(requiredProps.taskId, {
                body: taskFixtures.getTask({
                  id: requiredProps.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestServerError(
                requiredProps.taskId,
              )

              render(<TaskCardContainer {...requiredProps} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.Engineer,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              expect(
                await findNotification(UNKNOWN_ERROR_MSG),
              ).toBeInTheDocument()
            })
          })
        })

        describe('Запрос не отправляется если условия соблюдены', () => {
          test('Но расширенный статус заявка не "На переклассификации"', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                extendedStatus: TaskExtendedStatusEnum.New,
              }),
            })

            render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()
            taskCardTestUtils.expectReclassificationRequestLoadingNotStarted()

            expect(
              taskReclassificationRequestTestUtils.queryContainer(),
            ).not.toBeInTheDocument()
          })
        })

        describe('Запрос не отправляется повторно если', () => {
          test.todo('Ранее был создан запрос на переклассификацию')
        })
      })
    })

    describe('Роль - старший инженер', () => {
      describe('Получение запроса на переклассификацию', () => {
        describe('Запрос отправляется если условия соблюдены', () => {
          describe('При успешном запросе', () => {
            test('Запрос отображается', async () => {
              mockGetWorkGroupListSuccess({ body: [] })

              mockGetTaskSuccess(requiredProps.taskId, {
                body: taskFixtures.getTask({
                  id: requiredProps.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestSuccess(requiredProps.taskId, {
                body: taskFixtures.getReclassificationRequest(),
              })

              render(<TaskCardContainer {...requiredProps} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.SeniorEngineer,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              expect(
                await taskReclassificationRequestTestUtils.findContainer(),
              ).toBeInTheDocument()
            })
          })

          describe('При не успешном запросе', () => {
            test('Обрабатывается неизвестная ошибка', async () => {
              mockGetWorkGroupListSuccess({ body: [] })

              mockGetTaskSuccess(requiredProps.taskId, {
                body: taskFixtures.getTask({
                  id: requiredProps.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestServerError(
                requiredProps.taskId,
              )

              render(<TaskCardContainer {...requiredProps} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.SeniorEngineer,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              expect(
                await findNotification(UNKNOWN_ERROR_MSG),
              ).toBeInTheDocument()
            })
          })
        })

        describe('Запрос не отправляется если условия соблюдены', () => {
          test('Но расширенный статус заявка не "На переклассификации"', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                extendedStatus: TaskExtendedStatusEnum.New,
              }),
            })

            render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()
            taskCardTestUtils.expectReclassificationRequestLoadingNotStarted()

            expect(
              taskReclassificationRequestTestUtils.queryContainer(),
            ).not.toBeInTheDocument()
          })
        })

        describe('Запрос не отправляется повторно если', () => {
          test.todo('Ранее был создан запрос на переклассификацию')
        })
      })

      describe('Создание запроса на переклассификацию', () => {
        describe('При успешном запросе', () => {
          test('Отображается запрос и закрывается модалка', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                status: activeRequestReclassificationItemProps.status,
                olaStatus: activeRequestReclassificationItemProps.olaStatus,
                type: activeRequestReclassificationItemProps.type,
              }),
            })

            mockGetTaskReclassificationRequestSuccess(requiredProps.taskId, {
              body: taskFixtures.getReclassificationRequest(),
            })
            mockCreateTaskReclassificationRequestSuccess(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            const modal =
              await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.userSetComment(
              user,
              generateWord(),
            )
            await taskReclassificationModalTestUtils.userSetReclassificationReason(
              user,
              availableReasons[0],
            )
            await taskReclassificationModalTestUtils.userClickSubmitButton(user)

            expect(
              await taskReclassificationRequestTestUtils.findContainer(),
            ).toBeInTheDocument()

            expect(modal).not.toBeInTheDocument()
          })
        })

        describe('При не успешном запросе', () => {
          test('Корректно обрабатывается ошибка - 404', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                status: activeRequestReclassificationItemProps.status,
                olaStatus: activeRequestReclassificationItemProps.olaStatus,
                type: activeRequestReclassificationItemProps.type,
              }),
            })

            mockCreateTaskReclassificationRequestNotFoundError(
              requiredProps.taskId,
            )

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.userSetComment(
              user,
              generateWord(),
            )
            await taskReclassificationModalTestUtils.userSetReclassificationReason(
              user,
              availableReasons[0],
            )
            await taskReclassificationModalTestUtils.userClickSubmitButton(user)

            expect(
              await findNotification(
                CREATE_TASK_RECLASSIFICATION_REQUEST_NOT_FOUND_ERROR_MSG,
              ),
            ).toBeInTheDocument()
          })
        })
      })
    })

    describe('Роль - глава отдела', () => {
      describe('Получение запроса на переклассификацию', () => {
        describe('Запрос отправляется если условия соблюдены', () => {
          describe('При успешном запросе', () => {
            test('Запрос отображается', async () => {
              mockGetWorkGroupListSuccess({ body: [] })

              mockGetTaskSuccess(requiredProps.taskId, {
                body: taskFixtures.getTask({
                  id: requiredProps.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestSuccess(requiredProps.taskId, {
                body: taskFixtures.getReclassificationRequest(),
              })

              render(<TaskCardContainer {...requiredProps} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.HeadOfDepartment,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              expect(
                await taskReclassificationRequestTestUtils.findContainer(),
              ).toBeInTheDocument()
            })
          })

          describe('При не успешном запросе', () => {
            test('Обрабатывается неизвестная ошибка', async () => {
              mockGetWorkGroupListSuccess({ body: [] })

              mockGetTaskSuccess(requiredProps.taskId, {
                body: taskFixtures.getTask({
                  id: requiredProps.taskId,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                }),
              })

              mockGetTaskReclassificationRequestServerError(
                requiredProps.taskId,
              )

              render(<TaskCardContainer {...requiredProps} />, {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.HeadOfDepartment,
                }),
              })

              await taskCardTestUtils.expectLoadingStarted()
              await taskCardTestUtils.expectLoadingFinished()
              await taskCardTestUtils.expectReclassificationRequestLoadingFinished()

              expect(
                await findNotification(UNKNOWN_ERROR_MSG),
              ).toBeInTheDocument()
            })
          })
        })

        describe('Запрос не отправляется если условия соблюдены', () => {
          test('Но расширенный статус заявка не "На переклассификации"', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                extendedStatus: TaskExtendedStatusEnum.New,
              }),
            })

            render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()
            taskCardTestUtils.expectReclassificationRequestLoadingNotStarted()

            expect(
              taskReclassificationRequestTestUtils.queryContainer(),
            ).not.toBeInTheDocument()
          })
        })

        describe('Запрос не отправляется повторно если', () => {
          test.todo('Ранее был создан запрос на переклассификацию')
        })
      })

      describe('Создание запроса на переклассификацию', () => {
        describe('При успешном запросе', () => {
          test('Отображается запрос и закрывается модалка', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                status: activeRequestReclassificationItemProps.status,
                olaStatus: activeRequestReclassificationItemProps.olaStatus,
                type: activeRequestReclassificationItemProps.type,
              }),
            })

            mockGetTaskReclassificationRequestSuccess(requiredProps.taskId, {
              body: taskFixtures.getReclassificationRequest(),
            })
            mockCreateTaskReclassificationRequestSuccess(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            const modal =
              await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.userSetComment(
              user,
              generateWord(),
            )
            await taskReclassificationModalTestUtils.userSetReclassificationReason(
              user,
              availableReasons[0],
            )
            await taskReclassificationModalTestUtils.userClickSubmitButton(user)

            expect(
              await taskReclassificationRequestTestUtils.findContainer(),
            ).toBeInTheDocument()

            expect(modal).not.toBeInTheDocument()
          })
        })

        describe('При не успешном запросе', () => {
          test('Корректно обрабатывается ошибка - 404', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                status: activeRequestReclassificationItemProps.status,
                olaStatus: activeRequestReclassificationItemProps.olaStatus,
                type: activeRequestReclassificationItemProps.type,
              }),
            })

            mockCreateTaskReclassificationRequestNotFoundError(
              requiredProps.taskId,
            )

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.userSetComment(
              user,
              generateWord(),
            )
            await taskReclassificationModalTestUtils.userSetReclassificationReason(
              user,
              availableReasons[0],
            )
            await taskReclassificationModalTestUtils.userClickSubmitButton(user)

            expect(
              await findNotification(
                CREATE_TASK_RECLASSIFICATION_REQUEST_NOT_FOUND_ERROR_MSG,
              ),
            ).toBeInTheDocument()
          })
        })
      })
    })
  })

  describe('Получение списка рабочих групп', () => {
    describe('При успешном запросе', () => {})

    describe('При не успешном запросе', () => {})
  })

  describe('Выполнение заявки', () => {
    describe('При успешном запросе', () => {})

    describe('При не успешном запросе', () => {})
  })

  describe('Перевод заявки на 1-ю линию', () => {
    describe('Роль - старший инженер', () => {
      describe('При успешном запросе', () => {
        test('Закрывается модалка', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          mockDeleteTaskWorkGroupSuccess(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          const modal = await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingFinishedByButton(firstLineButton)

          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          const badRequestErrorResponse = { description: [generateWord()] }
          mockDeleteTaskWorkGroupBadRequestError<TaskFirstLineFormErrors>(
            requiredProps.taskId,
            { body: badRequestErrorResponse },
          )

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingFinishedByButton(firstLineButton)

          const descriptionContainer =
            taskFirstLineModalTestUtils.getDescriptionFieldContainer()

          const errorMsg = await within(descriptionContainer).findByText(
            head(badRequestErrorResponse.description)!,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 404', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          const notFoundErrorResponse = { detail: [generateWord()] }
          mockDeleteTaskWorkGroupNotFoundError(requiredProps.taskId, {
            body: notFoundErrorResponse,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingFinishedByButton(firstLineButton)

          const errorMsg = await findNotification(
            head(notFoundErrorResponse.detail)!,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          const serverErrorResponse = { detail: [generateWord()] }
          mockDeleteTaskWorkGroupServerError(requiredProps.taskId, {
            body: serverErrorResponse,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingStartedByButton(firstLineButton)
          await loadingFinishedByButton(firstLineButton)

          const errorMsg = await findNotification(
            head(serverErrorResponse.detail)!,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          mockDeleteTaskWorkGroupForbiddenError(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingStartedByButton(firstLineButton)
          await loadingFinishedByButton(firstLineButton)

          const errorMsg = await findNotification(UNKNOWN_ERROR_MSG)
          expect(errorMsg).toBeInTheDocument()
        })
      })
    })

    describe('Роль - глава отдела', () => {
      describe('При успешном запросе', () => {
        test('Закрывается модалка', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })
          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })
          mockDeleteTaskWorkGroupSuccess(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          const modal = await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingFinishedByButton(firstLineButton)

          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          const badRequestErrorResponse = { description: [generateWord()] }
          mockDeleteTaskWorkGroupBadRequestError<TaskFirstLineFormErrors>(
            requiredProps.taskId,
            { body: badRequestErrorResponse },
          )

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingStartedByButton(firstLineButton)
          await loadingFinishedByButton(firstLineButton)

          const descriptionContainer =
            taskFirstLineModalTestUtils.getDescriptionFieldContainer()

          const errorMsg = await within(descriptionContainer).findByText(
            head(badRequestErrorResponse.description)!,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 404', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          const notFoundErrorResponse = { detail: [generateWord()] }
          mockDeleteTaskWorkGroupNotFoundError(requiredProps.taskId, {
            body: notFoundErrorResponse,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingStartedByButton(firstLineButton)
          await loadingFinishedByButton(firstLineButton)

          const errorMsg = await findNotification(
            head(notFoundErrorResponse.detail)!,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          const serverErrorResponse = { detail: [generateWord()] }
          mockDeleteTaskWorkGroupServerError(requiredProps.taskId, {
            body: serverErrorResponse,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingStartedByButton(firstLineButton)
          await loadingFinishedByButton(firstLineButton)

          const errorMsg = await findNotification(
            head(serverErrorResponse.detail)!,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          mockDeleteTaskWorkGroupForbiddenError(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingStartedByButton(firstLineButton)
          await loadingFinishedByButton(firstLineButton)

          const errorMsg = await findNotification(UNKNOWN_ERROR_MSG)
          expect(errorMsg).toBeInTheDocument()
        })
      })
    })
  })

  describe('Перевод заявки на 2-ю линию', () => {
    describe('Роль - первая линия поддержки', () => {
      describe('При успешном запросе', () => {
        test('Закрывается модалка', async () => {
          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({
              id: requiredProps.taskId,
              workGroup: showSecondLineButtonProps.workGroup,
              status: activeSecondLineButtonProps.status,
              extendedStatus: activeSecondLineButtonProps.extendedStatus,
            }),
          })

          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockUpdateTaskWorkGroupSuccess(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupBlockTestUtils.userClickSecondLineButton(user)
          const modal = await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.userOpenWorkGroup(user)
          await taskSecondLineModalTestUtils.userSelectWorkGroup(
            user,
            workGroup.name,
          )
          await taskSecondLineModalTestUtils.userClickSubmitButton(user)

          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })
        })
      })

      describe('При не успешный запросе', () => {
        test('Обрабатывается ошибка 404', async () => {
          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({
              id: requiredProps.taskId,
              workGroup: showSecondLineButtonProps.workGroup,
              status: activeSecondLineButtonProps.status,
              extendedStatus: activeSecondLineButtonProps.extendedStatus,
            }),
          })

          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockUpdateTaskWorkGroupNotFoundError(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupBlockTestUtils.userClickSecondLineButton(user)
          await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.userOpenWorkGroup(user)
          await taskSecondLineModalTestUtils.userSelectWorkGroup(
            user,
            workGroup.name,
          )
          await taskSecondLineModalTestUtils.userClickSubmitButton(user)

          expect(
            await findNotification(UPDATE_TASK_WORK_GROUP_COMMON_ERROR_MSG),
          ).toBeInTheDocument()
        })

        test('Обрабатывается ошибка 500', async () => {
          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({
              id: requiredProps.taskId,
              workGroup: showSecondLineButtonProps.workGroup,
              status: activeSecondLineButtonProps.status,
              extendedStatus: activeSecondLineButtonProps.extendedStatus,
            }),
          })

          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockUpdateTaskWorkGroupServerError(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupBlockTestUtils.userClickSecondLineButton(user)
          await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.userOpenWorkGroup(user)
          await taskSecondLineModalTestUtils.userSelectWorkGroup(
            user,
            workGroup.name,
          )
          await taskSecondLineModalTestUtils.userClickSubmitButton(user)

          expect(
            await findNotification(UPDATE_TASK_WORK_GROUP_COMMON_ERROR_MSG),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({
              id: requiredProps.taskId,
              workGroup: showSecondLineButtonProps.workGroup,
              status: activeSecondLineButtonProps.status,
              extendedStatus: activeSecondLineButtonProps.extendedStatus,
            }),
          })

          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockUpdateTaskWorkGroupForbiddenError(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupBlockTestUtils.userClickSecondLineButton(user)
          await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.userOpenWorkGroup(user)
          await taskSecondLineModalTestUtils.userSelectWorkGroup(
            user,
            workGroup.name,
          )
          await taskSecondLineModalTestUtils.userClickSubmitButton(user)

          expect(await findNotification(UNKNOWN_ERROR_MSG)).toBeInTheDocument()
        })
      })
    })
  })

  describe('Назначение заявки на себя', () => {
    describe('При успешном запросе', () => {
      test('Уведомление об ошибке не отображается и заявка запрашивается заново', async () => {
        mockGetTaskSuccess(requiredProps.taskId, {
          body: taskFixtures.getTask({
            id: requiredProps.taskId,
            status: activeAssignOnMeButtonProps.status,
            extendedStatus: activeAssignOnMeButtonProps.extendedStatus,
          }),
          once: false,
        })

        mockGetWorkGroupListSuccess({ body: [] })
        mockUpdateTaskAssigneeSuccess(requiredProps.taskId)

        const { user } = render(<TaskCardContainer {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()
        await assigneeBlockTestUtils.userClickAssignOnMeButton(user)
        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()

        expect(
          queryNotification(UPDATE_TASK_ASSIGNEE_COMMON_ERROR_MSG),
        ).not.toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Уведомление об ошибке отображается и заявка не запрашивается заново', async () => {
        mockGetTaskSuccess(requiredProps.taskId, {
          body: taskFixtures.getTask({
            id: requiredProps.taskId,
            status: activeAssignOnMeButtonProps.status,
            extendedStatus: activeAssignOnMeButtonProps.extendedStatus,
          }),
        })

        mockGetWorkGroupListSuccess({ body: [] })
        mockUpdateTaskAssigneeServerError(requiredProps.taskId)

        const { user } = render(<TaskCardContainer {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()
        await assigneeBlockTestUtils.userClickAssignOnMeButton(user)

        taskCardTestUtils.expectLoadingNotStarted()
        expect(
          await findNotification(UPDATE_TASK_ASSIGNEE_COMMON_ERROR_MSG),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Назначение исполнителя заявки', () => {
    describe('При успешном запросе', () => {
      test('Уведомление об ошибке не отображается и заявка запрашивается заново', async () => {
        mockGetTaskSuccess(requiredProps.taskId, {
          body: taskFixtures.getTask({
            id: requiredProps.taskId,
            status: canSelectAssigneeProps.status,
            extendedStatus: activeAssignButtonProps.extendedStatus,
            assignee: activeAssignButtonProps.assignee,
            workGroup: taskFixtures.getWorkGroup({
              id: canSelectAssigneeProps.workGroup.id,
            }),
          }),
          once: false,
        })

        mockGetWorkGroupListSuccess({
          body: [canSelectAssigneeProps.workGroup],
        })

        mockUpdateTaskAssigneeSuccess(requiredProps.taskId)

        const { user } = render(<TaskCardContainer {...requiredProps} />, {
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
          canSelectAssigneeProps.workGroup.members[0].fullName,
        )
        await assigneeBlockTestUtils.userClickAssignButton(user)
        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()

        expect(
          queryNotification(UPDATE_TASK_ASSIGNEE_COMMON_ERROR_MSG),
        ).not.toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Уведомление об ошибке отображается и заявка не запрашивается заново', async () => {
        mockGetTaskSuccess(requiredProps.taskId, {
          body: taskFixtures.getTask({
            id: requiredProps.taskId,
            status: canSelectAssigneeProps.status,
            extendedStatus: activeAssignButtonProps.extendedStatus,
            assignee: activeAssignButtonProps.assignee,
            workGroup: taskFixtures.getWorkGroup({
              id: canSelectAssigneeProps.workGroup.id,
            }),
          }),
          once: false,
        })

        mockGetWorkGroupListSuccess({
          body: [canSelectAssigneeProps.workGroup],
        })

        mockUpdateTaskAssigneeServerError(requiredProps.taskId)

        const { user } = render(<TaskCardContainer {...requiredProps} />, {
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
          canSelectAssigneeProps.workGroup.members[0].fullName,
        )
        await assigneeBlockTestUtils.userClickAssignButton(user)

        taskCardTestUtils.expectLoadingNotStarted()
        expect(
          await findNotification(UPDATE_TASK_ASSIGNEE_COMMON_ERROR_MSG),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Взятие заявки в работу', () => {
    describe('При успешном запросе', () => {
      test('Уведомление об ошибке не отображается и заявка запрашивается заново', async () => {
        const task = taskFixtures.getTask({
          id: requiredProps.taskId,
          status: activeTakeTaskButtonProps.status,
          extendedStatus: activeTakeTaskButtonProps.extendedStatus,
        })

        mockGetTaskSuccess(requiredProps.taskId, { body: task })

        mockGetWorkGroupListSuccess({ body: [] })
        mockTakeTaskSuccess(requiredProps.taskId)

        const { user } = render(<TaskCardContainer {...requiredProps} />, {
          store: getStoreWithAuth({
            userId: task.assignee!.id,
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()
        await assigneeBlockTestUtils.userClickTakeTaskButton(user)

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()
        expect(queryNotification(UNKNOWN_ERROR_MSG)).not.toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Уведомление об ошибке отображается и заявка не запрашивается заново', async () => {
        const task = taskFixtures.getTask({
          id: requiredProps.taskId,
          status: activeTakeTaskButtonProps.status,
          extendedStatus: activeTakeTaskButtonProps.extendedStatus,
        })

        mockGetTaskSuccess(requiredProps.taskId, { body: task })

        mockGetWorkGroupListSuccess({ body: [] })
        mockTakeTaskServerError(requiredProps.taskId)

        const { user } = render(<TaskCardContainer {...requiredProps} />, {
          store: getStoreWithAuth({
            userId: task.assignee!.id,
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        await taskCardTestUtils.expectLoadingFinished()
        await assigneeBlockTestUtils.userClickTakeTaskButton(user)

        taskCardTestUtils.expectLoadingNotStarted()
        expect(await findNotification(UNKNOWN_ERROR_MSG)).toBeInTheDocument()
      })
    })
  })

  describe('Перевод заявки в ожидание', () => {
    describe('Создание запроса', () => {
      describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
        describe('При успешном запросе', () => {
          test('Созданный запрос отображается', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            mockCreateTaskSuspendRequestSuccess(requiredProps.taskId, {
              body: taskFixtures.getSuspendRequest(),
            })

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await taskSuspendRequestTestUtils.findContainer(),
            ).toBeInTheDocument()
          })
        })

        describe('При не успешном запросе', () => {
          test('Обрабатывается ошибка 404', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            mockCreateTaskSuspendRequestNotFoundError(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await findNotification(
                'Невозможно перевести заявку в ожидание - заявка не найдена',
              ),
            ).toBeInTheDocument()
          })

          test('Обрабатывается ошибка 400', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            const badRequestResponse: Required<
              Omit<
                CreateTaskSuspendRequestBadRequestErrorResponse['data'],
                'detail'
              >
            > = {
              comment: [generateWord()],
              suspendEndAt: [generateWord()],
              suspendReason: [generateWord()],
            }

            mockCreateTaskSuspendRequestBadRequestError(requiredProps.taskId, {
              body: badRequestResponse,
            })

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await findNotification(
                'Невозможно перевести заявку в ожидание. Пожалуйста, попробуйте позже',
              ),
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
          })

          test('Обрабатывается неизвестная ошибка', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            mockCreateTaskSuspendRequestServerError(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await findNotification(UNKNOWN_ERROR_MSG),
            ).toBeInTheDocument()
          })
        })
      })

      describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
        describe('При успешном запросе', () => {
          test('Созданный запрос отображается', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            mockCreateTaskSuspendRequestSuccess(requiredProps.taskId, {
              body: taskFixtures.getSuspendRequest(),
            })

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await taskSuspendRequestTestUtils.findContainer(),
            ).toBeInTheDocument()
          })
        })

        describe('При не успешном запросе', () => {
          test('Обрабатывается ошибка 404', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            mockCreateTaskSuspendRequestNotFoundError(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await findNotification(
                'Невозможно перевести заявку в ожидание - заявка не найдена',
              ),
            ).toBeInTheDocument()
          })

          test('Обрабатывается ошибка 400', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            const badRequestResponse: Required<
              Omit<
                CreateTaskSuspendRequestBadRequestErrorResponse['data'],
                'detail'
              >
            > = {
              comment: [generateWord()],
              suspendEndAt: [generateWord()],
              suspendReason: [generateWord()],
            }

            mockCreateTaskSuspendRequestBadRequestError(requiredProps.taskId, {
              body: badRequestResponse,
            })

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await findNotification(
                'Невозможно перевести заявку в ожидание. Пожалуйста, попробуйте позже',
              ),
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
          })

          test('Обрабатывается неизвестная ошибка', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            mockCreateTaskSuspendRequestServerError(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await findNotification(UNKNOWN_ERROR_MSG),
            ).toBeInTheDocument()
          })
        })
      })

      describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
        describe('При успешном запросе', () => {
          test('Созданный запрос отображается', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            mockCreateTaskSuspendRequestSuccess(requiredProps.taskId, {
              body: taskFixtures.getSuspendRequest(),
            })

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await taskSuspendRequestTestUtils.findContainer(),
            ).toBeInTheDocument()
          })
        })

        describe('При не успешном запросе', () => {
          test('Обрабатывается ошибка 404', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            mockCreateTaskSuspendRequestNotFoundError(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await findNotification(
                'Невозможно перевести заявку в ожидание - заявка не найдена',
              ),
            ).toBeInTheDocument()
          })

          test('Обрабатывается ошибка 400', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            const badRequestResponse: Required<
              Omit<
                CreateTaskSuspendRequestBadRequestErrorResponse['data'],
                'detail'
              >
            > = {
              comment: [generateWord()],
              suspendEndAt: [generateWord()],
              suspendReason: [generateWord()],
            }

            mockCreateTaskSuspendRequestBadRequestError(requiredProps.taskId, {
              body: badRequestResponse,
            })

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await findNotification(
                'Невозможно перевести заявку в ожидание. Пожалуйста, попробуйте позже',
              ),
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
          })

          test('Обрабатывается неизвестная ошибка', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            mockCreateTaskSuspendRequestServerError(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await findNotification(UNKNOWN_ERROR_MSG),
            ).toBeInTheDocument()
          })
        })
      })

      describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
        describe('При успешном запросе', () => {
          test('Созданный запрос отображается', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            mockCreateTaskSuspendRequestSuccess(requiredProps.taskId, {
              body: taskFixtures.getSuspendRequest(),
            })

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await taskSuspendRequestTestUtils.findContainer(),
            ).toBeInTheDocument()
          })
        })

        describe('При не успешном запросе', () => {
          test('Обрабатывается ошибка 404', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            mockCreateTaskSuspendRequestNotFoundError(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await findNotification(
                'Невозможно перевести заявку в ожидание - заявка не найдена',
              ),
            ).toBeInTheDocument()
          })

          test('Обрабатывается ошибка 400', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            const badRequestResponse: Required<
              Omit<
                CreateTaskSuspendRequestBadRequestErrorResponse['data'],
                'detail'
              >
            > = {
              comment: [generateWord()],
              suspendEndAt: [generateWord()],
              suspendReason: [generateWord()],
            }

            mockCreateTaskSuspendRequestBadRequestError(requiredProps.taskId, {
              body: badRequestResponse,
            })

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await findNotification(
                'Невозможно перевести заявку в ожидание. Пожалуйста, попробуйте позже',
              ),
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
          })

          test('Обрабатывается неизвестная ошибка', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                type: activeRequestSuspendItemProps.type,
                status: activeRequestSuspendItemProps.status,
                suspendRequest: null,
              }),
            })

            mockCreateTaskSuspendRequestServerError(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()

            await cardTitleTestUtils.userOpenMenu(user)
            await cardTitleTestUtils.clickRequestSuspendItem(user)
            await requestTaskSuspendModalTestUtils.findContainer()

            await requestTaskSuspendModalTestUtils.setReason(
              user,
              SuspendReasonEnum.AwaitingInformation,
            )
            await requestTaskSuspendModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

            expect(
              await findNotification(UNKNOWN_ERROR_MSG),
            ).toBeInTheDocument()
          })
        })
      })
    })

    describe('Отмена запроса', () => {
      describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
        describe('При успешном запросе', () => {
          test('Заявка перезапрашивается с сервера', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                suspendRequest: taskFixtures.getSuspendRequest(),
              }),
              once: false,
            })

            mockDeleteTaskSuspendRequestSuccess(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.userClickCancelButton(user)
            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()
          })
        })

        describe('При не успешном запросе', () => {
          test('Обрабатывается ошибка 404', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                suspendRequest: taskFixtures.getSuspendRequest(),
              }),
              once: false,
            })

            mockDeleteTaskSuspendRequestNotFoundError(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.userClickCancelButton(user)
            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            expect(
              await findNotification(
                'Заявка не найдена или не находится в ожидании',
              ),
            ).toBeInTheDocument()
          })

          test('Обрабатывается ошибка 400', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                suspendRequest: taskFixtures.getSuspendRequest(),
              }),
            })

            const badRequestResponse: Required<ErrorResponse['data']> = {
              detail: [generateWord()],
            }
            mockDeleteTaskSuspendRequestBadRequestError(requiredProps.taskId, {
              body: badRequestResponse,
            })

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.userClickCancelButton(user)

            expect(
              await findNotification(badRequestResponse.detail[0]),
            ).toBeInTheDocument()
          })

          test('Обрабатывается неизвестная ошибка', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                suspendRequest: taskFixtures.getSuspendRequest(),
              }),
            })

            mockDeleteTaskSuspendRequestServerError(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.userClickCancelButton(user)

            expect(
              await findNotification(UNKNOWN_ERROR_MSG),
            ).toBeInTheDocument()
          })
        })
      })

      describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
        describe('При успешном запросе', () => {
          test('Заявка перезапрашивается с сервера', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                suspendRequest: taskFixtures.getSuspendRequest(),
              }),
              once: false,
            })

            mockDeleteTaskSuspendRequestSuccess(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.userClickCancelButton(user)
            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()
          })
        })

        describe('При не успешном запросе', () => {
          test('Обрабатывается ошибка 404', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                suspendRequest: taskFixtures.getSuspendRequest(),
              }),
              once: false,
            })

            mockDeleteTaskSuspendRequestNotFoundError(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.userClickCancelButton(user)
            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            expect(
              await findNotification(
                'Заявка не найдена или не находится в ожидании',
              ),
            ).toBeInTheDocument()
          })

          test('Обрабатывается ошибка 400', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                suspendRequest: taskFixtures.getSuspendRequest(),
              }),
            })

            const badRequestResponse: Required<ErrorResponse['data']> = {
              detail: [generateWord()],
            }
            mockDeleteTaskSuspendRequestBadRequestError(requiredProps.taskId, {
              body: badRequestResponse,
            })

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.userClickCancelButton(user)

            expect(
              await findNotification(badRequestResponse.detail[0]),
            ).toBeInTheDocument()
          })

          test('Обрабатывается неизвестная ошибка', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                suspendRequest: taskFixtures.getSuspendRequest(),
              }),
            })

            mockDeleteTaskSuspendRequestServerError(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.userClickCancelButton(user)

            expect(
              await findNotification(UNKNOWN_ERROR_MSG),
            ).toBeInTheDocument()
          })
        })
      })

      describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
        describe('При успешном запросе', () => {
          test('Заявка перезапрашивается с сервера', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                suspendRequest: taskFixtures.getSuspendRequest(),
              }),
              once: false,
            })

            mockDeleteTaskSuspendRequestSuccess(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.userClickCancelButton(user)
            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()
          })
        })

        describe('При не успешном запросе', () => {
          test('Обрабатывается ошибка 404', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                suspendRequest: taskFixtures.getSuspendRequest(),
              }),
              once: false,
            })

            mockDeleteTaskSuspendRequestNotFoundError(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.userClickCancelButton(user)
            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            expect(
              await findNotification(
                'Заявка не найдена или не находится в ожидании',
              ),
            ).toBeInTheDocument()
          })

          test('Обрабатывается ошибка 400', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                suspendRequest: taskFixtures.getSuspendRequest(),
              }),
            })

            const badRequestResponse: Required<ErrorResponse['data']> = {
              detail: [generateWord()],
            }
            mockDeleteTaskSuspendRequestBadRequestError(requiredProps.taskId, {
              body: badRequestResponse,
            })

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.userClickCancelButton(user)

            expect(
              await findNotification(badRequestResponse.detail[0]),
            ).toBeInTheDocument()
          })

          test('Обрабатывается неизвестная ошибка', async () => {
            mockGetWorkGroupListSuccess({ body: [] })

            mockGetTaskSuccess(requiredProps.taskId, {
              body: taskFixtures.getTask({
                id: requiredProps.taskId,
                suspendRequest: taskFixtures.getSuspendRequest(),
              }),
            })

            mockDeleteTaskSuspendRequestServerError(requiredProps.taskId)

            const { user } = render(<TaskCardContainer {...requiredProps} />, {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            })

            await taskCardTestUtils.expectLoadingFinished()
            await taskSuspendRequestTestUtils.findContainer()
            await taskSuspendRequestTestUtils.userClickCancelButton(user)

            expect(
              await findNotification(UNKNOWN_ERROR_MSG),
            ).toBeInTheDocument()
          })
        })
      })
    })

    describe.skip('Вернуть в работу (Ещё не реализовано)', () => {})
  })
})
