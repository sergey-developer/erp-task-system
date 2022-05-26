import { UserNameModel } from 'modules/user/models'

const getUserFullName = <T extends UserNameModel>({
  firstName,
  lastName,
  middleName,
}: T): string => {
  return `${lastName} ${firstName}${middleName ? ` ${middleName}` : ''}`
}

export default getUserFullName
