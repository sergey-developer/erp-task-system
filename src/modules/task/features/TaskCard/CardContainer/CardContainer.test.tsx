import { waitFor, within } from '@testing-library/react'
import head from 'lodash/head'

import {
  SuspendReasonEnum,
  SuspendRequestStatusEnum,
  TaskExtendedStatusEnum,
} from 'modules/task/constants/common'
import {
  reclassificationRequestApiMessages,
  suspendRequestApiMessages,
  taskApiMessages,
  taskAssigneeApiMessages,
  taskWorkGroupApiMessages,
} from 'modules/task/constants/errorMessages'
import {
  CreateTaskSuspendRequestBadRequestErrorResponse,
  ResolveTaskBadRequestErrorResponse,
  UpdateTaskWorkGroupBadRequestErrorResponse,
} from 'modules/task/models'
import {
  getTaskNotFoundErrorMsg,
  getTaskServerErrorMsg,
} from 'modules/task/utils/messages'
import { GET_WORK_GROUP_LIST_SERVER_ERROR_MSG } from 'modules/workGroup/constants/errors'

import { commonApiMessages } from 'shared/constants/errors'
import { UserRoleEnum } from 'shared/constants/roles'
import { ErrorResponse } from 'shared/services/api'

import taskFixtures from 'fixtures/task'
import workGroupFixtures from 'fixtures/workGroup'

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
  mockGetWorkGroupListServerError,
  mockGetWorkGroupListSuccess,
  mockResolveTaskBadRequestError,
  mockResolveTaskServerError,
  mockResolveTaskSuccess,
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
  findNotification,
  generateId,
  generateWord,
  getStoreWithAuth,
  expectLoadingFinishedByButton,
  expectLoadingFinishedByCard,
  expectLoadingStartedByButton,
  queryNotification,
  render,
  setupApiTests,
  setupNotifications,
} from '_tests_/utils'

