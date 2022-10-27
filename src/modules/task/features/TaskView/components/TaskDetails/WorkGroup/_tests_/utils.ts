import { findButtonIn, getButtonIn, queryButtonIn } from '_tests_/utils'
import { screen } from '@testing-library/react'

export const getWorkGroup = () => screen.getByTestId('task-work-group')

export const getFirstLineButton = () =>
  getButtonIn(getWorkGroup(), /Вернуть на I линию/i)

export const findFirstLineButton = () =>
  findButtonIn(getWorkGroup(), /Вернуть на I линию/i)

export const queryFirstLineButton = () =>
  queryButtonIn(getWorkGroup(), /Вернуть на I линию/i)
