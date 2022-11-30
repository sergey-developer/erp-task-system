import { mockGetSubTaskTemplateListSuccess } from '_tests_/mocks/api'
import { getStoreWithAuth, render, setupApiTests } from '_tests_/utils'
import { taskFixtures } from 'fixtures/task'
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
    describe('После открытия', () => {
      describe('Список шаблонов', () => {
        test('Загружается', async () => {
          mockGetSubTaskTemplateListSuccess()

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
          await createSubTaskModalTestUtils.template.expectLoadingStarted()
        })

        test('Отображается корректно', async () => {
          const templateList = taskFixtures.getSubTaskTemplateList(2)
          mockGetSubTaskTemplateListSuccess({ body: templateList })

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
          await createSubTaskModalTestUtils.template.openField(user)

          templateList.forEach((template) => {
            expect(
              createSubTaskModalTestUtils.template.getOption(template.title),
            ).toBeInTheDocument()
          })
        })
      })
    })

    describe('При успешном запросе', () => {})
  })
})
