import getRandomInt from 'shared/utils/common/getRandomInt'

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
