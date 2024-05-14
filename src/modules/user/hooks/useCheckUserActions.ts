import { UserActionsPermissions } from 'modules/user/constants'

import { Camelize } from 'shared/types/utils'

export type MatchedPermissions2 = Readonly<
  Camelize<Partial<Record<Lowercase<UserActionsPermissions>, boolean>>>
>

// export const useCheckUserActions = (
//   actions: UserActionsModel,
//   permissions: UserActionsPermissions[],
//   ids: IdType[],
// ) => {
//   return Object.keys(actions).reduce<Record<keyof UserActionsModel, MatchedPermissions2>>(
//     (acc, key) => {
//       const actionKey = key as keyof UserActionsModel
//       const permObj = actions[actionKey]
//
//       return acc[actionKey]
//         ? acc
//         : (acc[actionKey] = camelizeKeys(
//             Object.keys(permObj).reduce<Writeable<MatchedPermissions2>>((acc, perm) => {
//               const key = perm.toLowerCase() as keyof MatchedPermissions2
//               acc[key] = true
//               return acc
//             }, {}),
//           ))
//     },
//     {},
//   )
// }
