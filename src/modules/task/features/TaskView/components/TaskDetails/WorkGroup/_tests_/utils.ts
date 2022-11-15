import { findButtonIn, getButtonIn, queryButtonIn } from '_tests_/utils'
import { screen } from '@testing-library/react'

const getContainer = () => screen.getByTestId('task-work-group')

const getFirstLineButton = () =>
  getButtonIn(getContainer(), /вернуть на I линию/i)

const findFirstLineButton = () =>
  findButtonIn(getContainer(), /вернуть на I линию/i)

const queryFirstLineButton = () =>
  queryButtonIn(getContainer(), /вернуть на I линию/i)

const utils = {
  getContainer,
  getFirstLineButton,
  findFirstLineButton,
  queryFirstLineButton,
}

export default utils
