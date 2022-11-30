import { getButtonIn } from '_tests_/utils'
import { screen } from '@testing-library/react'

const getContainer = () => screen.getByTestId('subtask-list-tab')

const getCreateSubTaskButton = () =>
  getButtonIn(getContainer(), /создать новое задание/i)

const utils = {
  getContainer,

  getCreateSubTaskButton,
}

export default utils
