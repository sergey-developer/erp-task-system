import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as createSubTaskModalTestUtils } from 'modules/task/components/CreateSubTaskModal/CreateSubTaskModal.test'
import { testUtils as reworkSubTaskModalTestUtils } from 'modules/task/components/ReworkSubTaskModal/ReworkSubTaskModal.test'
import { ReworkSubTaskFormErrors } from 'modules/task/components/ReworkSubTaskModal/types'
import {
  showCancelButtonProps,
  showReworkButtonProps,
  testUtils as subTaskTestUtils,
} from 'modules/task/components/SubTaskList/SubTask.test'
import { testUtils as subTaskListTestUtils } from 'modules/task/components/SubTaskList/SubTaskList.test'
import { testUtils as taskStatusTestUtils } from 'modules/task/components/TaskStatus/TaskStatus.test'
import {
  getSubTasksErrMsg,
  TaskActionsPermissionsEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/task'

import { cancelSubTaskModalTestUtils } from '_tests_/features/tasks/CancelSubTaskModal/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import supportGroupFixtures from '_tests_/fixtures/supportGroup'
import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import {
  mockCancelSubTaskBadRequestError,
  mockCancelSubTaskServerError,
  mockCancelSubTaskSuccess,
  mockCreateSubTaskSuccess,
  mockGetSubTaskListServerError,
  mockGetSubTaskListSuccess,
  mockGetSubTaskTemplateListSuccess,
  mockGetSupportGroupListSuccess,
  mockReworkSubTaskBadRequestError,
  mockReworkSubTaskServerError,
  mockReworkSubTaskSuccess,
} from '_tests_/mocks/api'
import {
  buttonTestUtils,
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  setupApiTests,
  spinnerTestUtils,
} from '_tests_/utils'

import SubTaskListTab, { SubTaskListTabProps } from './index'

const props: Readonly<SubTaskListTabProps> = {
  task: taskFixtures.task(),
  userActions: userFixtures.userActions(),
  permissions: {},
}

const activeCreateSubTaskButtonTaskProps: {
  task: Pick<SubTaskListTabProps['task'], 'status' | 'extendedStatus' | 'type' | 'suspendRequest'>
  userActions: SubTaskListTabProps['userActions']
} = {
  task: {
    status: TaskStatusEnum.InProgress,
    extendedStatus: TaskExtendedStatusEnum.New,
    type: TaskTypeEnum.Request,
    suspendRequest: null,
  },
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanSubtasksCreate]: [props.task.id],
    },
  }),
}

const getContainer = () => screen.getByTestId('subtask-list-tab')

const getCreateSubTaskButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /создать новое задание/i)

const clickCreateSubTaskButton = async (user: UserEvent) => {
  const button = getCreateSubTaskButton()
  await user.click(button)
  return button
}

