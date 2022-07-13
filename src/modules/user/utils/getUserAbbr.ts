import { UserNameModel } from 'modules/user/models'
import getFirstLetterInUpperCase from 'shared/utils/string/getFirstLetterInUpperCase'

const getUserAbbr = <T extends Omit<UserNameModel, 'middleName'>>({
  firstName,
  lastName,
}: T): string => {
  return [
    getFirstLetterInUpperCase(lastName),
    getFirstLetterInUpperCase(firstName),
  ].join('')
}

export default getUserAbbr
