import { UserRequestArgs } from 'features/users/api/types'

import { UserDetailDTO } from '../dto'

export type UpdateUserTimeZoneRequest = UserRequestArgs & Pick<UserDetailDTO, 'timezone'>
export type UpdateUserTimeZoneResponse = UserDetailDTO
