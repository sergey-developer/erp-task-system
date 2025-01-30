import { getFirstLetterInUpperCase, makeString } from 'shared/utils/string'

export const getUserAbbr = <
  T extends {
    firstName: string
    lastName: string
  },
>({
  firstName,
  lastName,
}: T): string =>
  makeString('', getFirstLetterInUpperCase(lastName), getFirstLetterInUpperCase(firstName))
