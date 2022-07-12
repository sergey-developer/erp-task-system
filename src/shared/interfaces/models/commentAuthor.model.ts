import { UserNameModel } from 'modules/user/models'

export type CommentAuthorModel = UserNameModel & {
  id: number
}
