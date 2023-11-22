import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as attachmentListTestUtils } from 'modules/task/components/AttachmentList/AttachmentList.test'
import { testUtils as taskAssigneeTestUtils } from 'modules/task/components/TaskAssignee/TaskAssignee.test'
import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'
import { getRelocationTaskTitle } from 'modules/warehouse/utils/relocationTask'

import { IdType } from 'shared/types/common'
import { formatDate } from 'shared/utils/date'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { render } from '_tests_/utils'

import RelocationTaskList, { RelocationTaskListProps } from './index'

const relocationTaskListItem = warehouseFixtures.relocationTaskListItem()

const props: RelocationTaskListProps = {
  data: [relocationTaskListItem],
  onClick: jest.fn(),
}

const getContainer = () => screen.getByTestId('relocation-task-list')

// list item
const getListItem = (id: IdType) =>
  within(getContainer()).getByTestId(`relocation-task-list-item-${id}`)

const getChildInListItem = (id: IdType, text: string | RegExp) =>
  within(getListItem(id)).getByText(text)

const clickListItem = async (user: UserEvent, id: IdType) => {
  const item = getListItem(id)
  await user.click(item)
}

export const testUtils = {
  getContainer,

  getListItem,
  getChildInListItem,
  clickListItem,
}

describe('RelocationTaskList', () => {
  test('Если список пуст отображается соответствующий текст', () => {
    render(<RelocationTaskList {...props} data={[]} />)
    const text = within(getContainer()).getByText('Перемещений нет')
    expect(text).toBeInTheDocument()
  })

  test('Дата дэдлайна отображается', () => {
    render(<RelocationTaskList {...props} />)
    const text = `до ${formatDate(relocationTaskListItem.deadlineAt)}`
    const value = testUtils.getChildInListItem(relocationTaskListItem.id, text)
    expect(value).toBeInTheDocument()
  })

  test('Заголовок отображается', () => {
    render(<RelocationTaskList {...props} />)
    const text = getRelocationTaskTitle(relocationTaskListItem)
    const value = testUtils.getChildInListItem(relocationTaskListItem.id, text)
    expect(value).toBeInTheDocument()
  })

  test('Статус отображается', () => {
    render(<RelocationTaskList {...props} />)

    const label = testUtils.getChildInListItem(relocationTaskListItem.id, /Статус/)
    const value = testUtils.getChildInListItem(
      relocationTaskListItem.id,
      relocationTaskStatusDict[relocationTaskListItem.status],
    )

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Документы отображается', () => {
    render(<RelocationTaskList {...props} />)

    const label = testUtils.getChildInListItem(relocationTaskListItem.id, /Документы/)
    const value = attachmentListTestUtils.getContainerIn(
      testUtils.getListItem(relocationTaskListItem.id),
    )

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Дата создания отображается', () => {
    render(<RelocationTaskList {...props} />)

    const label = testUtils.getChildInListItem(relocationTaskListItem.id, /Дата создания/)
    const text = formatDate(relocationTaskListItem.createdAt)
    const value = testUtils.getChildInListItem(relocationTaskListItem.id, text)

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('Исполнитель отображается', () => {
    render(<RelocationTaskList {...props} />)

    const label = testUtils.getChildInListItem(relocationTaskListItem.id, /Исполнитель/)
    const value = taskAssigneeTestUtils.getContainerIn(
      testUtils.getListItem(relocationTaskListItem.id),
    )

    expect(label).toBeInTheDocument()
    expect(value).toBeInTheDocument()
  })

  test('При клике по элементу вызывается обработчик', async () => {
    const { user } = render(<RelocationTaskList {...props} />)

    await testUtils.clickListItem(user, relocationTaskListItem.id)

    expect(props.onClick).toBeCalledTimes(1)
    expect(props.onClick).toBeCalledWith(relocationTaskListItem.id)
  })
})
