import {
  mockCreateSubTaskBadRequestError,
  mockCreateSubTaskServerError,
  mockCreateSubTaskSuccess,
  mockGetSubTaskListSuccess,
  mockGetSubTaskTemplateListServerError,
  mockGetSubTaskTemplateListSuccess,
} from '_tests_/mocks/api'
import {
  findNotification,
  generateWord,
  getStoreWithAuth,
  render,
  setupApiTests,
  setupNotifications,
} from '_tests_/utils'
import { waitFor } from '@testing-library/react'
import { taskFixtures } from 'fixtures/task'
import { TaskStatusEnum, TaskTypeEnum } from 'modules/task/constants/common'

import createSubTaskModalTestUtils from '../../../CreateSubTaskModal/_tests_/utils'
import { CreateSubTaskFormErrors } from '../../../CreateSubTaskModal/interfaces'
import SubTaskListTab from '../index'
import { activeCreateSubTaskButtonTaskProps, requiredProps } from './constants'
import subTaskListTabTestUtils from './utils'

setupApiTests()

describe('Вкладка списка подзадач', () => {
  describe('Кнопка создания задания', () => {
    test('Отображается', () => {
      render(<SubTaskListTab {...requiredProps} />)
      expect(
        subTaskListTabTestUtils.getCreateSubTaskButton(),
      ).toBeInTheDocument()
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

      expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeEnabled()
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

        expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeDisabled()
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

        expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeDisabled()
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

        expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeDisabled()
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

      await subTaskListTabTestUtils.openCreateSubTaskModal(user)

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

          await subTaskListTabTestUtils.openCreateSubTaskModal(user)
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
        const templateList = taskFixtures.getSubTaskTemplateList()
        mockGetSubTaskTemplateListSuccess({ body: templateList })
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

        await subTaskListTabTestUtils.openCreateSubTaskModal(user)
        const modal = await createSubTaskModalTestUtils.findContainer()

        await createSubTaskModalTestUtils.template.expectLoadingFinished()
        await createSubTaskModalTestUtils.userFillForm(user, {
          template: templateList[0].title,
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
        const templateList = taskFixtures.getSubTaskTemplateList()
        mockGetSubTaskTemplateListSuccess({ body: templateList })

        const badRequestResponse: CreateSubTaskFormErrors = {
          title: [generateWord()],
          description: [generateWord()],
          template: [generateWord()],
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

        await subTaskListTabTestUtils.openCreateSubTaskModal(user)
        await createSubTaskModalTestUtils.findContainer()
        await createSubTaskModalTestUtils.template.expectLoadingFinished()
        await createSubTaskModalTestUtils.userFillForm(user, {
          template: templateList[0].title,
          title: generateWord(),
          description: generateWord(),
        })
        await createSubTaskModalTestUtils.userClickSubmitButton(user)

        expect(
          await createSubTaskModalTestUtils.template.findError(
            badRequestResponse.template[0],
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
        const templateList = taskFixtures.getSubTaskTemplateList()
        mockGetSubTaskTemplateListSuccess({ body: templateList })
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

        await subTaskListTabTestUtils.openCreateSubTaskModal(user)
        await createSubTaskModalTestUtils.findContainer()
        await createSubTaskModalTestUtils.template.expectLoadingFinished()
        await createSubTaskModalTestUtils.userFillForm(user, {
          template: templateList[0].title,
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
})
