import { UserRequestArgs } from 'features/users/api/types'

import { UserDetailDTO } from '../dto'

export type UpdateUserTimeZoneMutationArgs = UserRequestArgs & Pick<UserDetailDTO, 'timezone'>
export type UpdateUserTimeZoneSuccessResponse = UserDetailDTO
