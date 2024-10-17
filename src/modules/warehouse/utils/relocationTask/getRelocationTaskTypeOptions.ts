import { SelectProps } from 'antd'

import { MatchedUserPermissions } from 'modules/user/types'
import { relocationTaskTypeOptions } from 'modules/warehouse/constants/relocationTask'

export const getRelocationTaskTypeOptions = (
  permissions: MatchedUserPermissions,
): SelectProps['options'] =>
  relocationTaskTypeOptions.map(({ shouldDisable, ...opt }) => ({
    ...opt,
    disabled: shouldDisable && shouldDisable(permissions),
  }))
