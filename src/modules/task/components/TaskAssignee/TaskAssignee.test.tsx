import { screen, within } from '@testing-library/react'

import { testUtils as userShortInfoTestUtils } from 'modules/task/components/UserShortInfo/UserShortInfo.test'
import { getFullUserName } from 'modules/user/utils'

import userFixtures from '_tests_/fixtures/user'
import { render } from '_tests_/utils'

import TaskAssignee, { TaskAssigneeProps } from './index'

const user = userFixtures.user()

const props: TaskAssigneeProps = {
  ...user,
  position: user.position!.title,
  hasPopover: false,
}

const getContainer = () => screen.getByTestId('task-assignee')

const getContainerIn = (container: HTMLElement) => within(container).getByTestId('task-assignee')

const getAllContainerIn = (container: HTMLElement) =>
  within(container).getAllByTestId('task-assignee')

const queryContainerIn = (container: HTMLElement) =>
  within(container).queryByTestId('task-assignee')

export const testUtils = {
  getContainer,
  getContainerIn,
  getAllContainerIn,
  queryContainerIn,
}

describe('Исполнитель заявки', () => {
  test('Данные исполнителя отображаются при наведении', async () => {
    const { user } = render(<TaskAssignee {...props} hasPopover />)

    const name = within(getContainer()).getByText(
      getFullUserName({
        firstName: props.firstName,
        lastName: props.lastName,
        middleName: props.middleName,
      }),
    )
    await user.hover(name)
    const userShortInfo = await userShortInfoTestUtils.findContainer()

    const email = within(userShortInfo).getByText(props.email!)
    const phone = within(userShortInfo).getByText(props.phone!)
    const position = within(userShortInfo).getByText(props.position!)
    const fio = within(userShortInfo).queryByText(
      getFullUserName({
        firstName: props.firstName,
        lastName: props.lastName,
        middleName: props.middleName,
      }),
    )

    expect(email).toBeInTheDocument()
    expect(phone).toBeInTheDocument()
    expect(position).toBeInTheDocument()
    expect(fio).not.toBeInTheDocument()
  })
})
