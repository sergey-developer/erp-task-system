import { UserModel } from 'modules/user/models'
import makeString from 'shared/utils/string/makeString'

const getFullUserName = <T extends Omit<UserModel, 'id'>>({
  firstName,
  lastName,
  middleName,
}: T): string => makeString(' ', lastName, firstName, middleName)

export default getFullUserName
