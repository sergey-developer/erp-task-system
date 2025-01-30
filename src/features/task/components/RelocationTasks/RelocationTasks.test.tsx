import { within } from '@testing-library/react'
import pick from 'lodash/pick'

import { testUtils as attachmentsTestUtils } from 'features/attachment/components/Attachments/Attachments.test'
import { relocationTaskStatusDict } from 'features/warehouse/constants/relocationTask'
import { getRelocateFromToTitle } from 'features/warehouse/utils/relocationTask'

import { formatDate } from 'shared/utils/date'

import { props, relocationTaskListItem } from '_tests_/features/tasks/components/RelocationTasks/constants'
import { relocationTasksTestUtils } from '_tests_/features/tasks/components/RelocationTasks/testUtils'
import { taskAssigneeTestUtils } from '_tests_/features/tasks/components/TaskAssignee/testUtils'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { render, setupApiTests } from '_tests_/utils'

import RelocationTasks from './index'

setupApiTests()

describe('Список заявок на перемещение', () => {
  test('Если список пуст отображается соответствующий текст', () => {
    render(<RelocationTasks {...props} data={[]} />)
    const text = within(relocationTasksTestUtils.getContainer()).getByText('Перемещений нет')
    expect(text).toBeInTheDocument()
  })

  test('Дата дэдлайна отображается', () => {
    render(<RelocationTasks {...props} />)
    const text = `до ${formatDate(relocationTaskListItem.deadlineAt)}`
    const value = relocationTasksTestUtils.getChildInListItem(relocationTaskListItem.id, text)
    expect(value).toBeInTheDocument()
  })

  test('Заголовок отображается', () => {
    render(<RelocationTasks {...props} />)
    const text = getRelocateFromToTitle(relocationTaskListItem)
    const value = relocationTasksTestUtils.getChildInListItem(relocationTaskListItem.id, text)
    expect(value).toBeInTheDocument()
  })

  test('Статус отображается', () => {
    render(<RelocationTasks {...props} />)

    const label = relocationTasksTestUtils.getChildInListItem(relocationTaskListItem.id, /Статус/)
    const value = relocationTasksTestUtils.getChildInListItem(
      relocationTaskListItem.id,
      relocationTaskStatusDict[relocationTaskListItem.status],
    )

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  describe('Документы', () => {
    test('Отображаются', () => {
      render(<RelocationTasks {...props} />)

      const label = relocationTasksTestUtils.getChildInListItem(
        relocationTaskListItem.id,
        /Документы/,
      )
      const value = attachmentsTestUtils.getContainerIn(
        relocationTasksTestUtils.getListItem(relocationTaskListItem.id),
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
    })

    describe('Кнопка добавления', () => {
      test('Отображается', () => {
        render(<RelocationTasks {...props} />)

        const button = relocationTasksTestUtils.getCreateDocumentsButton(relocationTaskListItem.id)

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Вызывается обработчик и загруженный документ отображается', async () => {
        const { user } = render(<RelocationTasks {...props} />)

        const { input, file } = await relocationTasksTestUtils.setDocument(
          relocationTaskListItem.id,
          user,
        )
        const uploadedAttachment = relocationTasksTestUtils.getUploadedDocument(
          file.name,
          relocationTaskListItem.id,
        )

        expect(props.onCreateAttachment).toBeCalledTimes(1)
        expect(input.files!.item(0)).toBe(file)
        expect(input.files).toHaveLength(1)
        expect(uploadedAttachment).toBeInTheDocument()
      })
    })
  })

  test('Дата создания отображается', () => {
    render(<RelocationTasks {...props} />)

    const label = relocationTasksTestUtils.getChildInListItem(
      relocationTaskListItem.id,
      /Дата создания/,
    )
    const text = formatDate(relocationTaskListItem.createdAt)
    const value = relocationTasksTestUtils.getChildInListItem(relocationTaskListItem.id, text)

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  describe('Исполнитель', () => {
    test('Отображается тот кто завершил заявку если он есть', () => {
      render(<RelocationTasks {...props} />)

      const label = relocationTasksTestUtils.getChildInListItem(
        relocationTaskListItem.id,
        /Исполнитель/,
      )
      const value = taskAssigneeTestUtils.getContainerIn(
        relocationTasksTestUtils.getListItem(relocationTaskListItem.id),
      )

      expect(label).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      expect(value).toHaveTextContent(relocationTaskListItem.completedBy!.fullName)
    })

    test('Отображаются исполнители если нет того кто завершил заявку', () => {
      const executor1 = pick(userFixtures.user(), 'id', 'fullName', 'phone')
      const executor2 = pick(userFixtures.user(), 'id', 'fullName', 'phone')
      const relocationTaskListItem = warehouseFixtures.relocationTaskListItem({
        completedBy: null,
        executors: [executor1, executor2],
      })

      render(<RelocationTasks {...props} data={[relocationTaskListItem]} />)

      const label = relocationTasksTestUtils.getChildInListItem(
        relocationTaskListItem.id,
        /Исполнитель/,
      )
      const executors = taskAssigneeTestUtils.getAllContainerIn(
        relocationTasksTestUtils.getListItem(relocationTaskListItem.id),
      )

      expect(label).toBeInTheDocument()
      expect(executors[0]).toHaveTextContent(executor1.fullName)
      expect(executors[1]).toHaveTextContent(executor2.fullName)
    })
  })

  test('При клике по элементу вызывается обработчик', async () => {
    const { user } = render(<RelocationTasks {...props} />)

    await relocationTasksTestUtils.clickListItem(user, relocationTaskListItem.id)

    expect(props.onClick).toBeCalledTimes(1)
    expect(props.onClick).toBeCalledWith(relocationTaskListItem.id)
  })
})
