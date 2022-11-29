import { useCallback, useEffect } from 'react'

import { useLazyGetSubTaskTemplateListQuery } from 'modules/task/services/subTaskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { showErrorNotification } from 'shared/utils/notifications'

import { subTaskApiPermissions } from '../permissions'

const useLazyGetSubTaskTemplateList = () => {
  const permissions = useUserPermissions(subTaskApiPermissions.template)
  const [trigger, state] = useLazyGetSubTaskTemplateListQuery()

  const fn = useCallback(async () => {
    if (permissions.canGetList) {
      return trigger()
    }
  }, [permissions.canGetList, trigger])

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification('Не удалось получить шаблоны заданий')
  }, [state.isError])

  return { fn, state }
}

export default useLazyGetSubTaskTemplateList
