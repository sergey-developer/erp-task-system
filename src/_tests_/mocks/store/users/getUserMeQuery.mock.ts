import { UserDetailDTO } from 'features/users/api/dto'

export const getUserMeQueryMock = (data: Partial<UserDetailDTO>) => ({
  'getUserMe(undefined)': { data },
})
