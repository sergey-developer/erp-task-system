import { BaseUserModel } from 'modules/user/models'

import {
  addDotToEnd,
  getFirstLetterInUpperCase,
  makeString,
} from 'shared/utils/string'

export const getShortUserName = <
  T extends Pick<BaseUserModel, 'firstName' | 'lastName' | 'middleName'>,
>({
  firstName,
  lastName,
  middleName,
}: T): string =>
  makeString(
    '',
    `${lastName} `,
    addDotToEnd(getFirstLetterInUpperCase(firstName)),
    middleName ? addDotToEnd(getFirstLetterInUpperCase(middleName)) : null,
  )
