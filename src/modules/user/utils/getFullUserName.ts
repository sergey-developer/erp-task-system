import { BaseUserModel } from 'modules/user/models'
import makeString from 'shared/utils/string/makeString'

const getFullUserName = <T extends Omit<BaseUserModel, 'id' | 'avatar'>>({
  firstName,
  lastName,
  middleName,
}: T): string => makeString(' ', lastName, firstName, middleName)

export default getFullUserName
