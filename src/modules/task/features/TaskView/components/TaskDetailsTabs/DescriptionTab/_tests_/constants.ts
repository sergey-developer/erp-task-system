import { generateWord } from '_tests_/utils'

import { DescriptionTabProps } from '../index'

export const requiredProps: Pick<DescriptionTabProps, 'title'> = {
  title: generateWord(),
}

export const notRequiredProps: Pick<DescriptionTabProps, 'description'> = {
  description: generateWord(),
}
