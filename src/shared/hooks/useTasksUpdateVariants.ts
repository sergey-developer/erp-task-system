import { MenuProps } from 'antd/es/menu'
import { useCallback, useState } from 'react'

import { TasksUpdateVariants } from 'shared/constants/updateTasks'

type UseTasksUpdateVariants = {
  variants: TasksUpdateVariants[]
  set: NonNullable<MenuProps['onSelect']>
  unset: NonNullable<MenuProps['onDeselect']>
}

export const useTasksUpdateVariants = (): UseTasksUpdateVariants => {
  const [variants, setKeys] = useState<TasksUpdateVariants[]>([])

  const set = useCallback<UseTasksUpdateVariants['set']>(
    (info) => setKeys(info.selectedKeys as TasksUpdateVariants[]),
    [],
  )

  const unset = useCallback<UseTasksUpdateVariants['unset']>(
    (info) => setKeys((prevState) => prevState.filter((key) => key !== info.key)),
    [],
  )

  return { variants, set, unset }
}
