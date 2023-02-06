import {
  mockCancelSubTaskBadRequestError,
  mockCancelSubTaskServerError,
  mockCancelSubTaskSuccess,
  mockCreateSubTaskBadRequestError,
  mockCreateSubTaskServerError,
  mockCreateSubTaskSuccess,
  mockGetSubTaskListServerError,
  mockGetSubTaskListSuccess,
  mockGetSubTaskTemplateListServerError,
  mockGetSubTaskTemplateListSuccess,
  mockReworkSubTaskBadRequestError,
  mockReworkSubTaskServerError,
  mockReworkSubTaskSuccess,
} from '_tests_/mocks/api'
import {
  findNotification,
  generateWord,
  getButtonIn,
  getStoreWithAuth,
  loadingFinishedBySpinner,
  render,
  setupApiTests,
  setupNotifications,
} from '_tests_/utils'
import { screen, waitFor } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import subTaskFixtures from 'fixtures/subTask'
import taskFixtures from 'fixtures/task'
import { testUtils as cancelSubTaskModalTestUtils } from 'modules/subTask/features/CancelSubTaskModal/CancelSubTaskModal.test'
import { CancelSubTaskFormErrors } from 'modules/subTask/features/CancelSubTaskModal/interfaces'
import { testUtils as createSubTaskModalTestUtils } from 'modules/subTask/features/CreateSubTaskModal/CreateSubTaskModal.test'
import { CreateSubTaskFormErrors } from 'modules/subTask/features/CreateSubTaskModal/interfaces'
import { ReworkSubTaskFormErrors } from 'modules/subTask/features/ReworkSubTaskModal/interfaces'
import { testUtils as reworkSubTaskModalTestUtils } from 'modules/subTask/features/ReworkSubTaskModal/ReworkSubTaskModal.test'
import {
  activeCancelButtonProps,
  activeReworkButtonProps,
  testUtils as subTaskTestUtils,
} from 'modules/subTask/features/SubTaskList/SubTask.test'
import { testUtils as subTaskListTestUtils } from 'modules/subTask/features/SubTaskList/SubTaskList.test'
import { TaskStatusEnum, TaskTypeEnum } from 'modules/task/constants/common'
import { testUtils as taskStatusTestUtils } from 'modules/task/features/TaskStatus/TaskStatus.test'

import SubTaskListTab, { SubTaskListTabProps } from './index'

// constants
const requiredProps: Pick<SubTaskListTabProps, 'task'> = {
  task: taskFixtures.getTask(),
}

const activeCreateSubTaskButtonTaskProps: Pick<
  SubTaskListTabProps['task'],
  'assignee' | 'status' | 'type'
> = {
  assignee: taskFixtures.getAssignee(),
  status: TaskStatusEnum.InProgress,
  type: TaskTypeEnum.Request,
}

// utils
const getContainer = () => screen.getByTestId('subtask-list-tab')

const getCreateSubTaskButton = () =>
  getButtonIn(getContainer(), /создать новое задание/i)

const clickCreateSubTaskButton = async (user: UserEvent) => {
  const button = getCreateSubTaskButton()
  await user.click(button)
  return button
}

const testUtils = {
  getContainer,

  getCreateSubTaskButton,
  openCreateSubTaskModal: clickCreateSubTaskButton,

  loadingFinished: loadingFinishedBySpinner('sub-task-list-spinner'),
}

setupApiTests()

