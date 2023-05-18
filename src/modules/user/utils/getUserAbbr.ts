import { BaseUserModel } from 'modules/user/models'

import { getFirstLetterInUpperCase, makeString } from 'shared/utils/string'

export const getUserAbbr = <
  T extends Pick<BaseUserModel, 'firstName' | 'lastName'>,
>({
  firstName,
  lastName,
}: T): string =>
  makeString(
    '',
    getFirstLetterInUpperCase(lastName),
    getFirstLetterInUpperCase(firstName),
  )
