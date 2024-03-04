import { SelectProps } from 'antd'

import { MatchedPermissions } from 'modules/user/utils'
import { relocationTaskTypeOptions } from 'modules/warehouse/constants/relocationTask'

export const getRelocationTaskTypeOptions = (
  permissions: MatchedPermissions,
): SelectProps['options'] =>
  relocationTaskTypeOptions.map((opt) => ({
    ...opt,
    disabled: opt.hasPermissions && !opt.hasPermissions(permissions),
  }))
