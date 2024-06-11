import { AttachmentListItem } from 'modules/attachment/components/Attachments/types'
import { getShortUserName } from 'modules/user/utils'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { MaybeNull } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'
import { prettyBytes } from 'shared/utils/file'

export const getInfo = (
  params: Partial<
    Pick<AttachmentListItem, 'size' | 'createdAt'> & {
      user: Pick<AttachmentListItem, 'firstName' | 'lastName' | 'middleName'>
    }
  >,
  opts: Record<keyof typeof params, (value?: any) => MaybeNull<string>>,
): string =>
  Object.keys(params)
    .reduce<string[]>((acc, key) => {
      const paramKey = key as keyof typeof params
      const value = opts[paramKey](params[paramKey])
      if (value) acc.push(value)
      return acc
    }, [])
    .join(', ')

export const getInfoOpts: Parameters<typeof getInfo>[1] = {
  size: (value) => prettyBytes(value),
  createdAt: (value) => (value ? formatDate(value, DATE_FORMAT) : null),
  user: (value) => (value ? getShortUserName(value) : null),
}
