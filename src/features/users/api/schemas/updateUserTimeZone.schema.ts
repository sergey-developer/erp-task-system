import { RequestWithUser } from 'features/users/api/types'

import { UserDetailDTO } from '../dto'

export type UpdateUserTimeZoneRequest = RequestWithUser & Pick<UserDetailDTO, 'timezone'>
export type UpdateUserTimeZoneResponse = UserDetailDTO
