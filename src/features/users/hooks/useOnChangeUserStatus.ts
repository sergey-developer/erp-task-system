import { useUpdateEffect } from 'ahooks'

import { UserStatusCatalogItemDTO } from 'shared/catalogs/userStatuses/api/dto'

import { useUserMeState } from './useUserMeState'

export type UseOnChangeUserStatusFn = (status: UserStatusCatalogItemDTO) => any

export const useOnChangeUserStatus = (fn: UseOnChangeUserStatusFn) => {
  const { data } = useUserMeState()

  useUpdateEffect(() => {
    if (data) fn(data.status)
  }, [fn, data?.status])
}
