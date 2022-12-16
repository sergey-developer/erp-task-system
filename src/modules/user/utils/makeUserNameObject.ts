import { UserModel } from 'modules/user/models'

export const makeUserNameObject = (
  value: string,
): Pick<UserModel, 'firstName' | 'lastName' | 'middleName'> => {
  const fullNameParts = value.split(' ')
  const firstName = fullNameParts[1]
  const lastName = fullNameParts[0]
  const middleName = fullNameParts[2]

  return {
    firstName: firstName || '',
    lastName: lastName || '',
    middleName,
  }
}
