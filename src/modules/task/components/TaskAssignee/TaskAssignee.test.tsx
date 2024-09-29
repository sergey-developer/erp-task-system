import { within } from '@testing-library/react'

import { getFullUserName } from 'modules/user/utils'

import { props } from '_tests_/features/tasks/components/TaskAssignee/constants'
import { taskAssigneeTestUtils } from '_tests_/features/tasks/components/TaskAssignee/testUtils'
import { userShortInfoTestUtils } from '_tests_/features/tasks/components/UserShortInfo/testUtils'
import { render } from '_tests_/utils'

import TaskAssignee from './index'

describe('Исполнитель заявки', () => {
  test('Данные исполнителя отображаются при наведении', async () => {
    const { user } = render(<TaskAssignee {...props} hasPopover />)

    const name = within(taskAssigneeTestUtils.getContainer()).getByText(
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
