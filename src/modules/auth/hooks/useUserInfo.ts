import { useMemo } from 'react'

import useSelector from 'shared/hooks/useSelector'
import { MaybeNull } from 'shared/interfaces/utils'

import { UserInfo } from '../models'
import { selectUserInfo } from '../selectors'

type UseUserInfoReturnType = MaybeNull<{
  id: UserInfo['userId']
  role: UserInfo['userRole']
}>

const useUserInfo = (): UseUserInfoReturnType => {
  const userInfo = useSelector(selectUserInfo)

  return useMemo(() => {
    return userInfo ? { role: userInfo.userRole, id: userInfo.userId } : null
  }, [userInfo])
}

export default useUserInfo
