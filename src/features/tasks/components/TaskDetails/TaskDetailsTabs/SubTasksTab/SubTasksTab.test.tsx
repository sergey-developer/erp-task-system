import { waitForElementToBeRemoved } from '@testing-library/react'
import {
  getSubTasksErrorMessage,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'features/tasks/api/constants'
import { ReworkSubTaskFormErrors } from 'features/tasks/components/ReworkSubTaskModal/types'

import { cancelSubTaskModalTestUtils } from '_tests_/features/tasks/components/CancelSubTaskModal/testUtils'
import { createSubTaskModalTestUtils } from '_tests_/features/tasks/components/CreateSubTaskModal/testUtils'
import { reworkSubTaskModalTestUtils } from '_tests_/features/tasks/components/ReworkSubTaskModal/testUtils'
import {
  showCancelButtonProps,
  showReworkButtonProps,
} from '_tests_/features/tasks/components/SubTasks/SubTask/constants'
import { subTaskTestUtils } from '_tests_/features/tasks/components/SubTasks/SubTask/testUtils'
import { subTaskListTestUtils } from '_tests_/features/tasks/components/SubTasks/testUtils'
import {
  activeCreateSubTaskButtonTaskProps,
  props,
} from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTabs/SubTasksTab/constants'
import { subTaskListTabTestUtils } from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTabs/SubTasksTab/testUtils'
import { taskStatusTestUtils } from '_tests_/features/tasks/components/TaskStatus/testUtils'
import catalogsFixtures from '_tests_/fixtures/api/data/catalogs'
import supportGroupsFixtures from '_tests_/fixtures/api/data/supportGroups'
import tasksFixtures from '_tests_/fixtures/api/data/tasks'
import userFixtures from '_tests_/fixtures/api/data/users'
import { getStoreWithAuth } from '_tests_/fixtures/store/auth'
import { fakeWord, notificationTestUtils, render, setupApiTests } from '_tests_/helpers'
import {
  mockCancelSubTaskBadRequestError,
  mockCancelSubTaskServerError,
  mockCancelSubTaskSuccess,
  mockCreateSubTaskSuccess,
  mockGetSubTasksServerError,
  mockGetSubTasksSuccess,
  mockGetSubTaskTemplatesSuccess,
  mockGetSupportGroupsSuccess,
  mockReworkSubTaskBadRequestError,
  mockReworkSubTaskServerError,
  mockReworkSubTaskSuccess,
} from '_tests_/mocks/api'

import SubTasksTab from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Вкладка списка заданий заявки', () => {
  describe('Создание задания', () => {
    describe('Кнопка создания задания', () => {
      test('Отображается', () => {
        mockGetSubTasksSuccess(props.task.id)
        render(<SubTasksTab {...props} />)
        expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeInTheDocument()
      })

      test('Активна если условия соблюдены', () => {
        mockGetSubTasksSuccess(props.task.id)

        render(
          <SubTasksTab
            {...props}
            task={{ ...props.task, ...activeCreateSubTaskButtonTaskProps.task }}
            userActions={activeCreateSubTaskButtonTaskProps.userActions}
          />,
        )

        expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeEnabled()
      })

      describe('Не активна если условия соблюдены', () => {
        test('Но у заявки нет прав', () => {
          mockGetSubTasksSuccess(props.task.id)

          render(
            <SubTasksTab
              {...props}
              task={{
                ...props.task,
                ...activeCreateSubTaskButtonTaskProps.task,
              }}
              userActions={userFixtures.userActions()}
            />,
          )

          expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeDisabled()
        })

        test(`Но статус заявки не ${TaskStatusEnum.InProgress}`, () => {
          mockGetSubTasksSuccess(props.task.id)

          render(
            <SubTasksTab
              {...props}
              task={{
                ...props.task,
                ...activeCreateSubTaskButtonTaskProps.task,
                status: TaskStatusEnum.New,
              }}
            />,
          )

          expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeDisabled()
        })

        test(`Но тип заявки не ${TaskTypeEnum.Incident} и не ${TaskTypeEnum.Request}`, () => {
          mockGetSubTasksSuccess(props.task.id)

          render(
            <SubTasksTab
              {...props}
              task={{
                ...props.task,
                ...activeCreateSubTaskButtonTaskProps.task,
                type: TaskTypeEnum.RequestTask,
              }}
            />,
          )

          expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeDisabled()
        })

        test('Но заявка на переклассификации', () => {
          mockGetSubTasksSuccess(props.task.id)

          render(
            <SubTasksTab
              {...props}
              task={{
                ...props.task,
                ...activeCreateSubTaskButtonTaskProps.task,
                extendedStatus: TaskExtendedStatusEnum.InReclassification,
              }}
            />,
          )

          expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeDisabled()
        })

        test('Но у заявки есть запрос на ожидание', () => {
          mockGetSubTasksSuccess(props.task.id)

          render(
            <SubTasksTab
              {...props}
              task={{
                ...props.task,
                ...activeCreateSubTaskButtonTaskProps.task,
                suspendRequest: tasksFixtures.taskSuspendRequest(),
              }}
            />,
          )

          expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeDisabled()
        })
      })

      test('При нажатии открывает модалку создания задания', async () => {
        mockGetSubTasksSuccess(props.task.id)
        mockGetSupportGroupsSuccess()
        mockGetSubTaskTemplatesSuccess()

        const { user } = render(
          <SubTasksTab
            {...props}
            task={{
              ...props.task,
              ...activeCreateSubTaskButtonTaskProps.task,
            }}
            userActions={activeCreateSubTaskButtonTaskProps.userActions}
          />,
        )

        await subTaskListTabTestUtils.openCreateSubTaskModal(user)
        expect(await createSubTaskModalTestUtils.findContainer()).toBeInTheDocument()
      })
    })

    describe('Модалка создания задания', () => {
      describe('При успешном запросе', () => {
        test('Модалка создания закрывается', async () => {
          mockGetSubTasksSuccess(props.task.id)

          const fakeSupportGroupListItem = supportGroupsFixtures.supportGroup()
          mockGetSupportGroupsSuccess({ body: [fakeSupportGroupListItem] })

          const templateListItem = catalogsFixtures.subTaskTemplateCatalogItem()
          mockGetSubTaskTemplatesSuccess({ body: [templateListItem] })

          mockCreateSubTaskSuccess(props.task.id)

          const { user } = render(
            <SubTasksTab
              {...props}
              task={{
                ...props.task,
                ...activeCreateSubTaskButtonTaskProps.task,
              }}
              userActions={activeCreateSubTaskButtonTaskProps.userActions}
            />,
          )

          await subTaskListTabTestUtils.openCreateSubTaskModal(user)
          const modal = await createSubTaskModalTestUtils.findContainer()

          await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
          await createSubTaskModalTestUtils.setFormValues(user, {
            title: fakeWord(),
            description: fakeWord(),
            templateX5: templateListItem.title,
            supportGroup: fakeSupportGroupListItem.name,
          })
          await createSubTaskModalTestUtils.clickSubmitButton(user)

          await waitForElementToBeRemoved(modal)
        })

        test('В список добавляется новое задание', async () => {
          const subTaskList = tasksFixtures.subTaskList()
          mockGetSubTasksSuccess(props.task.id, { body: subTaskList })

          const fakeSupportGroupListItem = supportGroupsFixtures.supportGroup()
          mockGetSupportGroupsSuccess({ body: [fakeSupportGroupListItem] })

          const templateListItem = catalogsFixtures.subTaskTemplateCatalogItem()
          mockGetSubTaskTemplatesSuccess({ body: [templateListItem] })

          mockCreateSubTaskSuccess(props.task.id, { body: tasksFixtures.subTask() })

          const { user } = render(
            <SubTasksTab
              {...props}
              task={{
                ...props.task,
                ...activeCreateSubTaskButtonTaskProps.task,
              }}
              userActions={activeCreateSubTaskButtonTaskProps.userActions}
            />,
          )

          await subTaskListTabTestUtils.openCreateSubTaskModal(user)
          const modal = await createSubTaskModalTestUtils.findContainer()
          await createSubTaskModalTestUtils.supportGroup.expectLoadingFinished()
          await createSubTaskModalTestUtils.setFormValues(user, {
            title: fakeWord(),
            description: fakeWord(),
            templateX5: templateListItem.title,
            supportGroup: fakeSupportGroupListItem.name,
          })
          await createSubTaskModalTestUtils.clickSubmitButton(user)
          await waitForElementToBeRemoved(modal)

          expect(
            subTaskTestUtils.getAllContainerIn(subTaskListTestUtils.getContainer()),
          ).toHaveLength(subTaskList.length + 1)
        })
      })
    })
  })

  describe('Список заданий', () => {
    test('Отображается', async () => {
      mockGetSubTasksSuccess(props.task.id, {
        body: tasksFixtures.subTaskList(),
      })

      render(<SubTasksTab {...props} />, {
        store: getStoreWithAuth(),
      })

      await subTaskListTabTestUtils.expectLoadingFinished()
      expect(subTaskListTestUtils.getContainer()).toBeInTheDocument()
    })

    describe('При успешном получении', () => {
      test('Отображает верное количество заданий', async () => {
        const subTaskList = tasksFixtures.subTaskList()
        mockGetSubTasksSuccess(props.task.id, { body: subTaskList })

        render(
          <SubTasksTab
            {...props}
            task={{
              ...props.task,
              ...activeCreateSubTaskButtonTaskProps.task,
            }}
          />,
          { store: getStoreWithAuth() },
        )

        await subTaskListTabTestUtils.expectLoadingFinished()

        expect(
          subTaskTestUtils.getAllContainerIn(subTaskListTestUtils.getContainer()),
        ).toHaveLength(subTaskList.length)
      })
    })

    describe('При не успешном получении', () => {
      test('Отображается соответствующая ошибка вместо списка', async () => {
        mockGetSubTasksServerError(props.task.id)

        render(
          <SubTasksTab
            {...props}
            task={{
              ...props.task,
              ...activeCreateSubTaskButtonTaskProps.task,
            }}
          />,
          {
            store: getStoreWithAuth(),
          },
        )

        await subTaskListTabTestUtils.expectLoadingFinished()

        expect(
          subTaskListTestUtils.getChildByText('Не удалось получить задания'),
        ).toBeInTheDocument()
      })

      test('Отображается соответствующее уведомление', async () => {
        mockGetSubTasksServerError(props.task.id)

        render(
          <SubTasksTab
            {...props}
            task={{
              ...props.task,
              ...activeCreateSubTaskButtonTaskProps.task,
            }}
          />,
          {
            store: getStoreWithAuth(),
          },
        )

        await subTaskListTabTestUtils.expectLoadingFinished()

        expect(
          await notificationTestUtils.findNotification(getSubTasksErrorMessage),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Модалка отправки задания на доработку', () => {
    test('Открывается', async () => {
      const subTask = tasksFixtures.subTask({
        status: showReworkButtonProps.status,
      })
      mockGetSubTasksSuccess(props.task.id, { body: [subTask] })

      const { user } = render(
        <SubTasksTab
          {...props}
          task={{
            ...props.task,
            status: showReworkButtonProps.taskStatus,
          }}
        />,
        {
          store: getStoreWithAuth(props.task.assignee!),
        },
      )

      await subTaskListTabTestUtils.expectLoadingFinished()
      await subTaskTestUtils.clickReworkButton(user)
      await reworkSubTaskModalTestUtils.findContainer()
    })

    test('Закрывается', async () => {
      const subTask = tasksFixtures.subTask({
        status: showReworkButtonProps.status,
      })
      mockGetSubTasksSuccess(props.task.id, { body: [subTask] })

      const { user } = render(
        <SubTasksTab
          {...props}
          task={{
            ...props.task,
            status: showReworkButtonProps.taskStatus,
          }}
        />,
        {
          store: getStoreWithAuth(props.task.assignee!),
        },
      )

      await subTaskListTabTestUtils.expectLoadingFinished()
      await subTaskTestUtils.clickReworkButton(user)
      const modal = await reworkSubTaskModalTestUtils.findContainer()
      await reworkSubTaskModalTestUtils.clickCancelButton(user)

      await waitForElementToBeRemoved(modal)
    })

    test('Отображает состояние загрузки', async () => {
      const subTask = tasksFixtures.subTask({
        status: showReworkButtonProps.status,
      })
      mockGetSubTasksSuccess(props.task.id, { body: [subTask] })
      mockReworkSubTaskSuccess(subTask.id)

      const { user } = render(
        <SubTasksTab
          {...props}
          task={{
            ...props.task,
            status: showReworkButtonProps.taskStatus,
          }}
        />,
        {
          store: getStoreWithAuth(props.task.assignee!),
        },
      )

      await subTaskListTabTestUtils.expectLoadingFinished()
      await subTaskTestUtils.clickReworkButton(user)
      await reworkSubTaskModalTestUtils.findContainer()
      await reworkSubTaskModalTestUtils.setReturnReason(user, fakeWord())
      await reworkSubTaskModalTestUtils.clickSubmitButton(user)
      await reworkSubTaskModalTestUtils.expectLoadingStarted()
    })

    describe('При успешной отправке данных', () => {
      test('Модалка закрывается', async () => {
        const subTask = tasksFixtures.subTask({
          status: showReworkButtonProps.status,
        })
        mockGetSubTasksSuccess(props.task.id, { body: [subTask] })
        mockReworkSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTasksTab
            {...props}
            task={{
              ...props.task,
              status: showReworkButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              id: props.task.assignee!.id,
            }),
          },
        )

        await subTaskListTabTestUtils.expectLoadingFinished()
        await subTaskTestUtils.clickReworkButton(user)
        const modal = await reworkSubTaskModalTestUtils.findContainer()
        await reworkSubTaskModalTestUtils.setReturnReason(user, fakeWord())
        await reworkSubTaskModalTestUtils.clickSubmitButton(user)

        await waitForElementToBeRemoved(modal)
      })

      test('Статус задачи меняется на "В процессе"', async () => {
        const subTask = tasksFixtures.subTask({
          status: showReworkButtonProps.status,
        })
        mockGetSubTasksSuccess(props.task.id, { body: [subTask] })
        mockReworkSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTasksTab
            {...props}
            task={{
              ...props.task,
              status: showReworkButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              id: props.task.assignee!.id,
            }),
          },
        )

        await subTaskListTabTestUtils.expectLoadingFinished()

        expect(
          taskStatusTestUtils.getContainerIn(
            subTaskTestUtils.getContainer(),
            showReworkButtonProps.status,
          ),
        ).toBeInTheDocument()

        await subTaskTestUtils.clickReworkButton(user)
        const modal = await reworkSubTaskModalTestUtils.findContainer()
        await reworkSubTaskModalTestUtils.setReturnReason(user, fakeWord())
        await reworkSubTaskModalTestUtils.clickSubmitButton(user)

        await waitForElementToBeRemoved(modal)

        expect(
          taskStatusTestUtils.getContainerIn(
            subTaskTestUtils.getContainer(),
            TaskStatusEnum.InProgress,
          ),
        ).toBeInTheDocument()
      })

      test('Кнопка отправки на доработку не отображается', async () => {
        const subTask = tasksFixtures.subTask({
          status: showReworkButtonProps.status,
        })
        mockGetSubTasksSuccess(props.task.id, { body: [subTask] })
        mockReworkSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTasksTab
            {...props}
            task={{
              ...props.task,
              status: showReworkButtonProps.taskStatus,
              extendedStatus: showReworkButtonProps.taskExtendedStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              id: props.task.assignee!.id,
            }),
          },
        )

        await subTaskListTabTestUtils.expectLoadingFinished()
        const reworkButton = await subTaskTestUtils.clickReworkButton(user)
        const modal = await reworkSubTaskModalTestUtils.findContainer()
        await reworkSubTaskModalTestUtils.setReturnReason(user, fakeWord())
        await reworkSubTaskModalTestUtils.clickSubmitButton(user)

        await waitForElementToBeRemoved(modal)
        expect(reworkButton).not.toBeInTheDocument()
      })
    })

    describe('При не успешной отправке данных', () => {
      test('Обрабатывается ошибка 400', async () => {
        const subTask = tasksFixtures.subTask({
          status: showReworkButtonProps.status,
        })
        mockGetSubTasksSuccess(props.task.id, { body: [subTask] })

        const badRequestResponse: Required<ReworkSubTaskFormErrors> = {
          returnReason: [fakeWord()],
        }
        mockReworkSubTaskBadRequestError(subTask.id, {
          body: badRequestResponse,
        })

        const { user } = render(
          <SubTasksTab
            {...props}
            task={{
              ...props.task,
              status: showReworkButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              id: props.task.assignee!.id,
            }),
          },
        )

        await subTaskListTabTestUtils.expectLoadingFinished()
        await subTaskTestUtils.clickReworkButton(user)
        await reworkSubTaskModalTestUtils.findContainer()
        await reworkSubTaskModalTestUtils.setReturnReason(user, fakeWord())
        await reworkSubTaskModalTestUtils.clickSubmitButton(user)

        expect(
          await reworkSubTaskModalTestUtils.findReturnReasonFieldError(
            badRequestResponse.returnReason[0],
          ),
        ).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        const subTask = tasksFixtures.subTask({
          status: showReworkButtonProps.status,
        })
        mockGetSubTasksSuccess(props.task.id, { body: [subTask] })
        mockReworkSubTaskServerError(subTask.id)

        const { user } = render(
          <SubTasksTab
            {...props}
            task={{
              ...props.task,
              status: showReworkButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              id: props.task.assignee!.id,
            }),
          },
        )

        await subTaskListTabTestUtils.expectLoadingFinished()
        await subTaskTestUtils.clickReworkButton(user)
        await reworkSubTaskModalTestUtils.findContainer()
        await reworkSubTaskModalTestUtils.setReturnReason(user, fakeWord())
        await reworkSubTaskModalTestUtils.clickSubmitButton(user)

        expect(
          await notificationTestUtils.findNotification('Не удалось вернуть задание на доработку'),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Модалка отмены задания', () => {
    test('Открывается', async () => {
      const subTask = tasksFixtures.subTask({
        status: showCancelButtonProps.status,
      })
      mockGetSubTasksSuccess(props.task.id, { body: [subTask] })

      const { user } = render(
        <SubTasksTab
          {...props}
          task={{
            ...props.task,
            status: showCancelButtonProps.taskStatus,
          }}
        />,
        {
          store: getStoreWithAuth(props.task.assignee!),
        },
      )

      await subTaskListTabTestUtils.expectLoadingFinished()
      await subTaskTestUtils.clickCancelButton(user)
      await cancelSubTaskModalTestUtils.findContainer()
    })

    test('Закрывается', async () => {
      const subTask = tasksFixtures.subTask({
        status: showCancelButtonProps.status,
      })
      mockGetSubTasksSuccess(props.task.id, { body: [subTask] })

      const { user } = render(
        <SubTasksTab
          {...props}
          task={{
            ...props.task,
            status: showCancelButtonProps.taskStatus,
          }}
        />,
        {
          store: getStoreWithAuth(props.task.assignee!),
        },
      )

      await subTaskListTabTestUtils.expectLoadingFinished()
      await subTaskTestUtils.clickCancelButton(user)
      const modal = await cancelSubTaskModalTestUtils.findContainer()
      await cancelSubTaskModalTestUtils.clickCancelButton(user)

      await waitForElementToBeRemoved(modal)
    })

    test('Отображает состояние загрузки', async () => {
      const subTask = tasksFixtures.subTask({
        status: showCancelButtonProps.status,
      })
      mockGetSubTasksSuccess(props.task.id, { body: [subTask] })
      mockCancelSubTaskSuccess(subTask.id)

      const { user } = render(
        <SubTasksTab
          {...props}
          task={{
            ...props.task,
            status: showCancelButtonProps.taskStatus,
          }}
        />,
        {
          store: getStoreWithAuth(props.task.assignee!),
        },
      )

      await subTaskListTabTestUtils.expectLoadingFinished()
      await subTaskTestUtils.clickCancelButton(user)
      await cancelSubTaskModalTestUtils.findContainer()
      await cancelSubTaskModalTestUtils.setCancelReason(user, fakeWord())
      await cancelSubTaskModalTestUtils.clickSubmitButton(user)
      await cancelSubTaskModalTestUtils.expectLoadingStarted()
    })

    describe('При успешной отправке данных', () => {
      test('Модалка закрывается', async () => {
        const subTask = tasksFixtures.subTask({
          status: showCancelButtonProps.status,
        })
        mockGetSubTasksSuccess(props.task.id, { body: [subTask] })
        mockCancelSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTasksTab
            {...props}
            task={{
              ...props.task,
              status: showCancelButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              id: props.task.assignee!.id,
            }),
          },
        )

        await subTaskListTabTestUtils.expectLoadingFinished()
        await subTaskTestUtils.clickCancelButton(user)
        const modal = await cancelSubTaskModalTestUtils.findContainer()
        await cancelSubTaskModalTestUtils.setCancelReason(user, fakeWord())
        await cancelSubTaskModalTestUtils.clickSubmitButton(user)

        await waitForElementToBeRemoved(modal)
      })

      test('Статус задачи меняется на "Закрыта"', async () => {
        const subTask = tasksFixtures.subTask({
          status: showCancelButtonProps.status,
        })
        mockGetSubTasksSuccess(props.task.id, { body: [subTask] })
        mockCancelSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTasksTab
            {...props}
            task={{
              ...props.task,
              status: showCancelButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              id: props.task.assignee!.id,
            }),
          },
        )

        await subTaskListTabTestUtils.expectLoadingFinished()

        expect(
          taskStatusTestUtils.getContainerIn(
            subTaskTestUtils.getContainer(),
            showCancelButtonProps.status,
          ),
        ).toBeInTheDocument()

        await subTaskTestUtils.clickCancelButton(user)
        const modal = await cancelSubTaskModalTestUtils.findContainer()
        await cancelSubTaskModalTestUtils.setCancelReason(user, fakeWord())
        await cancelSubTaskModalTestUtils.clickSubmitButton(user)

        await waitForElementToBeRemoved(modal)

        expect(
          taskStatusTestUtils.getContainerIn(
            subTaskTestUtils.getContainer(),
            TaskStatusEnum.Closed,
          ),
        ).toBeInTheDocument()
      })

      test('Кнопка отмены не отображается', async () => {
        const subTask = tasksFixtures.subTask({
          status: showCancelButtonProps.status,
        })
        mockGetSubTasksSuccess(props.task.id, { body: [subTask] })
        mockCancelSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTasksTab
            {...props}
            task={{
              ...props.task,
              status: showCancelButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              id: props.task.assignee!.id,
            }),
          },
        )

        await subTaskListTabTestUtils.expectLoadingFinished()
        const cancelButton = await subTaskTestUtils.clickCancelButton(user)
        const modal = await cancelSubTaskModalTestUtils.findContainer()
        await cancelSubTaskModalTestUtils.setCancelReason(user, fakeWord())
        await cancelSubTaskModalTestUtils.clickSubmitButton(user)

        await waitForElementToBeRemoved(modal)
        expect(cancelButton).not.toBeInTheDocument()
      })
    })

    describe('При не успешной отправке данных', () => {
      test('Обрабатывается ошибка 400', async () => {
        const subTask = tasksFixtures.subTask({
          status: showCancelButtonProps.status,
        })
        mockGetSubTasksSuccess(props.task.id, { body: [subTask] })

        const cancelReasonError = fakeWord()
        mockCancelSubTaskBadRequestError(subTask.id, {
          body: { cancelReason: [cancelReasonError] },
        })

        const { user } = render(
          <SubTasksTab
            {...props}
            task={{
              ...props.task,
              status: showCancelButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              id: props.task.assignee!.id,
            }),
          },
        )

        await subTaskListTabTestUtils.expectLoadingFinished()
        await subTaskTestUtils.clickCancelButton(user)
        await cancelSubTaskModalTestUtils.findContainer()
        await cancelSubTaskModalTestUtils.setCancelReason(user, fakeWord())
        await cancelSubTaskModalTestUtils.clickSubmitButton(user)

        const notification = await cancelSubTaskModalTestUtils.findCancelReasonFieldError(
          cancelReasonError,
        )

        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        const subTask = tasksFixtures.subTask({
          status: showCancelButtonProps.status,
        })
        mockGetSubTasksSuccess(props.task.id, { body: [subTask] })
        mockCancelSubTaskServerError(subTask.id)

        const { user } = render(
          <SubTasksTab
            {...props}
            task={{
              ...props.task,
              status: showCancelButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              id: props.task.assignee!.id,
            }),
          },
        )

        await subTaskListTabTestUtils.expectLoadingFinished()
        await subTaskTestUtils.clickCancelButton(user)
        await cancelSubTaskModalTestUtils.findContainer()
        await cancelSubTaskModalTestUtils.setCancelReason(user, fakeWord())
        await cancelSubTaskModalTestUtils.clickSubmitButton(user)

        expect(
          await notificationTestUtils.findNotification('Не удалось отменить задание'),
        ).toBeInTheDocument()
      })
    })
  })
})
