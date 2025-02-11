import { BaseUserType } from 'features/users/api/types'

import { Nullable } from 'shared/types/utils'
import { addDotToEnd, getFirstLetterInUpperCase, makeString } from 'shared/utils/string'

export const getShortUserName = <
  T extends Pick<BaseUserType, 'firstName' | 'lastName'> & { middleName: Nullable<string> },
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
