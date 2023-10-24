type MakeUserNameObjectResult = {
  firstName: string
  lastName: string
  middleName: string
}

export const makeUserNameObject = (value: string): MakeUserNameObjectResult => {
  const [lastName, firstName, middleName] = value.split(' ')

  return {
    firstName: firstName || '',
    lastName: lastName || '',
    middleName: middleName || '',
  }
}
