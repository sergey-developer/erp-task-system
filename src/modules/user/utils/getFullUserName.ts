import { BaseUserModel } from 'modules/user/models'

import { makeString } from 'shared/utils/string'

export const getFullUserName = <
  T extends Pick<BaseUserModel, 'firstName' | 'lastName' | 'middleName'>,
>({
  firstName,
  lastName,
  middleName,
}: T): string => makeString(' ', lastName, firstName, middleName)
