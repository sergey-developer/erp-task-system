import { generateWord } from '_tests_/utils'

import { CommentProps } from '../index'

export const requiredProps: Readonly<CommentProps> = {
  text: generateWord(),
  author: generateWord(),
  createdAt: generateWord(),
}
