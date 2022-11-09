import { UserModel } from 'modules/user/models'
import addDotAtEnd from 'shared/utils/string/addDotToEnd'
import getFirstLetterInUpperCase from 'shared/utils/string/getFirstLetterInUpperCase'
import makeString from 'shared/utils/string/makeString'

const getShortUserName = <T extends Omit<UserModel, 'id'>>({
  firstName,
  lastName,
  middleName,
}: T): string =>
  makeString(
    '',
    `${lastName} `,
    addDotAtEnd(getFirstLetterInUpperCase(firstName)),
    middleName ? addDotAtEnd(getFirstLetterInUpperCase(middleName)) : null,
  )

export default getShortUserName
