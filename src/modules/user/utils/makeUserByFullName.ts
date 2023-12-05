type MakeUserByFullNameResult = {
  firstName: string
  lastName: string
  middleName: string
}

export const makeUserByFullName = (value: string): MakeUserByFullNameResult => {
  const [lastName, firstName, middleName] = value.split(' ')

  return {
    firstName: firstName || '',
    lastName: lastName || '',
    middleName: middleName || '',
  }
}
