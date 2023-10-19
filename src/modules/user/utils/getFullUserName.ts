import { Nullable } from 'shared/types/utils'
import { makeString } from 'shared/utils/string'

export const getFullUserName = <
  T extends {
    firstName: string
    lastName: string
    middleName: Nullable<string>
  },
>({
  firstName,
  lastName,
  middleName,
}: T): string => makeString(' ', lastName, firstName, middleName)
