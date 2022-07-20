import { BaseUserModel } from 'modules/user/models'

const getFullUserName = <T extends Omit<BaseUserModel, 'id' | 'avatar'>>({
  firstName,
  lastName,
  middleName,
}: T): string => {
  return [lastName, firstName, middleName].join(' ').trimEnd()
}

export default getFullUserName
