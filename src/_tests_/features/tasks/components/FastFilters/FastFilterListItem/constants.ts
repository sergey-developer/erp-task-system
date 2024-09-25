import { FastFilterListItemProps } from 'modules/task/components/FastFilters/FastFilterListItem/index'
import { FastFilterEnum } from 'modules/task/constants/task/index'

import { fakeWord } from '_tests_/utils/index'

export const props: Readonly<
  Pick<FastFilterListItemProps, 'text' | 'checked' | 'amount' | 'value'>
> = {
  text: fakeWord(),
  value: FastFilterEnum.All,
  amount: 1,
  checked: false,
}
