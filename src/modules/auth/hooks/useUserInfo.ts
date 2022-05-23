import { useMemo } from 'react'

import useSelector from 'shared/hooks/useSelector'

import { selectUserInfo } from '../selectors'

function useUserInfo() {
  const userInfo = useSelector(selectUserInfo)

  return useMemo(
    () => ({ role: userInfo?.userRole, id: userInfo?.userId }),
    [userInfo],
  )
}

export default useUserInfo
