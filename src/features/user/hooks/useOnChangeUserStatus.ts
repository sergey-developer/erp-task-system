import { useUpdateEffect } from 'ahooks'

import { UserStatusDTO } from 'shared/catalogs/api/dto/userStatuses'

import { useUserMeState } from './useUserMeState'

export type UseOnChangeUserStatusFn = (status: UserStatusDTO) => any

export const useOnChangeUserStatus = (fn: UseOnChangeUserStatusFn) => {
  const { data } = useUserMeState()

  useUpdateEffect(() => {
    if (data) fn(data.status)
  }, [fn, data?.status])
}
