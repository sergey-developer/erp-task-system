import { UserNameModel } from 'modules/user/models'
import firstLetterUpperCase from 'shared/utils/string/firstLetterUpperCase'

const getUserAbbr = <T extends Omit<UserNameModel, 'middleName'>>({
  firstName,
  lastName,
}: T): string => {
  return [firstLetterUpperCase(lastName), firstLetterUpperCase(firstName)].join(
    '',
  )
}

export default getUserAbbr
