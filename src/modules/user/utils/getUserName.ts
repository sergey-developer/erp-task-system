import { UserNameModel } from 'modules/user/models'
import addDotAtEnd from 'shared/utils/string/addDotToEnd'
import firstLetterUpperCase from 'shared/utils/string/firstLetterUpperCase'

type UserNameTypeUnion = 'full' | 'short'

const getUserName = <T extends UserNameModel>(
  { firstName, lastName, middleName }: T,
  type: UserNameTypeUnion,
): string => {
  if (type === 'full') {
    return [lastName, firstName, middleName].join(' ').trimEnd()
  }

  return [
    `${lastName} `,
    addDotAtEnd(firstLetterUpperCase(firstName)),
    middleName ? addDotAtEnd(firstLetterUpperCase(middleName)) : undefined,
  ].join('')
}

export default getUserName
