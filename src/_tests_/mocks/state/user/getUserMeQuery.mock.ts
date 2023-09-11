import { UserModel } from "modules/user/models";

export const getUserMeQueryMock = (data: Partial<UserModel>) => ({
  'getUserMe(undefined)': { data }
})
