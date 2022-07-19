import { BaseUserModel } from 'modules/user/models'
import addDotAtEnd from 'shared/utils/string/addDotToEnd'
import getFirstLetterInUpperCase from 'shared/utils/string/getFirstLetterInUpperCase'

const getShortUserName = <T extends Omit<BaseUserModel, 'id' | 'avatar'>>({
  firstName,
  lastName,
  middleName,
}: T): string => {
  return [
    `${lastName} `,
    addDotAtEnd(getFirstLetterInUpperCase(firstName)),
    middleName ? addDotAtEnd(getFirstLetterInUpperCase(middleName)) : undefined,
  ].join('')
}

export default getShortUserName