import {
  activeSecondLineButtonProps,
  showSecondLineButtonProps,
  testUtils as workGroupBlockTestUtils,
} from '../../TaskCard/WorkGroupBlock/WorkGroupBlock.test'
import {
  activeAssignButtonProps,
  activeAssignOnMeButtonProps,
  activeTakeTaskButtonProps,
  canSelectAssigneeProps,
  testUtils as assigneeBlockTestUtils,
} from '../AssigneeBlock/AssigneeBlock.test'
import { testUtils as taskCardTestUtils } from '../Card/Card.test'
import {
  activeExecuteTaskItemProps,
  activeRequestReclassificationItemProps,
  activeRequestSuspendItemProps,
  testUtils as cardTitleTestUtils,
} from '../CardTitle/CardTitle.test'
import {
  availableReasons,
  testUtils as taskReclassificationModalTestUtils,
} from '../RequestTaskReclassificationModal/TaskReclassificationModal.test'
import { testUtils as requestTaskSuspendModalTestUtils } from '../RequestTaskSuspendModal/RequestTaskSuspendModal.test'
import { testUtils as taskFirstLineModalTestUtils } from '../TaskFirstLineModal/TaskFirstLineModal.test'
import { TaskFirstLineFormErrors } from '../TaskFirstLineModal/interfaces'
import { testUtils as taskReclassificationRequestTestUtils } from '../TaskReclassificationRequest/TaskReclassificationRequest.test'
import { testUtils as taskResolutionModalTestUtils } from '../TaskResolutionModal/TaskResolutionModal.test'
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
  describe('Получение списка рабочих групп', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      describe('При не успешном запросе', () => {
        test('Отображается уведомление об ошибке', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId }),
          })

          mockGetWorkGroupListServerError()

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await findNotification(GET_WORK_GROUP_LIST_SERVER_ERROR_MSG),
          ).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
      describe('При не успешном запросе', () => {
        test('Отображается уведомление об ошибке', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId }),
          })

          mockGetWorkGroupListServerError()

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await findNotification(GET_WORK_GROUP_LIST_SERVER_ERROR_MSG),
          ).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
      describe('При не успешном запросе', () => {
        test('Отображается уведомление об ошибке', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId }),
          })

          mockGetWorkGroupListServerError()

          render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          expect(
            await findNotification(GET_WORK_GROUP_LIST_SERVER_ERROR_MSG),
          ).toBeInTheDocument()
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
                await findNotification(commonApiMessages.unknownError),
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

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            const modal =
              await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await taskReclassificationModalTestUtils.setReclassificationReason(
              user,
              availableReasons[0],
            )
            await taskReclassificationModalTestUtils.clickSubmitButton(user)

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

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await taskReclassificationModalTestUtils.setReclassificationReason(
              user,
              availableReasons[0],
            )
            await taskReclassificationModalTestUtils.clickSubmitButton(user)

            expect(
              await findNotification(
                reclassificationRequestApiMessages.create.notFoundError,
              ),
            ).toBeInTheDocument()
          })
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
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
                await findNotification(commonApiMessages.unknownError),
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

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
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
                await findNotification(commonApiMessages.unknownError),
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

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            const modal =
              await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await taskReclassificationModalTestUtils.setReclassificationReason(
              user,
              availableReasons[0],
            )
            await taskReclassificationModalTestUtils.clickSubmitButton(user)

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

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await taskReclassificationModalTestUtils.setReclassificationReason(
              user,
              availableReasons[0],
            )
            await taskReclassificationModalTestUtils.clickSubmitButton(user)

            expect(
              await findNotification(
                reclassificationRequestApiMessages.create.notFoundError,
              ),
            ).toBeInTheDocument()
          })
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
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
                await findNotification(commonApiMessages.unknownError),
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

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            const modal =
              await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await taskReclassificationModalTestUtils.setReclassificationReason(
              user,
              availableReasons[0],
            )
            await taskReclassificationModalTestUtils.clickSubmitButton(user)

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

            await cardTitleTestUtils.openMenu(user)
            await cardTitleTestUtils.clickRequestReclassificationItem(user)
            await taskReclassificationModalTestUtils.findContainer()

            await taskReclassificationModalTestUtils.setComment(
              user,
              generateWord(),
            )
            await taskReclassificationModalTestUtils.setReclassificationReason(
              user,
              availableReasons[0],
            )
            await taskReclassificationModalTestUtils.clickSubmitButton(user)

            expect(
              await findNotification(
                reclassificationRequestApiMessages.create.notFoundError,
              ),
            ).toBeInTheDocument()
          })
        })
      })
    })
  })

  describe('Выполнение заявки', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      describe('При успешном запросе', () => {
        test('Обработчик вызывается корректно', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          const task = taskFixtures.getTask({
            id: requiredProps.taskId,
            status: activeExecuteTaskItemProps.status,
            extendedStatus: activeExecuteTaskItemProps.extendedStatus,
          })
          mockGetTaskSuccess(requiredProps.taskId, { body: task })

          mockResolveTaskSuccess(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskItem(user)
          await taskResolutionModalTestUtils.findContainer()

          await taskResolutionModalTestUtils.setTechResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.setUserResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.clickSubmitButton(user)

          await waitFor(() => {
            expect(requiredProps.closeTaskCard).toBeCalledTimes(1)
          })
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          const task = taskFixtures.getTask({
            id: requiredProps.taskId,
            status: activeExecuteTaskItemProps.status,
            extendedStatus: activeExecuteTaskItemProps.extendedStatus,
          })
          mockGetTaskSuccess(requiredProps.taskId, { body: task })

          const badRequestResponse: Required<
            ResolveTaskBadRequestErrorResponse['data']
          > = {
            detail: [generateWord()],
            userResolution: [generateWord()],
            techResolution: [generateWord()],
          }

          mockResolveTaskBadRequestError(requiredProps.taskId, {
            body: badRequestResponse,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskItem(user)
          await taskResolutionModalTestUtils.findContainer()

          await taskResolutionModalTestUtils.setTechResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.setUserResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.clickSubmitButton(user)

          expect(
            await findNotification(badRequestResponse.detail[0]),
          ).toBeInTheDocument()

          expect(
            await taskResolutionModalTestUtils.findTechResolutionError(
              badRequestResponse.techResolution[0],
            ),
          ).toBeInTheDocument()

          expect(
            await taskResolutionModalTestUtils.findUserResolutionError(
              badRequestResponse.userResolution[0],
            ),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          const task = taskFixtures.getTask({
            id: requiredProps.taskId,
            status: activeExecuteTaskItemProps.status,
            extendedStatus: activeExecuteTaskItemProps.extendedStatus,
          })
          mockGetTaskSuccess(requiredProps.taskId, { body: task })

          mockResolveTaskServerError(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskItem(user)
          await taskResolutionModalTestUtils.findContainer()

          await taskResolutionModalTestUtils.setTechResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.setUserResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.clickSubmitButton(user)

          expect(
            await findNotification(taskApiMessages.resolve.commonError),
          ).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
      describe('При успешном запросе', () => {
        test('Обработчик вызывается корректно', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          const task = taskFixtures.getTask({
            id: requiredProps.taskId,
            status: activeExecuteTaskItemProps.status,
            extendedStatus: activeExecuteTaskItemProps.extendedStatus,
          })
          mockGetTaskSuccess(requiredProps.taskId, { body: task })

          mockResolveTaskSuccess(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskItem(user)
          await taskResolutionModalTestUtils.findContainer()

          await taskResolutionModalTestUtils.setTechResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.setUserResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.clickSubmitButton(user)

          await waitFor(() => {
            expect(requiredProps.closeTaskCard).toBeCalledTimes(1)
          })
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          const task = taskFixtures.getTask({
            id: requiredProps.taskId,
            status: activeExecuteTaskItemProps.status,
            extendedStatus: activeExecuteTaskItemProps.extendedStatus,
          })
          mockGetTaskSuccess(requiredProps.taskId, { body: task })

          const badRequestResponse: Required<
            ResolveTaskBadRequestErrorResponse['data']
          > = {
            detail: [generateWord()],
            userResolution: [generateWord()],
            techResolution: [generateWord()],
          }

          mockResolveTaskBadRequestError(requiredProps.taskId, {
            body: badRequestResponse,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskItem(user)
          await taskResolutionModalTestUtils.findContainer()

          await taskResolutionModalTestUtils.setTechResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.setUserResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.clickSubmitButton(user)

          expect(
            await findNotification(badRequestResponse.detail[0]),
          ).toBeInTheDocument()

          expect(
            await taskResolutionModalTestUtils.findTechResolutionError(
              badRequestResponse.techResolution[0],
            ),
          ).toBeInTheDocument()

          expect(
            await taskResolutionModalTestUtils.findUserResolutionError(
              badRequestResponse.userResolution[0],
            ),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          const task = taskFixtures.getTask({
            id: requiredProps.taskId,
            status: activeExecuteTaskItemProps.status,
            extendedStatus: activeExecuteTaskItemProps.extendedStatus,
          })
          mockGetTaskSuccess(requiredProps.taskId, { body: task })

          mockResolveTaskServerError(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.Engineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskItem(user)
          await taskResolutionModalTestUtils.findContainer()

          await taskResolutionModalTestUtils.setTechResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.setUserResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.clickSubmitButton(user)

          expect(
            await findNotification(taskApiMessages.resolve.commonError),
          ).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
      describe('При успешном запросе', () => {
        test('Обработчик вызывается корректно', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          const task = taskFixtures.getTask({
            id: requiredProps.taskId,
            status: activeExecuteTaskItemProps.status,
            extendedStatus: activeExecuteTaskItemProps.extendedStatus,
          })
          mockGetTaskSuccess(requiredProps.taskId, { body: task })

          mockResolveTaskSuccess(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskItem(user)
          await taskResolutionModalTestUtils.findContainer()

          await taskResolutionModalTestUtils.setTechResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.setUserResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.clickSubmitButton(user)

          await waitFor(() => {
            expect(requiredProps.closeTaskCard).toBeCalledTimes(1)
          })
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          const task = taskFixtures.getTask({
            id: requiredProps.taskId,
            status: activeExecuteTaskItemProps.status,
            extendedStatus: activeExecuteTaskItemProps.extendedStatus,
          })
          mockGetTaskSuccess(requiredProps.taskId, { body: task })

          const badRequestResponse: Required<
            ResolveTaskBadRequestErrorResponse['data']
          > = {
            detail: [generateWord()],
            userResolution: [generateWord()],
            techResolution: [generateWord()],
          }

          mockResolveTaskBadRequestError(requiredProps.taskId, {
            body: badRequestResponse,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskItem(user)
          await taskResolutionModalTestUtils.findContainer()

          await taskResolutionModalTestUtils.setTechResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.setUserResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.clickSubmitButton(user)

          expect(
            await findNotification(badRequestResponse.detail[0]),
          ).toBeInTheDocument()

          expect(
            await taskResolutionModalTestUtils.findTechResolutionError(
              badRequestResponse.techResolution[0],
            ),
          ).toBeInTheDocument()

          expect(
            await taskResolutionModalTestUtils.findUserResolutionError(
              badRequestResponse.userResolution[0],
            ),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          const task = taskFixtures.getTask({
            id: requiredProps.taskId,
            status: activeExecuteTaskItemProps.status,
            extendedStatus: activeExecuteTaskItemProps.extendedStatus,
          })
          mockGetTaskSuccess(requiredProps.taskId, { body: task })

          mockResolveTaskServerError(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskItem(user)
          await taskResolutionModalTestUtils.findContainer()

          await taskResolutionModalTestUtils.setTechResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.setUserResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.clickSubmitButton(user)

          expect(
            await findNotification(taskApiMessages.resolve.commonError),
          ).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
      describe('При успешном запросе', () => {
        test('Обработчик вызывается корректно', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          const task = taskFixtures.getTask({
            id: requiredProps.taskId,
            status: activeExecuteTaskItemProps.status,
            extendedStatus: activeExecuteTaskItemProps.extendedStatus,
          })
          mockGetTaskSuccess(requiredProps.taskId, { body: task })

          mockResolveTaskSuccess(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskItem(user)
          await taskResolutionModalTestUtils.findContainer()

          await taskResolutionModalTestUtils.setTechResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.setUserResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.clickSubmitButton(user)

          await waitFor(() => {
            expect(requiredProps.closeTaskCard).toBeCalledTimes(1)
          })
        })
      })

      describe('При не успешном запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          const task = taskFixtures.getTask({
            id: requiredProps.taskId,
            status: activeExecuteTaskItemProps.status,
            extendedStatus: activeExecuteTaskItemProps.extendedStatus,
          })
          mockGetTaskSuccess(requiredProps.taskId, { body: task })

          const badRequestResponse: Required<
            ResolveTaskBadRequestErrorResponse['data']
          > = {
            detail: [generateWord()],
            userResolution: [generateWord()],
            techResolution: [generateWord()],
          }

          mockResolveTaskBadRequestError(requiredProps.taskId, {
            body: badRequestResponse,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskItem(user)
          await taskResolutionModalTestUtils.findContainer()

          await taskResolutionModalTestUtils.setTechResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.setUserResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.clickSubmitButton(user)

          expect(
            await findNotification(badRequestResponse.detail[0]),
          ).toBeInTheDocument()

          expect(
            await taskResolutionModalTestUtils.findTechResolutionError(
              badRequestResponse.techResolution[0],
            ),
          ).toBeInTheDocument()

          expect(
            await taskResolutionModalTestUtils.findUserResolutionError(
              badRequestResponse.userResolution[0],
            ),
          ).toBeInTheDocument()
        })

        test('Обрабатывается неизвестная ошибка', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          const task = taskFixtures.getTask({
            id: requiredProps.taskId,
            status: activeExecuteTaskItemProps.status,
            extendedStatus: activeExecuteTaskItemProps.extendedStatus,
          })
          mockGetTaskSuccess(requiredProps.taskId, { body: task })

          mockResolveTaskServerError(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickExecuteTaskItem(user)
          await taskResolutionModalTestUtils.findContainer()

          await taskResolutionModalTestUtils.setTechResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.setUserResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.clickSubmitButton(user)

          expect(
            await findNotification(taskApiMessages.resolve.commonError),
          ).toBeInTheDocument()
        })
      })
    })
  })

  describe('Получение заявки', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
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

          expect(
            await findNotification(commonApiMessages.unknownError),
          ).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
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

          expect(
            await findNotification(commonApiMessages.unknownError),
          ).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
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

          expect(
            await findNotification(commonApiMessages.unknownError),
          ).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
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

          expect(
            await findNotification(commonApiMessages.unknownError),
          ).toBeInTheDocument()
        })
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
        await assigneeBlockTestUtils.clickTakeTaskButton(user)

        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()
        expect(
          queryNotification(commonApiMessages.unknownError),
        ).not.toBeInTheDocument()
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
        await assigneeBlockTestUtils.clickTakeTaskButton(user)

        taskCardTestUtils.expectLoadingNotStarted()
        expect(
          await findNotification(commonApiMessages.unknownError),
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
        await assigneeBlockTestUtils.clickAssignButton(user)
        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()

        expect(
          queryNotification(taskAssigneeApiMessages.update.commonError),
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
        await assigneeBlockTestUtils.clickAssignButton(user)

        taskCardTestUtils.expectLoadingNotStarted()
        expect(
          await findNotification(taskAssigneeApiMessages.update.commonError),
        ).toBeInTheDocument()
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
        await assigneeBlockTestUtils.clickAssignOnMeButton(user)
        await taskCardTestUtils.expectLoadingStarted()
        await taskCardTestUtils.expectLoadingFinished()

        expect(
          queryNotification(taskAssigneeApiMessages.update.commonError),
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
        await assigneeBlockTestUtils.clickAssignOnMeButton(user)

        taskCardTestUtils.expectLoadingNotStarted()
        expect(
          await findNotification(taskAssigneeApiMessages.update.commonError),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Перевод заявки на 1-ю линию', () => {
    describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
      describe('При успешном запросе', () => {
        test('Переданные обработчики вызываются корректно и закрывается модалка', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          mockDeleteTaskWorkGroupSuccess(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await expectLoadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          const modal = await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await expectLoadingFinishedByButton(firstLineButton)

          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })

          expect(requiredProps.closeTaskCard).toBeCalledTimes(1)
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
              userRole: UserRoleEnum.Engineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await expectLoadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await expectLoadingFinishedByButton(firstLineButton)

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
              userRole: UserRoleEnum.Engineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await expectLoadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await expectLoadingFinishedByButton(firstLineButton)

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
              userRole: UserRoleEnum.Engineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await expectLoadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await expectLoadingStartedByButton(firstLineButton)
          await expectLoadingFinishedByButton(firstLineButton)

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
              userRole: UserRoleEnum.Engineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await expectLoadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await expectLoadingStartedByButton(firstLineButton)
          await expectLoadingFinishedByButton(firstLineButton)

          const errorMsg = await findNotification(
            commonApiMessages.unknownError,
          )
          expect(errorMsg).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
      describe('При успешном запросе', () => {
        test('Переданные обработчики вызываются корректно и закрывается модалка', async () => {
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
          await expectLoadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          const modal = await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await expectLoadingFinishedByButton(firstLineButton)

          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })

          expect(requiredProps.closeTaskCard).toBeCalledTimes(1)
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
          await expectLoadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await expectLoadingFinishedByButton(firstLineButton)

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
          await expectLoadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await expectLoadingFinishedByButton(firstLineButton)

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
          await expectLoadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await expectLoadingStartedByButton(firstLineButton)
          await expectLoadingFinishedByButton(firstLineButton)

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
          await expectLoadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await expectLoadingStartedByButton(firstLineButton)
          await expectLoadingFinishedByButton(firstLineButton)

          const errorMsg = await findNotification(
            commonApiMessages.unknownError,
          )
          expect(errorMsg).toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
      describe('При успешном запросе', () => {
        test('Переданные обработчики вызываются корректно и закрывается модалка', async () => {
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
          await expectLoadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          const modal = await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await expectLoadingFinishedByButton(firstLineButton)

          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })

          expect(requiredProps.closeTaskCard).toBeCalledTimes(1)
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
          await expectLoadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await expectLoadingStartedByButton(firstLineButton)
          await expectLoadingFinishedByButton(firstLineButton)

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
          await expectLoadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await expectLoadingStartedByButton(firstLineButton)
          await expectLoadingFinishedByButton(firstLineButton)

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
          await expectLoadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await expectLoadingStartedByButton(firstLineButton)
          await expectLoadingFinishedByButton(firstLineButton)

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
          await expectLoadingFinishedByCard(taskCard)

          const firstLineButton =
            await workGroupBlockTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findContainer()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await expectLoadingStartedByButton(firstLineButton)
          await expectLoadingFinishedByButton(firstLineButton)

          const errorMsg = await findNotification(
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
          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({
              id: requiredProps.taskId,
              workGroup: showSecondLineButtonProps.workGroup,
              status: activeSecondLineButtonProps.status,
              extendedStatus: activeSecondLineButtonProps.extendedStatus,
            }),
          })

          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup], once: false })

          mockUpdateTaskWorkGroupSuccess(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupBlockTestUtils.clickSecondLineButton(user)
          const modal = await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
          await taskSecondLineModalTestUtils.openWorkGroup(user)
          await taskSecondLineModalTestUtils.selectWorkGroup(
            user,
            workGroup.name,
          )
          await taskSecondLineModalTestUtils.clickSubmitButton(user)

          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })

          expect(requiredProps.closeTaskCard).toBeCalledTimes(1)
        })
      })

      describe('При не успешный запросе', () => {
        test('Обрабатывается ошибка 400', async () => {
          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({
              id: requiredProps.taskId,
              workGroup: showSecondLineButtonProps.workGroup,
              status: activeSecondLineButtonProps.status,
              extendedStatus: activeSecondLineButtonProps.extendedStatus,
            }),
          })

          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup], once: false })

          const badRequestResponse: UpdateTaskWorkGroupBadRequestErrorResponse['data'] =
            {
              workGroup: [generateWord()],
            }

          mockUpdateTaskWorkGroupBadRequestError(requiredProps.taskId, {
            body: badRequestResponse,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupBlockTestUtils.clickSecondLineButton(user)
          await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
          await taskSecondLineModalTestUtils.openWorkGroup(user)
          await taskSecondLineModalTestUtils.selectWorkGroup(
            user,
            workGroup.name,
          )
          await taskSecondLineModalTestUtils.clickSubmitButton(user)

          expect(
            await taskSecondLineModalTestUtils.findWorkGroupFieldError(
              badRequestResponse.workGroup![0],
            ),
          ).toBeInTheDocument()

          expect(
            await findNotification(taskWorkGroupApiMessages.update.commonError),
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
          mockGetWorkGroupListSuccess({ body: [workGroup], once: false })

          mockUpdateTaskWorkGroupServerError(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupBlockTestUtils.clickSecondLineButton(user)
          await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
          await taskSecondLineModalTestUtils.openWorkGroup(user)
          await taskSecondLineModalTestUtils.selectWorkGroup(
            user,
            workGroup.name,
          )
          await taskSecondLineModalTestUtils.clickSubmitButton(user)

          expect(
            await findNotification(taskWorkGroupApiMessages.update.commonError),
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
          mockGetWorkGroupListSuccess({ body: [workGroup], once: false })

          mockUpdateTaskWorkGroupForbiddenError(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupBlockTestUtils.clickSecondLineButton(user)
          await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
          await taskSecondLineModalTestUtils.openWorkGroup(user)
          await taskSecondLineModalTestUtils.selectWorkGroup(
            user,
            workGroup.name,
          )
          await taskSecondLineModalTestUtils.clickSubmitButton(user)

          expect(
            await findNotification(commonApiMessages.unknownError),
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

            await cardTitleTestUtils.openMenu(user)
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

            await cardTitleTestUtils.openMenu(user)
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
                suspendRequestApiMessages.create.notFoundError,
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

            await cardTitleTestUtils.openMenu(user)
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
                suspendRequestApiMessages.create.badRequestError,
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

            await cardTitleTestUtils.openMenu(user)
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
              await findNotification(commonApiMessages.unknownError),
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

            await cardTitleTestUtils.openMenu(user)
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

            await cardTitleTestUtils.openMenu(user)
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
                suspendRequestApiMessages.create.notFoundError,
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

            await cardTitleTestUtils.openMenu(user)
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
                suspendRequestApiMessages.create.badRequestError,
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

            await cardTitleTestUtils.openMenu(user)
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
              await findNotification(commonApiMessages.unknownError),
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

            await cardTitleTestUtils.openMenu(user)
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

            await cardTitleTestUtils.openMenu(user)
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
                suspendRequestApiMessages.create.notFoundError,
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

            await cardTitleTestUtils.openMenu(user)
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
                suspendRequestApiMessages.create.badRequestError,
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

            await cardTitleTestUtils.openMenu(user)
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
              await findNotification(commonApiMessages.unknownError),
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

            await cardTitleTestUtils.openMenu(user)
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

            await cardTitleTestUtils.openMenu(user)
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
                suspendRequestApiMessages.create.notFoundError,
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

            await cardTitleTestUtils.openMenu(user)
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
                suspendRequestApiMessages.create.badRequestError,
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

            await cardTitleTestUtils.openMenu(user)
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
              await findNotification(commonApiMessages.unknownError),
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
            await taskSuspendRequestTestUtils.clickCancelButton(user)
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
            await taskSuspendRequestTestUtils.clickCancelButton(user)
            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            expect(
              await findNotification(
                suspendRequestApiMessages.delete.notFoundError,
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
            await taskSuspendRequestTestUtils.clickCancelButton(user)

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
            await taskSuspendRequestTestUtils.clickCancelButton(user)

            expect(
              await findNotification(commonApiMessages.unknownError),
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
            await taskSuspendRequestTestUtils.clickCancelButton(user)
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
            await taskSuspendRequestTestUtils.clickCancelButton(user)
            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            expect(
              await findNotification(
                suspendRequestApiMessages.delete.notFoundError,
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
            await taskSuspendRequestTestUtils.clickCancelButton(user)

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
            await taskSuspendRequestTestUtils.clickCancelButton(user)

            expect(
              await findNotification(commonApiMessages.unknownError),
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
            await taskSuspendRequestTestUtils.clickCancelButton(user)
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
            await taskSuspendRequestTestUtils.clickCancelButton(user)
            await taskCardTestUtils.expectLoadingStarted()
            await taskCardTestUtils.expectLoadingFinished()

            expect(
              await findNotification(
                suspendRequestApiMessages.delete.notFoundError,
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
            await taskSuspendRequestTestUtils.clickCancelButton(user)

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
            await taskSuspendRequestTestUtils.clickCancelButton(user)

            expect(
              await findNotification(commonApiMessages.unknownError),
            ).toBeInTheDocument()
          })
        })
      })
    })

    describe('Вернуть в работу', () => {
      describe('При успешном запросе', () => {
        test('Заявка перезапрашивается с сервера', async () => {
          mockGetWorkGroupListSuccess({ body: [] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({
              id: requiredProps.taskId,
              suspendRequest: taskFixtures.getSuspendRequest({
                status: SuspendRequestStatusEnum.Approved,
              }),
            }),
            once: false,
          })

          mockTakeTaskSuccess(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
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
          mockGetWorkGroupListSuccess({ body: [] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({
              id: requiredProps.taskId,
              suspendRequest: taskFixtures.getSuspendRequest({
                status: SuspendRequestStatusEnum.Approved,
              }),
            }),
          })

          mockTakeTaskServerError(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth(),
          })

          await taskCardTestUtils.expectLoadingStarted()
          await taskCardTestUtils.expectLoadingFinished()
          await taskSuspendRequestTestUtils.findContainer()
          await taskSuspendRequestTestUtils.clickReturnToWorkButton(user)

          expect(
            await findNotification(commonApiMessages.unknownError),
          ).toBeInTheDocument()
        })
      })
    })
  })
})
