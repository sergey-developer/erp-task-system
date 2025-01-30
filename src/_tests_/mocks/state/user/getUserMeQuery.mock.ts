import { UserModel } from "features/user/models";

export const getUserMeQueryMock = (data: Partial<UserModel>) => ({
  'getUserMe(undefined)': { data }
})
