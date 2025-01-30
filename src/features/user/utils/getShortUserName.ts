import { BaseUserModel } from 'features/user/models'

import { Nullable } from 'shared/types/utils'
import { addDotToEnd, getFirstLetterInUpperCase, makeString } from 'shared/utils/string'

export const getShortUserName = <
  T extends Pick<BaseUserModel, 'firstName' | 'lastName'> & { middleName: Nullable<string> },
>({
  firstName,
  lastName,
  middleName,
}: T): string =>
  makeString(
    ' ',
    lastName,
    addDotToEnd(getFirstLetterInUpperCase(firstName)),
    middleName ? addDotToEnd(getFirstLetterInUpperCase(middleName)) : null,
  )