describe('Вкладка списка заданий', () => {
  describe('Кнопка создания задания', () => {
    test('Отображается', () => {
      render(<SubTaskListTab {...requiredProps} />)
      expect(testUtils.getCreateSubTaskButton()).toBeInTheDocument()
    })

    test('Активна если условия соблюдены', () => {
      mockGetSubTaskListSuccess(requiredProps.task.id)

      render(
        <SubTaskListTab
          {...requiredProps}
          task={{
            ...requiredProps.task,
            ...activeCreateSubTaskButtonTaskProps,
          }}
        />,
        {
          store: getStoreWithAuth({
            userId: activeCreateSubTaskButtonTaskProps.assignee!.id,
          }),
        },
      )

      expect(testUtils.getCreateSubTaskButton()).toBeEnabled()
    })

    describe('Не активна если условия соблюдены', () => {
      test('Но текущий пользователь не является исполнителем заявки', () => {
        mockGetSubTaskListSuccess(requiredProps.task.id)

        render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              ...activeCreateSubTaskButtonTaskProps,
            }}
          />,
          {
            store: getStoreWithAuth(),
          },
        )

        expect(testUtils.getCreateSubTaskButton()).toBeDisabled()
      })

      test('Но статус заявки не - "В процессе"', () => {
        mockGetSubTaskListSuccess(requiredProps.task.id)

        render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              ...activeCreateSubTaskButtonTaskProps,
              status: TaskStatusEnum.New,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: activeCreateSubTaskButtonTaskProps.assignee!.id,
            }),
          },
        )

        expect(testUtils.getCreateSubTaskButton()).toBeDisabled()
      })

      test('Но тип заявки не "Incident" и не "Request"', () => {
        mockGetSubTaskListSuccess(requiredProps.task.id)

        render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              ...activeCreateSubTaskButtonTaskProps,
              type: TaskTypeEnum.RequestTask,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: activeCreateSubTaskButtonTaskProps.assignee!.id,
            }),
          },
        )

        expect(testUtils.getCreateSubTaskButton()).toBeDisabled()
      })
    })

    test('При нажатии открывает модалку создания задания', async () => {
      mockGetSubTaskListSuccess(requiredProps.task.id)
      mockGetSubTaskTemplateListSuccess()

      const { user } = render(
        <SubTaskListTab
          {...requiredProps}
          task={{
            ...requiredProps.task,
            ...activeCreateSubTaskButtonTaskProps,
          }}
        />,
        {
          store: getStoreWithAuth({
            userId: activeCreateSubTaskButtonTaskProps.assignee!.id,
          }),
        },
      )

      await testUtils.openCreateSubTaskModal(user)

      expect(
        await createSubTaskModalTestUtils.findContainer(),
      ).toBeInTheDocument()
    })
  })

  describe('Модалка создания задания', () => {
    describe('Список шаблонов', () => {
      describe('При не успешном запросе', () => {
        setupNotifications()

        test('Отображается соответствующее уведомление', async () => {
          mockGetSubTaskListSuccess(requiredProps.task.id)
          mockGetSubTaskTemplateListServerError()

          const { user } = render(
            <SubTaskListTab
              {...requiredProps}
              task={{
                ...requiredProps.task,
                ...activeCreateSubTaskButtonTaskProps,
              }}
            />,
            {
              store: getStoreWithAuth({
                userId: activeCreateSubTaskButtonTaskProps.assignee!.id,
              }),
            },
          )

          await testUtils.openCreateSubTaskModal(user)
          await createSubTaskModalTestUtils.findContainer()
          await createSubTaskModalTestUtils.template.expectLoadingFinished()

          expect(
            await findNotification('Не удалось получить шаблоны заданий'),
          ).toBeInTheDocument()
        })
      })
    })

    describe('При успешном запросе', () => {
      test('Модалка создания закрывается', async () => {
        mockGetSubTaskListSuccess(requiredProps.task.id)
        const templateList = subTaskFixtures.getSubTaskTemplateList()
        mockGetSubTaskTemplateListSuccess({
          body: subTaskFixtures.getSubTaskTemplateListResponse(templateList),
        })
        mockCreateSubTaskSuccess(requiredProps.task.id)

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              ...activeCreateSubTaskButtonTaskProps,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: activeCreateSubTaskButtonTaskProps.assignee!.id,
            }),
          },
        )

        await testUtils.openCreateSubTaskModal(user)
        const modal = await createSubTaskModalTestUtils.findContainer()

        await createSubTaskModalTestUtils.template.expectLoadingFinished()
        await createSubTaskModalTestUtils.userFillForm(user, {
          templateX5: templateList[0].title,
          title: generateWord(),
          description: generateWord(),
        })
        await createSubTaskModalTestUtils.clickSubmitButton(user)

        await waitFor(() => {
          expect(modal).not.toBeInTheDocument()
        })
      })

      test('В список добавляется новое задание', async () => {
        const subTaskList = subTaskFixtures.getSubTaskList()
        mockGetSubTaskListSuccess(requiredProps.task.id, { body: subTaskList })

        const templateList = subTaskFixtures.getSubTaskTemplateList()
        mockGetSubTaskTemplateListSuccess({
          body: subTaskFixtures.getSubTaskTemplateListResponse(templateList),
        })

        mockCreateSubTaskSuccess(requiredProps.task.id, {
          body: subTaskFixtures.getSubTask(),
        })

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              ...activeCreateSubTaskButtonTaskProps,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: activeCreateSubTaskButtonTaskProps.assignee!.id,
            }),
          },
        )

        await testUtils.openCreateSubTaskModal(user)
        const modal = await createSubTaskModalTestUtils.findContainer()

        await createSubTaskModalTestUtils.template.expectLoadingFinished()
        await createSubTaskModalTestUtils.userFillForm(user, {
          templateX5: templateList[0].title,
          title: generateWord(),
          description: generateWord(),
        })
        await createSubTaskModalTestUtils.clickSubmitButton(user)

        await waitFor(() => {
          expect(modal).not.toBeInTheDocument()
        })

        expect(
          subTaskTestUtils.getAllContainerIn(
            subTaskListTestUtils.getContainer(),
          ),
        ).toHaveLength(subTaskList.length + 1)
      })
    })

    describe('При не успешном запросе', () => {
      setupNotifications()

      test('Обрабатывается ошибка клиента', async () => {
        mockGetSubTaskListSuccess(requiredProps.task.id)
        const templateList = subTaskFixtures.getSubTaskTemplateList()
        mockGetSubTaskTemplateListSuccess({
          body: subTaskFixtures.getSubTaskTemplateListResponse(templateList),
        })

        const badRequestResponse: Required<CreateSubTaskFormErrors> = {
          title: [generateWord()],
          description: [generateWord()],
          templateX5: [generateWord()],
        }
        mockCreateSubTaskBadRequestError(requiredProps.task.id, {
          body: badRequestResponse,
        })

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              ...activeCreateSubTaskButtonTaskProps,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: activeCreateSubTaskButtonTaskProps.assignee!.id,
            }),
          },
        )

        await testUtils.openCreateSubTaskModal(user)
        await createSubTaskModalTestUtils.findContainer()
        await createSubTaskModalTestUtils.template.expectLoadingFinished()
        await createSubTaskModalTestUtils.userFillForm(user, {
          templateX5: templateList[0].title,
          title: generateWord(),
          description: generateWord(),
        })
        await createSubTaskModalTestUtils.clickSubmitButton(user)

        expect(
          await createSubTaskModalTestUtils.template.findError(
            badRequestResponse.templateX5[0],
          ),
        ).toBeInTheDocument()

        expect(
          await createSubTaskModalTestUtils.title.findError(
            badRequestResponse.title[0],
          ),
        ).toBeInTheDocument()

        expect(
          await createSubTaskModalTestUtils.description.findError(
            badRequestResponse.description[0],
          ),
        ).toBeInTheDocument()

        expect(
          await findNotification('Не удалось создать задание'),
        ).toBeInTheDocument()
      })

      test('Обрабатывается ошибка сервера', async () => {
        mockGetSubTaskListSuccess(requiredProps.task.id)
        const templateList = subTaskFixtures.getSubTaskTemplateList()
        mockGetSubTaskTemplateListSuccess({
          body: subTaskFixtures.getSubTaskTemplateListResponse(templateList),
        })
        mockCreateSubTaskServerError(requiredProps.task.id)

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              ...activeCreateSubTaskButtonTaskProps,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: activeCreateSubTaskButtonTaskProps.assignee!.id,
            }),
          },
        )

        await testUtils.openCreateSubTaskModal(user)
        await createSubTaskModalTestUtils.findContainer()
        await createSubTaskModalTestUtils.template.expectLoadingFinished()
        await createSubTaskModalTestUtils.userFillForm(user, {
          templateX5: templateList[0].title,
          title: generateWord(),
          description: generateWord(),
        })
        await createSubTaskModalTestUtils.clickSubmitButton(user)

        expect(
          await findNotification('Не удалось создать задание'),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Список заданий', () => {
    test('Отображается', async () => {
      mockGetSubTaskListSuccess(requiredProps.task.id, {
        body: subTaskFixtures.getSubTaskList(),
      })

      render(<SubTaskListTab {...requiredProps} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.loadingFinished()
      expect(subTaskListTestUtils.getContainer()).toBeInTheDocument()
    })

    describe('При успешном получении', () => {
      test('Отображает верное количество заданий', async () => {
        const subTaskList = subTaskFixtures.getSubTaskList()
        mockGetSubTaskListSuccess(requiredProps.task.id, { body: subTaskList })

        render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              ...activeCreateSubTaskButtonTaskProps,
            }}
          />,
          { store: getStoreWithAuth() },
        )

        await testUtils.loadingFinished()

        expect(
          subTaskTestUtils.getAllContainerIn(
            subTaskListTestUtils.getContainer(),
          ),
        ).toHaveLength(subTaskList.length)
      })
    })

    describe('При не успешном получении', () => {
      setupNotifications()

      test('Отображается соответствующая ошибка вместо списка', async () => {
        mockGetSubTaskListServerError(requiredProps.task.id)

        render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              ...activeCreateSubTaskButtonTaskProps,
            }}
          />,
          {
            store: getStoreWithAuth(),
          },
        )

        await testUtils.loadingFinished()

        expect(
          subTaskListTestUtils.getChildByText('Не удалось получить задания'),
        ).toBeInTheDocument()
      })

      test('Отображается соответствующее уведомление', async () => {
        mockGetSubTaskListServerError(requiredProps.task.id)

        render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              ...activeCreateSubTaskButtonTaskProps,
            }}
          />,
          {
            store: getStoreWithAuth(),
          },
        )

        await testUtils.loadingFinished()

        expect(
          await findNotification('Не удалось получить задания'),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Модалка отправки задания на доработку', () => {
    test('Открывается', async () => {
      const subTask = subTaskFixtures.getSubTask({
        status: activeReworkButtonProps.status,
      })
      mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })

      const { user } = render(
        <SubTaskListTab
          {...requiredProps}
          task={{
            ...requiredProps.task,
            status: activeReworkButtonProps.taskStatus,
          }}
        />,
        {
          store: getStoreWithAuth({ userId: requiredProps.task.assignee!.id }),
        },
      )

      await testUtils.loadingFinished()
      await subTaskTestUtils.clickReworkButton(user)
      await reworkSubTaskModalTestUtils.findContainer()
    })

    test('Закрывается', async () => {
      const subTask = subTaskFixtures.getSubTask({
        status: activeReworkButtonProps.status,
      })
      mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })

      const { user } = render(
        <SubTaskListTab
          {...requiredProps}
          task={{
            ...requiredProps.task,
            status: activeReworkButtonProps.taskStatus,
          }}
        />,
        {
          store: getStoreWithAuth({ userId: requiredProps.task.assignee!.id }),
        },
      )

      await testUtils.loadingFinished()
      await subTaskTestUtils.clickReworkButton(user)
      const modal = await reworkSubTaskModalTestUtils.findContainer()
      await reworkSubTaskModalTestUtils.clickCancelButton(user)

      await waitFor(() => {
        expect(modal).not.toBeInTheDocument()
      })
    })

    test('Отображает состояние загрузки', async () => {
      const subTask = subTaskFixtures.getSubTask({
        status: activeReworkButtonProps.status,
      })
      mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })
      mockReworkSubTaskSuccess(subTask.id)

      const { user } = render(
        <SubTaskListTab
          {...requiredProps}
          task={{
            ...requiredProps.task,
            status: activeReworkButtonProps.taskStatus,
          }}
        />,
        {
          store: getStoreWithAuth({ userId: requiredProps.task.assignee!.id }),
        },
      )

      await testUtils.loadingFinished()
      await subTaskTestUtils.clickReworkButton(user)
      await reworkSubTaskModalTestUtils.findContainer()
      await reworkSubTaskModalTestUtils.setReturnReason(user, generateWord())
      await reworkSubTaskModalTestUtils.clickSubmitButton(user)
      await reworkSubTaskModalTestUtils.loadingStarted()
    })

    describe('При успешной отправке данных', () => {
      test('Модалка закрывается', async () => {
        const subTask = subTaskFixtures.getSubTask({
          status: activeReworkButtonProps.status,
        })
        mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })
        mockReworkSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              status: activeReworkButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: requiredProps.task.assignee!.id,
            }),
          },
        )

        await testUtils.loadingFinished()
        await subTaskTestUtils.clickReworkButton(user)
        const modal = await reworkSubTaskModalTestUtils.findContainer()
        await reworkSubTaskModalTestUtils.setReturnReason(user, generateWord())
        await reworkSubTaskModalTestUtils.clickSubmitButton(user)

        await waitFor(() => {
          expect(modal).not.toBeInTheDocument()
        })
      })

      test('Статус задачи меняется на "В процессе"', async () => {
        const subTask = subTaskFixtures.getSubTask({
          status: activeReworkButtonProps.status,
        })
        mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })
        mockReworkSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              status: activeReworkButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: requiredProps.task.assignee!.id,
            }),
          },
        )

        await testUtils.loadingFinished()

        expect(
          taskStatusTestUtils.getTaskStatusIn(
            subTaskTestUtils.getContainer(),
            activeReworkButtonProps.status,
          ),
        ).toBeInTheDocument()

        await subTaskTestUtils.clickReworkButton(user)
        const modal = await reworkSubTaskModalTestUtils.findContainer()
        await reworkSubTaskModalTestUtils.setReturnReason(user, generateWord())
        await reworkSubTaskModalTestUtils.clickSubmitButton(user)

        await waitFor(() => {
          expect(modal).not.toBeInTheDocument()
        })

        expect(
          taskStatusTestUtils.getTaskStatusIn(
            subTaskTestUtils.getContainer(),
            TaskStatusEnum.InProgress,
          ),
        ).toBeInTheDocument()
      })

      test('Кнопка отправки на доработку не отображается', async () => {
        const subTask = subTaskFixtures.getSubTask({
          status: activeReworkButtonProps.status,
        })
        mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })
        mockReworkSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              status: activeReworkButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: requiredProps.task.assignee!.id,
            }),
          },
        )

        await testUtils.loadingFinished()
        const reworkButton = await subTaskTestUtils.clickReworkButton(user)
        const modal = await reworkSubTaskModalTestUtils.findContainer()
        await reworkSubTaskModalTestUtils.setReturnReason(user, generateWord())
        await reworkSubTaskModalTestUtils.clickSubmitButton(user)

        await waitFor(() => {
          expect(modal).not.toBeInTheDocument()
        })

        expect(reworkButton).not.toBeInTheDocument()
      })
    })

    describe('При не успешной отправке данных', () => {
      setupNotifications()

      test('Обрабатывается ошибка - 400', async () => {
        const subTask = subTaskFixtures.getSubTask({
          status: activeReworkButtonProps.status,
        })
        mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })

        const badRequestResponse: Required<ReworkSubTaskFormErrors> = {
          returnReason: [generateWord()],
        }
        mockReworkSubTaskBadRequestError(subTask.id, {
          body: badRequestResponse,
        })

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              status: activeReworkButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: requiredProps.task.assignee!.id,
            }),
          },
        )

        await testUtils.loadingFinished()
        await subTaskTestUtils.clickReworkButton(user)
        await reworkSubTaskModalTestUtils.findContainer()
        await reworkSubTaskModalTestUtils.setReturnReason(user, generateWord())
        await reworkSubTaskModalTestUtils.clickSubmitButton(user)

        expect(
          await reworkSubTaskModalTestUtils.findReturnReasonError(
            badRequestResponse.returnReason[0],
          ),
        ).toBeInTheDocument()
      })

      test('Обрабатывается ошибка - 500', async () => {
        const subTask = subTaskFixtures.getSubTask({
          status: activeReworkButtonProps.status,
        })
        mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })
        mockReworkSubTaskServerError(subTask.id)

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              status: activeReworkButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: requiredProps.task.assignee!.id,
            }),
          },
        )

        await testUtils.loadingFinished()
        await subTaskTestUtils.clickReworkButton(user)
        await reworkSubTaskModalTestUtils.findContainer()
        await reworkSubTaskModalTestUtils.setReturnReason(user, generateWord())
        await reworkSubTaskModalTestUtils.clickSubmitButton(user)

        expect(
          await findNotification('Не удалось вернуть задание на доработку'),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Модалка отмены задания', () => {
    test('Открывается', async () => {
      const subTask = subTaskFixtures.getSubTask({
        status: activeCancelButtonProps.status,
      })
      mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })

      const { user } = render(
        <SubTaskListTab
          {...requiredProps}
          task={{
            ...requiredProps.task,
            status: activeCancelButtonProps.taskStatus,
          }}
        />,
        {
          store: getStoreWithAuth({ userId: requiredProps.task.assignee!.id }),
        },
      )

      await testUtils.loadingFinished()
      await subTaskTestUtils.clickCancelButton(user)
      await cancelSubTaskModalTestUtils.findContainer()
    })

    test('Закрывается', async () => {
      const subTask = subTaskFixtures.getSubTask({
        status: activeCancelButtonProps.status,
      })
      mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })

      const { user } = render(
        <SubTaskListTab
          {...requiredProps}
          task={{
            ...requiredProps.task,
            status: activeCancelButtonProps.taskStatus,
          }}
        />,
        {
          store: getStoreWithAuth({ userId: requiredProps.task.assignee!.id }),
        },
      )

      await testUtils.loadingFinished()
      await subTaskTestUtils.clickCancelButton(user)
      const modal = await cancelSubTaskModalTestUtils.findContainer()
      await cancelSubTaskModalTestUtils.clickCancelButton(user)

      await waitFor(() => {
        expect(modal).not.toBeInTheDocument()
      })
    })

    test('Отображает состояние загрузки', async () => {
      const subTask = subTaskFixtures.getSubTask({
        status: activeCancelButtonProps.status,
      })
      mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })
      mockCancelSubTaskSuccess(subTask.id)

      const { user } = render(
        <SubTaskListTab
          {...requiredProps}
          task={{
            ...requiredProps.task,
            status: activeCancelButtonProps.taskStatus,
          }}
        />,
        {
          store: getStoreWithAuth({ userId: requiredProps.task.assignee!.id }),
        },
      )

      await testUtils.loadingFinished()
      await subTaskTestUtils.clickCancelButton(user)
      await cancelSubTaskModalTestUtils.findContainer()
      await cancelSubTaskModalTestUtils.setCancelReason(user, generateWord())
      await cancelSubTaskModalTestUtils.clickSubmitButton(user)
      await cancelSubTaskModalTestUtils.loadingStarted()
    })

    describe('При успешной отправке данных', () => {
      test('Модалка закрывается', async () => {
        const subTask = subTaskFixtures.getSubTask({
          status: activeCancelButtonProps.status,
        })
        mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })
        mockCancelSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              status: activeCancelButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: requiredProps.task.assignee!.id,
            }),
          },
        )

        await testUtils.loadingFinished()
        await subTaskTestUtils.clickCancelButton(user)
        const modal = await cancelSubTaskModalTestUtils.findContainer()
        await cancelSubTaskModalTestUtils.setCancelReason(user, generateWord())
        await cancelSubTaskModalTestUtils.clickSubmitButton(user)

        await waitFor(() => {
          expect(modal).not.toBeInTheDocument()
        })
      })

      test('Статус задачи меняется на "Закрыта"', async () => {
        const subTask = subTaskFixtures.getSubTask({
          status: activeCancelButtonProps.status,
        })
        mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })
        mockCancelSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              status: activeCancelButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: requiredProps.task.assignee!.id,
            }),
          },
        )

        await testUtils.loadingFinished()

        expect(
          taskStatusTestUtils.getTaskStatusIn(
            subTaskTestUtils.getContainer(),
            activeCancelButtonProps.status,
          ),
        ).toBeInTheDocument()

        await subTaskTestUtils.clickCancelButton(user)
        const modal = await cancelSubTaskModalTestUtils.findContainer()
        await cancelSubTaskModalTestUtils.setCancelReason(user, generateWord())
        await cancelSubTaskModalTestUtils.clickSubmitButton(user)

        await waitFor(() => {
          expect(modal).not.toBeInTheDocument()
        })

        expect(
          taskStatusTestUtils.getTaskStatusIn(
            subTaskTestUtils.getContainer(),
            TaskStatusEnum.Closed,
          ),
        ).toBeInTheDocument()
      })

      test('Кнопка отмены не отображается', async () => {
        const subTask = subTaskFixtures.getSubTask({
          status: activeCancelButtonProps.status,
        })
        mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })
        mockCancelSubTaskSuccess(subTask.id)

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              status: activeCancelButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: requiredProps.task.assignee!.id,
            }),
          },
        )

        await testUtils.loadingFinished()
        const cancelButton = await subTaskTestUtils.clickCancelButton(user)
        const modal = await cancelSubTaskModalTestUtils.findContainer()
        await cancelSubTaskModalTestUtils.setCancelReason(user, generateWord())
        await cancelSubTaskModalTestUtils.clickSubmitButton(user)

        await waitFor(() => {
          expect(modal).not.toBeInTheDocument()
        })

        expect(cancelButton).not.toBeInTheDocument()
      })
    })

    describe('При не успешной отправке данных', () => {
      setupNotifications()

      test('Обрабатывается ошибка - 400', async () => {
        const subTask = subTaskFixtures.getSubTask({
          status: activeCancelButtonProps.status,
        })
        mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })

        const badRequestResponse: Required<CancelSubTaskFormErrors> = {
          cancelReason: [generateWord()],
        }
        mockCancelSubTaskBadRequestError(subTask.id, {
          body: badRequestResponse,
        })

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              status: activeCancelButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: requiredProps.task.assignee!.id,
            }),
          },
        )

        await testUtils.loadingFinished()
        await subTaskTestUtils.clickCancelButton(user)
        await cancelSubTaskModalTestUtils.findContainer()
        await cancelSubTaskModalTestUtils.setCancelReason(user, generateWord())
        await cancelSubTaskModalTestUtils.clickSubmitButton(user)

        expect(
          await cancelSubTaskModalTestUtils.findCancelReasonError(
            badRequestResponse.cancelReason[0],
          ),
        ).toBeInTheDocument()
      })

      test('Обрабатывается ошибка - 500', async () => {
        const subTask = subTaskFixtures.getSubTask({
          status: activeCancelButtonProps.status,
        })
        mockGetSubTaskListSuccess(requiredProps.task.id, { body: [subTask] })
        mockCancelSubTaskServerError(subTask.id)

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            task={{
              ...requiredProps.task,
              status: activeCancelButtonProps.taskStatus,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: requiredProps.task.assignee!.id,
            }),
          },
        )

        await testUtils.loadingFinished()
        await subTaskTestUtils.clickCancelButton(user)
        await cancelSubTaskModalTestUtils.findContainer()
        await cancelSubTaskModalTestUtils.setCancelReason(user, generateWord())
        await cancelSubTaskModalTestUtils.clickSubmitButton(user)

        expect(
          await findNotification('Не удалось отменить задание'),
        ).toBeInTheDocument()
      })
    })
  })
})
