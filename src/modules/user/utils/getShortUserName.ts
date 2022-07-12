import { UserNameModel } from 'modules/user/models'
import addDotAtEnd from 'shared/utils/string/addDotToEnd'
import firstLetterUpperCase from 'shared/utils/string/firstLetterUpperCase'

const getShortUserName = <T extends UserNameModel>({
  firstName,
  lastName,
  middleName,
}: T): string => {
  return [
    `${lastName} `,
    addDotAtEnd(firstLetterUpperCase(firstName)),
    middleName ? addDotAtEnd(firstLetterUpperCase(middleName)) : undefined,
  ].join('')
}

export default getShortUserName
