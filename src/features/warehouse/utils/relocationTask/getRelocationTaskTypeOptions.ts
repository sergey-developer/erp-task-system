import { SelectProps } from 'antd'

import { MatchedUserPermissions } from 'features/user/types'
import { relocationTaskTypeOptions } from 'features/warehouse/constants/relocationTask'

export const getRelocationTaskTypeOptions = (
  permissions: MatchedUserPermissions,
): SelectProps['options'] =>
  relocationTaskTypeOptions.map(({ shouldDisable, ...opt }) => ({
    ...opt,
    disabled: shouldDisable && shouldDisable(permissions),
  }))
