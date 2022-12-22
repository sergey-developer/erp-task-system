import {
  mockCreateSubTaskBadRequestError,
  mockCreateSubTaskServerError,
  mockCreateSubTaskSuccess,
  mockGetSubTaskListServerError,
  mockGetSubTaskListSuccess,
  mockGetSubTaskTemplateListServerError,
  mockGetSubTaskTemplateListSuccess,
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
import createSubTaskModalTestUtils from 'modules/subTask/features/CreateSubTaskModal/_tests_/utils'
import { CreateSubTaskFormErrors } from 'modules/subTask/features/CreateSubTaskModal/interfaces'
import { testUtils as subTaskTestUtils } from 'modules/subTask/features/SubTaskList/SubTask.test'
import { testUtils as subTaskListTestUtils } from 'modules/subTask/features/SubTaskList/SubTaskList.test'
import { TaskStatusEnum, TaskTypeEnum } from 'modules/task/constants/common'

import SubTaskListTab, { SubTaskListTabProps } from './index'

// constants
const requiredProps: Pick<SubTaskListTabProps, 'task'> = {
  task: taskFixtures.getTask(),
}

const activeCreateSubTaskButtonTaskProps: Pick<
  SubTaskListTabProps['task'],
  'assignee' | 'status' | 'type'
> = {
  assignee: taskFixtures.getTaskAssignee(),
  status: TaskStatusEnum.InProgress,
  type: TaskTypeEnum.Request,
}

// utils
const getContainer = () => screen.getByTestId('subtask-list-tab')

const getCreateSubTaskButton = () =>
  getButtonIn(getContainer(), /создать новое задание/i)

const userClickCreateSubTaskButton = async (user: UserEvent) => {
  const button = getCreateSubTaskButton()
  await user.click(button)
  return button
}

const testUtils = {
  getContainer,

  getCreateSubTaskButton,
  openCreateSubTaskModal: userClickCreateSubTaskButton,

  loadingFinished: loadingFinishedBySpinner('sub-task-list-spinner'),
}

setupApiTests()

describe('Вкладка списка заданий', () => {
  describe('Кнопка создания задания', () => {
    test('Отображается', () => {
      render(<SubTaskListTab {...requiredProps} />)
      expect(testUtils.getCreateSubTaskButton()).toBeInTheDocument()
    })

    test('Активна если все условия соблюдены', () => {
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

    describe('Не активна если все условия соблюдены', () => {
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
        await createSubTaskModalTestUtils.userClickSubmitButton(user)

        await waitFor(() => {
          expect(modal).not.toBeInTheDocument()
        })
      })
    })

    describe('При не успешном запросе', () => {
      setupNotifications()

      test('Корректно обрабатывается ошибка - 400', async () => {
        mockGetSubTaskListSuccess(requiredProps.task.id)
        const templateList = subTaskFixtures.getSubTaskTemplateList()
        mockGetSubTaskTemplateListSuccess({
          body: subTaskFixtures.getSubTaskTemplateListResponse(templateList),
        })

        const badRequestResponse: CreateSubTaskFormErrors = {
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
        await createSubTaskModalTestUtils.userClickSubmitButton(user)

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
      })

      test('Корректно обрабатывается ошибка - 500', async () => {
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
        await createSubTaskModalTestUtils.userClickSubmitButton(user)

        expect(
          await findNotification('Не удалось создать задание'),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Список заданий', () => {
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
          {
            store: getStoreWithAuth(),
          },
        )

        await testUtils.loadingFinished()

        expect(
          subTaskTestUtils.getAllContainerIn(testUtils.getContainer()),
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
})
