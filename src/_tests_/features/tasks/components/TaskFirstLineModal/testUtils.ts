import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils } from '_tests_/helpers/index'

import { TestIdsEnum } from '_tests_/features/tasks/components/TaskFirstLineModal/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.ModalTaskFirstLine)
const findContainer = () => screen.findByTestId(TestIdsEnum.ModalTaskFirstLine)

const getDescriptionField = () =>
  within(getContainer()).getByRole('textbox', {
    name: 'Причина возврата',
  })

const getDescriptionFieldContainer = () =>
  within(getContainer()).getByTestId(TestIdsEnum.FieldDescription)

const setDescription = async (user: UserEvent, value: string) => {
  const field = getDescriptionField()
  await user.type(field, value)
  return field
}

const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), /вернуть заявку/i)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), /отменить/i)

export const taskFirstLineModalTestUtils = {
  getContainer,
  findContainer,

  getDescriptionField,
  getDescriptionFieldContainer,
  setDescription,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
}
