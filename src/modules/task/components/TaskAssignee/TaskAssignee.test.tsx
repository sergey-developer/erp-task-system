import { screen, within } from '@testing-library/react'

import { testUtils as userShortInfoTestUtils } from 'modules/task/components/UserShortInfo/UserShortInfo.test'
import { userRoleDict } from 'modules/user/constants'
import { getFullUserName } from 'modules/user/utils'

import userFixtures from '_tests_/fixtures/user'
import { render } from '_tests_/utils'

import TaskAssignee, { TaskAssigneeProps } from './index'

const props: TaskAssigneeProps = {
  ...userFixtures.user(),
  hasPopover: false,
}

const getContainer = () => screen.getByTestId('task-assignee')
const getContainerIn = (container: HTMLElement) => within(container).getByTestId('task-assignee')

const queryContainerIn = (container: HTMLElement) =>
  within(container).queryByTestId('task-assignee')

export const testUtils = {
  getContainer,
  getContainerIn,
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
    const role = within(userShortInfo).getByText(userRoleDict[props.role!])
    const fio = within(userShortInfo).queryByText(
      getFullUserName({
        firstName: props.firstName,
        lastName: props.lastName,
        middleName: props.middleName,
      }),
    )

    expect(email).toBeInTheDocument()
    expect(phone).toBeInTheDocument()
    expect(role).toBeInTheDocument()
    expect(fio).not.toBeInTheDocument()
  })
})
