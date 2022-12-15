import { UserModel } from 'modules/user/models'
import { makeString } from 'shared/utils/string'

export const getFullUserName = <
  T extends Pick<UserModel, 'firstName' | 'lastName' | 'middleName'>,
>({
  firstName,
  lastName,
  middleName,
}: T): string => makeString(' ', lastName, firstName, middleName)
