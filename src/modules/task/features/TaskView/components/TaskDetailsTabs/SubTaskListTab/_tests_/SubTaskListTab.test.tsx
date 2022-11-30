import {
  mockGetSubTaskTemplateListServerError,
  mockGetSubTaskTemplateListSuccess,
} from '_tests_/mocks/api'
import {
  getStoreWithAuth,
  render,
  setupApiTests,
  setupNotifications,
} from '_tests_/utils'
import { screen } from '@testing-library/react'
import { TaskStatusEnum, TaskTypeEnum } from 'modules/task/constants/common'

import createSubTaskModalTestUtils from '../../../CreateSubTaskModal/_tests_/utils'
import SubTaskListTab from '../index'
import { activeCreateSubTaskButton, requiredProps } from './constants'
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
        <SubTaskListTab {...requiredProps} {...activeCreateSubTaskButton} />,
        {
          store: getStoreWithAuth({
            userId: activeCreateSubTaskButton.assignee.id,
          }),
        },
      )

      expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeEnabled()
    })

    describe('Не активна если все условия соблюдены', () => {
      test('Но текущий пользователь не является исполнителем заявки', () => {
        render(
          <SubTaskListTab {...requiredProps} {...activeCreateSubTaskButton} />,
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
            {...activeCreateSubTaskButton}
            status={TaskStatusEnum.New}
          />,
          {
            store: getStoreWithAuth({
              userId: activeCreateSubTaskButton.assignee.id,
            }),
          },
        )

        expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeDisabled()
      })

      test('Но тип заявки не "Incident" и не "Request"', () => {
        render(
          <SubTaskListTab
            {...requiredProps}
            {...activeCreateSubTaskButton}
            type={TaskTypeEnum.RequestTask}
          />,
          {
            store: getStoreWithAuth({
              userId: activeCreateSubTaskButton.assignee.id,
            }),
          },
        )

        expect(subTaskListTabTestUtils.getCreateSubTaskButton()).toBeDisabled()
      })
    })

    test('При нажатии открывает модалку создания задания', async () => {
      mockGetSubTaskTemplateListSuccess()

      const { user } = render(
        <SubTaskListTab {...requiredProps} {...activeCreateSubTaskButton} />,
        {
          store: getStoreWithAuth({
            userId: activeCreateSubTaskButton.assignee.id,
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
              {...activeCreateSubTaskButton}
            />,
            {
              store: getStoreWithAuth({
                userId: activeCreateSubTaskButton.assignee.id,
              }),
            },
          )

          await subTaskListTabTestUtils.openCreateSubTaskModal(user)
          await createSubTaskModalTestUtils.findContainer()
          await createSubTaskModalTestUtils.template.expectLoadingFinished()

          expect(
            await screen.findByText('Не удалось получить шаблоны заданий'),
          ).toBeInTheDocument()
        })
      })
    })

    describe('При успешном запросе', () => {
      // замокать useCreateSubTask???
    })

    describe('При не успешном запросе', () => {})
  })
})
