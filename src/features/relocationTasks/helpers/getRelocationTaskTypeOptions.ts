import { SelectProps } from 'antd'
import { relocationTaskTypeOptions } from 'features/relocationTasks/constants'
import { MatchedUserPermissions } from 'features/users/types'

export const getRelocationTaskTypeOptions = (
  permissions: MatchedUserPermissions,
): SelectProps['options'] =>
  relocationTaskTypeOptions.map(({ shouldDisable, ...opt }) => ({
    ...opt,
    disabled: shouldDisable && shouldDisable(permissions),
  }))
