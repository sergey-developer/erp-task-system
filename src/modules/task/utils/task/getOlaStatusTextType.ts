import { TextProps } from 'antd/es/typography/Text'

import { TaskOlaStatusEnum } from 'modules/task/constants/task'

import { MaybeUndefined } from 'shared/types/utils'

import { getOlaStatusMap } from './getOlaStatusMap'

export const getOlaStatusTextType = (
  olaStatus: TaskOlaStatusEnum,
): Extract<TextProps['type'], MaybeUndefined<'danger' | 'warning'>> => {
  const status = getOlaStatusMap(olaStatus)

  return status.isExpired ? 'danger' : status.isHalfExpired ? 'warning' : undefined
}
