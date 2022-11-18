import { buttonTestUtils } from '_tests_/utils'
import { screen } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-assignee')

const getTakeTaskButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /в работу/i)

const utils = {
  getContainer,
  getTakeTaskButton,
}

export default utils
