import {
  mockCreateSubTaskBadRequestError,
  mockCreateSubTaskServerError,
  mockCreateSubTaskSuccess,
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
import { activeCreateSubTaskButtonProps, requiredProps } from './constants'
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
      render(
        <SubTaskListTab
          {...requiredProps}
          {...activeCreateSubTaskButtonProps}
        />,
        {
          store: getStoreWithAuth({
            userId: activeCreateSubTaskButtonProps.task.assignee!.id,
          }),
        },
      )

      expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeEnabled()
    })

    describe('Не активна если все условия соблюдены', () => {
      test('Но текущий пользователь не является исполнителем заявки', () => {
        render(
          <SubTaskListTab
            {...requiredProps}
            {...activeCreateSubTaskButtonProps}
          />,
          {
            store: getStoreWithAuth(),
          },
        )

        expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeDisabled()
      })

      test('Но статус заявки не - "В процессе"', () => {
        render(
          <SubTaskListTab
            {...requiredProps}
            {...activeCreateSubTaskButtonProps}
            task={{ ...requiredProps.task, status: TaskStatusEnum.New }}
          />,
          {
            store: getStoreWithAuth({
              userId: activeCreateSubTaskButtonProps.task.assignee!.id,
            }),
          },
        )

        expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeDisabled()
      })

      test('Но тип заявки не "Incident" и не "Request"', () => {
        render(
          <SubTaskListTab
            {...requiredProps}
            {...activeCreateSubTaskButtonProps}
            task={{ ...requiredProps.task, type: TaskTypeEnum.RequestTask }}
          />,
          {
            store: getStoreWithAuth({
              userId: activeCreateSubTaskButtonProps.task.assignee!.id,
            }),
          },
        )

        expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeDisabled()
      })
    })

    test('При нажатии открывает модалку создания задания', async () => {
      mockGetSubTaskTemplateListSuccess()

      const { user } = render(
        <SubTaskListTab
          {...requiredProps}
          {...activeCreateSubTaskButtonProps}
        />,
        {
          store: getStoreWithAuth({
            userId: activeCreateSubTaskButtonProps.task.assignee!.id,
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
          mockGetSubTaskTemplateListServerError()

          const { user } = render(
            <SubTaskListTab
              {...requiredProps}
              {...activeCreateSubTaskButtonProps}
            />,
            {
              store: getStoreWithAuth({
                userId: activeCreateSubTaskButtonProps.task.assignee!.id,
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
        const templateList = taskFixtures.getSubTaskTemplateList()
        mockGetSubTaskTemplateListSuccess({ body: templateList })
        mockCreateSubTaskSuccess(requiredProps.task.id)

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            {...activeCreateSubTaskButtonProps}
          />,
          {
            store: getStoreWithAuth({
              userId: activeCreateSubTaskButtonProps.task.assignee!.id,
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
            {...activeCreateSubTaskButtonProps}
          />,
          {
            store: getStoreWithAuth({
              userId: activeCreateSubTaskButtonProps.task.assignee!.id,
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
        const templateList = taskFixtures.getSubTaskTemplateList()
        mockGetSubTaskTemplateListSuccess({ body: templateList })
        mockCreateSubTaskServerError(requiredProps.task.id)

        const { user } = render(
          <SubTaskListTab
            {...requiredProps}
            {...activeCreateSubTaskButtonProps}
          />,
          {
            store: getStoreWithAuth({
              userId: activeCreateSubTaskButtonProps.task.assignee!.id,
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
