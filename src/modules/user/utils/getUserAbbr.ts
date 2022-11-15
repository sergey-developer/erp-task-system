import { UserModel } from 'modules/user/models'
import getFirstLetterInUpperCase from 'shared/utils/string/getFirstLetterInUpperCase'
import makeString from 'shared/utils/string/makeString'

const getUserAbbr = <T extends Pick<UserModel, 'firstName' | 'lastName'>>({
  firstName,
  lastName,
}: T): string =>
  makeString(
    '',
    getFirstLetterInUpperCase(lastName),
    getFirstLetterInUpperCase(firstName),
  )

export default getUserAbbr
