import { useUpdateEffect } from 'ahooks'

import { UserStatusModel } from 'shared/models/catalogs/userStatus'

import { useUserMeState } from './useUserMeState'

export type UseOnChangeUserStatusFn = (status: UserStatusModel) => any

export const useOnChangeUserStatus = (fn: UseOnChangeUserStatusFn) => {
  const { data } = useUserMeState()

  useUpdateEffect(() => {
    if (data) fn(data.status)
  }, [fn, data?.status])
}
