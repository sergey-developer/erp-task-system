import { UserModel } from 'modules/user/models'
import { getFirstLetterInUpperCase, makeString } from 'shared/utils/string'

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
