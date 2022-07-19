import { BaseUserModel } from 'modules/user/models'
import getFirstLetterInUpperCase from 'shared/utils/string/getFirstLetterInUpperCase'

const getUserAbbr = <T extends Pick<BaseUserModel, 'firstName' | 'lastName'>>({
  firstName,
  lastName,
}: T): string => {
  return [
    getFirstLetterInUpperCase(lastName),
    getFirstLetterInUpperCase(firstName),
  ].join('')
}

export default getUserAbbr
