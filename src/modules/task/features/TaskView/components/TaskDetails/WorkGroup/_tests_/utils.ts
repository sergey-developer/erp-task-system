import { buttonTestUtils } from '_tests_/utils'
import { screen } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-work-group')

const getFirstLineButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /вернуть на I линию/i)

const findFirstLineButton = () =>
  buttonTestUtils.findButtonIn(getContainer(), /вернуть на I линию/i)

const queryFirstLineButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /вернуть на I линию/i)

const utils = {
  getContainer,
  getFirstLineButton,
  findFirstLineButton,
  queryFirstLineButton,
}

export default utils
