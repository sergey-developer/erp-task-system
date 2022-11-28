import { UserModel } from 'modules/user/models'
import {
  addDotToEnd,
  getFirstLetterInUpperCase,
  makeString,
} from 'shared/utils/string'

const getShortUserName = <T extends Omit<UserModel, 'id'>>({
  firstName,
  lastName,
  middleName,
}: T): string =>
  makeString(
    '',
    `${lastName} `,
    addDotToEnd(getFirstLetterInUpperCase(firstName)),
    middleName ? addDotToEnd(getFirstLetterInUpperCase(middleName)) : null,
  )

export default getShortUserName
