import { generateWord } from '_tests_/utils'

import { ResolutionTabProps } from '../index'

export const requiredProps: Pick<ResolutionTabProps, 'title'> = {
  title: generateWord(),
}

export const notRequiredProps: Pick<
  ResolutionTabProps,
  'type' | 'userResolution' | 'techResolution'
> = {
  techResolution: generateWord(),
  userResolution: generateWord(),
}
