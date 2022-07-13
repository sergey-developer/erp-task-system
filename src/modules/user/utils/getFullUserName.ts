import { UserNameModel } from 'modules/user/models'

const getFullUserName = <T extends UserNameModel>({
  firstName,
  lastName,
  middleName,
}: T): string => {
  return [lastName, firstName, middleName].join(' ').trimEnd()
}

export default getFullUserName
