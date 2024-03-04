import { isFalse, isTrue } from './boolean'

export const getYesNoWord = (value: boolean): string =>
  isTrue(value) ? 'Да' : isFalse(value) ? 'Нет' : ''
