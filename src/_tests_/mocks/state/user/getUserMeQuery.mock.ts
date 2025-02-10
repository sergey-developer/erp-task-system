import { UserModel } from 'features/user/api/dto'

export const getUserMeQueryMock = (data: Partial<UserModel>) => ({
  'getUserMe(undefined)': { data },
})
