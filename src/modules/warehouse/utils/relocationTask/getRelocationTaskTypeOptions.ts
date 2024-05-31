import { SelectProps } from 'antd'

import { MatchedUserPermissions } from 'modules/user/utils'
import { relocationTaskTypeOptions } from 'modules/warehouse/constants/relocationTask'

export const getRelocationTaskTypeOptions = (
  permissions: MatchedUserPermissions,
): SelectProps['options'] =>
  relocationTaskTypeOptions.map((opt) => ({
    ...opt,
    disabled: opt.hasPermissions && !opt.hasPermissions(permissions),
  }))