const testUtils = {
  getContainer,

  getCreateSubTaskButton,
  openCreateSubTaskModal: clickCreateSubTaskButton,

  expectLoadingFinished: spinnerTestUtils.expectLoadingFinished('sub-task-list-loading'),
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Вкладка списка заданий заявки', () => {
  describe('Создание задания', () => {
    describe('Кнопка создания задания', () => {
      test('Отображается', () => {
        mockGetSubTaskListSuccess(props.task.id)
        render(<SubTaskListTab {...props} />)
        expect(testUtils.getCreateSubTaskButton()).toBeInTheDocument()
      })

      test('Активна если условия соблюдены', () => {
        mockGetSubTaskListSuccess(props.task.id)

        render(
          <SubTaskListTab
            {...props}
            task={{ ...props.task, ...activeCreateSubTaskButtonTaskProps.task }}
            userActions={activeCreateSubTaskButtonTaskProps.userActions}
          />,
        )

        expect(testUtils.getCreateSubTaskButton()).toBeEnabled()
      })

      describe('Не активна если условия соблюдены', () => {
        test('Но у заявки нет прав', () => {
          mockGetSubTaskListSuccess(props.task.id)

          render(
            <SubTaskListTab
              {...props}
              task={{
                ...props.task,
                ...activeCreateSubTaskButtonTaskProps.task,
              }}
              userActions={userFixtures.userActions()}
            />,
          )

          expect(testUtils.getCreateSubTaskButton()).toBeDisabled()
        })

        test(`Но статус заявки не ${TaskStatusEnum.InProgress}`, () => {
          mockGetSubTaskListSuccess(props.task.id)

          render(
            <SubTaskListTab
              {...props}
              task={{
                ...props.task,
                ...activeCreateSubTaskButtonTaskProps.task,
                status: TaskStatusEnum.New,
              }}
            />,
          )

          expect(testUtils.getCreateSubTaskButton()).toBeDisabled()
        })

        test(`Но тип заявки не ${TaskTypeEnum.Incident} и не ${TaskTypeEnum.Request}`, () => {
          mockGetSubTaskListSuccess(props.task.id)

          render(
            <SubTaskListTab
              {...props}
              task={{
                ...props.task,
                ...activeCreateSubTaskButtonTaskProps.task,
                type: TaskTypeEnum.RequestTask,
              }}
            />,
          )

          expect(testUtils.getCreateSubTaskButton()).toBeDisabled()
        })

        test('Но заявка на переклассификации', () => {
          mockGetSubTaskListSuccess(props.task.id)

          render(
            <SubTaskListTab
              {...props}
              task={{
                ...props.task,
                ...activeCreateSubTaskButtonTaskProps.task,
                extendedStatus: TaskExtendedStatusEnum.InReclassification,
              }}
            />,
          )

          expect(testUtils.getCreateSubTaskButton()).toBeDisabled()
        })

        test('Но у заявки есть запрос на ожидание', () => {
          mockGetSubTaskListSuccess(props.task.id)

          render(
            <SubTaskListTab
              {...props}
              task={{
                ...props.task,
                ...activeCreateSubTaskButtonTaskProps.task,
                suspendRequest: taskFixtures.suspendRequest(),
              }}
            />,
          )

          expect(testUtils.getCreateSubTaskButton()).toBeDisabled()
        })
      })

      test('При нажатии открывает модалку создания задания', async () => {
        mockGetSubTaskListSuccess(props.task.id)
        mockGetSupportGroupListSuccess()
        mockGetSubTaskTemplateListSuccess()

        const { user } = render(
          <SubTaskListTab
            {...props}
            task={{
              ...props.task,
              ...activeCreateSubTaskButtonTaskProps.task,
            }}
            userActions={activeCreateSubTaskButtonTaskProps.userActions}
          />,
        )

        await testUtils.openCreateSubTaskModal(user)
        expect(await createSubTaskModalTestUtils.findContainer()).toBeInTheDocument()
      })
    })

    describe('Модалка создания задания', () => {
      describe('При успешном запросе', () => {
        test('Модалка создания закрывается', async () => {
          mockGetSubTaskListSuccess(props.task.id)

          const fakeSupportGroupListItem = supportGroupFixtures.supportGroupListItem()
          mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

          const templateListItem = catalogsFixtures.subTaskTemplate()
          mockGetSubTaskTemplateListSuccess({ body: [templateListItem] })

          mockCreateSubTaskSuccess(props.task.id)

          const { user } = render(
            <SubTaskListTab
              {...props}
              task={{
                ...props.task,
                ...activeCreateSubTaskButtonTaskProps.task,
              }}
              userActions={activeCreateSubTaskButtonTaskProps.userActions}
            />,
          )

          await testUtils.openCreateSubTaskModal(user)
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
          const subTaskList = taskFixtures.subTaskList()
          mockGetSubTaskListSuccess(props.task.id, { body: subTaskList })

          const fakeSupportGroupListItem = supportGroupFixtures.supportGroupListItem()
          mockGetSupportGroupListSuccess({ body: [fakeSupportGroupListItem] })

          const templateListItem = catalogsFixtures.subTaskTemplate()
          mockGetSubTaskTemplateListSuccess({ body: [templateListItem] })

          mockCreateSubTaskSuccess(props.task.id, { body: taskFixtures.subTask() })

          const { user } = render(
            <SubTaskListTab
              {...props}
              task={{
                ...props.task,
                ...activeCreateSubTaskButtonTaskProps.task,
              }}
              userActions={activeCreateSubTaskButtonTaskProps.userActions}
            />,
          )

          await testUtils.openCreateSubTaskModal(user)
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
      mockGetSubTaskListSuccess(props.task.id, {
        body: taskFixtures.subTaskList(),
      })

      render(<SubTaskListTab {...props} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.expectLoadingFinished()
      expect(subTaskListTestUtils.getContainer()).toBeInTheDocument()
    })

    describe('При успешном получении', () => {
      test('Отображает верное количество заданий', async () => {
        const subTaskList = taskFixtures.subTaskList()
        mockGetSubTaskListSuccess(props.task.id, { body: subTaskList })

        render(
          <SubTaskListTab
            {...props}
            task={{
              ...props.task,
              ...activeCreateSubTaskButtonTaskProps.task,
            }}
          />,
          { store: getStoreWithAuth() },
        )

        await testUtils.expectLoadingFinished()

        expect(
          subTaskTestUtils.getAllContainerIn(subTaskListTestUtils.getContainer()),
        ).toHaveLength(subTaskList.length)
      })
    })

    describe('При не успешном получении', () => {
      test('Отображается соответствующая ошибка вместо списка', async () => {
        mockGetSubTaskListServerError(props.task.id)

        render(
          <SubTaskListTab
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

        await testUtils.expectLoadingFinished()

        expect(
          subTaskListTestUtils.getChildByText('Не удалось получить задания'),
        ).toBeInTheDocument()
      })

      test('Отображается соответствующее уведомление', async () => {
        mockGetSubTaskListServerError(props.task.id)

        render(
          <SubTaskListTab
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

        await testUtils.expectLoadingFinished()

        expect(await notificationTestUtils.findNotification(getSubTasksErrMsg)).toBeInTheDocument()
      })
    })
  })

  describe('Модалка отправки задания на доработку', () => {
    test('Открывается', async () => {
      const subTask = taskFixtures.subTask({
        status: showReworkButtonProps.status,
      })
      mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })

      const { user } = render(
        <SubTaskListTab
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

      await testUtils.expectLoadingFinished()
      await subTaskTestUtils.clickReworkButton(user)
      await reworkSubTaskModalTestUtils.findContainer()
    })

    test('Закрывается', async () => {
      const subTask = taskFixtures.subTask({
        status: showReworkButtonProps.status,
      })
      mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })

      const { user } = render(
        <SubTaskListTab
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

      await testUtils.expectLoadingFinished()
      await subTaskTestUtils.clickReworkButton(user)
      const modal = await reworkSubTaskModalTestUtils.findContainer()
      await reworkSubTaskModalTestUtils.clickCancelButton(user)

      await waitForElementToBeRemoved(modal)
    })

    test('Отображает состояние загрузки', async () => {
      const subTask = taskFixtures.subTask({
        status: showReworkButtonProps.status,
      })
      mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })
      mockReworkSubTaskSuccess(subTask.id)

      const { user } = render(
        <SubTaskListTab
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

      await testUtils.expectLoadingFinished()
      await subTaskTestUtils.clickReworkButton(user)
      await reworkSubTaskModalTestUtils.findContainer()
      await reworkSubTaskModalTestUtils.setReturnReason(user, fakeWord())
      await reworkSubTaskModalTestUtils.clickSubmitButton(user)
      await reworkSubTaskModalTestUtils.expectLoadingStarted()
    })

    describe('При успешной отправке данных', () => {
      test('Модалка закрывается', async () => {
        const subTask = taskFixtures.subTask({
          status: showReworkButtonProps.status,
        })
        mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })
        mockReworkSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTaskListTab
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

        await testUtils.expectLoadingFinished()
        await subTaskTestUtils.clickReworkButton(user)
        const modal = await reworkSubTaskModalTestUtils.findContainer()
        await reworkSubTaskModalTestUtils.setReturnReason(user, fakeWord())
        await reworkSubTaskModalTestUtils.clickSubmitButton(user)

        await waitForElementToBeRemoved(modal)
      })

      test('Статус задачи меняется на "В процессе"', async () => {
        const subTask = taskFixtures.subTask({
          status: showReworkButtonProps.status,
        })
        mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })
        mockReworkSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTaskListTab
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

        await testUtils.expectLoadingFinished()

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
        const subTask = taskFixtures.subTask({
          status: showReworkButtonProps.status,
        })
        mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })
        mockReworkSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTaskListTab
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

        await testUtils.expectLoadingFinished()
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
        const subTask = taskFixtures.subTask({
          status: showReworkButtonProps.status,
        })
        mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })

        const badRequestResponse: Required<ReworkSubTaskFormErrors> = {
          returnReason: [fakeWord()],
        }
        mockReworkSubTaskBadRequestError(subTask.id, {
          body: badRequestResponse,
        })

        const { user } = render(
          <SubTaskListTab
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

        await testUtils.expectLoadingFinished()
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
        const subTask = taskFixtures.subTask({
          status: showReworkButtonProps.status,
        })
        mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })
        mockReworkSubTaskServerError(subTask.id)

        const { user } = render(
          <SubTaskListTab
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

        await testUtils.expectLoadingFinished()
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
      const subTask = taskFixtures.subTask({
        status: showCancelButtonProps.status,
      })
      mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })

      const { user } = render(
        <SubTaskListTab
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

      await testUtils.expectLoadingFinished()
      await subTaskTestUtils.clickCancelButton(user)
      await cancelSubTaskModalTestUtils.findContainer()
    })

    test('Закрывается', async () => {
      const subTask = taskFixtures.subTask({
        status: showCancelButtonProps.status,
      })
      mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })

      const { user } = render(
        <SubTaskListTab
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

      await testUtils.expectLoadingFinished()
      await subTaskTestUtils.clickCancelButton(user)
      const modal = await cancelSubTaskModalTestUtils.findContainer()
      await cancelSubTaskModalTestUtils.clickCancelButton(user)

      await waitForElementToBeRemoved(modal)
    })

    test('Отображает состояние загрузки', async () => {
      const subTask = taskFixtures.subTask({
        status: showCancelButtonProps.status,
      })
      mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })
      mockCancelSubTaskSuccess(subTask.id)

      const { user } = render(
        <SubTaskListTab
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

      await testUtils.expectLoadingFinished()
      await subTaskTestUtils.clickCancelButton(user)
      await cancelSubTaskModalTestUtils.findContainer()
      await cancelSubTaskModalTestUtils.setCancelReason(user, fakeWord())
      await cancelSubTaskModalTestUtils.clickSubmitButton(user)
      await cancelSubTaskModalTestUtils.expectLoadingStarted()
    })

    describe('При успешной отправке данных', () => {
      test('Модалка закрывается', async () => {
        const subTask = taskFixtures.subTask({
          status: showCancelButtonProps.status,
        })
        mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })
        mockCancelSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTaskListTab
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

        await testUtils.expectLoadingFinished()
        await subTaskTestUtils.clickCancelButton(user)
        const modal = await cancelSubTaskModalTestUtils.findContainer()
        await cancelSubTaskModalTestUtils.setCancelReason(user, fakeWord())
        await cancelSubTaskModalTestUtils.clickSubmitButton(user)

        await waitForElementToBeRemoved(modal)
      })

      test('Статус задачи меняется на "Закрыта"', async () => {
        const subTask = taskFixtures.subTask({
          status: showCancelButtonProps.status,
        })
        mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })
        mockCancelSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTaskListTab
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

        await testUtils.expectLoadingFinished()

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
        const subTask = taskFixtures.subTask({
          status: showCancelButtonProps.status,
        })
        mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })
        mockCancelSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTaskListTab
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

        await testUtils.expectLoadingFinished()
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
        const subTask = taskFixtures.subTask({
          status: showCancelButtonProps.status,
        })
        mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })

        const cancelReasonError = fakeWord()
        mockCancelSubTaskBadRequestError(subTask.id, {
          body: { cancelReason: [cancelReasonError] },
        })

        const { user } = render(
          <SubTaskListTab
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

        await testUtils.expectLoadingFinished()
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
        const subTask = taskFixtures.subTask({
          status: showCancelButtonProps.status,
        })
        mockGetSubTaskListSuccess(props.task.id, { body: [subTask] })
        mockCancelSubTaskServerError(subTask.id)

        const { user } = render(
          <SubTaskListTab
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

        await testUtils.expectLoadingFinished()
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
