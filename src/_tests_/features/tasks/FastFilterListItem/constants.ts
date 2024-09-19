import { FastFilterListItemProps } from '../../../../modules/task/components/FastFilters/FastFilterListItem'
import { fakeWord } from '../../../utils'
import { FastFilterEnum } from '../../../../modules/task/constants/task'

export const props: Readonly<
  Pick<FastFilterListItemProps, 'text' | 'checked' | 'amount' | 'value'>
> = {
  text: fakeWord(),
  value: FastFilterEnum.All,
  amount: 1,
  checked: false,
}
