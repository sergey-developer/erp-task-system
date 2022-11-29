import { useEffect } from 'react'

import { useLazyGetSubTaskTemplateListQuery } from 'modules/task/services/subTaskApi.service'
import { showErrorNotification } from 'shared/utils/notifications'

const useLazyGetSubTaskTemplateList = () => {
  const [trigger, state] = useLazyGetSubTaskTemplateListQuery()

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification('Не удалось получить шаблоны заданий')
  }, [state.isError])

  return { fn: trigger, state }
}

export default useLazyGetSubTaskTemplateList
