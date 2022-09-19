import { UserEvent } from '@testing-library/user-event/setup/setup'
import getRandomInt from 'shared/utils/common/getRandomInt'

import { within } from './index'

const names1 = ['Blue', 'Green', 'Red', 'Orange', 'Violet', 'Indigo', 'Yellow']
const names2 = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Zero',
]

export const generateName = () =>
  names1[Math.floor(Math.random() * names1.length)] +
  ' ' +
  names2[Math.floor(Math.random() * names2.length)]

export const generateId = getRandomInt

export const userOpenSelect = async (
  user: UserEvent,
  container: HTMLElement,
) => {
  const selectInput = within(container).getByRole('combobox')
  await user.click(selectInput)
}

export const getOpenedSelect = (container: HTMLElement) => {
  return within(container).getByRole('combobox', {
    expanded: true,
  })
}
