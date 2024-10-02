import { TextProps } from 'antd/es/typography/Text'

import { TaskOlaStatusEnum } from 'modules/task/constants/task'

import { MaybeUndefined, Nullable } from 'shared/types/utils'

import { getOlaStatusMap } from './checkOlaStatus'

export const getOlaStatusTextType = (
  olaStatus: Nullable<TaskOlaStatusEnum>,
): Extract<TextProps['type'], MaybeUndefined<'danger' | 'warning'>> => {
  const status = getOlaStatusMap(olaStatus)

  return status.isExpired ? 'danger' : status.isHalfExpired ? 'warning' : undefined
}
