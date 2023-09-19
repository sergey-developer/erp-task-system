type MakeUserNameObjectResult = {
  firstName: string
  lastName: string
  middleName: string
}

export const makeUserNameObject = (
  value: string,
): MakeUserNameObjectResult => {
  const fullNameParts = value.split(' ')
  const firstName = fullNameParts[1] || ''
  const lastName = fullNameParts[0] || ''
  const middleName = fullNameParts[2] || ''

  return { firstName, lastName, middleName }
}
