import { UserNameModel } from 'modules/user/models'

const firstLetterUpperCase = (value: string): string =>
  value.charAt(0).toUpperCase()

const getUserAbbr = <T extends Omit<UserNameModel, 'middleName'>>({
  firstName,
  lastName,
}: T): string => {
  return `${firstLetterUpperCase(lastName)}${firstLetterUpperCase(firstName)}`
}

export default getUserAbbr
